import type { AnalyticsSnapshot, Rating } from '@/types'

type Props = {
  analytics: AnalyticsSnapshot | null
}

function ratingValue(rating: Rating) {
  if (rating === 'strong') return 1
  if (rating === 'partial') return 0.65
  return 0.25
}

function average(values: Rating[]) {
  if (!values.length) return 0
  return values.reduce((sum, rating) => sum + ratingValue(rating), 0) / values.length
}

export function GrowthMemory({ analytics }: Props) {
  const ratings = analytics?.recentRatings ?? []

  if (ratings.length < 4) {
    return (
      <section className="premium-panel rounded-[32px] border border-slate-200 bg-white px-8 py-7 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
          Growth Memory
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          Complete a few more reps to unlock growth tracking.
        </h3>

        <p className="mt-4 text-slate-600 leading-8">
          LeadSharper will compare your earlier responses to your most recent reps and show whether your leadership judgment is improving.
        </p>
      </section>
    )
  }

  const midpoint = Math.floor(ratings.length / 2)
  const earlier = ratings.slice(0, midpoint)
  const recent = ratings.slice(midpoint)

  const earlierAverage = average(earlier)
  const recentAverage = average(recent)
  const change = recentAverage - earlierAverage

  const trend =
    change > 0.12
      ? 'Improving'
      : change < -0.12
        ? 'Needs Attention'
        : 'Holding Steady'

  const trendStyle =
    trend === 'Improving'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : trend === 'Needs Attention'
        ? 'bg-red-50 text-red-700 border-red-200'
        : 'bg-amber-50 text-amber-700 border-amber-200'

  const percentChange = Math.round(change * 100)

  return (
    <section className="premium-panel rounded-[32px] border border-slate-200 bg-white px-8 py-7 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Growth Memory
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Your leadership judgment trend is {trend.toLowerCase()}.
          </h3>

          <p className="mt-4 max-w-3xl text-slate-600 leading-8">
            LeadSharper compared your earlier reps against your most recent reps to detect whether your responses are becoming stronger, clearer, and more action-oriented.
          </p>
        </div>

        <div className={`rounded-2xl border px-5 py-4 text-center ${trendStyle}`}>
          <div className="text-xs font-semibold uppercase tracking-[0.18em]">
            Trend
          </div>

          <div className="mt-2 text-2xl font-semibold">
            {trend}
          </div>

          <div className="mt-1 text-sm">
            {percentChange >= 0 ? '+' : ''}{percentChange}% shift
          </div>
        </div>
      </div>
    </section>
  )
}
