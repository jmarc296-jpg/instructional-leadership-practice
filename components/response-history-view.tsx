'use client'

import { useMemo, useState } from 'react'
import { QUESTION_BANK } from '@/data/questions'
import {
  clearAllWrittenResponses,
  clearWrittenResponse,
  getAllWrittenResponses,
  getResponseVersions,
  restoreResponseVersion
} from '@/lib/local-store'
import { analyzeResponse, type ResponseSignal } from '@/lib/response-insights'
import type { Domain, ResponseHistoryEntry, ResponseVersion } from '@/types'

type Props = {
  onOpenCard: (cardId: string) => void
}

type SignalFilter = 'all' | ResponseSignal
type SortOption = 'newest' | 'oldest' | 'highest-score' | 'lowest-score'
type DomainFilter = 'all' | Domain

type HistoryItem = ResponseHistoryEntry & {
  card: (typeof QUESTION_BANK)[number]
  insight: ReturnType<typeof analyzeResponse>
  versions: ResponseVersion[]
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

function getSignalLabel(signal: ResponseSignal) {
  switch (signal) {
    case 'clear-problem':
      return 'Clear Problem'
    case 'action-oriented':
      return 'Action Oriented'
    case 'evidence-based':
      return 'Evidence Based'
    case 'student-impact':
      return 'Student Impact'
    case 'vague-language':
      return 'Too Vague'
    case 'missing-action':
      return 'Missing Action'
    case 'symptom-not-root-cause':
      return 'Surface Level'
    case 'missing-evidence':
      return 'Missing Evidence'
    default:
      return signal
  }
}

function getSignalClasses(signal: ResponseSignal) {
  switch (signal) {
    case 'clear-problem':
    case 'action-oriented':
    case 'evidence-based':
    case 'student-impact':
      return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
    case 'vague-language':
    case 'missing-action':
    case 'symptom-not-root-cause':
    case 'missing-evidence':
      return 'border border-amber-200 bg-amber-50 text-amber-800'
    default:
      return 'border border-slate-200 bg-slate-100 text-slate-700'
  }
}

function getVersionLabel(index: number, total: number) {
  if (index === 0) return 'Current Version'
  return `Previous Version ${total - index}`
}

export function ResponseHistoryView({ onOpenCard }: Props) {
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all')
  const [signalFilter, setSignalFilter] = useState<SignalFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})
  const [selectedCompareVersion, setSelectedCompareVersion] = useState<Record<string, string>>({})

  const history = useMemo(() => {
    const responses = getAllWrittenResponses()

    return responses
      .map((entry) => {
        const card = QUESTION_BANK.find((q) => q.id === entry.cardId)
        if (!card) return null

        const insight = analyzeResponse(entry.response, card)
        const versions = getResponseVersions(entry.cardId)

        return {
          ...entry,
          card,
          insight,
          versions
        }
      })
      .filter(Boolean) as HistoryItem[]
  }, [refreshKey])

  const aggregate = useMemo(() => {
    const signalCounts = new Map<ResponseSignal, number>()

    for (const item of history) {
      for (const signal of item.insight.signals) {
        signalCounts.set(signal, (signalCounts.get(signal) ?? 0) + 1)
      }
    }

    const topGrowthSignal =
      [...signalCounts.entries()]
        .filter(([signal]) =>
          signal === 'vague-language' ||
          signal === 'missing-action' ||
          signal === 'symptom-not-root-cause' ||
          signal === 'missing-evidence'
        )
        .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

    const averageScore =
      history.length > 0
        ? (
            history.reduce((sum, item) => sum + item.insight.score, 0) / history.length
          ).toFixed(1)
        : '0.0'

    return {
      averageScore,
      topGrowthSignal
    }
  }, [history])

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase()

    let results = history.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.card.domain,
          item.card.difficulty,
          item.card.stem,
          item.card.scenario,
          item.card.prompt,
          item.card.exemplar,
          item.card.coachInsight?.title ?? '',
          item.card.coachInsight?.text ?? '',
          ...(item.card.tags ?? []),
          item.response,
          item.insight.summary,
          ...item.insight.strengths,
          ...item.insight.growthAreas,
          ...item.insight.signals,
          ...item.insight.signals.map(getSignalLabel),
          ...item.versions.map((version) => version.response)
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)

      const matchesDomain =
        domainFilter === 'all' || item.card.domain === domainFilter

      const matchesSignal =
        signalFilter === 'all' || item.insight.signals.includes(signalFilter)

      return matchesSearch && matchesDomain && matchesSignal
    })

    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        case 'highest-score':
          return b.insight.score - a.insight.score
        case 'lowest-score':
          return a.insight.score - b.insight.score
        default:
          return 0
      }
    })

    return results
  }, [history, search, domainFilter, signalFilter, sortBy])

  const availableDomains: DomainFilter[] = [
    'all',
    'rigor',
    'ddi',
    'coaching',
    'assessment',
    'culture',
    'leadership'
  ]

  const availableSignals: SignalFilter[] = [
    'all',
    'clear-problem',
    'action-oriented',
    'evidence-based',
    'student-impact',
    'vague-language',
    'missing-action',
    'symptom-not-root-cause',
    'missing-evidence'
  ]

  function handleDelete(cardId: string) {
    clearWrittenResponse(cardId)
    setRefreshKey((prev) => prev + 1)
  }

  function handleClearAll() {
    const confirmed = window.confirm('Delete all saved written responses?')
    if (!confirmed) return

    clearAllWrittenResponses()
    setRefreshKey((prev) => prev + 1)
  }

  function handleResetFilters() {
    setSearch('')
    setDomainFilter('all')
    setSignalFilter('all')
    setSortBy('newest')
  }

  function toggleExpanded(cardId: string) {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  function handleCompareSelection(cardId: string, versionId: string) {
    setSelectedCompareVersion((prev) => ({
      ...prev,
      [cardId]: versionId
    }))
  }

  function handleRestoreVersion(cardId: string, versionId: string) {
    const confirmed = window.confirm(
      'Restore this older version as your current response?'
    )
    if (!confirmed) return

    restoreResponseVersion(cardId, versionId)
    setRefreshKey((prev) => prev + 1)
  }

  function getSelectedComparisonVersion(item: HistoryItem) {
    const selectedVersionId = selectedCompareVersion[item.cardId]
    if (!selectedVersionId) return item.versions[1] ?? null
    return item.versions.find((version) => version.versionId === selectedVersionId) ?? null
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[32px] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
              Response History
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
              Review, compare, and sharpen prior thinking
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Use this space to revisit saved responses, notice patterns in your thinking, and compare how your reasoning has improved over time.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearAll}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Clear All
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-3">
          <div className="rounded-[20px] bg-slate-50 p-4 sm:rounded-[24px]">
            <div className="text-sm text-slate-500">Saved Responses</div>
            <div className="mt-1 text-2xl font-semibold text-slate-950">
              {history.length}
            </div>
          </div>

          <div className="rounded-[20px] bg-slate-50 p-4 sm:rounded-[24px]">
            <div className="text-sm text-slate-500">Average Quality Score</div>
            <div className="mt-1 text-2xl font-semibold text-slate-950">
              {aggregate.averageScore} / 5
            </div>
          </div>

          <div className="rounded-[20px] bg-slate-50 p-4 sm:rounded-[24px]">
            <div className="text-sm text-slate-500">Most Common Growth Pattern</div>
            <div className="mt-1 text-base font-semibold text-slate-950">
              {aggregate.topGrowthSignal
                ? getSignalLabel(aggregate.topGrowthSignal)
                : 'Not enough responses yet'}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[32px] sm:p-6">
        <div className="grid gap-3 sm:gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_auto]">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Prompt, response, domain, or signal..."
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
              Domain
            </label>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value as DomainFilter)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
            >
              {availableDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain === 'all' ? 'All Domains' : domain}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
              Signal
            </label>
            <select
              value={signalFilter}
              onChange={(e) => setSignalFilter(e.target.value as SignalFilter)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
            >
              {availableSignals.map((signal) => (
                <option key={signal} value={signal}>
                  {signal === 'all' ? 'All Signals' : getSignalLabel(signal)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest-score">Highest Score</option>
              <option value="lowest-score">Lowest Score</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Showing {filteredHistory.length} result{filteredHistory.length === 1 ? '' : 's'}
        </div>
      </section>

      {filteredHistory.length === 0 ? (
        <section className="rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:rounded-[32px] sm:p-10">
          <h3 className="text-lg font-semibold text-slate-900">
            {history.length === 0 ? 'No saved responses yet' : 'No matching responses found'}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {history.length === 0
              ? 'Write and save a response in Practice to begin building your reflection history.'
              : 'Try a different search, filter, or sort option.'}
          </p>
        </section>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredHistory.map((item) => {
            const isExpanded = expandedCards[item.cardId] ?? false
            const comparisonVersion = getSelectedComparisonVersion(item)
            const currentVersion = item.versions[0] ?? null

            return (
              <article
                key={item.cardId}
                className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[32px] sm:p-6"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 sm:text-xs">
                          {item.card.domain}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold capitalize text-slate-700 sm:text-xs">
                          {item.card.difficulty}
                        </span>
                        <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700 sm:text-xs">
                          {item.versionCount} version{item.versionCount === 1 ? '' : 's'}
                        </span>
                        {item.card.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-tight text-slate-950 sm:text-xl">
                          {item.card.stem}
                        </h3>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                          {item.card.scenario}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-auto lg:flex-col">
                      <button
                        type="button"
                        onClick={() => onOpenCard(item.cardId)}
                        className="w-full rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
                      >
                        Reopen in Practice
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.cardId)}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                      >
                        {isExpanded ? 'Hide Versions' : 'View Versions'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.cardId)}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-4 min-w-0">
                      <div className="rounded-[20px] bg-slate-50 p-4 sm:rounded-[24px]">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                          Prompt
                        </div>
                        <p className="mt-3 break-words text-sm leading-6 text-slate-800">
                          {item.card.prompt}
                        </p>
                      </div>

                      <div className="rounded-[20px] border border-slate-200 p-4 sm:rounded-[24px]">
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                            Current Saved Response
                          </div>
                          <div className="text-xs text-slate-500">
                            Updated {formatDate(item.updatedAt)}
                          </div>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-900">
                          {item.response}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 min-w-0">
                      <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 sm:rounded-[24px]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                            Response Read
                          </div>
                          <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold text-white sm:text-xs">
                            {item.insight.score} / 5
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-700">
                          {item.insight.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.insight.signals.map((signal) => (
                            <span
                              key={signal}
                              className={`rounded-full px-3 py-1 text-[11px] font-semibold sm:text-xs ${getSignalClasses(signal)}`}
                            >
                              {getSignalLabel(signal)}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 p-4 sm:rounded-[24px]">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 sm:text-xs sm:tracking-[0.18em]">
                          Strengths
                        </div>

                        {item.insight.strengths.length > 0 ? (
                          <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-950">
                            {item.insight.strengths.map((strength, index) => (
                              <li key={`${item.cardId}-strength-${index}`} className="break-words">
                                • {strength}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-3 text-sm text-emerald-950">
                            No clear strengths detected yet.
                          </p>
                        )}
                      </div>

                      <div className="rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:rounded-[24px]">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700 sm:text-xs sm:tracking-[0.18em]">
                          Tighten Next
                        </div>

                        {item.insight.growthAreas.length > 0 ? (
                          <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950">
                            {item.insight.growthAreas.map((area, index) => (
                              <li key={`${item.cardId}-growth-${index}`} className="break-words">
                                • {area}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-3 text-sm text-amber-950">
                            No major growth areas flagged.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:rounded-[28px] sm:p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                            Version History
                          </div>
                          <h4 className="mt-2 text-base font-semibold text-slate-950 sm:text-lg">
                            Compare current thinking to earlier drafts
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            Review how your response has changed and restore an earlier version if needed.
                          </p>
                        </div>

                        {item.versions.length > 1 && (
                          <div className="w-full lg:w-[340px]">
                            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                              Compare current to
                            </label>
                            <select
                              value={comparisonVersion?.versionId ?? ''}
                              onChange={(e) =>
                                handleCompareSelection(item.cardId, e.target.value)
                              }
                              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
                            >
                              {item.versions.slice(1).map((version, index) => (
                                <option key={version.versionId} value={version.versionId}>
                                  Previous Version {item.versions.length - (index + 1)} • {formatDate(version.savedAt)}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 grid gap-3">
                        {item.versions.map((version, index) => (
                          <div
                            key={version.versionId}
                            className="rounded-[20px] border border-slate-200 bg-white p-4 sm:rounded-[24px]"
                          >
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-900">
                                  {getVersionLabel(index, item.versions.length)}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  Saved {formatDate(version.savedAt)}
                                </p>
                              </div>

                              {index !== 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRestoreVersion(item.cardId, version.versionId)
                                  }
                                  className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                                >
                                  Restore This Version
                                </button>
                              )}
                            </div>

                            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-900">
                              {version.response}
                            </p>
                          </div>
                        ))}
                      </div>

                      {currentVersion && comparisonVersion && (
                        <div className="mt-6">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                            Compare Versions
                          </div>

                          <div className="mt-4 grid gap-4 xl:grid-cols-2">
                            <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:rounded-[24px]">
                              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                                  Current Version
                                </div>
                                <div className="text-xs text-slate-500">
                                  {formatDate(currentVersion.savedAt)}
                                </div>
                              </div>

                              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-900">
                                {currentVersion.response}
                              </p>
                            </div>

                            <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:rounded-[24px]">
                              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                                  Comparison Version
                                </div>
                                <div className="text-xs text-slate-500">
                                  {formatDate(comparisonVersion.savedAt)}
                                </div>
                              </div>

                              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-900">
                                {comparisonVersion.response}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}