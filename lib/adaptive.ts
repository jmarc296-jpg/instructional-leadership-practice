import type { Card, Difficulty, Domain, Rating, SessionPerformance } from '@/types'
import { getAllWrittenResponses, getResponseVersions } from '@/lib/local-store'

type DomainStats = Record<
  Domain,
  {
    attempts: number
    scoreTotal: number
    averageScore: number
  }
>

type CardStats = Record<
  string,
  {
    attempts: number
    scoreTotal: number
    averageScore: number
    lastRating: Rating | null
  }
>

export type BuiltSessionPerformance = {
  totalAttempts: number
  domainStats: DomainStats
  cardStats: CardStats
  weakestDomain: Domain | null
  strongestDomain: Domain | null
}

const DOMAIN_ORDER: Domain[] = [
  'rigor',
  'ddi',
  'coaching',
  'assessment',
  'culture',
  'leadership'
]

// NEW: track recency in memory (per session)
const RECENT_CARD_LIMIT = 4
let recentCardQueue: string[] = []

function trackRecentCard(cardId: string) {
  recentCardQueue.unshift(cardId)
  if (recentCardQueue.length > RECENT_CARD_LIMIT) {
    recentCardQueue.pop()
  }
}

function wasRecentlySeen(cardId: string) {
  return recentCardQueue.includes(cardId)
}

function getRatingScore(rating: Rating): number {
  switch (rating) {
    case 'strong':
      return 1
    case 'partial':
      return 0.6
    case 'struggled':
      return 0.25
    default:
      return 0
  }
}

function getDifficultyWeight(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'hard':
      return 1
    case 'medium':
      return 0.8
    case 'easy':
      return 0.5
    default:
      return 0.7
  }
}

function createEmptyDomainStats(): DomainStats {
  return {
    rigor: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    ddi: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    coaching: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    assessment: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    culture: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    leadership: { attempts: 0, scoreTotal: 0, averageScore: 0 }
  }
}

export function buildSessionPerformance(progress: SessionPerformance[]): BuiltSessionPerformance {
  const domainStats = createEmptyDomainStats()
  const cardStats: CardStats = {}

  for (const entry of progress) {
    const score = getRatingScore(entry.rating)

    domainStats[entry.domain].attempts += 1
    domainStats[entry.domain].scoreTotal += score

    if (!cardStats[entry.cardId]) {
      cardStats[entry.cardId] = {
        attempts: 0,
        scoreTotal: 0,
        averageScore: 0,
        lastRating: null
      }
    }

    cardStats[entry.cardId].attempts += 1
    cardStats[entry.cardId].scoreTotal += score
    cardStats[entry.cardId].lastRating = entry.rating
  }

  for (const domain of DOMAIN_ORDER) {
    const stat = domainStats[domain]
    stat.averageScore =
      stat.attempts > 0 ? stat.scoreTotal / stat.attempts : 0
  }

  for (const cardId of Object.keys(cardStats)) {
    const stat = cardStats[cardId]
    stat.averageScore =
      stat.attempts > 0 ? stat.scoreTotal / stat.attempts : 0
  }

  const attemptedDomains = DOMAIN_ORDER.filter(
    (domain) => domainStats[domain].attempts > 0
  )

  const weakestDomain =
    attemptedDomains.length > 0
      ? [...attemptedDomains].sort(
          (a, b) => domainStats[a].averageScore - domainStats[b].averageScore
        )[0]
      : null

  const strongestDomain =
    attemptedDomains.length > 0
      ? [...attemptedDomains].sort(
          (a, b) => domainStats[b].averageScore - domainStats[a].averageScore
        )[0]
      : null

  return {
    totalAttempts: progress.length,
    domainStats,
    cardStats,
    weakestDomain,
    strongestDomain
  }
}

function getResponseVersionCount(cardId: string) {
  try {
    return getResponseVersions(cardId).length
  } catch {
    return 0
  }
}

function hasSavedResponse(cardId: string) {
  try {
    return getAllWrittenResponses().some(r => r.cardId === cardId)
  } catch {
    return false
  }
}

function scoreCard(card: Card, performance: BuiltSessionPerformance): number {
  const cardStat = performance.cardStats[card.id]
  const domainStat = performance.domainStats[card.domain]

  let score = 0

  // 1. Domain priority
  if (performance.weakestDomain === card.domain) score += 35
  if (performance.strongestDomain === card.domain) score -= 10

  // 2. Domain exposure balancing
  if (domainStat.attempts === 0) score += 20
  else if (domainStat.attempts < 3) score += 10

  // 3. Domain weakness amplification
  score += (1 - domainStat.averageScore) * 25

  // 4. New cards boost
  if (!cardStat) {
    score += 25
  } else {
    score += (1 - cardStat.averageScore) * 30

    if (cardStat.lastRating === 'struggled') score += 20
    if (cardStat.lastRating === 'partial') score += 10
    if (cardStat.lastRating === 'strong') score -= 10

    // reduce repetition pressure
    score -= Math.min(cardStat.attempts * 5, 20)
  }

  // 5. Revision loop (this is critical)
  const versionCount = getResponseVersionCount(card.id)
  const saved = hasSavedResponse(card.id)

  if (saved && versionCount === 1) {
    score += 18 // VERY important: push revision
  }

  if (versionCount >= 2) {
    score -= 8
  }

  // 6. Difficulty shaping
  score += getDifficultyWeight(card.difficulty) * 8

  // 7. Recency protection (prevents repetition)
  if (wasRecentlySeen(card.id)) {
    score -= 30
  }

  return score
}

function breakTie(a: Card, b: Card): number {
  const difficultyRank: Record<Difficulty, number> = {
    easy: 1,
    medium: 2,
    hard: 3
  }

  if (difficultyRank[b.difficulty] !== difficultyRank[a.difficulty]) {
    return difficultyRank[b.difficulty] - difficultyRank[a.difficulty]
  }

  return a.id.localeCompare(b.id)
}

export function selectNextQuestion(
  bank: Card[],
  performance: BuiltSessionPerformance
): Card | null {
  if (!bank.length) return null

  const scored = bank.map((card) => ({
    card,
    score: scoreCard(card, performance)
  }))

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return breakTie(a.card, b.card)
  })

  const selected = scored[0]?.card ?? null

  if (selected) {
    trackRecentCard(selected.id)
  }

  return selected
}