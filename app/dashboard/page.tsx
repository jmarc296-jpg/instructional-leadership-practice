'use client'

import { useMemo } from 'react'
import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

export default function DashboardPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()

  const summary = useMemo(() => {
    const total = snapshots.length

    const riskCounts = snapshots.reduce((acc: Record<string, number>, item) => {
      const risk = (item.profile as any)?.riskLevel ?? 'unknown'
      acc[risk] = (acc[risk] ?? 0) + 1
      return acc
    }, {})

    const latest = snapshots[snapshots.length - 1]

    return {
      total,
      riskCounts,
      latest
    }
  }, [snapshots])

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <a href="/" className="text-sm font-semibold text-blue-700">
          ? Back to simulator
        </a>

        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <h1 className="text-4xl font-semibold">
            Leadership Intelligence Dashboard
          </h1>
          <p className="mt-3 text-slate-300">
            Track leadership growth patterns across every simulation rep.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              Total Reps
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.total}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              High Risk Reps
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.riskCounts.high ?? 0}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              Moderate Risk Reps
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.riskCounts.moderate ?? 0}
            </div>
          </div>
        </section>

        {summary.latest && (
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Latest Leadership Signal
            </h2>

            <div className="mt-4 text-sm text-slate-700">
              {(summary.latest.consequences as any)?.likelyConsequence}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

