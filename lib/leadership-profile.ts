import type { Card, ResponseInsight } from '@/types'
import type { ResponseScore } from './response-scoring'

export type LeadershipProfile = {
  instructionalPrecision: number
  evidenceUse: number
  studentImpactOrientation: number
  actionOrientation: number
  accountabilityStrength: number
  communicationClarity: number
  riskLevel: 'low' | 'moderate' | 'high'
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value))
}

export function updateLeadershipProfile(
  card: Card,
  score: ResponseScore,
  insight: ResponseInsight
): LeadershipProfile {
  const totalPct = (score.total / score.max) * 100

  const instructionalPrecision = clamp(
    totalPct + (score.breakdown.usesEvidenceOrPrecision ? 10 : -10)
  )

  const evidenceUse = clamp(score.breakdown.usesEvidenceOrPrecision ? 85 : 45)
  const studentImpactOrientation = clamp(score.breakdown.namesStudentImpact ? 85 : 45)
  const actionOrientation = clamp(score.breakdown.statesLeadershipMove ? 85 : 45)

  const accountabilityStrength = clamp(
    score.breakdown.namesIssue && score.breakdown.statesLeadershipMove ? 80 : 50
  )

  const communicationClarity = clamp(
    insight.signals.includes('vague-language') ? 45 : 80
  )

  const riskLevel =
    totalPct >= 80 ? 'low' : totalPct >= 60 ? 'moderate' : 'high'

  return {
    instructionalPrecision,
    evidenceUse,
    studentImpactOrientation,
    actionOrientation,
    accountabilityStrength,
    communicationClarity,
    riskLevel
  }
}
