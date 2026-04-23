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
  const [practiceFilter] = useState<PracticeFilter>('all')
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
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* NAV */}
        <header className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold ${
                    activeTab === tab.id
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-700'
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
            {/* HERO */}
            <section className="grid gap-5 lg:grid-cols-[1.95fr_1fr]">

              {/* LEFT SIDE */}
              <div className="rounded-[32px] border border-slate-200 bg-white px-10 py-10 shadow-sm">

                {/* NEW LOGO BLOCK */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src="/logo.png"
                      alt="LeadSharper Logo"
                      className="h-28 sm:h-32 lg:h-36 w-auto object-contain"
                    />
                  </div>

                  <div className="max-w-md">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                      LeadSharper
                    </div>

                    <div className="mt-2 text-lg sm:text-xl font-medium text-slate-700 leading-relaxed">
                      Sharpen your Leadership. Accelerate your Growth.
                    </div>
                  </div>
                </div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  <Sparkles size={14} />
                  Flight Simulator for Instructional Leaders
                </div>

                <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-[0.95] text-slate-950">
                  Train for the moments school leaders are rarely prepared for.
                </h1>

                <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">
                  Tough coaching conversations. DDI meetings that go off track.
                  Teacher pushback. Misaligned instruction. Practice the exact
                  moments leaders face every week before they happen in real life.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handleLaunchPractice}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Start Practicing Now
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={scrollToWorkspace}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
                  >
                    See How It Works
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-7 text-white shadow-xl">
                <div className="rounded-full bg-white/15 px-4 py-2 inline-block text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Leadership Simulator
                </div>

                <h3 className="mt-8 text-4xl font-semibold leading-tight">
                  Rehearse high-stakes leadership moments before they happen.
                </h3>

                <p className="mt-5 text-white/80 leading-8">
                  Practice coaching conversations, DDI meetings,
                  instructional judgment calls, and accountability moves.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-xs uppercase text-white/70">
                      Scenario Reps
                    </div>
                    <div className="text-2xl font-bold">
                      {analytics?.totalCompleted ?? 0}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-xs uppercase text-white/70">
                      Strongest Domain
                    </div>
                    <div className="text-xl font-bold">
                      {strongestDomain === '-' ? 'Pending' : strongestDomain}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PRACTICE WORKSPACE */}
            <section
              id="practice-workspace"
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <SessionSetup
                  settings={settings}
                  setSettings={setSettings}
                />
              </div>

              <div className="lg:col-span-2">
                {isLoading ? (
                  <div className="rounded-[28px] border border-slate-200 bg-white p-8">
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
                  <div className="rounded-[28px] border border-slate-200 bg-white p-8">
                    No questions available.
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
            recentTrend="Trending"
            coachingInsight="Continue sharpening execution."
            onRetryWeakestArea={() => setActiveTab('practice')}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favoriteCards={favoriteCards}
            onOpenFavorite={(card) => {
              setCurrentCard(card)
              setActiveTab('practice')
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
              }
            }}
          />
        )}
      </div>
    </main>
  )
}