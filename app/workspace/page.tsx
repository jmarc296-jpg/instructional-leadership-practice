import Link from "next/link";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { workspaceSummary } from "@/lib/workspace-mock";

const operatingLoop = [
  { step: "1. Triage leadership signals", status: "In progress", cta: "Prioritize this week's signals", href: "/workspace/signals", note: "Confirm which schools require cabinet-level attention this week." },
  { step: "2. Assign and launch execution plans", status: "Required", cta: "Assign owners and due dates", href: "/workspace/actions", note: "Every priority signal must move into an owned action plan." },
  { step: "3. Validate implementation evidence", status: "Required", cta: "Review missing evidence", href: "/workspace/evidence", note: "Hold supervisors and school leaders accountable for proof of follow-through." },
  { step: "4. Publish cabinet decision brief", status: "Pending", cta: "Finalize executive summary", href: "/workspace/reports", note: "Summarize progress, risks, and decisions needed for cabinet review." }
];

export default function WorkspacePage() {
  return (
    <WorkspaceShell title="District Weekly Operating System" subtitle="Use this sequence each week to move from signal review to cabinet decisions.">
      <section className="rounded-3xl border-2 border-[#0D6EFD] bg-[#EEF5FF] p-6">
        <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Weekly Leadership Operating Loop</h2><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D6EFD]">Required weekly sequence</span></div>
        <div className="mt-4 space-y-3">{operatingLoop.map((item) => <article key={item.step} className="rounded-2xl border border-[#C9DBFA] bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-[#36558f]">{item.step}</p><p className="mt-1 text-xs text-[#36558f]">Current status: <span className="font-semibold text-[#071B4D]">{item.status}</span></p><p className="mt-1 text-sm text-[#29447D]">{item.note}</p></div><Link href={item.href} className="rounded-xl bg-[#0D6EFD] px-4 py-2 text-sm font-semibold text-white">{item.cta}</Link></div></article>)}</div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[["Signals under review", workspaceSummary.activeSignals],["Schools needing intensive support", workspaceSummary.highRiskSchools],["Open execution plans", workspaceSummary.openActionPlans],["Evidence items due this week", workspaceSummary.evidenceDueThisWeek],["Cabinet briefs ready", workspaceSummary.reportsReady]].map(([label, value]) => <article key={String(label)} className="rounded-2xl border border-[#D8E3F7] bg-white p-4"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#36558f]">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></article>)}
      </section>
    </WorkspaceShell>
  );
}
