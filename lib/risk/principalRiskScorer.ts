import { riskWeights } from "./riskWeights";

export function calculatePrincipalRisk(data: any) {
  const score =
    data.instructionalLeadership * riskWeights.instructionalLeadership +
    data.teacherRetention * riskWeights.teacherRetention +
    data.studentAchievement * riskWeights.studentAchievement +
    data.executionReliability * riskWeights.executionReliability +
    data.cultureHealth * riskWeights.cultureHealth +
    data.talentManagement * riskWeights.talentManagement;

  if (score >= 80) return { score, risk: "Low Risk" };
  if (score >= 60) return { score, risk: "Moderate Risk" };
  if (score >= 40) return { score, risk: "High Risk" };

  return { score, risk: "Immediate Intervention" };
}
