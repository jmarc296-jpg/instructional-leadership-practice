"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { districtQueryParam } from "@/lib/district-context";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { actionRows, signalRows } from "@/lib/workspace-mock";
import { WorkspaceActionRecord } from "@/lib/workspace-types";

type WorkspaceActionView = WorkspaceActionRecord;

export default function WorkspaceActionsPage() {
  const [context, setContext] = useState<{ signalId: string | null; school: string | null; mode: string | null }>({ signalId: null, school: null, mode: null });
  const [actions, setActions] = useState<WorkspaceActionView[]>([]);
  const [source, setSource] = useState<"supabase" | "mock">("mock");
  const [form, setForm] = useState({ owner_role: "Principal Supervisor", action_description: "", due_date: "", required_evidence: "" });

  async function loadActions() {
    const res = await fetch(`/api/workspace-actions?${districtQueryParam()}`, { cache: "no-store" });
    const json = await res.json();
    setSource(json.source === "supabase" ? "supabase" : "mock");
    setActions((json.actions ?? []).map((a: Partial<WorkspaceActionView> & Record<string, unknown>) => ({
      id: String(a.id), signal_id: typeof a.signal_id === "string" ? a.signal_id : null, school: String(a.school ?? a.school_name ?? ""), owner_role: String(a.owner_role ?? a.owner ?? ""), action_description: String(a.action_description ?? a.supportMove ?? ""), due_date: typeof a.due_date === "string" ? a.due_date : null, status: String(a.status ?? "Not Started"), required_evidence: typeof a.required_evidence === "string" ? a.required_evidence : null, evidence_notes: typeof a.evidence_notes === "string" ? a.evidence_notes : null
    })));
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const signalId = params.get("signalId");
    const school = params.get("school");
    setContext({ signalId, school, mode: params.get("mode") });
    const sig = signalRows.find((s) => s.id === signalId);
    if (sig) setForm((prev) => ({ ...prev, action_description: sig.recommendedSupport, required_evidence: "Leader-facing artifact and implementation check", due_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10) }));
    loadActions();
  }, []);

  const rows = useMemo(() => actions.length ? actions : actionRows.map((a) => ({ id: a.id, signal_id: null, school: a.school, owner_role: a.owner, action_description: a.supportMove, due_date: a.dueDate, status: a.status, required_evidence: a.evidenceRequirement, evidence_notes: null })), [actions]);

  async function createAction() {
    if (!context.school || !form.action_description || !form.due_date) return;
    await fetch(`/api/workspace-actions?${districtQueryParam()}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ signal_id: context.signalId, school: context.school, owner_role: form.owner_role, action_description: form.action_description, due_date: form.due_date, status: "Not Started", required_evidence: form.required_evidence }) });
    await loadActions();
  }

  async function updateAction(id: string, patch: { status?: string; evidence_notes?: string }) {
    setActions((prev) => prev.map((a) => a.id === id ? { ...a, ...patch } : a));
    await fetch(`/api/workspace-actions?${districtQueryParam()}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
  }

  return <WorkspaceShell title="Execution Plans" subtitle="Move each priority signal into a plan with clear ownership, timeline, and evidence requirements.">
    {context.signalId && <section className="rounded-2xl border border-[#C9DBFA] bg-[#EEF5FF] p-4 space-y-3"><p className="text-sm font-semibold">Signal in focus: {context.signalId} {context.school ? `• ${context.school}` : ""}</p><div className="grid gap-2 md:grid-cols-2"><input value={form.owner_role} onChange={(e) => setForm((p) => ({ ...p, owner_role: e.target.value }))} className="rounded-xl border border-[#D8E3F7] p-2 text-sm" placeholder="Owner role" /><input type="date" value={form.due_date} onChange={(e) => setForm((p) => ({ ...p, due_date: e.target.value }))} className="rounded-xl border border-[#D8E3F7] p-2 text-sm" /></div><input value={form.action_description} onChange={(e) => setForm((p) => ({ ...p, action_description: e.target.value }))} className="w-full rounded-xl border border-[#D8E3F7] p-2 text-sm" placeholder="Action description" /><input value={form.required_evidence} onChange={(e) => setForm((p) => ({ ...p, required_evidence: e.target.value }))} className="w-full rounded-xl border border-[#D8E3F7] p-2 text-sm" placeholder="Required evidence" /><button onClick={createAction} className="rounded-xl bg-[#0D6EFD] px-4 py-2 text-sm font-semibold text-white">Confirm and save action plan</button></section>}
    <p className="text-xs text-[#36558f]">Data source: {source === "supabase" ? "Supabase leadership_actions" : "Mock fallback (Supabase unavailable)"}</p>
    <section className="space-y-4">{rows.map((r) => <article key={r.id} className="rounded-3xl border border-[#D8E3F7] bg-white p-5"><div className="flex items-center justify-between"><div><p className="text-lg font-bold">{r.school}</p><p className="text-sm text-[#36558f]">Source signal: {r.signal_id ?? "Not linked"}</p><p className="text-sm text-[#36558f]">Owner role: {r.owner_role}</p><p className="text-sm text-[#36558f]">Support move: {r.action_description}</p><p className="text-sm text-[#36558f]">Due date: {r.due_date ?? "Not set"}</p><p className="text-sm text-[#36558f]">Required evidence: {r.required_evidence ?? "Not specified"}</p></div><span className="rounded-full border border-[#D8E3F7] px-3 py-1 text-xs font-semibold">{r.status}</span></div><textarea value={r.evidence_notes ?? ""} onChange={(e) => updateAction(r.id, { evidence_notes: e.target.value })} className="mt-3 w-full rounded-xl border border-[#D8E3F7] p-3 text-sm" placeholder="Evidence notes" /><div className="mt-3 flex gap-2"><button onClick={() => updateAction(r.id, { status: "In Progress" })} className="rounded-xl border border-[#D8E3F7] px-3 py-2 text-xs font-semibold">Mark plan in progress</button><button onClick={() => updateAction(r.id, { status: "Evidence Needed" })} className="rounded-xl border border-[#D8E3F7] px-3 py-2 text-xs font-semibold">Flag evidence needed</button><button onClick={() => updateAction(r.id, { status: "Complete" })} className="rounded-xl bg-[#0D6EFD] px-3 py-2 text-xs font-semibold text-white">Mark plan complete</button></div></article>)}</section>
    <div className="rounded-2xl border border-[#D8E3F7] bg-white p-4 text-sm">Next required step: <Link href="/workspace/evidence" className="font-semibold text-[#0D6EFD]">Complete evidence review before publishing cabinet brief</Link></div>
  </WorkspaceShell>;
}
