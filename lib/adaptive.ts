import type {
  Card,
  Difficulty,
  Domain,
  ProgressEntry,
  Rating,
  SessionPerformance
} from '@/types'

type DomainStat = {
  attempts: number
  scoreTotal: number
  averageScore: number
}

type DomainStats = Record<Domain, DomainStat>

function ratingToScore(rating: Rating): number {
  switch (rating) {
    case 'strong':
      return 3
    case 'partial':
      return 2
    case 'struggled':
      return 1
    default:
      return 0
  }
}

function createEmptyDomainStats(): DomainStats {
  return {
    rigor: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    ddi: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    coaching: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    assessment: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    culture: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    leadership: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    data: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    instruction: { attempts: 0, scoreTotal: 0, averageScore: 0 },
    equity: { attempts: 0, scoreTotal: 0, averageScore: 0 }
  }
}

function createEmptyDomainRatings(): Record<Domain, Rating[]> {
  return {
    rigor: [],
    ddi: [],
    coaching: [],
    assessment: [],
    culture: [],
    leadership: [],
    data: [],
    instruction: [],
    equity: []
  }
}

function getAverageScoreForDomain(
  stats: DomainStat
): number {
  if (stats.attempts === 0) return 0
  return stats.scoreTotal / stats.attempts
}

function getStrongestDomain(
  stats: DomainStats
): Domain | undefined {
  const attempted = Object.entries(stats).filter(
    ([, value]) => value.attempts > 0
  ) as [Domain, DomainStat][]

  if (!attempted.length) return undefined

  attempted.sort(
    (a, b) => b[1].averageScore - a[1].averageScore
  )

  return attempted[0][0]
}

function getWeakestDomain(
  stats: DomainStats
): Domain | undefined {
  const attempted = Object.entries(stats).filter(
    ([, value]) => value.attempts > 0
  ) as [Domain, DomainStat][]

  if (!attempted.length) return undefined

  attempted.sort(
    (a, b) => a[1].averageScore - b[1].averageScore
  )

  return attempted[0][0]
}

export function buildSessionPerformance(
  progress: ProgressEntry[]
): SessionPerformance {
  const domainStats = createEmptyDomainStats()
  const domainRatings = createEmptyDomainRatings()
  const difficultyCounts: Record<string, number> = {}
  const recentRatings: Rating[] = progress
    .slice(-10)
    .map((entry) => entry.rating)

  for (const entry of progress) {
    const score = ratingToScore(entry.rating)

    domainStats[entry.domain].attempts += 1
    domainStats[entry.domain].scoreTotal += score
    domainRatings[entry.domain].push(entry.rating)

    difficultyCounts[entry.difficulty] =
      (difficultyCounts[entry.difficulty] ?? 0) + 1
  }

  for (const domain of Object.keys(domainStats) as Domain[]) {
    domainStats[domain].averageScore = getAverageScoreForDomain(
      domainStats[domain]
    )
  }

  const totalResponses = progress.length
  const averageVersionCount = 0

  const domainAverages = (
    Object.keys(domainStats) as Domain[]
  ).reduce<Record<Domain, number>>((acc, domain) => {
    acc[domain] = domainStats[domain].averageScore
    return acc
  }, {} as Record<Domain, number>)

  return {
    totalResponses,
    averageVersionCount,
    strongestDomain: getStrongestDomain(domainStats),
    weakestDomain: getWeakestDomain(domainStats),
    recentRatings,
    domainRatings,
    domainAverages,
    difficultyCounts
  }
}

function getDomainPriorityScore(
  card: Card,
  performance: SessionPerformance
): number {
  const attemptedRatings =
    performance.domainRatings[card.domain] ?? []
  const average = performance.domainAverages[card.domain] ?? 0

  if (attemptedRatings.length === 0) {
    return 100
  }

  if (
    performance.weakestDomain &&
    card.domain === performance.weakestDomain
  ) {
    return 80 - average * 10
  }

  return 50 - average * 10
}

function getDifficultyPriorityScore(
  difficulty: Difficulty,
  performance: SessionPerformance
): number {
  const count = performance.difficultyCounts[difficulty] ?? 0
  return Math.max(0, 20 - count)
}

export function selectNextQuestion(
  bank: Card[],
  performance: SessionPerformance
): Card | null {
  if (!bank.length) return null

  const scored = bank.map((card) => {
    const domainScore = getDomainPriorityScore(card, performance)
    const difficultyScore = getDifficultyPriorityScore(
      card.difficulty,
      performance
    )

    return {
      card,
      score: domainScore + difficultyScore + Math.random()
    }
  })

  scored.sort((a, b) => b.score - a.score)

  return scored[0]?.card ?? null
}