'use client'

import { track } from '@/app/lib/track'

type Props = {
  escalationCount: number
  ownershipGaps: number
}

export default function DecisionControlBar({ escalationCount, ownershipGaps }: Props) {
  return (
    <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-red-700">
            Decision Point
          </div>
          <h2 className="mt-1 text-xl font-bold text-gray-950">
            Assign ownership now or accept the exposure.
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            {escalationCount} escalations. {ownershipGaps} ownership gaps. No neutral status.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => track('decision_assign_ownership', { escalationCount, ownershipGaps })}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Assign Ownership
          </button>

          <button
            onClick={() => track('decision_delay_accept_exposure', { escalationCount, ownershipGaps })}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-950"
          >
            Delay and Accept Risk
          </button>
        </div>
      </div>
    </section>
  )
}
