import { NextResponse } from "next/server";
import { getSupabaseServerState } from "@/lib/supabase-server";
import { resolveDistrictId } from "@/lib/district-context";
import { actionRows } from "@/lib/workspace-mock";
import { WorkspaceActionCreateInput, WorkspaceActionPatchInput, WorkspaceActionRecord } from "@/lib/workspace-types";
import { normalizeActionStatus, normalizeRole } from "@/lib/workspace-standards";

const isDev = process.env.NODE_ENV !== "production";

function formatSchemaError(context: string, message: string) {
  return isDev ? `${context}: ${message}` : `${context}. Verify Supabase schema alignment.`;
}

function validateCreatePayload(payload: unknown): { ok: true; value: WorkspaceActionCreateInput } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") return { ok: false, error: "Request body must be a JSON object." };
  const body = payload as Partial<WorkspaceActionCreateInput>;
  if (!body.school?.trim()) return { ok: false, error: "school is required." };
  if (!body.owner_role?.trim()) return { ok: false, error: "owner_role is required." };
  if (!body.action_description?.trim()) return { ok: false, error: "action_description is required." };
  return { ok: true, value: { ...body, school: body.school.trim(), owner_role: body.owner_role.trim(), action_description: body.action_description.trim() } as WorkspaceActionCreateInput };
}

function validatePatchPayload(payload: unknown): { ok: true; value: WorkspaceActionPatchInput } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") return { ok: false, error: "Request body must be a JSON object." };
  const body = payload as Partial<WorkspaceActionPatchInput>;
  if (!body.id || typeof body.id !== "string") return { ok: false, error: "id is required." };
  if (body.status === undefined && body.evidence_notes === undefined) return { ok: false, error: "At least one field (status or evidence_notes) must be provided." };
  return { ok: true, value: body as WorkspaceActionPatchInput };
}

export async function GET(request: Request) {
  const districtId = resolveDistrictId(request);
  const supabaseState = getSupabaseServerState();
  if (!supabaseState.configured || !supabaseState.client) {
    return NextResponse.json({ ok: true, source: "mock", actions: actionRows, reason: supabaseState.reason });
  }
  const supabase = supabaseState.client;

  const { data, error } = await supabase
    .from("leadership_actions")
    .select("id, signal_id, school, owner_role, action_description, due_date, status, required_evidence, evidence_notes, created_at, updated_at, created_by_role")
    .eq("district_id", districtId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[workspace-actions][GET] Supabase error", error);
    return NextResponse.json({ ok: true, source: "mock", actions: actionRows, error: formatSchemaError("Could not load leadership_actions", error.message) });
  }
  return NextResponse.json({ ok: true, source: "supabase", actions: (data ?? []) as WorkspaceActionRecord[] });
}

export async function POST(request: Request) {
  const districtId = resolveDistrictId(request);
  const supabaseState = getSupabaseServerState();
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }

  const parsed = validateCreatePayload(raw);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const payload = parsed.value;

  const warning = payload.signal_id ? null : "Action created without signal_id linkage. Add signal linkage to improve workflow integrity.";

  if (!supabaseState.configured || !supabaseState.client) {
    return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId, warning, action: { id: `mock-${Date.now()}`, ...payload, status: payload.status ?? "Not Started" } }, { status: 201 });
  }
  const supabase = supabaseState.client;

  const { data, error } = await supabase
    .from("leadership_actions")
    .insert({
      district_id: payload.district_id ?? districtId,
      signal_id: payload.signal_id ?? null,
      school: payload.school,
      owner_role: payload.owner_role,
      action_description: payload.action_description,
      due_date: payload.due_date ?? null,
      status: normalizeActionStatus(payload.status) ?? "Not Started",
      required_evidence: payload.required_evidence ?? null,
      evidence_notes: payload.evidence_notes ?? null,
      created_by_role: normalizeRole(payload.created_by_role) ?? null
    })
    .select("id, signal_id, school, owner_role, action_description, due_date, status, required_evidence, evidence_notes, created_at, updated_at, created_by_role")
    .single();

  if (error) {
    console.error("[workspace-actions][POST] Supabase error", error);
    return NextResponse.json({ ok: false, error: formatSchemaError("Could not save action", error.message) }, { status: 500 });
  }
  return NextResponse.json({ ok: true, source: "supabase", warning, action: data as WorkspaceActionRecord }, { status: 201 });
}

export async function PATCH(request: Request) {
  const districtId = resolveDistrictId(request);
  const supabaseState = getSupabaseServerState();
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }

  const parsed = validatePatchPayload(raw);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const body = parsed.value;

  if (!supabaseState.configured || !supabaseState.client) return NextResponse.json({ ok: true, source: "mock", reason: supabaseState.reason, district_id: districtId });
  const supabase = supabaseState.client;

  const updates: Record<string, string> = { updated_at: new Date().toISOString() };
  if (typeof body.status === "string") {
    const normalizedStatus = normalizeActionStatus(body.status);
    if (!normalizedStatus) return NextResponse.json({ ok: false, error: "Invalid status. Use Not Started, In Progress, Evidence Needed, or Complete." }, { status: 400 });
    updates.status = normalizedStatus;
  }
  if (typeof body.evidence_notes === "string") updates.evidence_notes = body.evidence_notes;

  const { data, error } = await supabase
    .from("leadership_actions")
    .update(updates)
     .eq("id", body.id)
    .eq("district_id", districtId)
    .select("id, signal_id, school, owner_role, action_description, due_date, status, required_evidence, evidence_notes, created_at, updated_at, created_by_role")
    .single();

  if (error) {
    console.error("[workspace-actions][PATCH] Supabase error", error);
    return NextResponse.json({ ok: false, error: formatSchemaError("Could not update action", error.message) }, { status: 500 });
  }
  return NextResponse.json({ ok: true, source: "supabase", action: data as WorkspaceActionRecord });
}
