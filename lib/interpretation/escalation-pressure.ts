import { type ExecutiveInterpretation } from "@/lib/interpretation/executive-interpretation";

export type EscalationPressureProfile = {
  pressureLevel: "contained" | "watch" | "elevated" | "critical";
  evidenceConfidence: "strong" | "partial" | "weak";
  interventionTiming: "stable" | "narrowing" | "immediate";
  pressureScore: number;
  rationale: string;
};

export function calculateEscalationPressure(
  interpretation: ExecutiveInterpretation,
  severity?: string | null,
  evidenceStatus?: string | null
): EscalationPressureProfile {
  const normalizedSeverity = (severity ?? "").toLowerCase();
  const normalizedEvidence = (evidenceStatus ?? "").toLowerCase();

  let pressureScore = 20;

  if (normalizedSeverity.includes("medium")) pressureScore += 20;
  if (normalizedSeverity.includes("high")) pressureScore += 40;
  if (normalizedSeverity.includes("critical")) pressureScore += 55;

  if (interpretation.confidencePosture === "limited") pressureScore += 20;
  if (interpretation.confidencePosture === "moderate") pressureScore += 10;

  if (interpretation.missingEvidence.length >= 2) pressureScore += 15;
  if (interpretation.missingEvidence.length >= 3) pressureScore += 10;

  if (
    normalizedEvidence.includes("not") ||
    normalizedEvidence.includes("missing") ||
    normalizedEvidence.includes("started")
  ) {
    pressureScore += 20;
  }

  const boundedScore = Math.max(0, Math.min(100, pressureScore));

  const pressureLevel =
    boundedScore >= 80
      ? "critical"
      : boundedScore >= 60
        ? "elevated"
        : boundedScore >= 40
          ? "watch"
          : "contained";

  const evidenceConfidence =
    interpretation.confidencePosture === "high" && interpretation.missingEvidence.length <= 1
      ? "strong"
      : interpretation.confidencePosture === "limited" || interpretation.missingEvidence.length >= 3
        ? "weak"
        : "partial";

  const interventionTiming =
    pressureLevel === "critical"
      ? "immediate"
      : pressureLevel === "elevated"
        ? "narrowing"
        : "stable";

  const rationale =
    pressureLevel === "critical"
      ? "Executive intervention should occur now because severity, evidence gaps, or unresolved ownership create high governance exposure."
      : pressureLevel === "elevated"
        ? "Escalation pressure is rising and should be reviewed before the next cabinet cycle."
        : pressureLevel === "watch"
          ? "The signal requires monitoring because evidence or execution confidence is not yet fully established."
          : "Current evidence posture suggests the issue can remain inside normal execution monitoring.";

  return {
    pressureLevel,
    evidenceConfidence,
    interventionTiming,
    pressureScore: boundedScore,
    rationale,
  };
}
