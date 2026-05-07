import { createClient } from "@supabase/supabase-js";
import { prescribeFromSignal } from "@/lib/prescription-engine";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function addDays(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function isOverdue(dueDate: string | null, status: string | null) {
  if (!dueDate || status === "Complete") return false;
  return dueDate < new Date().toISOString().slice(0, 10);
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return Response.json({ error: "Supabase is not configured" }, { status: 500 });

  const { data, error } = await supabase
    .from("leadership_actions")
    .select("id,campus,signal,action,owner,status,risk,evidence,due_date,last_reviewed,last_updated")
    .order("last_updated", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: data || [] });
}

export async function PATCH(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return Response.json({ error: "Supabase is not configured" }, { status: 500 });

  const body = await request.json();
  const { id, evidence, status } = body;
  if (!id) return Response.json({ error: "Missing action id" }, { status: 400 });

  const { data, error } = await supabase
    .from("leadership_actions")
    .update({ evidence, status: status || "In Progress", last_updated: new Date().toISOString() })
    .eq("id", id)
    .select("id,campus,signal,action,owner,status,risk,evidence,due_date,last_reviewed,last_updated")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data });
}

export async function POST() {
  const supabase = getSupabase();
  if (!supabase) return Response.json({ error: "Supabase is not configured" }, { status: 500 });

  const { data, error } = await supabase.from("leadership_actions").select("*");
  if (error) return Response.json({ error: error.message }, { status: 500 });

  let updated = 0;
  for (const item of data || []) {
    const prescription = prescribeFromSignal(item.signal, item.status);
    const dueDate = item.due_date || (item.status === "Not Started" ? addDays(3) : addDays(7));
    const overdue = isOverdue(dueDate, item.status);

    let daysLate = 0;
    if (overdue && dueDate) {
      daysLate = Math.floor((Date.now() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24));
    }

    let risk = prescription.risk;
    if (overdue) risk = daysLate <= 3 ? "Immediate" : daysLate <= 7 ? "Critical" : "System Alert";

    let action = prescription.action;
    if (overdue) action = daysLate <= 3 ? `OVERDUE: ${prescription.action}` : daysLate <= 7 ? `CRITICAL: Immediate leadership intervention required. ${prescription.action}` : `SYSTEM ALERT: District-level escalation required. ${prescription.action}`;

    const lastReviewed = item.status === "Complete" && !item.last_reviewed ? new Date().toISOString() : item.last_reviewed;

    const shouldUpdate = risk !== item.risk || action !== item.action || prescription.owner !== item.owner || dueDate !== item.due_date || lastReviewed !== item.last_reviewed;
    if (!shouldUpdate) continue;

    const { error: updateError } = await supabase
      .from("leadership_actions")
      .update({
        risk,
        action,
        owner: overdue && daysLate > 3 ? "Network Superintendent" : prescription.owner,
        due_date: dueDate,
        last_reviewed: lastReviewed,
        last_updated: new Date().toISOString()
      })
      .eq("id", item.id);

    if (!updateError) updated++;
  }

  return Response.json({ updated });
}
