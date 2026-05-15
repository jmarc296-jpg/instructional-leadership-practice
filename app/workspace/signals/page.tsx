"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { districtQueryParam } from "@/lib/district-context";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { signalRows } from "@/lib/workspace-mock";
import { WorkspaceSignalRecord } from "@/lib/workspace-types";
import InterpretationTransparency from "@/components/executive/InterpretationTransparency";
import { interpretLeadershipSignal } from "@/lib/interpretation/executive-interpretation";
import { calculateEscalationPressure } from "@/lib/interpretation/escalation-pressure";

export default function WorkspaceSignalsPage() {
  const [signals, setSignals] = useState<WorkspaceSignalRecord[]>([]);

  useEffect(() => {
    fetch(`/api/workspace-signals?${districtQueryParam()}`, { cache: "no-store" }).then((r) => r.json()).then((j) => {
      if (j.signals?.length) setSignals(j.signals);
    });
  }, []);

  const rows = signals.length
  ? signals
  : signalRows.map((s) => ({
      id: s.id,
      school_name: s.school,
      leader_name: s.leaderRole,
      indicator: s.source,
      severity: s.severity,
      summary: s.evidenceSummary,
      owner: null,
      evidence_status: "Not started"
    }));

const interpretedSignals = rows.map((row) => {
  const interpretation = interpretLeadershipSignal({
    summary: row.summary,
    indicator: row.indicator,
    severity: row.severity,
    school_name: row.school_name,
    leader_name: row.leader_name,
    recommended_action: row.owner,
  });

  const pressure = calculateEscalationPressure(
    interpretation,
    row.severity,
    row.evidence_status
  );

  return {
    row,
    interpretation,
    pressure,
  };
});

  return (
    <WorkspaceShell title="Leadership Signals Triage" subtitle="Review current school signals and convert each priority item into an owned plan.">
      <div className="flex items-center justify-between"><div className="flex gap-2">{["All", "High", "Medium", "Low"].map((f) => <button key={f} className="rounded-full border border-[#D8E3F7] bg-white px-3 py-1 text-xs font-semibold">{f}</button>)}</div><Link href="/workspace/actions" className="text-sm font-semibold text-[#0D6EFD]">Go to execution plans →</Link></div>
      <section className="rounded-3xl border border-[#D8E3F7] bg-white overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-[#F6F8FC]"><tr>{["School", "Leader Role", "Severity", "Signal Source", "Current Signal", "Recommended Support", "Next Move"].map((h) => <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr></thead><tbody>{rows.map((r) => <tr key={r.id} className="border-t border-[#D8E3F7]"><td className="px-3 py-2">{r.school_name}</td><td className="px-3 py-2">{r.leader_name}</td><td className="px-3 py-2">{r.severity}</td><td className="px-3 py-2">{r.indicator}</td><td className="px-3 py-2">{r.summary}</td><td className="px-3 py-2">{r.owner ?? "Assign owner in actions"}</td><td className="px-3 py-2"><div className="flex flex-col gap-2"><Link href={`/workspace/actions?signalId=${r.id}&school=${encodeURIComponent(r.school_name)}&mode=assign`} className="text-[#0D6EFD] font-semibold">Assign accountable owner</Link><Link href={`/workspace/actions?signalId=${r.id}&school=${encodeURIComponent(r.school_name)}&mode=create`} className="text-[#0D6EFD] font-semibold">Launch action plan</Link></div></td></tr>)}</tbody></table>
      </section>
    </WorkspaceShell>
  );
}


