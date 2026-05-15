export type ExecutiveLifecycleStage =
  | "detected"
  | "assigned"
  | "evidence-requested"
  | "verification-review"
  | "escalated"
  | "contained"
  | "closed";

export type ExecutiveLifecycleProfile = {
  currentStage: ExecutiveLifecycleStage;
  nextStage: ExecutiveLifecycleStage | null;
  lifecycleStatus: "active" | "blocked" | "resolved";
  agingRisk: "stable" | "elevated" | "critical";
  executiveSummary: string;
  requiredAction: string;
};

type LifecycleInput = {
  evidenceStatus?: string | null;
  pressureLevel?: string | null;
  institutionalSeverity?: string | null;
  containmentLevel?: string | null;
};

function normalize(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

export function orchestrateExecutiveLifecycle(
  input: LifecycleInput
): ExecutiveLifecycleProfile {
  const evidenceStatus = normalize(input.evidenceStatus);
  const pressureLevel = normalize(input.pressureLevel);
  const institutionalSeverity = normalize(input.institutionalSeverity);
  const containmentLevel = normalize(input.containmentLevel);

  const hasEvidence =
    evidenceStatus.includes("submitted") ||
    evidenceStatus.includes("verified");

  const missingEvidence =
    evidenceStatus.includes("missing") ||
    evidenceStatus.includes("not");

  const highRisk =
    pressureLevel === "critical" ||
    institutionalSeverity === "systemic";

  const elevatedRisk =
    pressureLevel === "elevated" ||
    institutionalSeverity === "persistent";

  if (highRisk && missingEvidence) {
    return {
      currentStage: "escalated",
      nextStage: "verification-review",
      lifecycleStatus: "blocked",
      agingRisk: "critical",
      executiveSummary:
        "Escalation conditions are active because governance exposure remains unresolved without verified evidence.",
      requiredAction:
        "Require executive evidence verification before containment closure.",
    };
  }

  if (containmentLevel === "lock") {
    return {
      currentStage: "verification-review",
      nextStage: "contained",
      lifecycleStatus: "active",
      agingRisk: elevatedRisk ? "elevated" : "stable",
      executiveSummary:
        "Containment controls are active and awaiting executive verification.",
      requiredAction:
        "Validate containment evidence and confirm implementation integrity.",
    };
  }

  if (hasEvidence && elevatedRisk) {
    return {
      currentStage: "contained",
      nextStage: "closed",
      lifecycleStatus: "active",
      agingRisk: "stable",
      executiveSummary:
        "Operational containment appears active, but continued monitoring is still required.",
      requiredAction:
        "Monitor recurring exposure before lifecycle closure.",
    };
  }

  if (missingEvidence) {
    return {
      currentStage: "evidence-requested",
      nextStage: "verification-review",
      lifecycleStatus: "active",
      agingRisk: elevatedRisk ? "elevated" : "stable",
      executiveSummary:
        "Evidence requirements remain unresolved within the execution cycle.",
      requiredAction:
        "Request owner-attributable implementation evidence.",
    };
  }

  return {
    currentStage: "assigned",
    nextStage: "evidence-requested",
    lifecycleStatus: "active",
    agingRisk: "stable",
    executiveSummary:
      "The signal has entered the executive containment workflow.",
    requiredAction:
      "Continue standard containment monitoring and evidence collection.",
  };
}
