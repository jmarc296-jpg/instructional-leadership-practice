import type {
  AnalyticsSnapshot,
  ProgressEntry,
  ResponseVersion,
  Rating
} from '@/types'

const PROGRESS_KEY = 'leadsharper-progress'
const FAVORITES_KEY = 'leadsharper-favorites'
const RESPONSES_KEY = 'leadsharper-written-responses'
const RESPONSE_VERSIONS_KEY = 'leadsharper-response-versions'

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

/*
-----------------------------------
PROGRESS
-----------------------------------
*/

export function saveProgress(progress: ProgressEntry) {
  if (typeof window === 'undefined') return

  const existing = getProgress()
  const updated = [...existing, progress]

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated))
}

export function getProgress(): ProgressEntry[] {
  if (typeof window === 'undefined') return []

  return safeParse<ProgressEntry[]>(
    localStorage.getItem(PROGRESS_KEY),
    []
  )
}

/*
-----------------------------------
FAVORITES
-----------------------------------
*/

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []

  return safeParse<string[]>(
    localStorage.getItem(FAVORITES_KEY),
    []
  )
}

export function addFavorite(cardId: string) {
  if (typeof window === 'undefined') return

  const favorites = getFavorites()

  if (!favorites.includes(cardId)) {
    const updated = [...favorites, cardId]
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  }
}

export function removeFavorite(cardId: string) {
  if (typeof window === 'undefined') return

  const favorites = getFavorites()
  const updated = favorites.filter((id) => id !== cardId)

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
}

/*
-----------------------------------
WRITTEN RESPONSES
-----------------------------------
*/

type WrittenResponsesMap = Record<string, string>

export function saveWrittenResponse(
  cardId: string,
  response: string
) {
  if (typeof window === 'undefined') return

  const responses = getAllWrittenResponsesMap()

  responses[cardId] = response

  localStorage.setItem(
    RESPONSES_KEY,
    JSON.stringify(responses)
  )
}

export function getWrittenResponse(cardId: string): string {
  if (typeof window === 'undefined') return ''

  const responses = getAllWrittenResponsesMap()

  return responses[cardId] ?? ''
}

function getAllWrittenResponsesMap(): WrittenResponsesMap {
  if (typeof window === 'undefined') return {}

  return safeParse<WrittenResponsesMap>(
    localStorage.getItem(RESPONSES_KEY),
    {}
  )
}

export function getAllWrittenResponses() {
  const responses = getAllWrittenResponsesMap()

  return Object.entries(responses).map(
    ([cardId, response]) => ({
      cardId,
      response,
      updatedAt: new Date().toISOString()
    })
  )
}

/*
-----------------------------------
RESPONSE VERSIONS
-----------------------------------
*/

type VersionMap = Record<string, ResponseVersion[]>

export function saveResponseVersion(
  cardId: string,
  response: string
) {
  if (typeof window === 'undefined') return

  const versions = getAllVersions()

  const currentVersions = versions[cardId] ?? []

  const newVersion: ResponseVersion = {
    versionId: crypto.randomUUID(),
    response,
    savedAt: new Date().toISOString()
  }

  versions[cardId] = [...currentVersions, newVersion]

  localStorage.setItem(
    RESPONSE_VERSIONS_KEY,
    JSON.stringify(versions)
  )
}

export function getResponseVersions(
  cardId: string
): ResponseVersion[] {
  if (typeof window === 'undefined') return []

  const versions = getAllVersions()

  return versions[cardId] ?? []
}

function getAllVersions(): VersionMap {
  if (typeof window === 'undefined') return {}

  return safeParse<VersionMap>(
    localStorage.getItem(RESPONSE_VERSIONS_KEY),
    {}
  )
}

/*
-----------------------------------
ANALYTICS
-----------------------------------
*/

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  const progress = getProgress()

  const totalCompleted = progress.length

  const grouped: Record<string, number[]> = {}

  progress.forEach((entry) => {
    if (!grouped[entry.domain]) {
      grouped[entry.domain] = []
    }

    grouped[entry.domain].push(
      convertRatingToNumber(entry.rating)
    )
  })

  const averageRatingByDomain: Record<string, number> = {}

  Object.entries(grouped).forEach(
    ([domain, values]) => {
      const avg =
        values.reduce((sum, val) => sum + val, 0) /
        values.length

      averageRatingByDomain[domain] =
        Math.round(avg * 10) / 10
    }
  )

  const recentRatings: Rating[] = progress
    .slice(-10)
    .map((p) => p.rating)

  return {
    totalCompleted,
    averageRatingByDomain,
    recentRatings
  }
}

function convertRatingToNumber(
  rating: Rating
): number {
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