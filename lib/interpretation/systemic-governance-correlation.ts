export type SystemicGovernanceCorrelationInput = {
  signalId: string;
  schoolName?: string | null;
  moduleTitle?: string | null;
  pressureLevel?: string | null;
  institutionalSeverity?: string | null;
  lifecycleStage?: string | null;
  unresolved?: boolean;
};

export type SystemicGovernanceCorrelation = {
  correlationLevel: "contained" | "emerging" | "persistent" | "systemic";
  systemicScore: number;
  affectedSchools: number;
  affectedModules: number;
  unresolvedSignals: number;
  highestPressure: string;
  executiveNarrative: string;
  superintendentAction: string;
};

function rankPressure(level?: string | null) {
  const normalized = (level ?? "").toLowerCase();

  if (normalized === "critical") return 4;
  if (normalized === "elevated") return 3;
  if (normalized === "watch") return 2;
  if (normalized === "contained") return 1;

  return 0;
}

export function correlateSystemicGovernance(
  inputs: SystemicGovernanceCorrelationInput[]
): SystemicGovernanceCorrelation {
  const affectedSchools = new Set(
    inputs.map((item) => item.schoolName).filter(Boolean)
  ).size;

  const affectedModules = new Set(
    inputs.map((item) => item.moduleTitle).filter(Boolean)
  ).size;

  const unresolvedSignals = inputs.filter(
    (item) =>
      item.unresolved ||
      !["closed", "contained"].includes(
        (item.lifecycleStage ?? "").toLowerCase()
      )
  ).length;

  const highestPressure =
    inputs
      .map((item) => item.pressureLevel ?? "contained")
      .sort((a, b) => rankPressure(b) - rankPressure(a))[0] ?? "contained";

  let systemicScore = 10;

  systemicScore += affectedSchools * 12;
  systemicScore += affectedModules * 10;
  systemicScore += unresolvedSignals * 8;

  if (highestPressure === "critical") systemicScore += 25;
  if (highestPressure === "elevated") systemicScore += 15;

  const boundedScore = Math.max(0, Math.min(100, systemicScore));

  const correlationLevel =
    boundedScore >= 80
      ? "systemic"
      : boundedScore >= 60
        ? "persistent"
        : boundedScore >= 35
          ? "emerging"
          : "contained";

  const executiveNarrative =
    correlationLevel === "systemic"
      ? "Governance exposure is no longer isolated. Multiple operational conditions are interacting across schools or modules and require executive containment."
      : correlationLevel === "persistent"
        ? "Recurring governance exposure is accumulating and should be reviewed during the next executive operating cycle."
        : correlationLevel === "emerging"
          ? "Early signs of cross-signal governance drift are visible and should remain under active monitoring."
          : "Current governance risk remains contained within normal operating thresholds.";

  const superintendentAction =
    correlationLevel === "systemic"
      ? "Convene executive containment review and assign cabinet-level ownership."
      : correlationLevel === "persistent"
        ? "Move recurring exposure into weekly cabinet monitoring."
        : correlationLevel === "emerging"
          ? "Require verification checks before the next operating cycle."
          : "Maintain standard monitoring cadence.";

  return {
    correlationLevel,
    systemicScore: boundedScore,
    affectedSchools,
    affectedModules,
    unresolvedSignals,
    highestPressure,
    executiveNarrative,
    superintendentAction,
  };
}
