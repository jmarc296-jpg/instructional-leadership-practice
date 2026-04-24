import type { ResponseInsight } from '@/types'

type Props = {
  insight: ResponseInsight | null
}

export function ExecutiveFeedbackPanel({ insight }: Props) {
  if (!insight) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          AI Leadership Coach
        </div>

        <h3 className="mt-3 text-xl font-semibold text-slate-900">
          Feedback unlocks after submission
        </h3>

        <p className="mt-3 text-slate-600 leading-7">
          Submit your response to receive executive coaching feedback on clarity,
          leadership action, evidence use, and strategic thinking.
        </p>
      </div>
    )
  }

  const score = insight.score ?? 0

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            AI Leadership Coach
          </div>

          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Executive Feedback
          </h3>
        </div>

        <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Score: {score}/5
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold text-slate-900">
          Strengths
        </div>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {insight.strengths.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold text-slate-900">
          Growth Areas
        </div>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {insight.growthAreas.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold text-slate-900">
          Leadership Signals
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {insight.signals.map((signal, index) => (
            <div
              key={index}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {signal}
            </div>
          ))}
        </div>
      </div>

      {insight.summary && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          {insight.summary}
        </div>
      )}
    </div>
  )
}
