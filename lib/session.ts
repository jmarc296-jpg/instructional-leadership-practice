import type { Card, SessionSettings } from '@/types'

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function buildSession(
  cards: Card[],
  settings: SessionSettings,
  recentlySeenIds: string[]
): Card[] {
  const activeCards = cards.filter((card) => card.isActive !== false)
  const filtered = activeCards.filter((card) => {
    const categoryMatch = settings.category === 'all' || card.category === settings.category
    const difficultyMatch = settings.difficulty === 'all' || card.difficulty === settings.difficulty
    return categoryMatch && difficultyMatch
  })

  const unseen = filtered.filter((card) => !recentlySeenIds.includes(card.id))
  const seen = filtered.filter((card) => recentlySeenIds.includes(card.id))
  const ordered = [...shuffle(unseen), ...shuffle(seen)]

  if (settings.sessionLength <= 0) return ordered
  return ordered.slice(0, settings.sessionLength)
}
