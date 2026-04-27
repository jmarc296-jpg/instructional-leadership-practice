'use client'

import { useState } from 'react'

const rubric = [
  {
    area: "Diagnosis",
    score: "4/5",
    feedback: "Clearly identifies the core leadership issue and avoids jumping straight to a surface-level fix."
  },
  {
    area: "Instructional Judgment",
    score: "3/5",
    feedback: "Names the instructional concern but could more clearly connect it to student learning evidence."
  },
  {
    area: "Coaching Response",
    score: "4/5",
    feedback: "Maintains a supportive tone while still naming the performance concern directly."
  },
  {
    area: "Next Steps",
    score: "3/5",
    feedback: "Includes follow-up actions, but needs tighter accountability around what will be observed next."
  }
]

export default function SimulationRoomPage() {
  const [response, setResponse] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-blue-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Simulation Room
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            Practice real leadership decisions under pressure.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Respond to authentic school leadership scenarios, receive readiness feedback, and identify targeted development next steps.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Scenario
            </p>

            <h2 className="mt-4 text-2xl font-bold text-slate-950">
              Weak Instruction, Strong Relationships
            </h2>

            <p className="mt-4 leading-8 text-slate-700">
              A veteran teacher has strong relationships with students, but walkthroughs and recent assessment data show consistently weak instruction. Students are engaged behaviorally, but the cognitive lift is low, questioning is mostly recall-based, and student achievement is declining.
            </p>

            <p className="mt-4 leading-8 text-slate-700">
              Your instructional coach shares that this issue has been avoided for months because the teacher is well-liked and trusted by families.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">
                Prompt
              </p>

              <p className="mt-2 text-slate-600">
                What do you do next as the principal, and how do you balance relationship, accountability, and student outcomes?
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-sm text-slate-500">Time Limit</p>
                <p className="mt-1 font-bold text-blue-700">8 min</p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4">
                <p className="text-sm text-slate-500">Competency</p>
                <p className="mt-1 font-bold text-orange-700">Coaching</p>
              </div>

              <div className="rounded-2xl bg-purple-50 p-4">
                <p className="text-sm text-slate-500">Difficulty</p>
                <p className="mt-1 font-bold text-purple-700">Advanced</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-950">
              Your Response
            </h2>

            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your leadership response here..."
              className="mt-6 min-h-[260px] w-full rounded-2xl border border-slate-300 p-4 leading-7 outline-none focus:border-blue-500"
            />

            <button
              onClick={() => setSubmitted(true)}
              className="mt-5 w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Submit for Readiness Feedback
            </button>
          </div>
        </section>

        {submitted && (
          <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Readiness Feedback
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Overall Readiness Score: 78%
                </h2>

                <p className="mt-3 max-w-3xl text-slate-600">
                  Your response shows strong relationship management and a clear willingness to address the concern. The next growth move is tightening the instructional evidence, naming the gap more precisely, and defining what improvement must look like in the next observation cycle.
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5 text-center">
                <p className="text-sm text-slate-500">Recommended Module</p>
                <p className="mt-2 font-bold text-blue-700">
                  Observation & Feedback Excellence
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {rubric.map((item) => (
                <div key={item.area} className="rounded-2xl border border-slate-100 p-5">
                  <p className="font-bold text-slate-900">{item.area}</p>
                  <p className="mt-2 text-2xl font-bold text-blue-600">{item.score}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.feedback}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}


