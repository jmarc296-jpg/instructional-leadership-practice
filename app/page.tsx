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
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src="/logo.png"
                    alt="LeadSharper logo"
                    className="h-14 w-auto"
                  />
                  <div className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                    LeadSharper
                  </div>
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

              <div className="hero-gradient relative min-h-[420px] overflow-hidden p-8">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
                  <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-cyan-300 blur-2xl" />
                  <div className="absolute right-12 bottom-16 h-20 w-20 rounded-full bg-indigo-200 blur-2xl" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                      LeadSharper
                    </div>

                    <div className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950">
                      Live Product
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/75">
                      Leadership Simulation
                    </div>

                    <h3 className="max-w-md text-3xl font-bold leading-tight text-white">
                      Practice the moments that define strong school leadership
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
                      Coaching conversations, DDI meetings, instructional alignment,
                      and principal decision-making.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                        Scenario Reps
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        {analytics?.totalCompleted ?? 0}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                        Strongest Domain
                      </div>
                      <div className="mt-1 text-xl font-bold capitalize text-white">
                        {strongestDomain === '-' ? 'Pending' : strongestDomain}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                        Adaptive Mode
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {settings.adaptiveMode ? 'On' : 'Off'}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                        Coach Insights
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {settings.coachMode ? 'On' : 'Off'}
                      </div>
                    </div>
                  </div>
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
            onRetryWeakestArea={() => setActiveTab('practice')}
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
              const card = QUESTION_BANK.find((c) => c.id === id)

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