import { demoExecutiveSummary } from "@/lib/demo/execution-demo-data"

export default function DemoExecutiveSummary() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Executive Summary</p>
      <h2 className="mt-2 text-2xl font-bold text-gray-950">{demoExecutiveSummary.headline}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">Risk</p>
          <p className="mt-1 text-sm text-red-950">{demoExecutiveSummary.risk}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-700">Action</p>
          <p className="mt-1 text-sm text-amber-950">{demoExecutiveSummary.action}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">Outcome</p>
          <p className="mt-1 text-sm text-emerald-950">{demoExecutiveSummary.outcome}</p>
        </div>
      </div>
    </section>
  )
}
