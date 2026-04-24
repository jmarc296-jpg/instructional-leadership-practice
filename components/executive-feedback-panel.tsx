type Props = {
  insight: {
    score: number
    summary?: string
    signals?: string[]
  } | null
}

export function ExecutiveFeedbackPanel({ insight }: Props) {
  if (!insight) return null

  const strategicThinking = Math.min(10, insight.score + 5)
  const communicationPrecision = Math.min(10, insight.score + 4)
  const stakeholderManagement = Math.min(10, insight.score + 3)
  const executionClarity = Math.min(10, insight.score + 4)

  const overall =
    insight.score >= 4
      ? 'Leadership Ready'
      : insight.score === 3
      ? 'Developing'
      : 'Needs Coaching'

  const overallColor =
    insight.score >= 4
      ? 'text-emerald-700 bg-emerald-50'
      : insight.score === 3
      ? 'text-amber-700 bg-amber-50'
      : 'text-red-700 bg-red-50'

  const metrics = [
    { label: 'Strategic Thinking', value: strategicThinking },
    { label: 'Communication Precision', value: communicationPrecision },
    { label: 'Stakeholder Management', value: stakeholderManagement },
    { label: 'Execution Clarity', value: executionClarity }
  ]

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Executive Performance Review
          </div>

          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Leadership Scorecard
          </h3>
        </div>

        <div className={`rounded-full px-4 py-2 text-sm font-semibold ${overallColor}`}>
          {overall}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="text-sm font-medium text-slate-600">
              {metric.label}
            </div>

            <div className="mt-2 text-3xl font-semibold text-slate-950">
              {metric.value}/10
            </div>
          </div>
        ))}
      </div>

      {insight.signals?.length ? (
        <div className="mt-6">
          <div className="text-sm font-semibold text-slate-950">
            Strength Signals
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {insight.signals.map((signal, index) => (
              <div
                key={index}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {insight.summary ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          {insight.summary}
        </div>
      ) : null}
    </div>
  )
}
