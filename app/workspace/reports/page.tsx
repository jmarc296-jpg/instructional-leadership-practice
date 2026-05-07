"use client";

import { useEffect, useMemo, useState } from "react";
import { districtQueryParam } from "@/lib/district-context";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { signalRows } from "@/lib/workspace-mock";
import { normalizeRiskLevel } from "@/lib/workspace-risk";
import { WorkspaceActionRecord, WorkspaceEvidenceRecord, WorkspaceExecutiveRecord, WorkspaceSignalRecord } from "@/lib/workspace-types";
import { WorkflowHealthMetrics, computeWorkflowHealth } from "@/lib/workflow-health";

export default function WorkspaceReportsPage() {
  const [actions, setActions] = useState<WorkspaceActionRecord[]>([]);
  const [signals, setSignals] = useState<WorkspaceSignalRecord[]>([]);
  const [evidenceRows, setEvidenceRows] = useState<WorkspaceEvidenceRecord[]>([]);
  const [reports, setReports] = useState<WorkspaceExecutiveRecord[]>([]);
  const [reportingPeriod, setReportingPeriod] = useState(new Date().toISOString().slice(0, 10));
  const [workflowHealth, setWorkflowHealth] = useState<WorkflowHealthMetrics>({ signals_with_no_actions: 0, actions_without_evidence: 0, overdue_actions: 0, unlinked_actions: 0 });
  const [createdByRole, setCreatedByRole] = useState("district");
  const [error, setError] = useState<string | null>(null);

  async function loadReports() {
    const response = await fetch(`/api/workspace-reports?${districtQueryParam()}`, { cache: "no-store" });
    const json = await response.json();
    setReports(json.reports ?? []);
    if (json.workflow_health) setWorkflowHealth(json.workflow_health);
  }

  useEffect(() => {
    fetch(`/api/workspace-actions?${districtQueryParam()}`, { cache: "no-store" }).then((r) => r.json()).then((j) => {
      setActions((j.actions ?? []).map((a: Partial<WorkspaceActionRecord> & Record<string, unknown>) => ({ id: String(a.id), signal_id: typeof a.signal_id === "string" ? a.signal_id : null, school: String(a.school ?? ""), owner_role: String(a.owner_role ?? ""), action_description: String(a.action_description ?? ""), due_date: typeof a.due_date === "string" ? a.due_date : null, status: String(a.status ?? "Not Started"), required_evidence: typeof a.required_evidence === "string" ? a.required_evidence : null, evidence_notes: typeof a.evidence_notes === "string" ? a.evidence_notes : null }))); 
    });
    fetch(`/api/workspace-signals?${districtQueryParam()}`, { cache: "no-store" }).then((r) => r.json()).then((j) => setSignals(j.signals ?? []));
    fetch(`/api/workspace-evidence?${districtQueryParam()}`, { cache: "no-store" }).then((r) => r.json()).then((j) => setEvidenceRows(j.evidence ?? []));
    loadReports();
  }, []);



  useEffect(() => {
    setWorkflowHealth(computeWorkflowHealth(signals, actions, evidenceRows));
  }, [signals, actions, evidenceRows]);

  const counts = useMemo(() => {
    const activeSignals = signals.length ? signals : signalRows;
    const highRiskSignals = activeSignals.filter((s: any) => normalizeRiskLevel(s.severity) === "HIGH").length;
    const structuredEvidenceCount = evidenceRows.length;
    const fallbackEvidenceCount = actions.filter((a) => a.evidence_notes?.trim()).length;
    return {
      highRiskSignals,
      actionsLinkedToSignals: actions.filter((a) => Boolean(a.signal_id)).length,
      inProgress: actions.filter((a) => a.status === "In Progress").length,
      completedActions: actions.filter((a) => a.status === "Complete").length,
      evidenceSubmitted: structuredEvidenceCount || fallbackEvidenceCount,
      missingEvidence: actions.filter((a) => a.status === "Evidence Needed" || (!evidenceRows.length && !a.evidence_notes?.trim())).length
    };
  }, [actions, signals, evidenceRows]);

  const summaryText = `${counts.highRiskSignals} high-risk signals. ${counts.inProgress} actions in progress. ${counts.completedActions} completed actions. ${counts.evidenceSubmitted} evidence records submitted.`;

  async function saveSnapshot() {
    setError(null);
    const response = await fetch(`/api/workspace-reports?${districtQueryParam()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        report_title: "Weekly Cabinet Brief",
        reporting_period: reportingPeriod,
        high_risk_signals: counts.highRiskSignals,
        active_actions: counts.inProgress,
        completed_actions: counts.completedActions,
        evidence_submitted: counts.evidenceSubmitted,
        summary: summaryText,
        created_by_role: createdByRole
      })
    });
    const json = await response.json();
    if (!response.ok || !json.ok) {
      setError(json.error ?? "Could not save executive report snapshot.");
      return;
    }
    await loadReports();
  }

  return <WorkspaceShell title="Cabinet Brief Preview" subtitle="Concise weekly readout for superintendent and cabinet decision-making.">
    {error && <section className="rounded-2xl border border-[#F5C2C7] bg-[#FFF5F6] p-3 text-sm text-[#9D1C1C]">{error}</section>}
    <section className="rounded-3xl border border-[#D8E3F7] bg-white p-6"><h2 className="text-xl font-bold">Executive summary (draft)</h2><div className="mt-4 space-y-3 text-sm text-[#29447D]"><p><span className="font-semibold text-[#071B4D]">District signal update:</span> {counts.highRiskSignals} schools remain in the highest-support tier requiring cabinet oversight.</p><p><span className="font-semibold text-[#071B4D]">Signal-to-action conversion:</span> {counts.actionsLinkedToSignals} action plans are explicitly linked to a source signal.</p><p><span className="font-semibold text-[#071B4D]">Execution update:</span> {counts.inProgress} action plans are currently in progress.</p><p><span className="font-semibold text-[#071B4D]">Evidence submitted:</span> {counts.evidenceSubmitted} evidence records are available for review.</p><p><span className="font-semibold text-[#071B4D]">Evidence gap:</span> {counts.missingEvidence} plans are still missing sufficient evidence and require follow-up before Friday.</p><p><span className="font-semibold text-[#071B4D]">Workflow integrity:</span> {workflowHealth.signals_with_no_actions} signals without actions • {workflowHealth.actions_without_evidence} actions without evidence • {workflowHealth.unlinked_actions} actions not linked to signals.</p></div><div className="mt-4 grid gap-2 md:grid-cols-3"><input type="date" value={reportingPeriod} onChange={(e) => setReportingPeriod(e.target.value)} className="rounded-lg border border-[#D8E3F7] p-2 text-sm" /><select value={createdByRole} onChange={(e) => setCreatedByRole(e.target.value)} className="rounded-lg border border-[#D8E3F7] p-2 text-sm md:col-span-2"><option value="district">District</option><option value="principal">Principal</option><option value="coach">Coach</option><option value="teacher">Teacher</option></select></div><button onClick={saveSnapshot} className="mt-3 rounded-lg bg-[#0D6EFD] px-3 py-2 text-xs font-semibold text-white">Save report snapshot</button></section>
    <section className="rounded-3xl border border-[#D8E3F7] bg-white p-6"><h3 className="text-lg font-bold">Saved executive reports</h3><div className="mt-3 space-y-2">{reports.map((r) => <div key={r.id} className="rounded-xl border border-[#D8E3F7] p-3 text-sm"><p className="font-semibold">{r.report_title} • {r.reporting_period}</p><p>{r.summary}</p><p>Created by role: {r.created_by_role ?? "Not provided"}</p></div>)}</div></section>
  </WorkspaceShell>;
}
