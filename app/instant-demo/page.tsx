'use client'

import { useState } from 'react'

type Evaluation = {
  readiness: number
  directness: number
  evidence: number
  studentImpact: number
  followThrough: number
  risk: string
  summary: string
  nextMove: string
}

function evaluateResponse(response: string): Evaluation {
  const text = response.toLowerCase()

  const directness = text.includes('conversation') || text.includes('address') || text.includes('meet') ? 82 : 52
  const evidence = text.includes('data') || text.includes('evidence') || text.includes('observation') || text.includes('student') ? 86 : 48
  const studentImpact = text.includes('student') || text.includes('achievement') || text.includes('learning') ? 88 : 54
  const followThrough = text.includes('follow') || text.includes('monitor') || text.includes('check') || text.includes('timeline') ? 84 : 46

  const readiness = Math.round((directness + evidence + studentImpact + followThrough) / 4)

  const risk =
    readiness >= 80
      ? 'Low'
      : readiness >= 65
        ? 'Moderate'
        : 'High'

  const summary =
    readiness >= 80
      ? 'Your response shows strong leadership judgment. You named the issue, connected it to student impact, and included follow-through.'
      : readiness >= 65
        ? 'Your response shows promise, but the leadership move needs more precision, evidence, or follow-through.'
        : 'Your response is too general for a high-stakes leadership moment. The risk is that the issue continues without clear accountability.'

  const nextMove =
    readiness >= 80
      ? 'Practice a more complex scenario involving staff resistance or parent escalation.'
      : readiness >= 65
        ? 'Strengthen the response by naming the evidence, the adult action, and the follow-up timeline.'
        : 'Rewrite the response with a clear conversation, specific evidence, student impact, and monitoring plan.'

  return {
    readiness,
    directness,
    evidence,
    studentImpact,
    followThrough,
    risk,
    summary,
    nextMove
  }
}

export default function InstantDemoPage() {
  const [response, setResponse] = useState('')
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)

  if (evaluation) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="rounded-3xl bg-slate-900 p-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              Live Evaluation
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight">
              LeadSharper analyzed your leadership move.
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              This is the core product promise: turn leadership judgment into measurable readiness intelligence.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-5">
            <Metric label="Readiness" value={`${evaluation.readiness}%`} />
            <Metric label="Directness" value={`${evaluation.directness}%`} />
            <Metric label="Evidence" value={`${evaluation.evidence}%`} />
            <Metric label="Student Impact" value={`${evaluation.studentImpact}%`} />
            <Metric label="Follow-Through" value={`${evaluation.followThrough}%`} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-slate-900">
                Risk Signal
              </h2>

              <div className="mt-4 text-3xl font-bold text-blue-700">
                {evaluation.risk}
              </div>

              <p className="mt-4 leading-7 text-slate-700">
                {evaluation.summary}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-slate-900">
                Recommended Next Move
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                {evaluation.nextMove}
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-blue-50 p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Why this matters
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-700">
              In a district implementation, this same evaluation pattern can roll up into readiness dashboards, coaching priorities, succession planning, and superintendent reporting.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEvaluation(null)
                  setResponse('')
                }}
                className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
              >
                Try again
              </button>

              <a
  href="/pilot"
  className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
>
  Explore pilot access
</a>

<a
  href="/evaluation-report"
  className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
>
  View full evaluation report
</a>
            </div>
          </section>
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
            Respond to a real leadership scenario and watch the platform evaluate your readiness.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Scenario
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            A veteran teacher has strong relationships with students but consistently delivers weak instruction. Student achievement is declining, and your instructional coach says this issue has been avoided for months. What do you do?
          </p>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="mt-6 min-h-[240px] w-full rounded-2xl border border-slate-300 p-4"
            placeholder="Write your leadership response..."
          />

          <button
            disabled={response.trim().length < 20}
            onClick={() => setEvaluation(evaluateResponse(response))}
            className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white disabled:bg-slate-300"
          >
            Generate Readiness Evaluation
          </button>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-bold text-blue-700">{value}</div>
    </div>
  )
}

