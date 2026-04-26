'use client'

import { getPlatformIntelligence } from '@/lib/platform-intelligence'

export default function ReportsPage() {
  const intelligence = getPlatformIntelligence()

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-200">
            Superintendent Report
          </div>

          <h1 className="mt-3 text-4xl font-semibold">
            Leadership Pipeline Readiness Summary
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Board-ready summary generated from live leadership simulation intelligence.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Total Reps" value={intelligence.totalReps} />
          <MetricCard label="Readiness" value={`${intelligence.overallReadiness}%`} />
          <MetricCard label="Moderate Risk" value={intelligence.moderateRisk} />
          <MetricCard label="High Risk" value={intelligence.highRisk} />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Executive Summary
          </h2>

          <p className="mt-4 leading-7 text-slate-700">
            LeadSharper currently shows <strong>{intelligence.totalReps}</strong> completed intelligence reps with an overall readiness signal of <strong>{intelligence.overallReadiness}%</strong>. The current readiness label is <strong>{intelligence.readinessLabel}</strong>.
          </p>

          <p className="mt-4 leading-7 text-slate-700">
            Most urgent recurring risk: <strong>{intelligence.topRisk}</strong>.
          </p>
        </section>
      </div>
    </main>
  )
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </div>
  )
}
