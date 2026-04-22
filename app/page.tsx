'use client'

import { useEffect, useMemo, useState } from 'react'
import { QUESTION_BANK } from '@/data/questions'
import { buildSessionPerformance, selectNextQuestion } from '@/lib/adaptive'
import { getAnalyticsSnapshot, getFavorites, getProgress } from '@/lib/local-store'
import type { AnalyticsSnapshot, Card, Domain, SessionSettings } from '@/types'

import { PracticeView } from '@/components/practice-view'
import { AnalyticsView } from '@/components/analytics-view'
import { FavoritesView } from '@/components/favorites-view'
import { ResponseHistoryView } from '@/components/response-history-view'
import { SessionSetup } from '@/components/session-setup'

type View = 'practice' | 'analytics' | 'favorites' | 'history'
type PracticeFilter = 'all' | Domain

export default function Page() {
  const [view, setView] = useState<View>('practice')
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all')
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showExemplar, setShowExemplar] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [settings, setSettings] = useState<SessionSettings>({
    coachMode: true,
    adaptiveMode: true,
    mode: 'quiz',
    sessionLength: 5
  })

  function refreshData() {
    setAnalytics(getAnalyticsSnapshot())
    setFavorites(getFavorites())
  }

  function getFilteredBank() {
    if (practiceFilter === 'all') return QUESTION_BANK
    return QUESTION_BANK.filter(card => card.domain === practiceFilter)
  }

  function getNextCard() {
    const bank = getFilteredBank()
    const progress = getProgress()
    const performance = buildSessionPerformance(progress)
    return selectNextQuestion(bank, performance)
  }

  function loadNextCard(reset = false) {
    const nextCard = getNextCard()

    setCurrentCard(nextCard || null)
    setShowPrompt(false)
    setShowExemplar(false)

    if (reset) {
      setQuestionNumber(1)
    }
  }

  useEffect(() => {
    loadNextCard(true)
    refreshData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    loadNextCard(true)
  }, [practiceFilter])

  function handleNext() {
    loadNextCard()
    setQuestionNumber(prev => prev + 1)
    refreshData()
  }

  const favoriteCards = QUESTION_BANK.filter(card =>
    favorites.includes(card.id)
  )

  const strongestDomain = useMemo(() => {
    if (!analytics) return '-'
    const entries = Object.entries(analytics.averageRatingByDomain)
    if (!entries.length) return '-'
    return entries.sort((a, b) => b[1] - a[1])[0][0]
  }, [analytics])

  const weakestDomain = useMemo(() => {
    if (!analytics) return '-'
    const entries = Object.entries(analytics.averageRatingByDomain)
    if (!entries.length) return '-'
    return entries.sort((a, b) => a[1] - b[1])[0][0]
  }, [analytics])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* NAV */}
        <div className="mb-8 rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-3">
            {(['practice', 'analytics', 'favorites', 'history'] as View[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold ${
                  view === v
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* HERO */}
        {view === 'practice' && (
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-3xl bg-white p-10 shadow-sm border border-slate-200">
              <div className="mb-4 text-xs font-bold tracking-[0.25em] text-blue-600 uppercase">
                Instructional Leadership Practice
              </div>

              <h1 className="text-5xl font-bold leading-tight text-slate-950 mb-5">
                Sharpen your leadership judgment through realistic practice.
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl">
                Practice high-stakes leadership decisions, strengthen your
                coaching instincts, and build stronger responses through
                scenario-based repetition.
              </p>
            </div>

            {/* Visual card */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
              <div className="text-sm uppercase tracking-widest opacity-80 mb-6">
                Practice Engine
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  Question Bank: {QUESTION_BANK.length}
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  Adaptive Practice
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  Response Scoring
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  Revision History
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        {view === 'practice' && (
          <div className="grid gap-6 lg:grid-cols-3">

            {/* LEFT SIDE */}
            <div className="space-y-6">

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <SessionSetup
                  settings={settings}
                  setSettings={setSettings}
                />
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                  Practice Focus
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['all','rigor','ddi','coaching','assessment','culture','leadership'] as PracticeFilter[]).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setPracticeFilter(filter)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium ${
                        practiceFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {filter === 'all' ? 'All Domains' : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-2">
              {currentCard && (
                <PracticeView
                  card={currentCard}
                  settings={settings}
                  progressLabel={`Question ${questionNumber}`}
                  showPrompt={showPrompt}
                  showExemplar={showExemplar}
                  onRevealPrompt={() => setShowPrompt(true)}
                  onRevealExemplar={() => setShowExemplar(true)}
                  onNext={handleNext}
                />
              )}
            </div>
          </div>
        )}

        {view === 'analytics' && (
          <AnalyticsView
            analytics={analytics}
            strongestDomain={strongestDomain}
            weakestDomain={weakestDomain}
            recentTrend="Trending stronger"
            coachingInsight="Continue tightening precision."
            onRetryWeakestArea={() => setView('practice')}
          />
        )}

        {view === 'favorites' && (
          <FavoritesView
            favoriteCards={favoriteCards}
            onOpenFavorite={(card) => {
              setCurrentCard(card)
              setView('practice')
            }}
          />
        )}

        {view === 'history' && (
          <ResponseHistoryView
            onOpenCard={(id) => {
              const card = QUESTION_BANK.find(c => c.id === id)
              if (card) {
                setCurrentCard(card)
                setView('practice')
              }
            }}
          />
        )}
      </div>
    </main>
  )
}