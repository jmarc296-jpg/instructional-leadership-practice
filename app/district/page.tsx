'use client'

import { getPlatformIntelligence } from '@/lib/platform-intelligence'

export default function DistrictPage() {
  const intelligence = getPlatformIntelligence()
  const strengths = [
    { label: "Instructional Leadership", value: "84%" },
    { label: "Data Meeting Facilitation", value: "79%" },
    { label: "Teacher Coaching", value: "76%" },
    { label: "School Culture Leadership", value: "73%" }
  ]

  const risks = [
    { label: "Avoiding difficult conversations", count: 31 },
    { label: "Weak instructional feedback", count: 24 },
    { label: "Poor delegation systems", count: 18 },
    { label: "Reactive decision-making", count: 15 }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-200">
            District Command Center
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            District Leadership Risk Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Identify future principal vacancies, weak internal pipelines, and coaching risks before hiring mistakes happen.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Overall Readiness" value={`${intelligence.overallReadiness || 0}%`} />
          <MetricCard label="Simulation Reps" value={`${intelligence.totalReps}`} />
          <MetricCard label="Moderate Risk" value={`${intelligence.moderateRisk}`} />
          <MetricCard label="High Risk" value={`${intelligence.highRisk}`} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Top Leadership Strengths
            </h2>

            <div className="mt-5 space-y-3">
              {strengths.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between rounded-2xl bg-slate-50 p-4"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="font-semibold text-green-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Recurring Leadership Risks
            </h2>

            <div className="mt-5 space-y-3">
              {risks.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between rounded-2xl bg-red-50 p-4"
                >
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="font-semibold text-red-700">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Estimated Financial Impact
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <ImpactCard label="Failed principal placement cost" value="$145K" />
            <ImpactCard label="Prevented turnover risk" value="$420K" />
            <ImpactCard label="Leadership vacancy savings" value="$310K" />
          </div>
        </section>
      </div>
    </main>
  )
}

function MetricCard({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-3xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  )
}

function ImpactCard({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-blue-700">{value}</div>
    </div>
  )
}


<section className="mt-8 rounded-3xl bg-green-50 p-8">
  <p className="text-sm tracking-[0.3em] text-green-700 uppercase mb-4">
    District ROI
  </p>

  <h2 className="text-3xl font-bold text-slate-900 mb-4">
    Failed principal placements are expensive.
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-2xl bg-white p-6">
      <p className="text-sm text-slate-500">Avg principal replacement cost</p>
      <p className="text-3xl font-bold">$75K+</p>
    </div>

    <div className="rounded-2xl bg-white p-6">
      <p className="text-sm text-slate-500">Leadership vacancies reduced</p>
      <p className="text-3xl font-bold">↓ 32%</p>
    </div>

    <div className="rounded-2xl bg-white p-6">
      <p className="text-sm text-slate-500">Coaching efficiency</p>
      <p className="text-3xl font-bold">↑ 41%</p>
    </div>
  </div>
</section>

