'use client'

import { getPlatformIntelligence } from '@/lib/platform-intelligence'

export default function SuperintendentPage() {
  const intelligence = getPlatformIntelligence()

  const metrics = [
    { label: "Overall Readiness", value: `${intelligence.overallReadiness || 0}%` },
    { label: "Simulation Reps", value: `${intelligence.totalReps}` },
    { label: "High Risk Signals", value: `${intelligence.highRisk}` },
    { label: "Readiness Label", value: intelligence.readinessLabel }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Superintendent Intelligence Layer
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Live leadership pipeline intelligence.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            This view now pulls from completed simulation intelligence instead of static demo data.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <Metric key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Current Leadership Risk
          </h2>

          <p className="mt-4 text-xl font-semibold text-red-700">
            {intelligence.topRisk}
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            {intelligence.hasLiveData
              ? "LeadSharper is now translating simulation behavior into executive readiness signals."
              : "Complete and rate simulations to activate live superintendent intelligence."}
          </p>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-4xl font-bold text-blue-700">{value}</div>
    </div>
  )
}
