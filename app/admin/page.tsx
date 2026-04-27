'use client'

import { useMemo } from 'react'
import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

export default function AdminPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()

  const metrics = useMemo(() => {
    const totalReps = snapshots.length

    const highRisk = snapshots.filter(
      s => (s.profile as any)?.riskLevel === 'high'
    ).length

    const moderateRisk = snapshots.filter(
      s => (s.profile as any)?.riskLevel === 'moderate'
    ).length

    const domains = snapshots.reduce((acc: Record<string, number>, s) => {
      acc[s.domain] = (acc[s.domain] ?? 0) + 1
      return acc
    }, {})

    const topDomain =
      Object.entries(domains).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A'

    return {
      totalReps,
      highRisk,
      moderateRisk,
      topDomain
    }
  }, [snapshots])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">

        <section className="rounded-3xl bg-slate-900 px-4 py-6 sm:p-8 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-200">
            District Leadership Command Center
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">
            Leadership Pipeline Intelligence
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Monitor leadership readiness, behavioral risks, and coaching priorities across your leadership pipeline.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Total Simulation Reps" value={metrics.totalReps} />
          <MetricCard label="High Risk Behaviors" value={metrics.highRisk} />
          <MetricCard label="Moderate Risk Behaviors" value={metrics.moderateRisk} />
          <MetricCard label="Most Practiced Domain" value={metrics.topDomain} />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why this matters
          </h2>

          <div className="mt-4 space-y-3 text-slate-700">
            <p>
              Districts typically promote leaders based on interviews and tenure.
            </p>

            <p>
              LeadSharper creates observable behavioral leadership data before high-stakes hiring decisions are made.
            </p>
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
  value: string | number
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

