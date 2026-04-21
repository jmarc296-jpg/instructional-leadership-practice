'use client'

import { useEffect, useMemo, useState } from 'react'
import { QUESTION_BANK } from '@/data/questions'
import { buildSessionPerformance, selectNextQuestion } from '@/lib/adaptive'
import { getAnalyticsSnapshot, getFavorites, getProgress } from '@/lib/local-store'
import type { AnalyticsSnapshot, Card, Domain, SessionSettings } from '@/types'
import { PracticeView } from '@/app/components/components/practice-view'
import { AnalyticsView } from '@/app/components/components/analytics-view'
import { FavoritesView } from '@/app/components/components/favorites-view'
import { ResponseHistoryView } from '@/app/components/components/response-history-view'

type View = 'practice' | 'analytics' | 'favorites' | 'history'
type PracticeFilter = 'all' | Domain

export default function Page() {
  const [view, setView] = useState<View>('practice')
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all')
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showExemplar, setShowExemplar] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [showSummary, setShowSummary] = useState(false)
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const settings: SessionSettings = {
    coachMode: true,
    adaptiveMode: true
  }

  function refreshData() {
    setAnalytics(getAnalyticsSnapshot())
    setFavorites(getFavorites())
  }

  function resetPracticeState() {
    setShowPrompt(false)
    setShowExemplar(false)
    setShowSummary(false)
    setQuestionNumber(1)
  }

  function getFilteredBank() {
    if (practiceFilter === 'all') return QUESTION_BANK
    return QUESTION_BANK.filter(card => card.domain === practiceFilter)
  }

  function getNextCard(): Card | null {
    const bank = getFilteredBank()
    if (!bank.length) return null

    const progress = getProgress()
    const performance = buildSessionPerformance(progress)
    return selectNextQuestion(bank, performance)
  }

  function loadNextCard(resetNumber = false) {
    const nextCard = getNextCard()

    if (!nextCard) {
      setCurrentCard(null)
      return
    }

    setCurrentCard(nextCard)
    setShowPrompt(false)
    setShowExemplar(false)

    if (resetNumber) {
      setQuestionNumber(1)
    }
  }

  useEffect(() => {
    loadNextCard(true)
    refreshData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    resetPracticeState()
    loadNextCard(true)
  }, [practiceFilter])

  function handleNext() {
    const nextCount = questionNumber + 1

    if (nextCount > 5) {
      setShowSummary(true)
      refreshData()
      return
    }

    loadNextCard()
    setQuestionNumber(nextCount)
    refreshData()
  }

  function handleContinueSession() {
    resetPracticeState()
    loadNextCard(true)
  }

  function handleRetryFromSummary() {
    handleRetryWeakestArea()
    setShowSummary(false)
  }

  function handleOpenFavorite(card: Card) {
    setCurrentCard(card)
    setView('practice')
    resetPracticeState()
  }

  function handleOpenCardById(cardId: string) {
    const card = QUESTION_BANK.find(c => c.id === cardId)
    if (!card) return

    setCurrentCard(card)
    setView('practice')
    resetPracticeState()
  }

  const favoriteCards = QUESTION_BANK.filter(card => favorites.includes(card.id))

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

  const recentTrend = useMemo(() => {
    if (!analytics || analytics.recentRatings.length === 0) return 'No ratings yet'

    const strong = analytics.recentRatings.filter(r => r === 'strong').length
    const partial = analytics.recentRatings.filter(r => r === 'partial').length
    const struggled = analytics.recentRatings.filter(r => r === 'struggled').length

    if (strong >= partial && strong >= struggled) return 'Trending strong'
    if (partial >= strong && partial >= struggled) return 'Mostly partial'
    return 'Needs tighter calibration'
  }, [analytics])

  const coachingInsight = useMemo(() => {
    if (!analytics || analytics.totalCompleted === 0) {
      return 'Complete a few scenarios to unlock coaching insight.'
    }

    if (weakestDomain === strongestDomain) {
      return 'Your responses are clustering. Push for sharper distinction in your reasoning.'
    }

    return `Strongest: ${strongestDomain}. Tighten: ${weakestDomain}. Focus on naming the issue faster and making the highest-leverage move explicit.`
  }, [analytics, strongestDomain, weakestDomain])

  function handleRetryWeakestArea() {
    if (!weakestDomain || weakestDomain === '-') {
      setPracticeFilter('all')
    } else {
      setPracticeFilter(weakestDomain as PracticeFilter)
    }

    setView('practice')
    resetPracticeState()
  }

  function handleChangeView(nextView: View) {
    setView(nextView)

    if (nextView === 'practice') {
      if (!currentCard) loadNextCard(true)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {(['practice', 'analytics', 'favorites', 'history'] as View[]).map(v => (
              <button
                key={v}
                onClick={() => handleChangeView(v)}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  view === v
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {v === 'history' ? 'History' : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading...
          </div>
        ) : (
          <>
            {view === 'practice' && (
              <div className="space-y-6">
                {!showSummary && (
                  <>
                    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Practice Focus
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {(['all', 'rigor', 'ddi', 'coaching', 'assessment', 'culture', 'leadership'] as PracticeFilter[]).map(filter => (
                          <button
                            key={filter}
                            onClick={() => setPracticeFilter(filter)}
                            className={`rounded-2xl px-4 py-3 text-sm font-semibold capitalize transition ${
                              practiceFilter === filter
                                ? 'bg-slate-950 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {filter === 'all' ? 'All Domains' : filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    {currentCard ? (
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
                    ) : (
                      <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
                        No questions available. Try another domain.
                      </div>
                    )}
                  </>
                )}

                {showSummary && (
                  <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm space-y-6">
                    <h2 className="text-2xl font-semibold text-slate-950">
                      Session Complete
                    </h2>

                    <p className="text-slate-700">{coachingInsight}</p>

                    <div className="flex gap-4">
                      <button
                        onClick={handleContinueSession}
                        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                      >
                        Continue
                      </button>

                      <button
                        onClick={handleRetryFromSummary}
                        className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700"
                      >
                        Retry Weakest Area
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'analytics' && (
              <AnalyticsView
                analytics={analytics}
                strongestDomain={strongestDomain}
                weakestDomain={weakestDomain}
                recentTrend={recentTrend}
                coachingInsight={coachingInsight}
                onRetryWeakestArea={handleRetryWeakestArea}
              />
            )}

            {view === 'favorites' && (
              <FavoritesView
                favoriteCards={favoriteCards}
                onOpenFavorite={handleOpenFavorite}
              />
            )}

            {view === 'history' && (
              <ResponseHistoryView onOpenCard={handleOpenCardById} />
            )}
          </>
        )}
      </div>
    </main>
  )
}