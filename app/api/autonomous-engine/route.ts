import { createClient } from "@supabase/supabase-js";
import { prescribeFromSignal } from "@/lib/prescription-engine";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function addDays(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}

function isOverdue(dueDate: string | null, status: string | null) {
  if (!dueDate) return false;
  if (status === "Complete") return false;

  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today;
}

export async function GET() {
  const { data, error } = await supabase
    .from("leadership_actions")
    .select("id,campus,signal,action,owner,status,risk,evidence,due_date,last_reviewed,last_updated")
    .order("last_updated", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: data || [] });
}

export async function POST() {
  const { data, error } = await supabase
    .from("leadership_actions")
    .select("*");

  if (error) return Response.json({ error: error.message }, { status: 500 });

  let updated = 0;

  for (const item of data || []) {
    const prescription = prescribeFromSignal(item.signal, item.status);

    const dueDate =
      item.due_date ||
      (item.status === "Not Started" ? addDays(3) : addDays(7));

    const overdue = isOverdue(dueDate, item.status);

    const risk = overdue ? "Immediate" : prescription.risk;

    const action = overdue
      ? `OVERDUE: ${prescription.action}`
      : prescription.action;

    const lastReviewed =
      item.status === "Complete" && !item.last_reviewed
        ? new Date().toISOString()
        : item.last_reviewed;

    const shouldUpdate =
      risk !== item.risk ||
      action !== item.action ||
      prescription.owner !== item.owner ||
      dueDate !== item.due_date ||
      lastReviewed !== item.last_reviewed;

    if (shouldUpdate) {
      const { error: updateError } = await supabase
        .from("leadership_actions")
        .update({
          risk,
          action,
          owner: prescription.owner,
          due_date: dueDate,
          last_reviewed: lastReviewed,
          last_updated: new Date().toISOString()
        })
        .eq("id", item.id);

      if (!updateError) updated++;
    }
  }

  return Response.json({ updated });
}