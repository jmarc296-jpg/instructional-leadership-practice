import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

type SignalRecord = {
  id: string;
  created_at: string;
  school_name: string | null;
  leader_name: string | null;
  indicator: string | null;
  severity: string | null;
  summary: string | null;
  owner: string | null;
  evidence_status: string | null;
};

export async function GET() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, source: "configuration-missing", signals: [], error: "Supabase is not configured." },
      { status: 200 }
    );
  }

  const { data, error } = await supabase
    .from("leadership_signals")
    .select("id, created_at, school_name, leader_name, indicator, severity, summary, owner, evidence_status")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, source: "supabase-error", signals: [], error: error.message },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, source: "supabase", signals: (data ?? []) as SignalRecord[] });
}
