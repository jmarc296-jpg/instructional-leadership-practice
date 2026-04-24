'use client'

import { useEffect, useState } from 'react'

import { PracticeView } from '@/components/practice-view'
import { SessionSetup } from '@/components/session-setup'
import type { Card, SessionSettings } from '@/types'

type Props = {
  settings: SessionSettings
  setSettings: React.Dispatch<React.SetStateAction<SessionSettings>>
  isLoading: boolean
  currentCard: Card | null
  questionNumber: number
  showPrompt: boolean
  showExemplar: boolean
  onRevealPrompt: () => void
  onRevealExemplar: () => void
  onNext: () => void
}

export function PracticeWorkspace({
  settings,
  setSettings,
  isLoading,
  currentCard,
  questionNumber,
  showPrompt,
  showExemplar,
  onRevealPrompt,
  onRevealExemplar,
  onNext
}: Props) {
  if (isLoading) {
    return (
      <section
        id="practice-workspace"
        className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Session Setup
          </div>
          <div className="mt-4 text-slate-500">Loading practice workspace...</div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Response Workspace
          </div>
          <div className="mt-4 text-slate-500">Loading scenario...</div>
        </div>
      </section>
    )
  }

  if (!currentCard) {
    return (
      <section
        id="practice-workspace"
        className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <SessionSetup
            settings={settings}
            setSettings={setSettings}
          />
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Response Workspace
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            No simulation loaded
          </h2>
          <p className="mt-3 text-slate-600 leading-7">
            Adjust your session settings and launch a practice scenario to begin.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="practice-workspace"
      className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]"
    >
      <div className="space-y-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <SessionSetup
            settings={settings}
            setSettings={setSettings}
          />
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                Leadership Scenario
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 capitalize">
                {currentCard.domain}
              </h2>
            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Question {questionNumber}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Scenario
              </div>
              <p className="mt-2 text-base leading-8 text-slate-700">
                {currentCard.scenario}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Leadership Prompt
              </div>
              <p className="mt-2 text-base font-medium leading-8 text-slate-900">
                {currentCard.prompt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Response Workspace
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Make your leadership move
          </h2>

          <p className="mt-2 text-slate-600 leading-7">
            Respond like you&apos;re in the actual moment. Be specific, strategic,
            and action-oriented.
          </p>
        </div>

        <PracticeView
          card={currentCard}
          settings={settings}
          progressLabel={`Question ${questionNumber}`}
          showPrompt={showPrompt}
          showExemplar={showExemplar}
          onRevealPrompt={onRevealPrompt}
          onRevealExemplar={onRevealExemplar}
          onNext={onNext}
        />
      </div>
    </section>
  )
}
