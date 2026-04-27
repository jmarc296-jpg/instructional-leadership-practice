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
          ? Return to platform
        </a>

        <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Leadership Growth Dashboard
          </h1>
          <p className="mt-3 text-slate-600">
            Track leadership growth patterns across every simulation rep.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-100 p-5 border border-slate-200">
            <div className="text-xs uppercase text-slate-500">
              Total Reps
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.total}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 border border-slate-200">
            <div className="text-xs uppercase text-slate-500">
              High Risk Reps
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.riskCounts.high ?? 0}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 border border-slate-200">
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
              <section className="rounded-3xl bg-blue-50 px-4 py-6 sm:p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Keep strengthening your leadership profile
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            The dashboard becomes more useful as additional simulation reps are completed. Continue practicing, then convert patterns into a focused growth plan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/scenario-lab"
              className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Practice another scenario
            </a>

            <a
              href="/growth-plan"
              className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
            >
              Build growth plan
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}


{/* Assignment Analytics */}
<div className="grid lg:grid-cols-4 gap-6 mt-10">
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <p>Active Assignments</p>
    <h2 className="text-3xl font-bold">142</h2>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <p>Completion Rate</p>
    <h2 className="text-3xl font-bold">81%</h2>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <p>Top Development Gap</p>
    <h2 className="text-xl font-bold">Instructional Feedback</h2>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <p>Readiness Growth</p>
    <h2 className="text-3xl font-bold text-green-600">+11%</h2>
  </div>
</div>

