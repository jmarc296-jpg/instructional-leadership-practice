import { StatCard } from '@/components/stat-card'
import type { AnalyticsSnapshot } from '@/types'

type Props = {
  analytics: AnalyticsSnapshot | null
  strongestDomain: string
  weakestDomain: string
  recentTrend: string
  coachingInsight: string
  onRetryWeakestArea: () => void
}

function toPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

function getDomainRows(analytics: AnalyticsSnapshot | null) {
  if (!analytics) return []

  return Object.entries(analytics.averageRatingByDomain)
    .sort((a, b) => b[1] - a[1])
    .map(([domain, value]) => ({
      domain,
      value,
      percent: Math.max(8, Math.round(value * 100))
    }))
}

function getRecentMix(analytics: AnalyticsSnapshot | null) {
  if (!analytics || analytics.recentRatings.length === 0) {
    return {
      strong: 0,
      partial: 0,
      struggled: 0
    }
  }

  return {
    strong: analytics.recentRatings.filter((r) => r === 'strong').length,
    partial: analytics.recentRatings.filter((r) => r === 'partial').length,
    struggled: analytics.recentRatings.filter((r) => r === 'struggled').length
  }
}

export function AnalyticsView({
  analytics,
  strongestDomain,
  weakestDomain,
  recentTrend,
  coachingInsight,
  onRetryWeakestArea
}: Props) {
  const domainRows = getDomainRows(analytics)
  const recentMix = getRecentMix(analytics)

  const totalCompleted = analytics?.totalCompleted ?? 0
  const totalRecent = analytics?.recentRatings.length ?? 0

  const recommendedFocus =
    weakestDomain === '-' ? 'Complete more scenario reps to unlock a recommendation.' : `Prioritize ${weakestDomain} next for the highest leverage improvement.`

  return (
    <section className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
              Executive Analytics
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              A sharper view of how your leadership reps are trending.
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Use this dashboard to identify your strongest area, your biggest gap,
              and the next simulation category that deserves attention.
            </p>
          </div>

          <button
            onClick={onRetryWeakestArea}
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Retry weakest area
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Scenario Reps"
          value={totalCompleted}
          helper="Total completed simulations saved to your local history."
        />
        <StatCard
          label="Strongest Domain"
          value={strongestDomain === '-' ? 'Pending' : strongestDomain}
          tone="success"
          helper="Your highest-performing domain right now."
        />
        <StatCard
          label="Weakest Domain"
          value={weakestDomain === '-' ? 'Pending' : weakestDomain}
          tone="warning"
          helper="Your current highest-leverage improvement area."
        />
        <StatCard
          label="Recent Trend"
          value={recentTrend}
          helper="Based on your most recent saved ratings."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Domain Heatmap
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Performance by domain
              </h3>
            </div>

            <div className="text-sm text-slate-500">
              {domainRows.length ? `${domainRows.length} tracked` : 'No data yet'}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {domainRows.length ? (
              domainRows.map((row) => (
                <div key={row.domain}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="text-sm font-medium capitalize text-slate-700">
                      {row.domain}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {toPercent(row.value)}
                    </div>
                  </div>

                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                Complete a few simulations to populate domain performance.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Coaching Insight
            </div>

            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              Recommended next move
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600">
              {coachingInsight}
            </p>

            <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-7 text-blue-900">
              {recommendedFocus}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Recent Mix
            </div>

            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              Last ratings snapshot
            </h3>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Strong
                </div>
                <div className="mt-2 text-2xl font-semibold text-emerald-950">
                  {recentMix.strong}
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                  Partial
                </div>
                <div className="mt-2 text-2xl font-semibold text-amber-950">
                  {recentMix.partial}
                </div>
              </div>

              <div className="rounded-2xl bg-rose-50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">
                  Struggled
                </div>
                <div className="mt-2 text-2xl font-semibold text-rose-950">
                  {recentMix.struggled}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-500">
              {totalRecent ? `${totalRecent} recent ratings included.` : 'No recent ratings yet.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
