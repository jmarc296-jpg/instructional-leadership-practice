'use client'

import { useEffect, useMemo, useState } from 'react'

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

import { AnalyticsView } from '@/components/analytics-view'
import { FavoritesView } from '@/components/favorites-view'
import { ResponseHistoryView } from '@/components/response-history-view'
import { TopNav } from '@/components/home/top-nav'
import { HeroSection } from '@/components/home/hero-section'
import { SimulatorPanel } from '@/components/home/simulator-panel'
import { PracticeWorkspace } from '@/components/practice-workspace'

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
        <TopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === 'practice' && (
          <>
            <section className="grid gap-5 lg:grid-cols-[1.95fr_1fr]">
              <HeroSection
                onLaunchPractice={handleLaunchPractice}
                onScrollToWorkspace={scrollToWorkspace}
              />

              <SimulatorPanel
                totalCompleted={analytics?.totalCompleted ?? 0}
                strongestDomain={strongestDomain}
              />
            </section>

            <PracticeWorkspace
              settings={settings}
              setSettings={setSettings}
              isLoading={isLoading}
              currentCard={currentCard}
              questionNumber={questionNumber}
              showPrompt={showPrompt}
              showExemplar={showExemplar}
              onRevealPrompt={() => setShowPrompt(true)}
              onRevealExemplar={() => setShowExemplar(true)}
              onNext={handleNext}
            />
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