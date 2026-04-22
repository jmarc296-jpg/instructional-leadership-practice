export type Domain =
  | 'rigor'
  | 'ddi'
  | 'coaching'
  | 'assessment'
  | 'culture'
  | 'leadership'

export type Category = Domain

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Card = {
  id: string
  stem: string
  scenario: string
  prompt: string
  exemplar: string
  domain: Domain
  difficulty: Difficulty
  tags?: string[]
  coachInsight?: {
    title: string
    text: string
  }
}

export type SessionSettings = {
  domain: Domain | 'all'
  difficulty: Difficulty | 'all'
  questionCount: number
}

export type ResponseVersion = {
  versionId: string
  response: string
  savedAt: string
}

export type ResponseHistoryEntry = {
  cardId: string
  response: string
  createdAt: string
  updatedAt: string
  versionCount: number
}

export type PracticeSession = {
  id: string
  startedAt: string
  completedAt?: string
  cardsCompleted: number
}

export type AnalyticsSummary = {
  totalResponses: number
  averageScore: number
  strongestDomain: string
  growthArea: string
}