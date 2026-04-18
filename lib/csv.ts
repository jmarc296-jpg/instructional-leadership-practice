import type { Card } from '@/types'

export function parseCsvToCards(text: string): Card[] {
  const lines = text.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return []

  const rows = lines.slice(1)

  return rows
    .map((line, index) => {
      const parts = line.split(',')
      if (parts.length < 5) return null

      return {
        id: `csv-${Date.now()}-${index}`,
        category: parts[0].trim() as Card['category'],
        difficulty: parts[1].trim() as Card['difficulty'],
        question: parts[2].trim(),
        prompt: parts[3].trim(),
        exemplar: parts.slice(4).join(',').trim(),
        isActive: true,
        createdAt: new Date().toISOString()
      }
    })
    .filter(Boolean) as Card[]
}
