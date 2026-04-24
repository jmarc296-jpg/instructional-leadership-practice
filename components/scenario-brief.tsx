import type { Card } from '@/types'

type Props = {
  card: Card | null
  questionNumber: number
}

export function ScenarioBrief({ card, questionNumber }: Props) {
  if (!card) return null

  return (
    <div className="premium-panel rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Simulation Brief
          </div>

          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
            Question {questionNumber}: {card.domain.charAt(0).toUpperCase() + card.domain.slice(1)} Judgment
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
            {card.domain}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
            {card.difficulty}
          </span>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Timed Rep
          </span>
        </div>
      </div>
    </div>
  )
}


