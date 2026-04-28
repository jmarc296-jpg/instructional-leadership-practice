'use client'

import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

export default function EvaluationReportPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()
  const latest = snapshots[snapshots.length - 1]

  const profile = latest?.profile as any
  const consequences = latest?.consequences as any
  const recommendation = latest?.recommendation as any

  const scores = [
    { label: "Instructional Precision", score: profile?.instructionalPrecision ?? 0, level: "Advanced" },
    { label: "Accountability Strength", score: profile?.accountabilityStrength ?? 0, level: "Strong" },
    { label: "Communication Clarity", score: profile?.communicationClarity ?? 0, level: "Strong" },
    { label: "Student Impact Orientation", score: profile?.studentImpactOrientation ?? 0, level: "Advanced" }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Leadership Readiness Report
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl sm:text-5xl font-semibold tracking-tight">
            Turn leadership reps into measurable growth.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Evaluate how leaders perform under pressure before real consequences happen.
          </p>
        </section>

        {!latest ? (
          <section className="rounded-3xl bg-slate-100 px-4 py-6 sm:p-8 border border-slate-200">
            <h2 className="text-3xl font-semibold text-slate-900">
              No evaluation data yet.
            </h2>

            <p className="mt-4 text-slate-600">
              Complete and rate a simulation first. Your evaluation report will generate automatically.
            </p>

            <a href="/talent-review" className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
              Start simulation
            </a>
          </section>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-4">
              {scores.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white p-7 border border-slate-200">
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="mt-3 text-3xl sm:text-4xl font-bold text-blue-700">
                    {item.score}/100
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-600">
                    {item.level}
                  </div>
                </div>
              ))}
            </section>

            <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900">
                Leadership Summary
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Pipeline Readiness</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Ready for principal pipeline advancement
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Coaching Priority</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Conflict navigation and escalation management
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
                <h2 className="text-3xl font-semibold text-slate-900">
                  Leadership Risk
                </h2>

                <p className="mt-5 text-xl font-semibold text-emerald-600">
                  {consequences?.unresolvedRisk ?? 'Leadership response demonstrates strong readiness signals.'}
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {consequences?.likelyConsequence ?? 'This response reflects strong principal judgment.'}
                </p>
              </div>

              <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
                <h2 className="text-3xl font-semibold text-slate-900">
                  Recommended Development Move
                </h2>

                <p className="mt-5 text-xl font-semibold text-blue-700">
                  {recommendation?.priority ?? 'Advance to a higher complexity simulation'}
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {recommendation?.nextPracticeFocus ?? 'Practice a more complex scenario involving staff resistance or parent escalation.'}
                </p>
              </div>
            </section>

            <section className="rounded-3xl bg-blue-50 px-4 py-6 sm:p-8">
              <h2 className="text-3xl font-semibold text-slate-900">
                District Impact
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                This leadership signal helps districts make stronger coaching, promotion, and succession planning decisions before leadership gaps become expensive.
              </p>
            </section>

            <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
              <h2 className="text-3xl font-semibold text-slate-900">
                Keep building your leadership profile
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                Strong district decisions should never rely on a single simulation. Complete additional leadership reps to strengthen your readiness profile.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/scenario-lab"
                  className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
                >
                  Run Next Simulation
                </a>

                <a
                  href="/growth-plan"
                  className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
                >
                  View Growth Plan
                </a>

                <a
                  href="/executive-command-center"
                  className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
                >
                  District Dashboard
                </a>
              </div>
            </section>

            <section className="rounded-3xl bg-slate-900 px-4 py-6 sm:p-8 text-white">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Build your leadership bench before vacancies force bad decisions.
              </h2>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="/scenario-lab"
                  className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold"
                >
                  Run Next Simulation
                </a>

                <a
                  href="/growth-plan"
                  className="rounded-2xl border border-white/20 px-6 py-4 font-semibold"
                >
                  View Growth Plan
                </a>

                <a
                  href="/executive-command-center"
                  className="rounded-2xl border border-white/20 px-6 py-4 font-semibold"
                >
                  District Dashboard
                </a>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}



