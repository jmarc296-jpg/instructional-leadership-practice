import { NextResponse } from "next/server";

import { getSupabaseServerState } from "@/lib/supabase-server";
import { resolveDistrictId } from "@/lib/district-context";
import { signalRows } from "@/lib/workspace-mock";
import { WorkspaceSignalRecord } from "@/lib/workspace-types";
import { normalizeRiskLevel } from "@/lib/workspace-standards";

function mapMockSignals(): WorkspaceSignalRecord[] {
  return signalRows.map((s) => ({
    id: s.id,
    school_name: s.school,
    leader_name: s.leaderRole,
    indicator: s.source,
    severity: normalizeRiskLevel(s.severity) ?? "MEDIUM",
    summary: s.evidenceSummary,
    owner: null,
    evidence_status: "Not started"
  }));
}

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const districtId = resolveDistrictId(request);
  const supabaseState = getSupabaseServerState();
  const mockSignals = mapMockSignals();

  if (!supabaseState.configured || !supabaseState.client) {
    return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId, signals: mockSignals });
  }

  const { data, error } = await supabaseState.client
    .from("leadership_signals")
    .select("id, created_at, school_name, leader_name, indicator, severity, summary, owner, evidence_status")
    .eq("district_id", districtId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[workspace-signals][GET] Supabase error", error);
    return NextResponse.json({ ok: true, source: "mock", error: error.message, signals: mockSignals });
  }

  return NextResponse.json({ ok: true, source: "supabase", signals: ((data ?? []) as WorkspaceSignalRecord[]).map((r) => ({ ...r, severity: normalizeRiskLevel(r.severity) ?? "MEDIUM" })) });
}



