'use client'

import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

export default function EvaluationReportPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()
  const latest = snapshots[snapshots.length - 1]

  const profile = latest?.profile as any
  const consequences = latest?.consequences as any
  const recommendation = latest?.recommendation as any

  const scores = [
    { label: "Instructional Precision", score: profile?.instructionalPrecision ?? 0 },
    { label: "Accountability Strength", score: profile?.accountabilityStrength ?? 0 },
    { label: "Communication Clarity", score: profile?.communicationClarity ?? 0 },
    { label: "Student Impact Orientation", score: profile?.studentImpactOrientation ?? 0 }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Live Leadership Evaluation Report
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Turn simulation performance into readiness intelligence.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            This report uses the most recent completed simulation to summarize readiness, risk, and recommended next development moves.
          </p>
        </section>

        {!latest ? (
          <section className="rounded-3xl bg-white p-10 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              No evaluation data yet.
            </h2>

            <p className="mt-4 text-slate-600">
              Complete and rate a simulation first. Your evaluation report will generate automatically.
            </p>

            <a href="/" className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
              Start simulation
            </a>
          </section>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-4">
              {scores.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white p-7 shadow-sm">
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="mt-3 text-4xl font-bold text-blue-700">
                    {item.score}/100
                  </div>
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-semibold text-slate-900">
                  Leadership Risk
                </h2>

                <p className="mt-5 text-xl font-semibold text-red-700">
                  {consequences?.unresolvedRisk ?? 'No risk identified'}
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {consequences?.likelyConsequence ?? 'No consequence available.'}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-semibold text-slate-900">
                  Recommended Next Rep
                </h2>

                <p className="mt-5 text-xl font-semibold text-blue-700">
                  {recommendation?.priority ?? 'Next Step'}
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {recommendation?.nextPracticeFocus ?? 'Continue targeted leadership practice.'}
                </p>
              </div>
            </section>

            <section className="rounded-3xl bg-blue-50 p-8">
              <h2 className="text-3xl font-semibold text-slate-900">
                Promotion Readiness Signal
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                Current risk level: <strong>{profile?.riskLevel ?? 'unknown'}</strong>. This leader should continue targeted practice until readiness patterns are consistently strong across multiple simulations.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
