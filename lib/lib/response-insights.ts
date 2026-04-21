import type { Card } from '@/types'

export type ResponseSignal =
  | 'clear-problem'
  | 'action-oriented'
  | 'evidence-based'
  | 'student-impact'
  | 'vague-language'
  | 'missing-action'
  | 'symptom-not-root-cause'
  | 'missing-evidence'

export type ResponseInsight = {
  score: number
  strengths: string[]
  growthAreas: string[]
  signals: ResponseSignal[]
  summary: string
}

const ACTION_WORDS = [
  'coach',
  'model',
  'plan',
  'reteach',
  'observe',
  'monitor',
  'follow up',
  'follow-up',
  'support',
  'adjust',
  'revise',
  'clarify',
  'tighten',
  'align',
  'practice',
  'intervene',
  'name',
  'address',
  'implement',
  'provide',
  'ensure'
]

const EVIDENCE_WORDS = [
  'evidence',
  'data',
  'student work',
  'assessment',
  'exit ticket',
  'walkthrough',
  'look-for',
  'look for',
  'observation',
  'trend',
  'artifact',
  'sample',
  'responses',
  'work sample',
  'completion',
  'proficiency',
  'mastery'
]

const STUDENT_IMPACT_WORDS = [
  'students',
  'student',
  'learning',
  'ownership',
  'thinking',
  'independence',
  'understanding',
  'mastery',
  'engagement',
  'outcomes',
  'achievement',
  'access',
  'rigor'
]

const VAGUE_WORDS = [
  'better',
  'improve',
  'good',
  'bad',
  'fix',
  'help',
  'support them',
  'be stronger',
  'do more',
  'work on'
]

const ROOT_CAUSE_WORDS = [
  'root cause',
  'because',
  'misalignment',
  'inconsistent',
  'unclear',
  'lack of',
  'did not',
  'not yet',
  'systems',
  'monitoring',
  'implementation',
  'accountability',
  'planning',
  'internalization'
]

function includesAny(text: string, phrases: string[]) {
  return phrases.some(phrase => text.includes(phrase))
}

function countMatches(text: string, phrases: string[]) {
  return phrases.filter(phrase => text.includes(phrase)).length
}

function getWordCount(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function analyzeResponse(response: string, card?: Card): ResponseInsight {
  const text = response.toLowerCase().trim()
  const wordCount = getWordCount(text)

  if (!text) {
    return {
      score: 0,
      strengths: [],
      growthAreas: ['No written response saved yet.'],
      signals: ['missing-action', 'missing-evidence'],
      summary: 'No response saved.'
    }
  }

  let score = 0
  const strengths: string[] = []
  const growthAreas: string[] = []
  const signals: ResponseSignal[] = []

  const hasAction = includesAny(text, ACTION_WORDS)
  const hasEvidence = includesAny(text, EVIDENCE_WORDS)
  const hasStudentImpact = includesAny(text, STUDENT_IMPACT_WORDS)
  const hasRootCauseLanguage = includesAny(text, ROOT_CAUSE_WORDS)
  const vagueCount = countMatches(text, VAGUE_WORDS)

  const namesProblem =
    text.includes('problem') ||
    text.includes('concern') ||
    text.includes('issue') ||
    text.includes('gap') ||
    text.includes('misalignment') ||
    text.includes('leader should name') ||
    text.includes('the teacher') ||
    text.includes('students are')

  if (namesProblem) {
    score += 1
    strengths.push('Names the instructional problem instead of staying general.')
    signals.push('clear-problem')
  } else {
    growthAreas.push('State the instructional issue more explicitly and earlier.')
  }

  if (hasAction) {
    score += 1
    strengths.push('Includes an action-oriented leadership move.')
    signals.push('action-oriented')
  } else {
    growthAreas.push('Add a clear next move the leader or teacher should take.')
    signals.push('missing-action')
  }

  if (hasEvidence) {
    score += 1
    strengths.push('Grounds the thinking in evidence, data, or observable practice.')
    signals.push('evidence-based')
  } else {
    growthAreas.push('Anchor the response more clearly in evidence or observable data.')
    signals.push('missing-evidence')
  }

  if (hasStudentImpact) {
    score += 1
    strengths.push('Connects the issue to student learning or student thinking.')
    signals.push('student-impact')
  } else {
    growthAreas.push('Tie the leadership move more directly to student impact.')
  }

  if (hasRootCauseLanguage) {
    score += 1
    strengths.push('Gets closer to underlying cause rather than just the symptom.')
  } else {
    growthAreas.push('Push beyond the surface issue and name the likely root cause.')
    signals.push('symptom-not-root-cause')
  }

  if (vagueCount >= 2 || wordCount < 20) {
    growthAreas.push('Tighten specificity. The response is still too broad or underdeveloped.')
    signals.push('vague-language')
  }

  if (card?.domain === 'coaching' && !text.includes('feedback') && !text.includes('coach')) {
    growthAreas.push('For coaching scenarios, make the feedback move more explicit.')
  }

  if (card?.domain === 'ddi' && !text.includes('data') && !text.includes('assessment')) {
    growthAreas.push('For DDI scenarios, connect the response more clearly to concrete data.')
  }

  if (card?.domain === 'rigor' && !text.includes('thinking') && !text.includes('cognitive')) {
    growthAreas.push('For rigor scenarios, name the level of student thinking more directly.')
  }

  const summary =
    score >= 5
      ? 'Strong response. Clear issue, grounded reasoning, and an actionable leadership move.'
      : score >= 3
        ? 'Solid foundation. The thinking is moving in the right direction but needs sharper precision.'
        : 'Still emerging. Push for clearer naming, stronger evidence, and a more explicit next step.'

  return {
    score,
    strengths,
    growthAreas,
    signals,
    summary
  }
}