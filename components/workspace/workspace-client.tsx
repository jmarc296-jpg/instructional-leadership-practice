"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EnterpriseShell } from "@/components/shell/enterprise-shell";
import {
  getWorkspaceAssignments,
  resolveAssignmentStatus,
  resolveAssignmentTiming,
  resolveModuleFromAssignment,
  updateWorkspaceAssignmentEvidence,
  updateWorkspaceAssignmentStatus,
  WorkspaceAssignment,
  workspaceModules,
  WorkspaceStatus,
  type AssignmentTiming
} from "@/lib/workspace-data";

const statusLabel: Record<WorkspaceStatus, string> = { assigned: "Assigned", in_progress: "In Progress", evidence_submitted: "Evidence Submitted", complete: "Complete" };
const starterAssignments: WorkspaceAssignment[] = [{ id: "assignment-1", title: "Complete DDI internalization review", module: "DDI Meeting Internalization", assignee: "A. Johnson", role: "Assistant Principal", dueDate: "2026-05-08", dueAt: new Date("2026-05-08T23:59:59Z").toISOString(), status: "in_progress", evidence: "Uploaded Unit 4 data analysis and reteach plan.", coachingNote: "Next step is tightening the misconception analysis before teacher facilitation.", createdAt: "2026-04-27T10:00:00.000Z", lastUpdatedAt: "2026-04-27T10:00:00.000Z" }];

const formatDateOnly = (value?: string) => { if (!value) return "Not available"; const parsed = new Date(value); return Number.isNaN(parsed.getTime()) ? "Not available" : parsed.toLocaleDateString(); };
const getTimingDetail = (assignment: WorkspaceAssignment) => { if (!assignment.dueAt) return "No due date set"; const dueTime = new Date(assignment.dueAt).getTime(); if (Number.isNaN(dueTime)) return "No due date set"; const daysDelta = Math.ceil((dueTime - Date.now()) / (24 * 60 * 60 * 1000)); return daysDelta < 0 ? `${Math.abs(daysDelta)} day${Math.abs(daysDelta) === 1 ? "" : "s"} overdue` : `${daysDelta} day${daysDelta === 1 ? "" : "s"} remaining`; };

export function WorkspaceClient() {
  const [assignments, setAssignments] = useState<WorkspaceAssignment[]>([]);
  const [title, setTitle] = useState("");
  const [module, setModule] = useState(workspaceModules[0]);
  const [assignee, setAssignee] = useState("");
  const [role, setRole] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [evidenceDraft, setEvidenceDraft] = useState("");
  const [followUpDraft, setFollowUpDraft] = useState("");

  const refreshAssignments = useCallback(() => {
    const list = getWorkspaceAssignments();
    if (list.length === 0 && typeof window !== "undefined") {
      window.localStorage.setItem("leadsharper-workspace-assignments", JSON.stringify(starterAssignments));
      setAssignments(starterAssignments);
      return;
    }
    setAssignments(list);
  }, []);

  useEffect(() => { refreshAssignments(); }, [refreshAssignments]);

  const selectedAssignment = assignments.find((item) => item.id === selectedId) ?? assignments[0];

  useEffect(() => {
    setEvidenceDraft(selectedAssignment?.evidenceNote ?? "");
    setFollowUpDraft(selectedAssignment?.followUpNote ?? "");
  }, [selectedAssignment?.id, selectedAssignment?.evidenceNote, selectedAssignment?.followUpNote]);

  const metrics = useMemo(() => ({
    total: assignments.length,
    complete: assignments.filter((item) => resolveAssignmentStatus(item) === "complete").length,
    evidence: assignments.filter((item) => Boolean(item.evidenceNote?.trim())).length,
    overdue: assignments.filter((item) => resolveAssignmentTiming(item) === "overdue" && resolveAssignmentStatus(item) !== "complete").length
  }), [assignments]);

  function createAssignment() {
    if (!title.trim() || !assignee.trim() || !dueDate || typeof window === "undefined") return;
    const createdAt = new Date().toISOString();
    const nextAssignment: WorkspaceAssignment = { id: crypto.randomUUID(), title: title.trim(), module, assignee: assignee.trim(), role: role.trim() || "Leader", dueDate, dueAt: new Date(`${dueDate}T23:59:59`).toISOString(), status: "assigned", evidence: "", coachingNote: "", createdAt, lastUpdatedAt: createdAt, evidenceNote: "", followUpNote: "" };
    window.localStorage.setItem("leadsharper-workspace-assignments", JSON.stringify([nextAssignment, ...getWorkspaceAssignments()]));
    refreshAssignments();
    setSelectedId(nextAssignment.id); setTitle(""); setAssignee(""); setRole(""); setDueDate("");
  }

  return (
    <EnterpriseShell><main><section className="border-b border-black/10 bg-[#111827] text-white"><div className="mx-auto max-w-7xl px-6 py-8 lg:px-8"><div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">District Workspace</p><h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Manage leadership execution across the district pipeline.</h1></div><div className="grid grid-cols-4 gap-2 xl:w-[560px]"><Metric label="Active" value={metrics.total} /><Metric label="Done" value={metrics.complete} /><Metric label="Evidence" value={metrics.evidence} /><Metric label="Past due" value={metrics.overdue} /></div></div></div></section>
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-6 lg:grid-cols-[320px_1fr_390px] lg:px-8"><aside className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold tracking-[-0.02em]">Assign execution</h2><div className="mt-4 space-y-4"><Field label="Assignment title"><input value={title} onChange={(event) => setTitle(event.target.value)} className="input" /></Field><Field label="Module"><select value={module} onChange={(event) => setModule(event.target.value)} className="input">{workspaceModules.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Assigned leader"><input value={assignee} onChange={(event) => setAssignee(event.target.value)} className="input" /></Field><div className="grid grid-cols-2 gap-3"><Field label="Role"><input value={role} onChange={(event) => setRole(event.target.value)} className="input" /></Field><Field label="Due"><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="input" /></Field></div><button onClick={createAssignment} className="w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white">Create execution assignment</button></div></aside>
      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold tracking-[-0.02em]">Execution queue</h2><div className="mt-4 space-y-3">{assignments.map((assignment) => { const moduleDetails = resolveModuleFromAssignment(assignment); const status = resolveAssignmentStatus(assignment); const timing = resolveAssignmentTiming(assignment); return <button key={assignment.id} onClick={() => setSelectedId(assignment.id)} className="w-full rounded-3xl border border-black/10 bg-white p-4 text-left hover:bg-black/[0.03]"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{assignment.title}</p><p className="mt-1 text-sm font-semibold text-black/70">{moduleDetails.title}</p><p className="mt-1 text-xs text-black/55">{moduleDetails.leadershipFocus}</p><p className="mt-2 text-xs text-black/60">Due / Overdue: {formatDateOnly(assignment.dueAt)}</p></div><div className="flex flex-col items-end gap-2"><StatusBadge status={status} /><TimingBadge timing={timing} /></div></div><div className="mt-3 rounded-2xl border border-black/10 bg-white p-3 text-xs text-black/70"><p><b>Leader action:</b> {moduleDetails.leaderAction}</p><p className="mt-1"><b>Evidence required:</b> {moduleDetails.evidenceRequired}</p><p className="mt-1"><b>Suggested timeline:</b> {moduleDetails.suggestedTimeline}</p>{assignment.evidenceNote && <p className="mt-1"><b>Evidence Required:</b> {assignment.evidenceNote}</p>}{assignment.evidenceUpdatedAt && <p className="mt-1"><b>Last evidence update:</b> {new Date(assignment.evidenceUpdatedAt).toLocaleString()}</p>}</div></button>; })}</div></section>
      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">{selectedAssignment ? <div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/35">Execution record</p><Link href={`/leader-profile/${selectedAssignment.id}`} className="mt-2 block text-2xl font-semibold">{selectedAssignment.assignee}</Link><div className="mt-2 flex items-center gap-2"><StatusBadge status={resolveAssignmentStatus(selectedAssignment)} /><TimingBadge timing={resolveAssignmentTiming(selectedAssignment)} /></div><p className="mt-2 text-xs font-semibold text-black/60">Execution Status</p><div className="mt-3 rounded-2xl border border-black/10 bg-[#f7f5f0] p-3 text-sm text-black/75"><p><b>Created:</b> {formatDateOnly(selectedAssignment.createdAt)}</p><p><b>Due:</b> {formatDateOnly(selectedAssignment.dueAt)}</p><p><b>Due / Overdue:</b> {getTimingDetail(selectedAssignment)}</p></div><div className="mt-4 rounded-2xl border border-black/10 bg-[#f7f5f0] p-4 text-sm">{(() => { const moduleDetails = resolveModuleFromAssignment(selectedAssignment); return <><p className="font-semibold">{moduleDetails.title}</p><p className="mt-1 text-black/60">{moduleDetails.leadershipFocus}</p><p className="mt-1"><b>Evidence required:</b> {moduleDetails.evidenceRequired}</p><p className="mt-1"><b>Suggested timeline:</b> {moduleDetails.suggestedTimeline}</p></>; })()}</div><div className="mt-4 space-y-3"><Field label="Evidence Required"><textarea value={evidenceDraft} onChange={(event) => setEvidenceDraft(event.target.value)} className="input min-h-24 resize-none" /></Field><Field label="Follow-Up Notes"><textarea value={followUpDraft} onChange={(event) => setFollowUpDraft(event.target.value)} className="input min-h-20 resize-none" /></Field><div className="flex flex-wrap gap-2"><button onClick={() => { updateWorkspaceAssignmentEvidence(selectedAssignment.id, evidenceDraft, followUpDraft); refreshAssignments(); }} className="rounded-full border border-[#0D6EFD] px-4 py-2 text-xs font-semibold text-[#0D6EFD]">Save Evidence</button><button onClick={() => { updateWorkspaceAssignmentStatus(selectedAssignment.id, "in_progress"); refreshAssignments(); }} className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold">Mark In Progress</button><button onClick={() => { updateWorkspaceAssignmentStatus(selectedAssignment.id, "complete"); refreshAssignments(); }} className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold">Mark Complete</button></div></div></div> : null}</section></section></main></EnterpriseShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><p className="text-2xl font-semibold tracking-[-0.04em]">{value}</p><p className="mt-1 text-xs text-white/55">{label}</p></div>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-black/70">{label}</span>{children}</label>; }
function StatusBadge({ status }: { status: WorkspaceStatus }) { return <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70">{statusLabel[status]}</span>; }
function TimingBadge({ timing }: { timing: AssignmentTiming }) { const style = timing === "overdue" ? "border-red-200 bg-red-50 text-red-700" : timing === "due_soon" ? "border-orange-200 bg-orange-50 text-orange-700" : "border-black/10 bg-white text-black/70"; const label = timing === "overdue" ? "Overdue" : timing === "due_soon" ? "Due soon" : "On track"; return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>{label}</span>; }
