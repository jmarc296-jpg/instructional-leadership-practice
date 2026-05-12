"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { districtQueryParam } from "@/lib/district-context";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { actionRows } from "@/lib/workspace-mock";
import { WorkspaceActionRecord, WorkspaceEvidenceRecord } from "@/lib/workspace-types";

export default function WorkspaceEvidencePage() {
  const [actions, setActions] = useState<WorkspaceActionRecord[]>([]);
  const [evidenceRows, setEvidenceRows] = useState<WorkspaceEvidenceRecord[]>([]);
  const [drafts, setDrafts] = useState<Record<string, { evidence_type: string; evidence_summary: string; submitted_by: string; submitted_by_role: string }>>({});
  const [error, setError] = useState<string | null>(null);

  async function loadEvidence() {
    const response = await fetch(`/api/workspace-evidence?${districtQueryParam()}`, { cache: "no-store" });
    const json = await response.json();
    setEvidenceRows(json.evidence ?? []);
  }

  useEffect(() => {
    fetch(`/api/workspace-actions?${districtQueryParam()}`, { cache: "no-store" }).then((r) => r.json()).then((j) => {
      if (j.actions?.length) setActions(j.actions.map((a: Partial<WorkspaceActionRecord> & Record<string, unknown>) => ({ id: String(a.id), signal_id: typeof a.signal_id === "string" ? a.signal_id : null, school: String(a.school ?? a.school_name), owner_role: String(a.owner_role ?? a.owner), action_description: String(a.action_description ?? a.supportMove), due_date: typeof a.due_date === "string" ? a.due_date : null, status: String(a.status ?? "Not Started"), required_evidence: typeof a.required_evidence === "string" ? a.required_evidence : null, evidence_notes: typeof a.evidence_notes === "string" ? a.evidence_notes : null })));
    });
    loadEvidence();
  }, []);

  const rows = actions.length ? actions : actionRows.map((a) => ({ id: a.id, signal_id: null, school: a.school, owner_role: a.owner, action_description: a.supportMove, due_date: a.dueDate, status: a.status, required_evidence: a.evidenceRequirement, evidence_notes: null }));
  const missingEvidence = rows.filter((a) => !evidenceRows.some((e) => e.action_id === a.id) && a.status !== "Complete");
  const submittedEvidence = useMemo(() => evidenceRows.length ? evidenceRows : rows.filter((a) => a.evidence_notes?.trim()).map((a) => ({ id: `derived-${a.id}`, action_id: a.id, signal_id: a.signal_id, school: a.school, evidence_type: "Action evidence note", evidence_summary: a.evidence_notes ?? "", submitted_by: "Workspace user", submitted_by_role: null })), [evidenceRows, rows]);

  async function submitEvidence(action: WorkspaceActionRecord) {
    setError(null);
    const draft = drafts[action.id] ?? { evidence_type: "", evidence_summary: "", submitted_by: "", submitted_by_role: "district" };
    const response = await fetch(`/api/workspace-evidence?${districtQueryParam()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action_id: action.id,
        signal_id: action.signal_id,
        school: action.school,
        evidence_type: draft.evidence_type,
        evidence_summary: draft.evidence_summary,
        submitted_by: draft.submitted_by,
        submitted_by_role: draft.submitted_by_role
      })
    });
    const json = await response.json();
    if (!response.ok || !json.ok) {
      setError(json.error ?? "Could not submit evidence. Please verify required fields and try again.");
      return;
    }
    setDrafts((prev) => ({ ...prev, [action.id]: { evidence_type: "", evidence_summary: "", submitted_by: "", submitted_by_role: "district" } }));
    await loadEvidence();
  }

  return <WorkspaceShell title="Evidence Review" subtitle="Confirm each execution plan has timely, credible proof before cabinet reporting.">
    {error && <section className="rounded-2xl border border-[#F5C2C7] bg-[#FFF5F6] p-3 text-sm text-[#9D1C1C]">{error}</section>}
    <section className="rounded-3xl border border-[#D8E3F7] bg-white p-5"><h2 className="text-lg font-bold">Immediate follow-up: plans missing evidence</h2><div className="mt-3 space-y-4">{missingEvidence.map((a) => <div key={a.id} className="rounded-xl border border-[#F5C2C7] bg-[#FFF5F6] p-3 text-sm"><p className="font-semibold">{a.school}</p><p>Linked signal: {a.signal_id ?? "Not linked"}</p><p>Action plan: {a.action_description}</p><p>Accountable role: {a.owner_role}</p><p>Evidence due: {a.due_date}</p><div className="mt-3 grid gap-2 md:grid-cols-3"><select value={drafts[a.id]?.evidence_type ?? "walkthrough"} onChange={(e) => setDrafts((prev) => ({ ...prev, [a.id]: { ...prev[a.id], evidence_type: e.target.value } }))} className="rounded-lg border border-[#D8E3F7] bg-white p-2"><option value="walkthrough">Walkthrough</option><option value="student_work">Student Work</option><option value="assessment_data">Assessment Data</option><option value="observation">Observation</option><option value="other">Other</option></select><input value={drafts[a.id]?.submitted_by ?? ""} onChange={(e) => setDrafts((prev) => ({ ...prev, [a.id]: { ...prev[a.id], submitted_by: e.target.value } }))} placeholder="Submitted by" className="rounded-lg border border-[#D8E3F7] bg-white p-2" /><select value={drafts[a.id]?.submitted_by_role ?? "district"} onChange={(e) => setDrafts((prev) => ({ ...prev, [a.id]: { ...prev[a.id], submitted_by_role: e.target.value } }))} className="rounded-lg border border-[#D8E3F7] bg-white p-2"><option value="district">District</option><option value="principal">Principal</option><option value="coach">Coach</option><option value="teacher">Teacher</option></select><input value={drafts[a.id]?.evidence_summary ?? ""} onChange={(e) => setDrafts((prev) => ({ ...prev, [a.id]: { ...prev[a.id], evidence_summary: e.target.value } }))} placeholder="Evidence summary" className="rounded-lg border border-[#D8E3F7] bg-white p-2 md:col-span-3" /></div><button onClick={() => submitEvidence(a)} className="mt-3 rounded-lg bg-[#0D6EFD] px-3 py-2 text-xs font-semibold text-white">Submit evidence record</button></div>)}</div></section>
    <section className="rounded-3xl border border-[#D8E3F7] bg-white p-5"><h2 className="text-lg font-bold">Evidence submitted this cycle</h2><div className="mt-3 space-y-2">{submittedEvidence.map((e) => <div key={e.id} className="rounded-xl border border-[#D8E3F7] p-3 text-sm"><p className="font-semibold">{e.school}</p><p>Linked signal: {e.signal_id ?? "Not linked"}</p><p>Linked action: {e.action_id}</p><p>{e.evidence_type} • {e.evidence_summary}</p><p>Submitted by: {e.submitted_by}{e.submitted_by_role ? ` (${e.submitted_by_role})` : ""}</p></div>)}</div></section>
    <div className="rounded-2xl border border-[#D8E3F7] bg-white p-4 text-sm">Next required step: <Link href="/workspace/reports" className="font-semibold text-[#0D6EFD]">Publish cabinet brief with updated evidence status</Link></div>
  </WorkspaceShell>;
}
