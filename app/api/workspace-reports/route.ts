import { NextResponse } from "next/server";
import { getSupabaseServerState } from "@/lib/supabase-server";
import { resolveDistrictId } from "@/lib/district-context";
import { WorkspaceActionRecord, WorkspaceEvidenceRecord, WorkspaceExecutiveRecord, WorkspaceExecutiveReportCreateInput, WorkspaceSignalRecord } from "@/lib/workspace-types";
import { computeWorkflowHealth } from "@/lib/workflow-health";
import { normalizeRole } from "@/lib/workspace-standards";

function mockRecords(): WorkspaceExecutiveRecord[] {
  return [{
    id: "mock-report-1",
    report_title: "Weekly Cabinet Brief",
    reporting_period: new Date().toISOString().slice(0, 10),
    high_risk_signals: 0,
    active_actions: 0,
    completed_actions: 0,
    evidence_submitted: 0,
    summary: "Mock report fallback generated because Supabase is not configured.",
    created_by_role: "district",
    created_at: new Date().toISOString()
  }];
}

function validate(payload: unknown): { ok: true; value: WorkspaceExecutiveReportCreateInput } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") return { ok: false, error: "Request body must be a JSON object." };
  const body = payload as Partial<WorkspaceExecutiveReportCreateInput>;
  if (!body.report_title?.trim()) return { ok: false, error: "report_title is required." };
  if (!body.reporting_period?.trim()) return { ok: false, error: "reporting_period is required." };
  if (typeof body.high_risk_signals !== "number") return { ok: false, error: "high_risk_signals must be a number." };
  if (typeof body.active_actions !== "number") return { ok: false, error: "active_actions must be a number." };
  if (typeof body.completed_actions !== "number") return { ok: false, error: "completed_actions must be a number." };
  if (typeof body.evidence_submitted !== "number") return { ok: false, error: "evidence_submitted must be a number." };
  if (!body.summary?.trim()) return { ok: false, error: "summary is required." };
  if (body.created_by_role && !normalizeRole(body.created_by_role)) return { ok: false, error: "Invalid created_by_role." };
  return { ok: true, value: { ...body, created_by_role: normalizeRole(body.created_by_role) ?? null } as WorkspaceExecutiveReportCreateInput };
}

export async function GET(request: Request) {
  const districtId = resolveDistrictId(request);
  const supabaseState = getSupabaseServerState();
  const mock = mockRecords();
  if (!supabaseState.configured || !supabaseState.client) return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId, reports: mock, workflow_health: computeWorkflowHealth([], [], []) });

  const supabase = supabaseState.client;

  const [reportsResult, signalsResult, actionsResult, evidenceResult] = await Promise.all([
    supabase
      .from("executive_records")
      .select("id, report_title, reporting_period, high_risk_signals, active_actions, completed_actions, evidence_submitted, summary, created_by_role, created_at")
      .eq("district_id", districtId)
      .order("created_at", { ascending: false }),
    supabase
      .from("leadership_signals")
      .select("id")
      .eq("district_id", districtId),
    supabase
      .from("leadership_actions")
      .select("id, signal_id, school, owner_role, action_description, due_date, status, required_evidence, evidence_notes")
      .eq("district_id", districtId),
    supabase
      .from("leadership_evidence")
      .select("id, action_id, signal_id, school, evidence_type, evidence_summary, submitted_by")
      .eq("district_id", districtId)
  ]);

  if (reportsResult.error) {
    console.error("[workspace-reports][GET] Supabase error", reportsResult.error);
    return NextResponse.json({ ok: true, source: "mock", error: reportsResult.error.message, reports: mock, workflow_health: computeWorkflowHealth([], [], []) });
  }

  const workflowHealth = computeWorkflowHealth(
    (signalsResult.data ?? []) as WorkspaceSignalRecord[],
    (actionsResult.data ?? []) as WorkspaceActionRecord[],
    (evidenceResult.data ?? []) as WorkspaceEvidenceRecord[]
  );

  return NextResponse.json({ ok: true, source: "supabase", reports: (reportsResult.data ?? []) as WorkspaceExecutiveRecord[], workflow_health: workflowHealth });
}

export async function POST(request: Request) {
  const districtId = resolveDistrictId(request);
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }
  const parsed = validate(raw);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const payload = parsed.value;

  const supabaseState = getSupabaseServerState();
  if (!supabaseState.configured || !supabaseState.client) {
    return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId, report: { id: `mock-${Date.now()}`, ...payload, created_at: new Date().toISOString() } }, { status: 201 });
  }

  const { data, error } = await supabaseState.client
    .from("executive_records")
    .insert({ ...payload, district_id: payload.district_id ?? districtId })
    .select("id, report_title, reporting_period, high_risk_signals, active_actions, completed_actions, evidence_submitted, summary, created_by_role, created_at")
    .single();

  if (error) {
    console.error("[workspace-reports][POST] Supabase error", error);
    return NextResponse.json({ ok: false, error: `Could not save executive report: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, source: "supabase", report: data as WorkspaceExecutiveRecord }, { status: 201 });
}
