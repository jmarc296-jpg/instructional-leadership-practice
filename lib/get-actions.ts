import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getActions() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase.from("leadership_actions").select("*").order("last_updated", { ascending: false });
  return data || [];
}
