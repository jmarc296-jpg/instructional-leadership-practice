import type { Card, ResponseInsight } from '@/types'
import type { ResponseScore } from './response-scoring'

export type ConsequenceRecord = {
  scenarioId: string
  domain: string
  unresolvedRisk: string
  likelyConsequence: string
  severity: 'low' | 'moderate' | 'high'
}

export function updateConsequences(
  card: Card,
  response: string,
  score: ResponseScore,
  insight: ResponseInsight
): ConsequenceRecord {
  const missingAction = !score.breakdown.statesLeadershipMove
  const missingEvidence = !score.breakdown.usesEvidenceOrPrecision
  const missingImpact = !score.breakdown.namesStudentImpact

  let unresolvedRisk = 'Minor precision gap'
  let likelyConsequence = 'The leader may need a tighter follow-up move.'
  let severity: ConsequenceRecord['severity'] = 'low'

  if (missingAction && missingEvidence) {
    unresolvedRisk = 'Avoided clear leadership action'
    likelyConsequence =
      'The issue may continue because the leader did not clearly name what will change, who owns it, or how it will be monitored.'
    severity = 'high'
  } else if (missingEvidence) {
    unresolvedRisk = 'Weak evidence base'
    likelyConsequence =
      'The feedback may feel subjective because the leader did not ground the next move in observable evidence.'
    severity = 'moderate'
  } else if (missingImpact) {
    unresolvedRisk = 'Weak student-impact connection'
    likelyConsequence =
      'The action may become compliance-oriented instead of clearly tied to student learning.'
    severity = 'moderate'
  }

  if (insight.signals.includes('vague-language')) {
    unresolvedRisk = 'Vague leadership language'
    likelyConsequence =
      'The team may leave without a clear understanding of the problem, the expectation, or the next action.'
    severity = severity === 'high' ? 'high' : 'moderate'
  }

  return {
    scenarioId: card.id,
    domain: card.domain,
    unresolvedRisk,
    likelyConsequence,
    severity
  }
}
