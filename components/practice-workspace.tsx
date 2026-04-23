'use client'

import { PracticeView } from '@/components/practice-view'
import type { Card } from '@/types'

type Props = {
  currentCard: Card | null
  currentIndex: number
  totalCards: number
}

export function PracticeWorkspace({
  currentCard,
  currentIndex,
  totalCards
}: Props) {
  const progress =
    totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 0

  if (!currentCard) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          No simulation loaded
        </h2>
        <p className="mt-3 text-slate-600">
          Select a practice scenario to begin leadership reps.
        </p>
      </div>
    )
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Leadership Scenario
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 capitalize">
              {currentCard.domain}
            </h2>
          </div>

          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {currentIndex + 1} / {totalCards}
          </div>
        </div>

        <div className="mt-6 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Scenario
            </div>
            <p className="mt-2 text-base leading-8 text-slate-700">
              {currentCard.scenario}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Leadership Prompt
            </div>
            <p className="mt-2 text-base font-medium leading-8 text-slate-900">
              {currentCard.prompt}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Response Workspace
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Make your leadership move
          </h2>

          <p className="mt-2 text-slate-600 leading-7">
            Respond like you&apos;re in the actual moment. Be specific, strategic,
            and action-oriented.
          </p>
        </div>

        <PracticeView />
      </div>
    </section>
  )
}