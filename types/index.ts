export type Domain =
  | 'coaching'
  | 'data'
  | 'instruction'
  | 'leadership'
  | 'equity'

export type Difficulty =
  | 'foundational'
  | 'advanced'
  | 'expert'

export type Card = {
  id: string
  domain: Domain
  difficulty: Difficulty
  stem: string
  scenario: string
  prompt: string
  exemplar: string
}

export type AnalyticsSnapshot = {
  totalCompleted: number
  averageRatingByDomain: Record<string, number>
  recentRatings: Array<'strong' | 'partial' | 'struggled'>
}

export type SessionSettings = {
  coachMode: boolean
  adaptiveMode: boolean
  mode: 'quiz' | 'review'
  category: 'all'
  difficulty: Difficulty | 'all'
  sessionLength: number
  includePrompt: boolean
  includeExemplar: boolean
}