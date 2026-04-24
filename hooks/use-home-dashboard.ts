import { buildExemplarResponse } from '@/lib/exemplar-builder'
import { useEffect, useMemo, useState } from 'react'

import { questionsWithStrongExemplars } from '@/data/questions'
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

type View = 'practice' | 'analytics' | 'favorites' | 'history'
type PracticeFilter = 'all' | Domain

export function useHomeDashboard() {
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
    let bank = questionsWithStrongExemplars

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

  const favoriteCards = questionsWithStrongExemplars.filter((card) =>
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

  function handleCustomScenario(scenario: { scenario: string; prompt: string; domain: string }) {
    setCurrentCard({
      id: 'custom-generated',
      domain: 'leadership',
      difficulty: 'medium',
      stem: 'Custom leadership simulation',
      scenario: scenario.scenario,
      prompt: scenario.prompt,
      exemplar: buildExemplarResponse({ domain: scenario.domain, scenario: scenario.scenario, prompt: scenario.prompt }),
      tags: ['custom', 'leadership', 'simulation'],
      isActive: true
    })

    setActiveTab('practice')
    setShowPrompt(true)
    setShowExemplar(false)
    setQuestionNumber(1)
    scrollToWorkspace()
  }

  function handleOpenPracticeCard(card: Card) {
    setCurrentCard(card)
    setActiveTab('practice')
    setShowPrompt(true)
    scrollToWorkspace()
  }

  return {
    activeTab,
    setActiveTab,
    currentCard,
    showPrompt,
    showExemplar,
    questionNumber,
    analytics,
    favorites,
    isLoading,
    settings,
    setSettings,
    favoriteCards,
    strongestDomain,
    weakestDomain,
    recentTrend,
    coachingInsight,
    handleLaunchPractice,
    handleNext,
    handleRetryWeakestArea,
    handleOpenPracticeCard,
    handleCustomScenario,
    scrollToWorkspace,
    setShowPrompt,
    setShowExemplar
  }
}






