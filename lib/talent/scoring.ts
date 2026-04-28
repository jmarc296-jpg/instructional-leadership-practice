import type { TalentLeader } from "./mock-data"

export function getReadinessBand(score: number) {
  if (score >= 85) return "Ready Now"
  if (score >= 78) return "Near Ready"
  if (score >= 68) return "Ready in 12 Months"
  if (score >= 55) return "Needs Development"
  return "High Risk"
}

export function getPromotionRecommendation(leader: TalentLeader) {
  const weakestCompetency = Object.entries(leader.competencies).sort((a, b) => a[1] - b[1])[0]

  if (leader.readinessScore >= 85 && leader.evaluatorConfidence >= 85) {
    return {
      decision: "Recommend for promotion slate",
      rationale: "Readiness score and evaluator confidence are both strong enough to support near-term placement consideration.",
      caution: `Continue monitoring ${formatCompetency(weakestCompetency[0])}.`
    }
  }

  if (leader.readinessScore >= 70) {
    return {
      decision: "Recommend for targeted development",
      rationale: "Candidate shows meaningful role potential but still needs stronger evidence before promotion decision.",
      caution: `Primary gap: ${formatCompetency(weakestCompetency[0])}.`
    }
  }

  return {
    decision: "Do not recommend for promotion at this time",
    rationale: "Current evidence indicates elevated placement risk without additional coaching, simulation practice, and field-based evidence.",
    caution: `Highest concern: ${formatCompetency(weakestCompetency[0])}.`
  }
}

export function formatCompetency(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
}
