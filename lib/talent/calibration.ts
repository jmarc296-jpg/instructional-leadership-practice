export type EvaluatorScore = {
  evaluator: string
  role: string
  leaderId: string
  leaderName: string
  simulation: string
  instructionalLeadership: number
  talentManagement: number
  operations: number
  culture: number
  communityLeadership: number
}

export const evaluatorScores: EvaluatorScore[] = [
  {
    evaluator: "Evaluator A",
    role: "Principal Supervisor",
    leaderId: "tl-001",
    leaderName: "Marcus Johnson",
    simulation: "Difficult Staff Conversation",
    instructionalLeadership: 92,
    talentManagement: 88,
    operations: 84,
    culture: 91,
    communityLeadership: 86
  },
  {
    evaluator: "Evaluator B",
    role: "Talent Director",
    leaderId: "tl-001",
    leaderName: "Marcus Johnson",
    simulation: "Difficult Staff Conversation",
    instructionalLeadership: 84,
    talentManagement: 79,
    operations: 82,
    culture: 87,
    communityLeadership: 80
  },
  {
    evaluator: "Evaluator C",
    role: "Calibration Reviewer",
    leaderId: "tl-001",
    leaderName: "Marcus Johnson",
    simulation: "Difficult Staff Conversation",
    instructionalLeadership: 90,
    talentManagement: 85,
    operations: 86,
    culture: 89,
    communityLeadership: 83
  },
  {
    evaluator: "Evaluator A",
    role: "Principal Supervisor",
    leaderId: "tl-003",
    leaderName: "James Carter",
    simulation: "Parent Escalation and Staff Response",
    instructionalLeadership: 71,
    talentManagement: 67,
    operations: 78,
    culture: 74,
    communityLeadership: 70
  },
  {
    evaluator: "Evaluator B",
    role: "Talent Director",
    leaderId: "tl-003",
    leaderName: "James Carter",
    simulation: "Parent Escalation and Staff Response",
    instructionalLeadership: 52,
    talentManagement: 49,
    operations: 63,
    culture: 58,
    communityLeadership: 55
  },
  {
    evaluator: "Evaluator C",
    role: "Calibration Reviewer",
    leaderId: "tl-003",
    leaderName: "James Carter",
    simulation: "Parent Escalation and Staff Response",
    instructionalLeadership: 59,
    talentManagement: 56,
    operations: 69,
    culture: 63,
    communityLeadership: 61
  }
]

export function getEvaluatorAverage(score: EvaluatorScore) {
  const total =
    score.instructionalLeadership +
    score.talentManagement +
    score.operations +
    score.culture +
    score.communityLeadership

  return Math.round(total / 5)
}

export function getLeaderCalibrationSummary(leaderId: string) {
  const scores = evaluatorScores.filter((score) => score.leaderId === leaderId)
  const averages = scores.map(getEvaluatorAverage)
  const high = Math.max(...averages)
  const low = Math.min(...averages)
  const variance = high - low
  const average = Math.round(averages.reduce((sum, value) => sum + value, 0) / averages.length)

  return {
    scores,
    average,
    high,
    low,
    variance,
    status:
      variance >= 18
        ? "Calibration Required"
        : variance >= 10
          ? "Monitor Variance"
          : "Aligned",
    confidence:
      variance >= 18
        ? "Low"
        : variance >= 10
          ? "Moderate"
          : "High",
    recommendation:
      variance >= 18
        ? "Do not finalize promotion recommendation until evaluator calibration is completed."
        : variance >= 10
          ? "Review scoring evidence before final placement decision."
          : "Evaluator scoring is aligned enough to support readiness decision-making."
  }
}
