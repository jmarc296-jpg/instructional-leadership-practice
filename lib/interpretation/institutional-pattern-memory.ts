import { type ExecutiveInterpretation } from "@/lib/interpretation/executive-interpretation";
import { type EscalationPressureProfile } from "@/lib/interpretation/escalation-pressure";

export type InstitutionalPatternProfile = {
  recurringRisk: boolean;
  recurringCount: number;
  institutionalSeverity: "stable" | "emerging" | "persistent" | "systemic";
  patternSummary: string;
  executiveExposure: string;
  recommendedContainment: string;
};

type HistoricalSignalInput = {
  school?: string | null;
  moduleTitle?: string | null;
  pressureLevel?: string | null;
};

function normalize(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

export function calculateInstitutionalPattern(
  currentSchool: string | null | undefined,
  interpretation: ExecutiveInterpretation,
  pressure: EscalationPressureProfile,
  historicalSignals: HistoricalSignalInput[]
): InstitutionalPatternProfile {
  const normalizedSchool = normalize(currentSchool);

  const relatedSignals = historicalSignals.filter((signal) => {
    return (
      normalize(signal.school) === normalizedSchool &&
      normalize(signal.moduleTitle) ===
        normalize(interpretation.module.title)
    );
  });

  const recurringCount = relatedSignals.length;

  const recurringRisk = recurringCount >= 2;

  const institutionalSeverity =
    recurringCount >= 5 || pressure.pressureLevel === "critical"
      ? "systemic"
      : recurringCount >= 3
        ? "persistent"
        : recurringCount >= 1
          ? "emerging"
          : "stable";

  const patternSummary =
    institutionalSeverity === "systemic"
      ? `Repeated operational deterioration patterns are accumulating within ${interpretation.module.title}.`
      : institutionalSeverity === "persistent"
        ? `The district is seeing recurring governance pressure connected to ${interpretation.module.title}.`
        : institutionalSeverity === "emerging"
          ? `Early recurring execution concerns are appearing within ${interpretation.module.title}.`
          : `No recurring institutional execution pattern has been established yet.`;

  const executiveExposure =
    institutionalSeverity === "systemic"
      ? "District leadership exposure is increasing because recurring operational breakdowns are no longer isolated."
      : institutionalSeverity === "persistent"
        ? "Executive leadership should review whether existing containment actions are sufficient."
        : institutionalSeverity === "emerging"
          ? "The issue should remain under active monitoring before escalation risk compounds."
          : "Current exposure remains operationally contained.";

  const recommendedContainment =
    institutionalSeverity === "systemic"
      ? "Escalate into superintendent oversight with formal accountability review cadence."
      : institutionalSeverity === "persistent"
        ? "Assign recurring follow-through checkpoints with evidence verification."
        : institutionalSeverity === "emerging"
          ? "Increase monitoring frequency and validate execution evidence."
          : "Maintain standard execution monitoring.";

  return {
    recurringRisk,
    recurringCount,
    institutionalSeverity,
    patternSummary,
    executiveExposure,
    recommendedContainment,
  };
}
