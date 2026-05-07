import { NextResponse } from "next/server";
import { getSupabaseServerState } from "@/lib/supabase-server";
import { resolveDistrictId } from "@/lib/district-context";
import { recentEvidence } from "@/lib/workspace-mock";
import { WorkspaceEvidenceCreateInput, WorkspaceEvidenceRecord } from "@/lib/workspace-types";
import { normalizeEvidenceType, normalizeRole } from "@/lib/workspace-standards";

function mapMockEvidence(): WorkspaceEvidenceRecord[] {
  return recentEvidence.map((e) => ({
    id: e.id,
    action_id: e.actionId,
    signal_id: null,
    school: e.school,
    evidence_type: e.category,
    evidence_summary: `${e.category} submitted`,
    submitted_by: e.submittedBy,
    submitted_by_role: "district",
    created_at: e.submittedAt,
    updated_at: e.submittedAt
  }));
}

function validatePayload(payload: unknown): { ok: true; value: WorkspaceEvidenceCreateInput } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") return { ok: false, error: "Request body must be a JSON object." };
  const body = payload as Partial<WorkspaceEvidenceCreateInput>;
  if (!body.action_id?.trim()) return { ok: false, error: "Action ID is required before evidence can be submitted." };
  if (!body.school?.trim()) return { ok: false, error: "School is required." };
  if (!body.evidence_type?.trim()) return { ok: false, error: "Evidence type is required." };
  if (!normalizeEvidenceType(body.evidence_type)) return { ok: false, error: "Invalid evidence type." };
  if (!body.evidence_summary?.trim()) return { ok: false, error: "Evidence summary is required." };
  if (!body.submitted_by?.trim()) return { ok: false, error: "Submitted by is required." };
  return { ok: true, value: body as WorkspaceEvidenceCreateInput };
}

export async function GET(request: Request) {
  const districtId = resolveDistrictId(request);
  const supabaseState = getSupabaseServerState();
  const mock = mapMockEvidence();
  if (!supabaseState.configured || !supabaseState.client) return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId, evidence: mock });

  const { data, error } = await supabaseState.client
    .from("leadership_evidence")
    .select("id, action_id, signal_id, school, evidence_type, evidence_summary, submitted_by, submitted_by_role, created_at, updated_at")
    .eq("district_id", districtId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[workspace-evidence][GET] Supabase error", error);
    return NextResponse.json({ ok: true, source: "mock", error: error.message, evidence: mock });
  }

  return NextResponse.json({ ok: true, source: "supabase", evidence: (data ?? []) as WorkspaceEvidenceRecord[] });
}

export async function POST(request: Request) {
  const districtId = resolveDistrictId(request);
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }
  const parsed = validatePayload(raw);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const payload = parsed.value;

  const supabaseState = getSupabaseServerState();
  if (!supabaseState.configured || !supabaseState.client) {
    return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId, evidence: { id: `mock-${Date.now()}`, ...payload, created_at: new Date().toISOString() } }, { status: 201 });
  }

  const { data, error } = await supabaseState.client
    .from("leadership_evidence")
    .insert({
      district_id: payload.district_id ?? districtId,
      action_id: payload.action_id,
      signal_id: payload.signal_id ?? null,
      school: payload.school,
      evidence_type: normalizeEvidenceType(payload.evidence_type) ?? "other",
      evidence_summary: payload.evidence_summary,
      submitted_by: payload.submitted_by,
      submitted_by_role: normalizeRole(payload.submitted_by_role) ?? null
    })
    .select("id, action_id, signal_id, school, evidence_type, evidence_summary, submitted_by, submitted_by_role, created_at, updated_at")
    .single();

  if (error) {
    console.error("[workspace-evidence][POST] Supabase error", error);
    return NextResponse.json({ ok: false, error: `Could not save evidence record: ${error.message}` }, { status: 500 });
  }
  return NextResponse.json({ ok: true, source: "supabase", evidence: data as WorkspaceEvidenceRecord }, { status: 201 });
}
