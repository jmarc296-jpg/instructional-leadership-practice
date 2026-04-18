'use client'

import { useEffect, useMemo, useState } from 'react'
import { AuthPanel } from '@/components/auth-panel'
import { EmptyState } from '@/components/empty-state'
import { PracticeCard } from '@/components/practice-card'
import { SessionSetup } from '@/components/session-setup'
import { getProgress, getQuestions } from '@/lib/local-store'
import { buildSession } from '@/lib/session'
import type { Card, SessionSettings } from '@/types'

export default function HomePage() {
  const [questionBank, setQuestionBank] = useState<Card[]>([])
  const [settings, setSettings] = useState<SessionSettings>({
    mode: 'quiz',
    includePrompt: true,
    includeExemplar: true,
    category: 'all',
    difficulty: 'all',
    sessionLength: 10
  })
  const [started, setStarted] = useState(false)
  const [sessionCards, setSessionCards] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showExemplar, setShowExemplar] = useState(false)
  const [recentlySeenIds, setRecentlySeenIds] = useState<string[]>([])

  useEffect(() => {
    setQuestionBank(getQuestions())
    setRecentlySeenIds(getProgress())
  }, [])

  const currentCard = sessionCards[currentIndex]

  const progressLabel = useMemo(() => {
    if (!started || sessionCards.length === 0) return 'Not started'
    return `${currentIndex + 1} of ${sessionCards.length}`
  }, [currentIndex, sessionCards.length, started])

  function startSession() {
    const freshBank = getQuestions()
    setQuestionBank(freshBank)
    const cards = buildSession(freshBank, settings, getProgress())
    setSessionCards(cards)
    setCurrentIndex(0)
    setShowPrompt(settings.mode === 'review' && settings.includePrompt)
    setShowExemplar(settings.mode === 'review' && settings.includeExemplar)
    setStarted(true)
  }

  function goToNext() {
    const nextIndex = currentIndex + 1

    if (nextIndex >= sessionCards.length) {
      setStarted(false)
      setCurrentIndex(0)
      setSessionCards([])
      setShowPrompt(false)
      setShowExemplar(false)
      setRecentlySeenIds(getProgress())
      return
    }

    setCurrentIndex(nextIndex)
    setShowPrompt(settings.mode === 'review' && settings.includePrompt)
    setShowExemplar(settings.mode === 'review' && settings.includeExemplar)
  }

  function resetSettings() {
    setStarted(false)
    setCurrentIndex(0)
    setSessionCards([])
    setShowPrompt(false)
    setShowExemplar(false)
  }

  return (
    <main className="stack">
      <AuthPanel />

      <header className="card" style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Instructional Leadership Practice</div>
            <h1 style={{ fontSize: 44, margin: '10px 0' }}>
              Stay sharp with scenario-based quiz and review cards
            </h1>
            <p className="small" style={{ fontSize: 16, lineHeight: 1.7 }}>
              Choose your mode, decide whether to include prompts and exemplar responses,
              and click through a focused session built to strengthen instructional leadership judgment.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--soft)', padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Question bank</div>
            <div className="small">{questionBank.length} active cards</div>
          </div>
        </div>
      </header>

      <section className="grid-main">
        <SessionSetup
          settings={settings}
          setSettings={setSettings}
          onBegin={startSession}
          onReset={resetSettings}
        />

        {!started || !currentCard ? (
          <EmptyState />
        ) : (
          <PracticeCard
            card={currentCard}
            settings={settings}
            progressLabel={progressLabel}
            isLastCard={currentIndex + 1 >= sessionCards.length}
            showPrompt={showPrompt}
            showExemplar={showExemplar}
            onRevealPrompt={() => setShowPrompt(true)}
            onRevealExemplar={() => setShowExemplar(true)}
            onNext={goToNext}
          />
        )}
      </section>
    </main>
  )
}
