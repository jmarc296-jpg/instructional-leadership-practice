export type Domain =
  | 'rigor'
  | 'ddi'
  | 'coaching'
  | 'assessment'
  | 'culture'
  | 'leadership'
  | 'data'
  | 'instruction'
  | 'equity'

export type Difficulty =
  | 'foundational'
  | 'advanced'
  | 'expert'

export type Rating =
  | 'strong'
  | 'partial'
  | 'struggled'

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
  tags?: string[]
  coachInsight?: CoachInsight
}

export type ResponseVersion = {
  versionId: string
  response: string
  savedAt: string
}

export type ResponseHistoryEntry = {
  cardId: string
  response: string
  updatedAt: string
  versionCount: number
}

export type AnalyticsSnapshot = {
  totalCompleted: number
  averageRatingByDomain: Record<string, number>
  recentRatings: Rating[]
}

export type SessionSettings = {
  coachMode: boolean
  adaptiveMode: boolean
  mode: 'quiz' | 'review'
  category: Domain | 'all'
  difficulty: Difficulty | 'all'
  sessionLength: number
  includePrompt: boolean
  includeExemplar: boolean
}