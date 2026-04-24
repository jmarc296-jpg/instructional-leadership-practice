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
  const [timeLeft, setTimeLeft] = useState(180)

  useEffect(() => {
    setTimeLeft(180)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentCard])

  if (isLoading) {
    return (
      <section id="practice-workspace" className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="premium-panel rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          Loading practice workspace...
        </div>
      </section>
    )
  }

  return (
    <section id="practice-workspace" className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <div className="space-y-6">
        <div className="premium-panel rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <SessionSetup settings={settings} setSettings={setSettings} />
        </div>
      </div>

      <div className="premium-panel rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Response Workspace
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Make your leadership move
          </h2>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                High Stakes Scenario
              </div>
              <div className="mt-1 text-sm text-slate-700">
                You are being evaluated in real time.
              </div>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          </div>

          <p className="mt-4 text-slate-600 leading-7">
            Respond like you&apos;re in the actual moment. Be specific, strategic, and action-oriented.
          </p>
        </div>

        {currentCard ? (
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
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
            No questions available.
          </div>
        )}
      </div>
    </section>
  )
}
