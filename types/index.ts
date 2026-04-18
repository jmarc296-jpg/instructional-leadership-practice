export type Mode = 'quiz' | 'review'

export type Difficulty = 'foundational' | 'strong' | 'advanced'

export type Category =
  | 'all'
  | 'rigor'
  | 'ddi'
  | 'observation-feedback'
  | 'curriculum-alignment'
  | 'ilt-leadership'
  | 'principal-decision-making'

export type Card = {
  id: string
  category: Exclude<Category, 'all'>
  difficulty: Difficulty
  question: string
  prompt: string
  exemplar: string
  isActive?: boolean
  createdAt?: string
}

export type SessionSettings = {
  mode: Mode
  includePrompt: boolean
  includeExemplar: boolean
  category: Category
  difficulty: Difficulty | 'all'
  sessionLength: number
}

export type AnalyticsSummary = {
  totalQuestions: number
  activeQuestions: number
  totalFavorites: number
  totalProgressEvents: number
  categoryCounts: Array<{ category: string; count: number }>
  difficultyCounts: Array<{ difficulty: string; count: number }>
}
