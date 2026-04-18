import { QUESTION_BANK } from '@/data/questions'
import type { AnalyticsSummary, Card } from '@/types'

const KEYS = {
  questions: 'il-questions',
  favorites: 'il-favorites',
  progress: 'il-progress',
  admin: 'il-admin-mode'
}

function canUseStorage() {
  return typeof window !== 'undefined'
}

export function getQuestions(): Card[] {
  if (!canUseStorage()) return QUESTION_BANK
  const raw = window.localStorage.getItem(KEYS.questions)
  if (!raw) {
    window.localStorage.setItem(KEYS.questions, JSON.stringify(QUESTION_BANK))
    return QUESTION_BANK
  }
  try {
    return JSON.parse(raw) as Card[]
  } catch {
    window.localStorage.setItem(KEYS.questions, JSON.stringify(QUESTION_BANK))
    return QUESTION_BANK
  }
}

export function saveQuestions(questions: Card[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(KEYS.questions, JSON.stringify(questions))
}

export function upsertQuestion(card: Card) {
  const questions = getQuestions()
  const exists = questions.some((q) => q.id === card.id)
  const next = exists
    ? questions.map((q) => (q.id === card.id ? card : q))
    : [{ ...card, createdAt: new Date().toISOString() }, ...questions]
  saveQuestions(next)
}

export function toggleQuestionActive(id: string) {
  const questions = getQuestions().map((q) =>
    q.id === id ? { ...q, isActive: !(q.isActive !== false) } : q
  )
  saveQuestions(questions)
}

export function getFavorites(): string[] {
  if (!canUseStorage()) return []
  try {
    return JSON.parse(window.localStorage.getItem(KEYS.favorites) || '[]') as string[]
  } catch {
    return []
  }
}

export function addFavorite(id: string) {
  const current = new Set(getFavorites())
  current.add(id)
  window.localStorage.setItem(KEYS.favorites, JSON.stringify(Array.from(current)))
}

export function removeFavorite(id: string) {
  const current = getFavorites().filter((item) => item !== id)
  window.localStorage.setItem(KEYS.favorites, JSON.stringify(current))
}

export function getFavoriteCards(): Card[] {
  const questions = getQuestions()
  const favorites = new Set(getFavorites())
  return questions.filter((q) => favorites.has(q.id))
}

export function getProgress(): string[] {
  if (!canUseStorage()) return []
  try {
    return JSON.parse(window.localStorage.getItem(KEYS.progress) || '[]') as string[]
  } catch {
    return []
  }
}

export function saveProgress(questionId: string) {
  const current = getProgress()
  current.push(questionId)
  window.localStorage.setItem(KEYS.progress, JSON.stringify(current.slice(-200)))
}

export function setAdminMode(value: boolean) {
  if (!canUseStorage()) return
  window.localStorage.setItem(KEYS.admin, value ? 'true' : 'false')
}

export function getAdminMode(): boolean {
  if (!canUseStorage()) return true
  return window.localStorage.getItem(KEYS.admin) !== 'false'
}

export function getAnalytics(): AnalyticsSummary {
  const questions = getQuestions()
  const favorites = getFavorites()
  const progress = getProgress()

  const categoryMap = new Map<string, number>()
  const difficultyMap = new Map<string, number>()

  questions.forEach((q) => {
    categoryMap.set(q.category, (categoryMap.get(q.category) || 0) + 1)
    difficultyMap.set(q.difficulty, (difficultyMap.get(q.difficulty) || 0) + 1)
  })

  return {
    totalQuestions: questions.length,
    activeQuestions: questions.filter((q) => q.isActive !== false).length,
    totalFavorites: favorites.length,
    totalProgressEvents: progress.length,
    categoryCounts: Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count
    })),
    difficultyCounts: Array.from(difficultyMap.entries()).map(([difficulty, count]) => ({
      difficulty,
      count
    }))
  }
}
