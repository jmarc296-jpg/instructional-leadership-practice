'use client'

import { useMemo } from 'react'
import { TopNav } from '@/components/home/top-nav'
import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

export default function DistrictPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()

  const summary = useMemo(() => {
    const total = snapshots.length

    const readinessScores = snapshots
      .map((item: any) => item?.score?.readiness)
      .filter((score: any) => typeof score === 'number')

    const averageReadiness =
      readinessScores.length > 0
        ? Math.round(readinessScores.reduce((sum: number, score: number) => sum + score, 0) / readinessScores.length)
        : 0

    const riskCounts = snapshots.reduce(
      (acc: Record<string, number>, item: any) => {
        const risk = item?.profile?.riskLevel ?? 'unknown'
        acc[risk] = (acc[risk] ?? 0) + 1
        return acc
      },
      {}
    )

    return {
      total,
      averageReadiness,
      moderateRisk: riskCounts.moderate ?? 0,
      highRisk: riskCounts.high ?? 0
    }
  }, [snapshots])

  const hasData = summary.total > 0

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <TopNav />

        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            District Leadership Intelligence
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            See readiness, risk, and coaching priorities across your leadership bench.
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            LeadSharper turns completed leadership simulations into district-level insight for coaching, placement, and succession planning.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white"
            >
              Back to Home
            </a>

            <a
              href="/instant-demo"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Run Simulation
            </a>
          </div>
        </section>

        {!hasData && (
          <section className="rounded-3xl bg-white p-8 border border-slate-200">
            <h2 className="text-3xl font-semibold text-slate-900">
              No leadership cohort data yet.
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              Complete one or more leadership simulations to populate this dashboard with readiness scores, risk levels, and coaching priorities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/instant-demo"
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
              >
                Run First Simulation
              </a>

              <a
                href="/pilot"
                className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
              >
                Explore Pilot
              </a>
            </div>
          </section>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          <Metric label="Overall Readiness" value={hasData ? `${summary.averageReadiness}%` : "--"} />
          <Metric label="Simulation Reps" value={hasData ? `${summary.total}` : "--"} />
          <Metric label="Moderate Risk" value={hasData ? `${summary.moderateRisk}` : "--"} />
          <Metric label="High Risk" value={hasData ? `${summary.highRisk}` : "--"} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 border border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                Top Leadership Strengths
              </h2>

              {!hasData && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  Preview
                </span>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <Signal label="Instructional Leadership" value={hasData ? 'Active signal' : '84%'} tone="strength" />
              <Signal label="Data Meeting Facilitation" value={hasData ? 'Active signal' : '79%'} tone="strength" />
              <Signal label="Teacher Coaching" value={hasData ? 'Active signal' : '76%'} tone="strength" />
              <Signal label="School Culture Leadership" value={hasData ? 'Active signal' : '73%'} tone="strength" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                Recurring Leadership Risks
              </h2>

              {!hasData && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  Preview
                </span>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <Signal label="Avoiding difficult conversations" value={hasData ? 'Monitor' : '31'} tone="risk" />
              <Signal label="Weak instructional feedback" value={hasData ? 'Monitor' : '24'} tone="risk" />
              <Signal label="Poor delegation systems" value={hasData ? 'Monitor' : '18'} tone="risk" />
              <Signal label="Reactive decision-making" value={hasData ? 'Monitor' : '15'} tone="risk" />
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Estimated Financial Impact
            </h2>

            {!hasData && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                Preview
              </span>
            )}
          </div>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            District leaders can use readiness data to reduce failed placements, prevent turnover risk, and make stronger succession decisions.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Impact label="Failed principal placement cost" value="$145K" />
            <Impact label="Prevented turnover risk" value="$420K" />
            <Impact label="Leadership vacancy savings" value="$310K" />
          </div>
        </section>

        {hasData && (
          <section className="rounded-3xl bg-slate-900 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              Ready to move from demo to district pilot
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Bring LeadSharper to your leadership pipeline.
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              Use this intelligence to identify readiness patterns, target coaching, and strengthen principal placement decisions before high-stakes leadership moves are made.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/pilot" className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
                Book a District Pilot
              </a>

              <a href="/procurement" className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-semibold text-white">
                View Procurement Fit
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-slate-950">
        {value}
      </div>
    </div>
  )
}

function Signal({
  label,
  value,
  tone
}: {
  label: string
  value: string
  tone: 'strength' | 'risk'
}) {
  const toneClass =
    tone === 'strength'
      ? 'bg-slate-50 text-emerald-700'
      : 'bg-red-50 text-red-700'

  return (
    <div className={`flex items-center justify-between rounded-2xl p-5 font-semibold ${toneClass}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function Impact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-blue-700">{value}</div>
    </div>
  )
}





