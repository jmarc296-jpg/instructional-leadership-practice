import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

type CapturePayload = {
  school_name?: string;
  leader_name?: string;
  indicator?: string;
  severity?: string;
  summary?: string;
  owner?: string;
  evidence_status?: string;
};

const allowedSeverity = new Set(["high", "medium", "low"]);

export async function POST(request: Request) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase is not configured." }, { status: 500 });
  }

  let payload: CapturePayload;
  try {
    payload = (await request.json()) as CapturePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const school_name = payload.school_name?.trim();
  const leader_name = payload.leader_name?.trim();
  const indicator = payload.indicator?.trim();
  const severity = payload.severity?.trim().toLowerCase();
  const summary = payload.summary?.trim();
  const owner = payload.owner?.trim() || null;
  const evidence_status = payload.evidence_status?.trim() || "Not started";

  if (!school_name || !leader_name || !indicator || !severity || !summary) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: school_name, leader_name, indicator, severity, summary." },
      { status: 400 }
    );
  }

  if (!allowedSeverity.has(severity)) {
    return NextResponse.json({ ok: false, error: "Severity must be High, Medium, or Low." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leadership_signals")
    .insert({ school_name, leader_name, indicator, severity, summary, owner, evidence_status })
    .select("id, created_at, school_name, leader_name, indicator, severity, summary, owner, evidence_status")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, signal: data }, { status: 201 });
}
