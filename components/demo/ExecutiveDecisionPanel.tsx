'use client'

import { useState } from "react"

export default function ExecutiveDecisionPanel() {
  const [decision, setDecision] = useState<null | 'act' | 'delay'>(null)

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Executive Decision Required
          </p>
          <h2 className="mt-1 text-xl font-semibold text-gray-950">
            The system is awaiting your decision.
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Choosing not to act is still a recorded decision.
          </p>
        </div>

        {decision && (
          <div className="text-xs font-semibold text-gray-500">
            Decision recorded
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          onClick={() => setDecision('act')}
          className={`rounded-lg border p-4 text-left transition ${
            decision === 'act'
              ? 'border-green-400 bg-green-50'
              : 'border-gray-200 bg-white hover:border-green-300'
          }`}
        >
          <div className="text-sm font-semibold text-gray-950">
            Act Now
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Contain risk, assign ownership, and begin execution immediately.
          </div>
        </button>

        <button
          onClick={() => setDecision('delay')}
          className={`rounded-lg border p-4 text-left transition ${
            decision === 'delay'
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-white hover:border-red-300'
          }`}
        >
          <div className="text-sm font-semibold text-gray-950">
            Delay Action
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Accept continued exposure and escalation into classrooms.
          </div>
        </button>
      </div>

      {decision === 'delay' && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">
          Risk remains active. Escalation probability increases.
        </div>
      )}

      {decision === 'act' && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-800">
          Action acknowledged. Execution is now required and will be monitored.
        </div>
      )}
    </section>
  )
}
