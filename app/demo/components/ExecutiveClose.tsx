'use client'

import { track } from '@/app/lib/track'

type Props = {
  escalationCount: number
  ownershipGaps: number
}

export default function ExecutiveClose({ escalationCount, ownershipGaps }: Props) {
  return (
    <section className="rounded-2xl border border-red-300 bg-red-700 p-6 text-white shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-red-100">
        Final Decision
      </div>

      <h2 className="mt-2 max-w-4xl text-2xl font-bold">
        This risk is now known. Leaving it unassigned is a leadership choice.
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-red-50">
        {escalationCount} escalations and {ownershipGaps} ownership gaps require containment. The next move is ownership, evidence, and follow-through.
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => track('final_assign_ownership', { escalationCount, ownershipGaps })}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm"
        >
          Assign Ownership
        </button>

        <button
          onClick={() => track('final_leave_uncontained', { escalationCount, ownershipGaps })}
          className="rounded-lg border border-red-100 px-4 py-2 text-sm font-semibold text-white"
        >
          Leave Uncontained
        </button>
      </div>
    </section>
  )
}
