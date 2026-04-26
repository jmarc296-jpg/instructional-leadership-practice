'use client'

import { useState } from 'react'

export default function InstantDemoPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl space-y-6">

          <section className="rounded-3xl bg-slate-900 p-10 text-white">
            <h1 className="text-5xl font-semibold tracking-tight">
              Leadership Evaluation Complete
            </h1>

            <p className="mt-4 text-lg text-slate-300">
              Based on your response, LeadSharper generated a readiness analysis.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            <Metric label="Instructional Leadership" value="82%" />
            <Metric label="Staff Accountability" value="68%" />
            <Metric label="Decision Quality" value="88%" />
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Blind spot identified
            </h2>

            <p className="mt-4 text-slate-700 leading-7">
              You delayed direct accountability language. This often leads to prolonged performance issues.
            </p>
          </section>

          <a
            href="/pilot"
            className="inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
          >
            Explore Pilot Access
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Instant Demo
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Test LeadSharper in 90 seconds.
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            Respond to a real leadership scenario and instantly see how the platform evaluates readiness.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Scenario
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            A veteran teacher has strong relationships with students but consistently delivers weak instruction. Student achievement is declining, and your instructional coach says this issue has been avoided for months.
            
            What do you do?
          </p>

          <textarea
            className="mt-6 min-h-[220px] w-full rounded-2xl border border-slate-300 p-4"
            placeholder="Write your leadership response..."
          />

          <button
            onClick={() => setSubmitted(true)}
            className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
          >
            Generate Evaluation
          </button>
        </section>
      </div>
    </main>
  )
}

function Metric({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-4xl font-bold text-blue-700">{value}</div>
    </div>
  )
}
