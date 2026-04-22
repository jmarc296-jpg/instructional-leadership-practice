export type Domain =
  | 'rigor'
  | 'ddi'
  | 'coaching'
  | 'assessment'
  | 'culture'
  | 'leadership'

export type Category = Domain

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Rating = 'strong' | 'partial' | 'struggled'

export type CoachInsight = {
  title: string
  text: string
}

export type Card = {
  id: string
  domain: Domain
  difficulty: Difficulty
  stem: string
  scenario: string
  prompt: string
  exemplar: string
  coachInsight?: CoachInsight
  tags?: string[]
  isActive?: boolean
}

export type SessionSettings = {
  coachMode: boolean
  adaptiveMode: boolean

  // legacy fields still referenced by older UI components
  mode?: 'quiz' | 'review'
  category?: Category | 'all'
  difficulty?: Difficulty | 'all'
  questionCount?: number
  includePrompt?: boolean
  includeExemplar?: boolean
}

export type SessionPerformance = {
  cardId: string
  domain: Domain
  difficulty: Difficulty
  rating: Rating
}

export type DomainAverages = Record<Domain, number>

export type AnalyticsSnapshot = {
  totalCompleted: number
  averageRatingByDomain: DomainAverages
  recentRatings: Rating[]
}

export type ResponseSignal =
  | 'clear-problem'
  | 'action-oriented'
  | 'evidence-based'
  | 'student-impact'
  | 'vague-language'
  | 'missing-action'
  | 'symptom-not-root-cause'
  | 'missing-evidence'

export type ResponseInsight = {
  score: number
  strengths: string[]
  growthAreas: string[]
  signals: ResponseSignal[]
  summary: string
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

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'