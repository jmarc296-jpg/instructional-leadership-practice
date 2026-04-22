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
import {
  getAnalyticsSnapshot,
  getFavorites,
  getProgress
} from '@/lib/local-store'

import type {
  AnalyticsSnapshot,
  Card,
  Domain,
  SessionSettings
} from '@/types'

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

  function getFilteredBank() {
    let bank = QUESTION_BANK

    if (practiceFilter !== 'all') {
      bank = bank.filter((card) => card.domain === practiceFilter)
    }

    if (settings.difficulty !== 'all') {
      bank = bank.filter(
        (card) => card.difficulty === settings.difficulty
      )
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

  function loadNextCard(reset = false) {
    const nextCard = getNextCard()

    if (!nextCard) {
      setCurrentCard(null)
      return
    }

    setCurrentCard(nextCard)
    setShowPrompt(false)
    setShowExemplar(false)

    if (reset) {
      setQuestionNumber(1)
    }
  }

  function scrollToWorkspace() {
    setTimeout(() => {
      const element = document.getElementById('practice-workspace')
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 50)
  }

  function handleLaunchPractice() {
    setActiveTab('practice')

    if (!currentCard) {
      loadNextCard(true)
    }

    setShowPrompt(true)
    scrollToWorkspace()
  }

  useEffect(() => {
    loadNextCard(true)
    refreshData()
    setIsLoading(false)
  }, [])

  function handleNext() {
    loadNextCard()
    setQuestionNumber((prev) => prev + 1)
    refreshData()
  }

  const favoriteCards = QUESTION_BANK.filter((card) =>
    favorites.includes(card.id)
  )

  const strongestDomain = useMemo(() => {
    if (!analytics) return '-'

    const entries = Object.entries(
      analytics.averageRatingByDomain
    )

    if (!entries.length) return '-'

    return entries.sort((a, b) => b[1] - a[1])[0][0]
  }, [analytics])

  const weakestDomain = useMemo(() => {
    if (!analytics) return '-'

    const entries = Object.entries(
      analytics.averageRatingByDomain
    )

    if (!entries.length) return '-'

    return entries.sort((a, b) => a[1] - b[1])[0][0]
  }, [analytics])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* NAV */}
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
            {/* HERO */}
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
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Launch Practice Session
                  </button>

                  <button
                    onClick={scrollToWorkspace}
                    className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-50"
                  >
                    Continue Previous Session
                  </button>
                </div>
              </div>

              {/* PREMIUM HERO PANEL */}
              <div className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="school leadership meeting"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent" />

                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6">
                  <div className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    Leadership Simulation
                  </div>

                  <div className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950">
                    Live Product
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3 text-xs uppercase tracking-[0.25em] opacity-80">
                    Real-world decision reps
                  </div>

                  <h3 className="mb-3 text-3xl font-bold leading-tight">
                    Practice the moments that define strong leadership
                  </h3>

                  <p className="text-sm leading-6 text-white/90">
                    Coaching conversations, DDI meetings, instructional alignment,
                    and principal decision-making.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                        Scenarios
                      </div>
                      <div className="mt-1 text-2xl font-bold">
                        {analytics?.totalCompleted ?? 0}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                        Strongest
                      </div>
                      <div className="mt-1 text-xl font-bold capitalize">
                        {strongestDomain === '-' ? 'Pending' : strongestDomain}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WORKSPACE */}
            <div
              id="practice-workspace"
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SessionSetup
                    settings={settings}
                    setSettings={setSettings}
                  />
                </div>
              </div>

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
          </>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            analytics={analytics}
            strongestDomain={strongestDomain}
            weakestDomain={weakestDomain}
            recentTrend="Trending stronger"
            coachingInsight="Continue tightening precision."
            onRetryWeakestArea={() =>
              setActiveTab('practice')
            }
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favoriteCards={favoriteCards}
            onOpenFavorite={(card) => {
              setCurrentCard(card)
              setActiveTab('practice')
              setShowPrompt(true)
              scrollToWorkspace()
            }}
          />
        )}

        {activeTab === 'history' && (
          <ResponseHistoryView
            onOpenCard={(id) => {
              const card = QUESTION_BANK.find(
                (c) => c.id === id
              )

              if (card) {
                setCurrentCard(card)
                setActiveTab('practice')
                setShowPrompt(true)
                scrollToWorkspace()
              }
            }}
          />
        )}
      </div>
    </main>
  )
}