type ReadinessLevel =
  | "Ready Now"
  | "Ready in 6 Months"
  | "Ready in 12 Months"
  | "Not Ready";

export function calculateReadiness(data: any) {
  const score =
    (data.instructionalLeadership * 0.30) +
    (data.staffManagement * 0.25) +
    (data.executionConsistency * 0.20) +
    (data.schoolCulture * 0.15) +
    (data.studentOutcomes * 0.10);

  let readiness: ReadinessLevel;

  if (score >= 85) {
    readiness = "Ready Now";
  } else if (score >= 70) {
    readiness = "Ready in 6 Months";
  } else if (score >= 55) {
    readiness = "Ready in 12 Months";
  } else {
    readiness = "Not Ready";
  }

  return {
    score,
    readiness
  };
}
