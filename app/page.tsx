'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Brain,
  BarChart3,
  Heart,
  History as HistoryIcon
} from 'lucide-react'
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<View>('practice')
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all')
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showExemplar, setShowExemplar] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [showSummary, setShowSummary] = useState(false)
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [settings, setSettings] = useState<SessionSettings>({
    coachMode: true,
    adaptiveMode: true,
    mode: 'quiz',
    category: 'all',
    difficulty: 'all',
    sessionLength: 5,
    includePrompt: false,
    includeExemplar: true
  })

  const tabs = [
    { id: 'practice' as View, label: 'Practice', icon: Brain },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
    { id: 'favorites' as View, label: 'Favorites', icon: Heart },
    { id: 'history' as View, label: 'History', icon: HistoryIcon }
  ]

  function refreshData() {
    setAnalytics(getAnalyticsSnapshot())
    setFavorites(getFavorites())
  }

  function resetPracticeState() {
    setShowPrompt(Boolean(settings.includePrompt || settings.mode === 'review'))
    setShowExemplar(false)
    setShowSummary(false)
    setQuestionNumber(1)
  }

  function getFilteredBank() {
    let bank = QUESTION_BANK

    if (practiceFilter !== 'all') {
      bank = bank.filter((card) => card.domain === practiceFilter)
    }

    if (settings.difficulty && settings.difficulty !== 'all') {
      bank = bank.filter((card) => card.difficulty === settings.difficulty)
    }

    return bank
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
    setShowPrompt(Boolean(settings.includePrompt || settings.mode === 'review'))
    setShowExemplar(false)

    if (resetNumber) {
      setQuestionNumber(1)
    }
  }

  function scrollToWorkspace() {
    setTimeout(() => {
      const element = document.getElementById('practice-workspace')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  function handleLaunchPractice() {
    setActiveTab('practice')
    if (!currentCard) {
      loadNextCard(true)
    }
    setShowPrompt(true)
    setShowExemplar(false)
    scrollToWorkspace()
  }

  function handleContinuePractice() {
    setActiveTab('practice')
    scrollToWorkspace()
  }

  useEffect(() => {
    loadNextCard(true)
    refreshData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!settings.category || settings.category === 'all') {
      setPracticeFilter('all')
    } else {
      setPracticeFilter(settings.category as PracticeFilter)
    }
  }, [settings.category])

  useEffect(() => {
    resetPracticeState()
    loadNextCard(true)
  }, [practiceFilter, settings.difficulty])

  function handleNext() {
    const nextCount = questionNumber + 1
    const targetLength = settings.sessionLength || 5

    if (nextCount > targetLength) {
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
    scrollToWorkspace()
  }

  function handleRetryFromSummary() {
    handleRetryWeakestArea()
    setShowSummary(false)
    scrollToWorkspace()
  }

  function handleOpenFavorite(card: Card) {
    setCurrentCard(card)
    setActiveTab('practice')
    setShowPrompt(true)
    setShowExemplar(false)
    scrollToWorkspace()
  }

  function handleOpenCardById(cardId: string) {
    const card = QUESTION_BANK.find((c) => c.id === cardId)
    if (!card) return

    setCurrentCard(card)
    setActiveTab('practice')
    setShowPrompt(true)
    setShowExemplar(false)
    scrollToWorkspace()
  }

  const favoriteCards = QUESTION_BANK.filter((card) =>
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

  const recentTrend = useMemo(() => {
    if (!analytics || analytics.recentRatings.length === 0) return 'No ratings yet'

    const strong = analytics.recentRatings.filter((r) => r === 'strong').length
    const partial = analytics.recentRatings.filter((r) => r === 'partial').length
    const struggled = analytics.recentRatings.filter((r) => r === 'struggled').length

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
      setSettings((prev) => ({ ...prev, category: 'all' }))
    } else {
      setPracticeFilter(weakestDomain as PracticeFilter)
      setSettings((prev) => ({
        ...prev,
        category: weakestDomain as Domain
      }))
    }

    setActiveTab('practice')
    resetPracticeState()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {activeTab === 'practice' && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
                  Instructional Leadership Practice
                </div>

                <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900">
                  Build elite instructional leadership judgment through realistic scenario practice.
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                  Practice high-stakes leadership decisions, sharpen your coaching instincts,
                  and strengthen response quality through repeated scenario-based reps.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handleLaunchPractice}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Launch Practice Session
                  </button>

                  <button
                    onClick={handleContinuePractice}
                    className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-50"
                  >
                    Continue Previous Session
                  </button>
                </div>
              </div>

              <div className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="leadership meeting"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="mb-3 text-xs uppercase tracking-[0.25em] opacity-80">
                    Real-world leadership reps
                  </div>

                  <h3 className="mb-2 text-2xl font-bold">
                    Practice decisions leaders face every day
                  </h3>

                  <p className="max-w-sm text-sm opacity-90">
                    Coaching conversations. Data meetings. Instructional decisions.
                    Build sharper judgment before the real moment arrives.
                  </p>
                </div>
              </div>
            </div>

            <div id="practice-workspace" className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SessionSetup
                    settings={settings}
                    setSettings={setSettings}
                  />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                    Practice Focus
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {(
                      [
                        'all',
                        'rigor',
                        'ddi',
                        'coaching',
                        'assessment',
                        'culture',
                        'leadership'
                      ] as PracticeFilter[]
                    ).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setPracticeFilter(filter)
                          setSettings((prev) => ({
                            ...prev,
                            category: filter === 'all' ? 'all' : filter
                          }))
                        }}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                          practiceFilter === filter
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {filter === 'all' ? 'All Domains' : filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] opacity-70">
                    Performance Snapshot
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-sm opacity-70">Scenarios Completed</div>
                      <div className="text-3xl font-bold">
                        {analytics?.totalCompleted ?? 0}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-sm opacity-70">Strongest Domain</div>
                      <div className="text-2xl font-bold capitalize">
                        {strongestDomain === '-' ? 'Not enough data' : strongestDomain}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-sm opacity-70">Recent Trend</div>
                      <div className="text-2xl font-bold">{recentTrend}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                {isLoading ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
                    Loading practice workspace...
                  </div>
                ) : showSummary ? (
                  <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-950">
                      Session Complete
                    </h2>

                    <p className="text-base leading-relaxed text-slate-600">
                      {coachingInsight}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleContinueSession}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Start New Session
                      </button>

                      <button
                        onClick={handleRetryFromSummary}
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-50"
                      >
                        Retry Weakest Area
                      </button>
                    </div>
                  </div>
                ) : currentCard ? (
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
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
                    No questions available for this configuration. Try another domain or difficulty.
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            analytics={analytics}
            strongestDomain={strongestDomain}
            weakestDomain={weakestDomain}
            recentTrend={recentTrend}
            coachingInsight={coachingInsight}
            onRetryWeakestArea={handleRetryWeakestArea}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favoriteCards={favoriteCards}
            onOpenFavorite={handleOpenFavorite}
          />
        )}

        {activeTab === 'history' && (
          <ResponseHistoryView onOpenCard={handleOpenCardById} />
        )}
      </div>
    </main>
  )
}