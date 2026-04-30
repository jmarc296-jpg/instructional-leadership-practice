import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("leadership_actions")
    .select("id,campus,signal,action,owner,status,risk,last_updated")
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

  for (const a of data || []) {
    const risk =
      a.status === "Not Started"
        ? "Immediate"
        : a.status === "In Progress"
        ? "High"
        : "Low";

    if (risk !== a.risk) {
      const { error: updateError } = await supabase
        .from("leadership_actions")
        .update({ risk, last_updated: new Date().toISOString() })
        .eq("id", a.id);

      if (!updateError) updated++;
    }
  }

  return Response.json({ updated });
}
