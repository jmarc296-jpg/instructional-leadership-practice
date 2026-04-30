import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getActions() {
  const { data } = await supabase
    .from("leadership_actions")
    .select("*")
    .order("last_updated", { ascending: false });

  return data || [];
}
