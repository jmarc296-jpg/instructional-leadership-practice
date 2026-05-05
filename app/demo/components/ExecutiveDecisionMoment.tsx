'use client'

import { useState } from 'react'
import { track } from '@/app/lib/track'

export default function ExecutiveDecisionMoment({
  escalationCount,
  ownershipGaps,
  atRiskLeaders
}: {
  escalationCount: number
  ownershipGaps: number
  atRiskLeaders: number
}) {
  const [locked, setLocked] = useState(true)

  function forceAcknowledge() {
    track('executive_acknowledged_system', {
      escalationCount,
      ownershipGaps,
      atRiskLeaders
    })
    setLocked(false)
  }

  return (
    <section className="rounded-2xl border border-gray-300 bg-white p-6">

      {locked && (
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Executive Acknowledgment Required
          </div>

          <h2 className="text-2xl font-semibold text-gray-950">
            You are now accountable for {ownershipGaps > 0 ? 'unassigned risk' : 'execution failure'}.
          </h2>

          <p className="text-sm text-gray-600">
            The system has already identified, assigned, and escalated risk. This step confirms that you understand ownership now sits with you until proven otherwise.
          </p>

          <button
            onClick={forceAcknowledge}
            className="rounded-full bg-[#071B4D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0D6EFD]"
          >
            Acknowledge and Assume Responsibility
          </button>
        </div>
      )}

      {!locked && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
          Responsibility accepted. The system will now track whether your actions match this acknowledgment.
        </div>
      )}

    </section>
  )
}
