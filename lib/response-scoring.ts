import type { Card } from '@/types'

export type ResponseScore = {
  total: number
  max: number
  breakdown: {
    namesIssue: boolean
    explainsWhyItMatters: boolean
    statesLeadershipMove: boolean
    usesEvidenceOrPrecision: boolean
    namesStudentImpact: boolean
  }
  feedback: string[]
}

const ISSUE_WORDS = [
  'issue',
  'concern',
  'problem',
  'gap',
  'misalignment',
  'over-scaffolding',
  'incomplete data',
  'low rigor',
  'broad feedback',
  'rescuing too quickly',
  'task demand',
  'misconception'
]

const WHY_WORDS = [
  'because',
  'this matters',
  'matters',
  'therefore',
  'so that',
  'which means',
  'as a result'
]

const LEADERSHIP_MOVE_WORDS = [
  'leader should',
  'principal should',
  'coach',
  'push',
  'name',
  'pause',
  'require',
  'clarify',
  'tighten',
  'revise',
  'monitor',
  'follow up',
  'reteach',
  'model',
  'should',
  'next move'
]

const EVIDENCE_WORDS = [
  'evidence',
  'data',
  'student work',
  'assessment',
  'walkthrough',
  'observation',
  'responses',
  'test-taker',
  'completion',
  'proficiency',
  'specific',
  'concrete',
  'precise'
]

const STUDENT_IMPACT_WORDS = [
  'students',
  'student',
  'thinking',
  'understanding',
  'independence',
  'ownership',
  'learning',
  'rigor',
  'reasoning',
  'cognitive',
  'engagement',
  'transfer'
]

function includesAny(text: string, phrases: string[]) {
  return phrases.some((phrase) => text.includes(phrase))
}

export function scoreResponseAgainstExemplar(response: string, card: Card): ResponseScore {
  const text = response.toLowerCase().trim()
  const exemplar = card.exemplar.toLowerCase()

  const namesIssue =
    includesAny(text, ISSUE_WORDS) ||
    ISSUE_WORDS.some((word) => exemplar.includes(word) && text.includes(word))

  const explainsWhyItMatters =
    includesAny(text, WHY_WORDS) ||
    text.includes('this matters') ||
    text.includes('why it matters')

  const statesLeadershipMove =
    includesAny(text, LEADERSHIP_MOVE_WORDS)

  const usesEvidenceOrPrecision =
    includesAny(text, EVIDENCE_WORDS)

  const namesStudentImpact =
    includesAny(text, STUDENT_IMPACT_WORDS)

  const total =
    Number(namesIssue) +
    Number(explainsWhyItMatters) +
    Number(statesLeadershipMove) +
    Number(usesEvidenceOrPrecision) +
    Number(namesStudentImpact)

  const feedback: string[] = []

  if (!namesIssue) feedback.push('Name the core instructional issue more explicitly.')
  if (!explainsWhyItMatters) feedback.push('Explain more clearly why the issue matters.')
  if (!statesLeadershipMove) feedback.push('State the leader’s next move more directly.')
  if (!usesEvidenceOrPrecision) feedback.push('Ground the response in more precise evidence or observation.')
  if (!namesStudentImpact) feedback.push('Connect the response more directly to student impact.')

  if (feedback.length === 0) {
    feedback.push('Strong alignment. Your response covers the key elements of the exemplar.')
  }

  return {
    total,
    max: 5,
    breakdown: {
      namesIssue,
      explainsWhyItMatters,
      statesLeadershipMove,
      usesEvidenceOrPrecision,
      namesStudentImpact
    },
    feedback
  }
}