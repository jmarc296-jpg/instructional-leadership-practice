'use client'

import { useEffect, useMemo, useState } from 'react'
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
    <div className="space-y-4 sm:space-y-6">
      {hasSavedResponse && (
        <section className="rounded-[24px] border border-violet-200 bg-violet-50 p-4 shadow-sm sm:rounded-[28px] sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700 sm:text-xs sm:tracking-[0.22em]">
                Revision Mode
              </div>
              <h2 className="mt-2 text-base font-semibold text-violet-950 sm:text-lg">
                You are revisiting prior thinking on this scenario.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-violet-900">
                {revisionMessage}
              </p>
            </div>

            <div className="inline-flex shrink-0 rounded-2xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
              {versionCount} saved version{versionCount === 1 ? '' : 's'}
            </div>
          </div>
        </section>
      )}

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