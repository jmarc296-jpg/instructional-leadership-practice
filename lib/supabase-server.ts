import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseServerState = {
  configured: boolean;
  client: SupabaseClient | null;
  reason?: string;
};

export function getSupabaseServerState(): SupabaseServerState {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      configured: false,
      client: null,
      reason: "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
    };
  }

  return { configured: true, client: createClient(url, key) };
}
