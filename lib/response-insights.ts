import type { Card, ResponseInsight, ResponseSignal } from '@/types'

export type { ResponseSignal }

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

const ACTION_WORDS = [
  'should',
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
  'model'
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

function includesAny(text: string, words: string[]) {
  return words.some(word => text.includes(word))
}

export function analyzeResponse(response: string, card: Card): ResponseInsight {
  const text = response.toLowerCase().trim()
  const exemplar = card.exemplar.toLowerCase()

  const signals: ResponseSignal[] = []
  const strengths: string[] = []
  const growthAreas: string[] = []

  const hasIssue =
    includesAny(text, ISSUE_WORDS) ||
    ISSUE_WORDS.some(word => exemplar.includes(word) && text.includes(word))

  const hasAction = includesAny(text, ACTION_WORDS)
  const hasEvidence = includesAny(text, EVIDENCE_WORDS)
  const hasStudentImpact = includesAny(text, STUDENT_IMPACT_WORDS)

  const wordCount = text.split(/\s+/).filter(Boolean).length
  const isVague = wordCount < 20

  let score = 1

  if (hasIssue) {
    score += 1
    signals.push('clear-problem')
    strengths.push('Names the instructional issue with reasonable clarity.')
  } else {
    growthAreas.push('Name the core instructional issue more explicitly.')
  }

  if (hasAction) {
    score += 1
    signals.push('action-oriented')
    strengths.push('States a leadership move rather than only describing the problem.')
  } else {
    signals.push('missing-action')
    growthAreas.push('State the leader’s next move more directly.')
  }

  if (hasEvidence) {
    score += 1
    signals.push('evidence-based')
    strengths.push('Uses evidence, precision, or observable language.')
  } else {
    signals.push('missing-evidence')
    growthAreas.push('Ground the response in more precise evidence or observation.')
  }

  if (hasStudentImpact) {
    score += 1
    signals.push('student-impact')
    strengths.push('Connects the issue to student learning or independence.')
  } else {
    growthAreas.push('Connect the response more directly to student impact.')
  }

  if (isVague) {
    signals.push('vague-language')
    growthAreas.push('Add more precision so the response is not too general.')
  }

  if (!hasIssue && !hasAction) {
    signals.push('symptom-not-root-cause')
    growthAreas.push('Move beyond symptoms and name the underlying instructional problem.')
  }

  if (score > 5) score = 5

  const summary =
    score >= 4
      ? 'This response is mostly aligned to strong instructional leadership thinking.'
      : score === 3
        ? 'This response is on track, but needs sharper precision and stronger evidence.'
        : 'This response needs a clearer issue, stronger reasoning, and a more explicit next move.'

  return {
    score,
    strengths,
    growthAreas,
    signals,
    summary
  }
}