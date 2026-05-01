'use client'

import { useMemo, useState } from 'react'
import { track } from '@/app/lib/track'

type Decision = 'assign' | 'delay' | null

type Props = {
  escalationCount: number
  ownershipGaps: number
  atRiskLeaders: number
}

export default function ExecutiveDecisionMoment({
  escalationCount,
  ownershipGaps,
  atRiskLeaders
}: Props) {
  const [decision, setDecision] = useState<Decision>(null)

  const consequence = useMemo(() => {
    if (decision === 'assign') {
      return {
        label: 'CONTAINMENT STARTED',
        tone: 'border-green-200 bg-green-50 text-green-800',
        title: 'Ownership is now the control point.',
        body: 'The next executive move is evidence: owner, action, due date, and proof of follow-through.'
      }
    }

    if (decision === 'delay') {
      return {
        label: 'EXPOSURE ACCEPTED',
        tone: 'border-red-300 bg-red-50 text-red-800',
        title: 'Delay leaves risk uncontained.',
        body: 'The system has surfaced the risk. If no owner is assigned, the exposure remains with executive leadership.'
      }
    }

    return {
      label: 'DECISION REQUIRED',
      tone: 'border-red-200 bg-white text-gray-950',
      title: 'Assign ownership now or accept the exposure.',
      body: `${escalationCount} escalations. ${ownershipGaps} ownership gaps. ${atRiskLeaders} at-risk leaders. No neutral status.`
    }
  }, [decision, escalationCount, ownershipGaps, atRiskLeaders])

  function recordDecision(nextDecision: Exclude<Decision, null>) {
    setDecision(nextDecision)

    track(nextDecision === 'assign' ? 'decision_assign_ownership' : 'decision_delay_accept_exposure', {
      escalationCount,
      ownershipGaps,
      atRiskLeaders
    })
  }

  return (
    <section className={`rounded-2xl border p-5 shadow-sm ${consequence.tone}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide">
            {consequence.label}
          </div>
          <h2 className="mt-1 text-xl font-bold">
            {consequence.title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm">
            {consequence.body}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => recordDecision('assign')}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Assign Ownership
          </button>

          <button
            onClick={() => recordDecision('delay')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-950"
          >
            Delay and Accept Risk
          </button>
        </div>
      </div>

      {decision && (
        <div className="mt-4 rounded-xl border bg-white/80 p-4 text-sm text-gray-900">
          <div className="font-semibold">
            Executive record created.
          </div>
          <div className="mt-1 text-gray-700">
            Decision: {decision === 'assign' ? 'Assign ownership' : 'Delay and accept risk'} · Escalations: {escalationCount} · Ownership gaps: {ownershipGaps}
          </div>
        </div>
      )}
    </section>
  )
}
