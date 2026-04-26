'use client'

import { useMemo, useState } from 'react'

export default function ScenarioLabPage() {
  const [role, setRole] = useState('Assistant Principal')
  const [challenge, setChallenge] = useState('A teacher is resisting instructional feedback')
  const [response, setResponse] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const scenario = useMemo(() => {
    return `You are a ${role}. ${challenge}. Staff are watching how you respond, and the decision you make will shape trust, accountability, and student outcomes. What do you do?`
  }, [role, challenge])

  const score = useMemo(() => {
    const text = response.toLowerCase()

    const evidence = text.includes('data') || text.includes('evidence') || text.includes('observation')
    const action = text.includes('meet') || text.includes('conversation') || text.includes('address')
    const followUp = text.includes('follow') || text.includes('monitor') || text.includes('timeline')
    const students = text.includes('student') || text.includes('learning') || text.includes('achievement')

    return {
      readiness: [evidence, action, followUp, students].filter(Boolean).length * 20 + 20,
      evidence,
      action,
      followUp,
      students
    }
  }, [response])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Scenario Lab
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Build and test any leadership scenario in real time.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Generate a high-stakes school leadership moment, respond, and receive readiness feedback instantly.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Build scenario
            </h2>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-6 w-full rounded-2xl border border-slate-300 p-4"
              placeholder="Leadership role"
            />

            <textarea
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="mt-4 min-h-[160px] w-full rounded-2xl border border-slate-300 p-4"
              placeholder="Leadership challenge"
            />
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Scenario
            </h2>

            <p className="mt-5 leading-8 text-slate-700">
              {scenario}
            </p>

            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="mt-6 min-h-[220px] w-full rounded-2xl border border-slate-300 p-4"
              placeholder="Write your leadership response..."
            />

            <button
              disabled={response.trim().length < 20}
              onClick={() => setSubmitted(true)}
              className="mt-5 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white disabled:bg-slate-300"
            >
              Evaluate response
            </button>
          </div>
        </section>

        {submitted && (
          <section className="rounded-3xl bg-blue-50 p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Readiness Evaluation
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <Metric label="Readiness Score" value={`${score.readiness}%`} />
              <Metric label="Evidence Used" value={score.evidence ? 'Yes' : 'No'} />
              <Metric label="Action Named" value={score.action ? 'Yes' : 'No'} />
              <Metric label="Follow-Up" value={score.followUp ? 'Yes' : 'No'} />
            </div>

            <p className="mt-6 max-w-3xl leading-8 text-slate-700">
              Strong responses name the issue, ground the concern in evidence, connect the move to student impact, and define how the leader will follow through.
            </p>

            <a
              href="/pilot"
              className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Explore pilot access
            </a>
          </section>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-blue-700">{value}</div>
    </div>
  )
}
