'use client'

import { useMemo } from 'react'
import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

export default function ReportsPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()

  const report = useMemo(() => {
    const total = snapshots.length

    const highRisk = snapshots.filter(
      s => (s.profile as any)?.riskLevel === 'high'
    ).length

    const moderateRisk = snapshots.filter(
      s => (s.profile as any)?.riskLevel === 'moderate'
    ).length

    const lowRisk = snapshots.filter(
      s => (s.profile as any)?.riskLevel === 'low'
    ).length

    const risks = snapshots.reduce<Record<string, number>>((acc, s) => {
      const risk = (s.consequences as any)?.unresolvedRisk ?? 'Unknown'
      acc[risk] = (acc[risk] ?? 0) + 1
      return acc
    }, {})

    const topRisk = Object.entries(risks).sort((a, b) => b[1] - a[1])[0]

    return {
      total,
      highRisk,
      moderateRisk,
      lowRisk,
      topRisk: topRisk?.[0] ?? 'Not enough data yet'
    }
  }, [snapshots])

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
            Board-ready summary of leadership readiness, recurring risks, and recommended development priorities.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Executive Summary
          </h2>

          <p className="mt-4 leading-7 text-slate-700">
            Based on current simulation data, the leadership pipeline includes {report.total} completed intelligence reps. Current readiness signals show {report.lowRisk} low-risk reps, {report.moderateRisk} moderate-risk reps, and {report.highRisk} high-risk reps. The most common leadership risk identified is: <strong>{report.topRisk}</strong>.
          </p>

          <p className="mt-4 leading-7 text-slate-700">
            Recommended next step: align coaching support to the most frequent leadership risk patterns and prioritize additional simulation reps for leaders showing moderate or high-risk decision patterns.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Total Reps" value={report.total} />
          <MetricCard label="Low Risk" value={report.lowRisk} />
          <MetricCard label="Moderate Risk" value={report.moderateRisk} />
          <MetricCard label="High Risk" value={report.highRisk} />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Board Talking Points
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-700">
            <li>Leadership readiness is being measured through observable simulation-based performance.</li>
            <li>Pipeline development can now be monitored before leaders enter high-stakes school roles.</li>
            <li>Recurring risk patterns create clearer coaching priorities for district leadership development.</li>
            <li>The next phase should focus on cohort-level implementation, coaching alignment, and trend monitoring.</li>
          </ul>
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
  value: number
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

