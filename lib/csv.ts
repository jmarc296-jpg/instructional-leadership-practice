import type { Card, Difficulty, Domain } from '@/types'

function normalizeDomain(value: string): Domain {
  const cleaned = value.toLowerCase().trim()

  if (cleaned === 'rigor') return 'rigor'
  if (cleaned === 'ddi') return 'ddi'
  if (cleaned === 'coaching') return 'coaching'
  if (cleaned === 'assessment') return 'assessment'
  if (cleaned === 'culture') return 'culture'
  return 'leadership'
}

function normalizeDifficulty(value: string): Difficulty {
  const cleaned = value.toLowerCase().trim()

  if (cleaned === 'easy') return 'easy'
  if (cleaned === 'hard') return 'hard'
  return 'medium'
}

export function parseQuestionsCsv(csvText: string): Card[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length <= 1) return []

  const rows = lines.slice(1)

  return rows
    .map((line, index) => {
      const parts = line.split(',').map((part) => part.trim())
      if (parts.length < 6) return null

      const [
        domainRaw,
        difficultyRaw,
        stemRaw,
        scenarioRaw,
        promptRaw,
        exemplarRaw
      ] = parts

      const domain = normalizeDomain(domainRaw)
      const difficulty = normalizeDifficulty(difficultyRaw)
      const stem = stemRaw || `Imported question ${index + 1}`
      const scenario = scenarioRaw || ''
      const prompt = promptRaw || 'What should the leader do next?'
      const exemplar = exemplarRaw || ''

      const card: Card = {
        id: `csv-${Date.now()}-${index}`,
        domain,
        difficulty,
        stem,
        scenario,
        prompt,
        exemplar,
        tags: ['csv-import'],
        isActive: true
      }

      return card
    })
    .filter((card): card is Card => card !== null)
}