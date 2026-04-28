export function calculateReadiness(candidate: any) {
  const score =
    candidate.instructionalLeadership * 0.30 +
    candidate.staffManagement * 0.20 +
    candidate.cultureLeadership * 0.20 +
    candidate.operationalExecution * 0.15 +
    candidate.studentOutcomes * 0.15;

  if (score >= 85) {
    return {
      score,
      readiness: "Ready Now"
    };
  }

  if (score >= 70) {
    return {
      score,
      readiness: "Ready in 6-12 Months"
    };
  }

  if (score >= 50) {
    return {
      score,
      readiness: "Emerging Leader"
    };
  }

  return {
    score,
    readiness: "Not Ready"
  };
}
