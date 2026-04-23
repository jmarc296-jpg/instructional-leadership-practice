'use client'

import { useMemo } from 'react'
import {
  Clock3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RotateCcw
} from 'lucide-react'

import { QUESTION_BANK } from '@/data/questions'
import {
  getAllWrittenResponses,
  getResponseVersions
} from '@/lib/local-store'
import {
  analyzeResponse,
  type ResponseSignal
} from '@/lib/response-insights'

import type {
  Domain,
  ResponseVersion
} from '@/types'

type Props = {
  onOpenCard: (cardId: string) => void
}

function getSignalClasses(signal: ResponseSignal) {
  switch (signal) {
    case 'evidence':
      return 'bg-blue-100 text-blue-700'
    case 'prioritization':
      return 'bg-purple-100 text-purple-700'
    case 'clarity':
      return 'bg-emerald-100 text-emerald-700'
    case 'leadership-action':
      return 'bg-orange-100 text-orange-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

function formatDomain(domain: Domain) {
  return domain.charAt(0).toUpperCase() + domain.slice(1)
}

export function ResponseHistoryView({ onOpenCard }: Props) {
  const historyItems = useMemo(() => {
    const history = getAllWrittenResponses()

    return history
      .map((item: { cardId: string; response: string; updatedAt?: string }) => {
        const card = QUESTION_BANK.find((q) => q.id === item.cardId)

        if (!card) return null

        const versions: ResponseVersion[] = getResponseVersions(item.cardId)
        const insight = analyzeResponse(item.response, card.exemplar)

        return {
          cardId: item.cardId,
          response: item.response,
          updatedAt: item.updatedAt ?? new Date().toISOString(),
          versionCount: versions.length,
          card,
          versions,
          insight
        }
      })
      .filter(Boolean)
      .sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      )
  }, [])

  if (historyItems.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <Clock3 className="mx-auto mb-4 h-10 w-10 text-slate-400" />

        <h3 className="text-xl font-bold text-slate-900">
          No response history yet
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Complete leadership scenarios and your response history will appear
          here with strengths, growth areas, and revision opportunities.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {historyItems.map((item: any) => (
        <div
          key={item.cardId}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {formatDomain(item.card.domain)}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {item.card.difficulty}
                </span>

                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  {item.versionCount} version{item.versionCount === 1 ? '' : 's'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {item.card.stem}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.card.scenario}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Your Latest Response
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {item.response}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.insight.signals.map((signal: ResponseSignal) => (
                  <span
                    key={signal}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getSignalClasses(
                      signal
                    )}`}
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <CheckCircle2 size={16} />
                    Strengths
                  </div>

                  {item.insight.strengths.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-emerald-900">
                      {item.insight.strengths.map(
                        (strength: string, index: number) => (
                          <li key={`${item.cardId}-strength-${index}`}>
                            • {strength}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-emerald-900">
                      Continue sharpening your leadership precision.
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-amber-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <AlertTriangle size={16} />
                    Growth Areas
                  </div>

                  {item.insight.grows.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-amber-900">
                      {item.insight.grows.map(
                        (grow: string, index: number) => (
                          <li key={`${item.cardId}-grow-${index}`}>
                            • {grow}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-amber-900">
                      Strong response. Continue refining execution language.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0">
              <button
                onClick={() => onOpenCard(item.cardId)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                <RotateCcw size={16} />
                Retry Scenario
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-[28px] border border-blue-100 bg-blue-50 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          <TrendingUp size={16} />
          Leadership Growth Insight
        </div>

        <p className="mt-3 text-sm leading-7 text-blue-900">
          The strongest leaders improve through repetition. Revisit previous
          scenarios, tighten your thinking, and strengthen execution clarity.
        </p>
      </div>
    </div>
  )
}