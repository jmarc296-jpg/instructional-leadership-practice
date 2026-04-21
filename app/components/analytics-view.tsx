'use client'

import { useMemo } from 'react'
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

  const strongestAreaLabel = strongestDomain && strongestDomain !== '-' ? strongestDomain : 'Not enough data yet'
  const weakestAreaLabel = weakestDomain && weakestDomain !== '-' ? weakestDomain : 'Not enough data yet'

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[32px] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
              Analytics
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
              Your instructional leadership practice patterns
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Review both performance trends and revision habits. Strong practice is not just how often you respond. It is how often you return to sharpen your thinking.
            </p>
          </div>

          <button
            type="button"
            onClick={onRetryWeakestArea}
            className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
          >
            Retry Weakest Area
          </button>
        </div>
      </section>

      <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Questions Completed</div>
          <div className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            {completedCount}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Strongest Area</div>
          <div className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
            <span className="capitalize">{strongestAreaLabel}</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Needs Practice</div>
          <div className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
            <span className="capitalize">{weakestAreaLabel}</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Recent Trend</div>
          <div className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
            {recentTrend}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Saved Responses</div>
          <div className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            {responseMetrics.totalSavedResponses}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Revised Cards</div>
          <div className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            {responseMetrics.revisedCards}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Avg Versions per Card</div>
          <div className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            {responseMetrics.averageVersionsPerCard}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="text-sm text-slate-500">Revision Rate</div>
          <div className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            {responseMetrics.revisionRate}%
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
          Coaching Insight
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-800 sm:text-base sm:leading-7">
          {coachingInsight}
        </p>

        <div className="mt-5 rounded-[20px] border border-violet-200 bg-violet-50 p-4 sm:rounded-2xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 sm:text-xs sm:tracking-[0.18em]">
            Revision Growth Read
          </div>
          <p className="mt-2 text-sm leading-6 text-violet-950">
            {revisionGrowthRead}
          </p>
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
            Domain Performance
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Average self-ratings across each instructional leadership domain.
          </p>
        </div>

        {!hasRatings ? (
          <div className="mt-6 rounded-[20px] border border-dashed border-slate-300 p-5 text-sm leading-6 text-slate-500 sm:rounded-2xl sm:p-6">
            Complete a few rated scenarios to populate domain performance.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orderedDomainEntries.map(({ domain, value }) => (
              <div key={domain} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    {getDomainLabel(domain)}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {toPercent(value)}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-slate-900 transition-all"
                    style={{ width: getBarWidth(value) }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs sm:tracking-[0.22em]">
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

        <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-xs sm:tracking-[0.22em]">
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