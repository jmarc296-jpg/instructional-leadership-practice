'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Brain,
  BarChart3,
  Heart,
  History as HistoryIcon,
  MessageSquareMore,
  LineChart,
  ShieldCheck,
  ArrowRight,
  Sparkles
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

  const recentTrend = useMemo(() => {
    if (!analytics || analytics.recentRatings.length === 0) {
      return 'No ratings yet'
    }

    const strong = analytics.recentRatings.filter((r) => r === 'strong').length
    const partial = analytics.recentRatings.filter((r) => r === 'partial').length
    const struggled = analytics.recentRatings.filter((r) => r === 'struggled').length

    if (strong >= partial && strong >= struggled) return 'Trending strong'
    if (partial >= strong && partial >= struggled) return 'Mostly partial'
    return 'Needs calibration'
  }, [analytics])

  const coachingInsight = useMemo(() => {
    if (!analytics || analytics.totalCompleted === 0) {
      return 'Complete scenarios to unlock coaching insights.'
    }

    return `Strongest: ${strongestDomain}. Tighten: ${weakestDomain}.`
  }, [analytics, strongestDomain, weakestDomain])

  function handleRetryWeakestArea() {
    setActiveTab('practice')
    loadNextCard(true)
    scrollToWorkspace()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-950 text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </header>

        {activeTab === 'practice' && (
          <>
            <section className="grid gap-5 lg:grid-cols-[1.95fr_1fr]">
              <div className="rounded-[32px] border border-slate-200/80 bg-white px-8 py-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:px-10 sm:py-10 lg:px-12">
                <div className="mb-8 flex items-center gap-5">
                  <img
                    src="/logo.png"
                    alt="LeadSharper Logo"
                    className="h-20 w-auto object-contain"
                  />

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-600">
                      LeadSharper
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      Sharpen leads. Accelerate growth.
                    </div>
                  </div>
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  <Sparkles size={14} />
                  Flight simulator for instructional leaders
                </div>

                <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-slate-950 sm:text-6xl">
                  Train for the moments school leaders are rarely prepared for.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  Tough coaching conversations. DDI meetings that go off track.
                  Teacher pushback. Misaligned instruction. Practice the exact
                  moments leaders face every week before they happen in real life.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handleLaunchPractice}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Start Practicing Now
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={scrollToWorkspace}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    See How It Works
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-6 text-sm text-slate-500">
                  <span>Principals</span>
                  <span>Assistant Principals</span>
                  <span>Instructional Coaches</span>
                  <span>District Leaders</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-7 text-white shadow-[0_20px_50px_rgba(37,99,235,0.28)] min-h-[360px]">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                      Leadership Simulator
                    </div>

                    <div className="rounded-full bg-emerald-400 px-4 py-2 text-[11px] font-semibold text-slate-950">
                      Live Product
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/75">
                      Leadership Simulation
                    </div>

                    <h3 className="max-w-sm text-3xl font-bold leading-tight text-white">
                      Rehearse high-stakes leadership moments before they happen in real life.
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/85">
                      Practice coaching conversations, data meetings, instructional
                      judgment calls, and accountability moves with higher stakes
                      and clearer feedback.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Scenario Reps
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        {analytics?.totalCompleted ?? 0}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Strongest Domain
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {strongestDomain === '-' ? 'Pending' : strongestDomain}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Adaptive Mode
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {settings.adaptiveMode ? 'On' : 'Off'}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Coach Insights
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {settings.coachMode ? 'On' : 'Off'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <MessageSquareMore size={22} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Coaching conversations
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Navigate resistance, accountability moments, and teacher
                  development conversations with more clarity and control.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <LineChart size={22} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Difficult DDI meetings
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Lead data conversations that produce action, not excuses, when
                  urgency is high and execution is uneven.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={22} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Instructional judgment
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Make stronger calls when walkthrough evidence, politics, pacing,
                  and student outcomes collide at the same time.
                </p>
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200/80 bg-white px-8 py-7 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
              <div className="max-w-4xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
                  Why this exists
                </div>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
                  Pilots train in simulators before flying real planes. School leaders rarely get that luxury.
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  LeadSharper gives leaders a place to practice the judgment,
                  language, and decision-making real schools demand before the
                  pressure is live. Built from real principal coaching, school
                  turnaround work, and instructional leadership support.
                </p>
              </div>
            </section>

            <section id="practice-workspace" className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                <SessionSetup
                  settings={settings}
                  setSettings={setSettings}
                />
              </div>

              <div className="lg:col-span-2">
                {isLoading ? (
                  <div className="rounded-[28px] border border-slate-200/80 bg-white p-8 text-slate-500 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                    Loading practice workspace...
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
                  <div className="rounded-[28px] border border-slate-200/80 bg-white p-8 text-slate-500 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                    No questions available for this configuration.
                  </div>
                )}
              </div>
            </section>
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