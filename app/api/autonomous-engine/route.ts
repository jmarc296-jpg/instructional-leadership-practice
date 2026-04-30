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

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, evidence, status } = body;

  if (!id) {
    return Response.json({ error: "Missing action id" }, { status: 400 });
  }

  const updates = {
    evidence,
    status: status || "In Progress",
    last_updated: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("leadership_actions")
    .update(updates)
    .eq("id", id)
    .select("id,campus,signal,action,owner,status,risk,evidence,due_date,last_reviewed,last_updated")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data });
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

let daysLate = 0;
if (overdue && dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  daysLate = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
}

    let risk = prescription.risk;

if (overdue) {
  if (daysLate <= 3) {
    risk = "Immediate";
  } else if (daysLate <= 7) {
    risk = "Critical";
  } else {
    risk = "System Alert";
  }
}

    let action = prescription.action;

if (overdue) {
  if (daysLate <= 3) {
    action = `OVERDUE: ${prescription.action}`;
  } else if (daysLate <= 7) {
    action = `CRITICAL: Immediate leadership intervention required. ${prescription.action}`;
  } else {
    action = `SYSTEM ALERT: District-level escalation required. ${prescription.action}`;
  }
}

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
          owner: overdue && daysLate > 3 
  ? "Network Superintendent" 
  : prescription.owner,
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