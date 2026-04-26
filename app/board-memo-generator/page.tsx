'use client'

import { useState } from 'react'

export default function BoardMemoGeneratorPage() {
  const [generated, setGenerated] = useState(false)

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            AI Board Memo Generator
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Turn leadership readiness data into a board-ready memo.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Superintendents and cabinet teams can instantly generate leadership pipeline updates for boards, trustees, and executive teams.
          </p>
        </section>

        {!generated ? (
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Generate memo
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border border-slate-300 p-4"
                placeholder="District name"
              />

              <input
                className="rounded-2xl border border-slate-300 p-4"
                placeholder="Board meeting date"
              />
            </div>

            <textarea
              className="mt-4 min-h-[180px] w-full rounded-2xl border border-slate-300 p-4"
              placeholder="Optional leadership priorities or context..."
            />

            <button
              onClick={() => setGenerated(true)}
              className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Generate board memo
            </button>
          </section>
        ) : (
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Board Leadership Pipeline Memo
            </h2>

            <div className="mt-6 space-y-6 text-slate-700 leading-8">
              <p>
                This quarter, LeadSharper evaluated leadership readiness across the district’s principal pipeline.
              </p>

              <p>
                Findings indicate strong instructional leadership capacity among emerging leaders, but recurring gaps remain in conflict navigation and staff accountability.
              </p>

              <p>
                The district currently has 18 promotion-ready leaders, 9 high-risk placements, and approximately $1.2M in projected turnover exposure.
              </p>

              <p>
                Recommendation: expand leadership simulation reps and target coaching investments before upcoming principal vacancies.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
              >
                Print PDF
              </button>

              <a
                href="/pilot"
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
              >
                Explore district pilot
              </a>
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
