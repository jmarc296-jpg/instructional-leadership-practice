'use client'

import { useEffect, useMemo, useState } from 'react'
import { PenSquare, RefreshCcw } from 'lucide-react'
import { getResponseVersions, getWrittenResponse } from '@/lib/local-store'
import type { Card, SessionSettings } from '@/types'
import { PracticeCard } from '@/components/practice-card'

type Props = {
  card: Card
  settings: SessionSettings
  progressLabel: string
  isLastCard?: boolean
  showPrompt: boolean
  showExemplar: boolean
  onRevealPrompt: () => void
  onRevealExemplar: () => void
  onNext: () => void
}

export function PracticeView({
  card,
  settings,
  progressLabel,
  isLastCard = false,
  showPrompt,
  showExemplar,
  onRevealPrompt,
  onRevealExemplar,
  onNext
}: Props) {
  const [hasSavedResponse, setHasSavedResponse] = useState(false)
  const [versionCount, setVersionCount] = useState(0)

  useEffect(() => {
    const savedResponse = getWrittenResponse(card.id)
    const versions = getResponseVersions(card.id)

    setHasSavedResponse(savedResponse.trim().length > 0)
    setVersionCount(versions.length)
  }, [card.id])

  const revisionMessage = useMemo(() => {
    if (!hasSavedResponse) return null

    if (versionCount <= 1) {
      return 'You are revisiting this scenario. Tighten the issue, evidence, and next move.'
    }

    return 'You are revisiting prior thinking. Use this round to sharpen precision, raise the quality of evidence, and make the leadership move more explicit.'
  }, [hasSavedResponse, versionCount])

  return (
    <div className="space-y-6 fade-in">
      {/* Header Banner */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.3fr_0.8fr]">
          <div className="p-6 sm:p-8">
            <div className="section-label">Practice Workspace</div>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Build stronger judgment through real scenario reps
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Read carefully, diagnose precisely, and make the next leadership
              move explicit. Strong reps come from clarity, evidence, and revision.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {progressLabel}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold capitalize text-slate-700">
                {card.domain}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold capitalize text-slate-700">
                {card.difficulty}
              </div>
            </div>
          </div>

          <div className="hero-gradient p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              Current Scenario
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-white/80">
                  <PenSquare size={16} />
                  <div className="text-sm">Response Mode</div>
                </div>
                <div className="mt-2 text-2xl font-bold text-white">
                  {showExemplar ? 'Reflection' : showPrompt ? 'Active Writing' : 'Ready'}
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-white/80">
                  <RefreshCcw size={16} />
                  <div className="text-sm">Revision Status</div>
                </div>
                <div className="mt-2 text-2xl font-bold text-white">
                  {hasSavedResponse ? `${versionCount} Version${versionCount === 1 ? '' : 's'}` : 'New Response'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revision Banner */}
      {hasSavedResponse && (
        <section className="rounded-3xl border border-violet-200 bg-violet-50 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-violet-700">
                Revision Mode
              </div>

              <h3 className="mt-2 text-xl font-bold text-violet-950">
                You are revisiting prior thinking on this scenario.
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-violet-900">
                {revisionMessage}
              </p>
            </div>

            <div className="inline-flex shrink-0 rounded-2xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
              {versionCount} saved version{versionCount === 1 ? '' : 's'}
            </div>
          </div>
        </section>
      )}

      {/* Main Practice Card */}
      <PracticeCard
        card={card}
        settings={settings}
        progressLabel={progressLabel}
        isLastCard={isLastCard}
        showPrompt={showPrompt}
        showExemplar={showExemplar}
        onRevealPrompt={onRevealPrompt}
        onRevealExemplar={onRevealExemplar}
        onNext={onNext}
      />
    </div>
  )
}