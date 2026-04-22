'use client'

import { useMemo } from 'react'
import { BarChart3, RefreshCcw, Sparkles, TrendingUp } from 'lucide-react'
import { getAllWrittenResponses, getResponseVersions } from '@/lib/local-store'
import type { AnalyticsSnapshot, Domain } from '@/types'

type Props = {
  analytics: AnalyticsSnapshot | null
  strongestDomain: string
  weakestDomain: string
  recentTrend: string
  coachingInsight: string
  onRetryWeakestArea: () => void
}

const DOMAIN_ORDER: Domain[] = [
  'rigor',
  'ddi',
  'coaching',
  'assessment',
  'culture',
  'leadership'
]

function toPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

function getBarWidth(value: number) {
  const bounded = Math.max(0, Math.min(1, value))
  return `${Math.max(8, Math.round(bounded * 100))}%`
}

function getDomainLabel(domain: string) {
  return domain.charAt(0).toUpperCase() + domain.slice(1)
}

export function AnalyticsView({
  analytics,
  strongestDomain,
  weakestDomain,
  recentTrend,
  coachingInsight,
  onRetryWeakestArea
}: Props) {
  const responseMetrics = useMemo(() => {
    const responses = getAllWrittenResponses()

    const versionCounts = responses.map((entry) => {
      const versions = getResponseVersions(entry.cardId)
      return versions.length
    })

    const totalSavedResponses = responses.length
    const revisedCards = versionCounts.filter((count) => count > 1).length
    const totalVersions = versionCounts.reduce((sum, count) => sum + count, 0)

    const averageVersionsPerCard =
      totalSavedResponses > 0 ? (totalVersions / totalSavedResponses).toFixed(1) : '0.0'

    const revisionRate =
      totalSavedResponses > 0
        ? Math.round((revisedCards / totalSavedResponses) * 100)
        : 0

    return {
      totalSavedResponses,
      revisedCards,
      totalVersions,
      averageVersionsPerCard,
      revisionRate
    }
  }, [])

  const orderedDomainEntries = useMemo(() => {
    const averages = analytics?.averageRatingByDomain ?? {
      rigor: 0,
      ddi: 0,
      coaching: 0,
      assessment: 0,
      culture: 0,
      leadership: 0
    }

    return DOMAIN_ORDER.map((domain) => ({
      domain,
      value: averages[domain] ?? 0
    }))
  }, [analytics])

  const completedCount = analytics?.totalCompleted ?? 0
  const hasRatings = completedCount > 0
  const hasResponses = responseMetrics.totalSavedResponses > 0
  const hasRevisionData = responseMetrics.revisedCards > 0

  const revisionGrowthRead = useMemo(() => {
    if (!hasResponses) {
      return 'Once you begin saving responses, this space will show whether you are refining earlier thinking or mostly moving on after a first draft.'
    }

    if (responseMetrics.revisionRate >= 60) {
      return 'You are consistently returning to refine prior thinking. That is a strong leadership habit because it builds precision, not just completion.'
    }

    if (responseMetrics.revisionRate >= 30) {
      return 'You are starting to revisit prior thinking, which is a strong step. Keep increasing how often you revise earlier responses instead of moving only to new scenarios.'
    }

    return 'Most of your work is still first-pass thinking. The next growth move is to revisit earlier responses and sharpen the problem, evidence, and next action more explicitly.'
  }, [hasResponses, responseMetrics.revisionRate])

  const strongestAreaLabel =
    strongestDomain && strongestDomain !== '-'
      ? strongestDomain
      : 'Not enough data yet'

  const weakestAreaLabel =
    weakestDomain && weakestDomain !== '-'
      ? weakestDomain
      : 'Not enough data yet'

  return (
    <div className="space-y-6 fade-in">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="p-6 sm:p-8">
            <div className="section-label">Analytics</div>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              See the patterns behind your leadership decisions
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Strong practice is not only how often you respond. It is how often
              you return, revise, and sharpen the quality of your judgment.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onRetryWeakestArea}
                className="btn-primary inline-flex items-center gap-2"
              >
                <RefreshCcw size={16} />
                Retry Weakest Area
              </button>
            </div>
          </div>

          <div className="hero-gradient p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              Growth Snapshot
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                  Completed
                </div>
                <div className="mt-1 text-3xl font-bold text-white">
                  {completedCount}
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                  Strongest
                </div>
                <div className="mt-1 text-2xl font-bold capitalize text-white">
                  {strongestAreaLabel}
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                  Trend
                </div>
                <div className="mt-1 text-2xl font-bold text-white">
                  {recentTrend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Questions Completed</div>
          <div className="mt-2 text-3xl font-bold text-slate-950">
            {completedCount}
          </div>
        </div>

        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Strongest Area</div>
          <div className="mt-2 text-2xl font-bold capitalize text-slate-950">
            {strongestAreaLabel}
          </div>
        </div>

        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Needs Practice</div>
          <div className="mt-2 text-2xl font-bold capitalize text-slate-950">
            {weakestAreaLabel}
          </div>
        </div>

        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Recent Trend</div>
          <div className="mt-2 text-2xl font-bold text-slate-950">
            {recentTrend}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Saved Responses</div>
          <div className="mt-2 text-3xl font-bold text-slate-950">
            {responseMetrics.totalSavedResponses}
          </div>
        </div>

        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Revised Cards</div>
          <div className="mt-2 text-3xl font-bold text-slate-950">
            {responseMetrics.revisedCards}
          </div>
        </div>

        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Avg Versions per Card</div>
          <div className="mt-2 text-3xl font-bold text-slate-950">
            {responseMetrics.averageVersionsPerCard}
          </div>
        </div>

        <div className="app-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500">Revision Rate</div>
          <div className="mt-2 text-3xl font-bold text-slate-950">
            {responseMetrics.revisionRate}%
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="app-card p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet-600" />
            <div className="section-label">Coaching Insight</div>
          </div>

          <p className="mt-4 text-base leading-7 text-slate-800">
            {coachingInsight}
          </p>

          <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
              Revision Growth Read
            </div>
            <p className="mt-3 text-sm leading-6 text-violet-950">
              {revisionGrowthRead}
            </p>
          </div>
        </div>

        <div className="hero-gradient p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-2 text-white">
            <TrendingUp size={18} />
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              Growth Read
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-white/70">Average Response Quality</div>
              <div className="mt-1 text-3xl font-bold text-white">
                {hasRatings
                  ? `${Math.round(
                      (orderedDomainEntries.reduce((sum, item) => sum + item.value, 0) /
                        orderedDomainEntries.length) *
                        100
                    )}%`
                  : '—'}
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-white/70">Revision Strength</div>
              <div className="mt-1 text-3xl font-bold text-white">
                {responseMetrics.revisionRate}%
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-white/70">Most Urgent Focus</div>
              <div className="mt-1 text-2xl font-bold capitalize text-white">
                {weakestAreaLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-card p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-blue-600" />
          <div>
            <div className="section-label">Domain Performance</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Average self-ratings across each instructional leadership domain.
            </p>
          </div>
        </div>

        {!hasRatings ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-sm leading-6 text-slate-500">
            Complete a few rated scenarios to populate domain performance.
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orderedDomainEntries.map(({ domain, value }) => (
              <div key={domain} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-700">
                    {getDomainLabel(domain)}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {toPercent(value)}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
                    style={{ width: getBarWidth(value) }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
            What is going well
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">
            <li>
              •{' '}
              {hasRatings
                ? `Your strongest current domain is ${strongestAreaLabel}.`
                : 'You are beginning to build a performance baseline.'}
            </li>
            <li>
              •{' '}
              {hasResponses
                ? `${responseMetrics.totalSavedResponses} saved response${responseMetrics.totalSavedResponses === 1 ? '' : 's'} give you reflection data beyond ratings alone.`
                : 'Once you save responses, this space will show revision habits too.'}
            </li>
            <li>
              •{' '}
              {hasRevisionData
                ? `${responseMetrics.revisedCards} card${responseMetrics.revisedCards === 1 ? '' : 's'} have already been revised, which shows active refinement.`
                : 'Revision habits will become visible here once you revisit saved responses.'}
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Tighten next
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-950">
            <li>
              •{' '}
              {weakestDomain !== '-' && weakestDomain
                ? `Spend the next round in ${weakestDomain} to build sharper pattern recognition there.`
                : 'Complete more rated practice to identify the next domain to target.'}
            </li>
            <li>
              •{' '}
              {responseMetrics.revisionRate < 50
                ? 'Increase the number of cards you revise. Growth comes faster when you sharpen prior thinking, not just start fresh.'
                : 'Keep using revision strategically so the quality of thinking keeps rising.'}
            </li>
            <li>
              • Use the History view to compare earlier and current responses, then reopen a card and tighten the issue, evidence, and next move.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}