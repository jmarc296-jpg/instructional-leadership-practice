import { type InstitutionalPatternProfile } from "@/lib/interpretation/institutional-pattern-memory";
import { type EscalationPressureProfile } from "@/lib/interpretation/escalation-pressure";

export type ExecutiveContainmentProtocol = {
  containmentLevel: "monitor" | "assign" | "verify" | "escalate" | "lock";
  requiredSequence: string[];
  containmentOwner: string;
  evidenceRequirement: string;
  verificationStandard: string;
  superintendentReviewRequired: boolean;
  boardExposureWarning: string;
};

export function generateContainmentProtocol(
  pattern: InstitutionalPatternProfile,
  pressure: EscalationPressureProfile
): ExecutiveContainmentProtocol {
  const highExposure =
    pressure.pressureLevel === "critical" ||
    pattern.institutionalSeverity === "systemic";

  const persistentExposure =
    pressure.pressureLevel === "elevated" ||
    pattern.institutionalSeverity === "persistent";

  const containmentLevel = highExposure
    ? "lock"
    : persistentExposure
      ? "escalate"
      : pressure.pressureLevel === "watch"
        ? "verify"
        : pattern.institutionalSeverity === "emerging"
          ? "assign"
          : "monitor";

  const requiredSequence =
    containmentLevel === "lock"
      ? [
          "Confirm executive owner",
          "Lock required evidence standard",
          "Require superintendent review",
          "Schedule cabinet containment update",
          "Preserve executive record"
        ]
      : containmentLevel === "escalate"
        ? [
            "Assign accountable owner",
            "Set evidence deadline",
            "Verify implementation artifact",
            "Review before next cabinet cycle"
          ]
        : containmentLevel === "verify"
          ? [
              "Confirm evidence source",
              "Validate owner follow-through",
              "Monitor pressure score movement"
            ]
          : containmentLevel === "assign"
            ? [
                "Assign monitoring owner",
                "Set follow-up checkpoint",
                "Document early pattern evidence"
              ]
            : [
                "Continue standard monitoring",
                "Review during weekly operating cycle"
              ];

  return {
    containmentLevel,
    requiredSequence,
    containmentOwner: highExposure
      ? "Superintendent or Cabinet Designee"
      : persistentExposure
        ? "Principal Supervisor"
        : "District Support Owner",
    evidenceRequirement: highExposure
      ? "Verified implementation evidence, owner response record, and cabinet review note."
      : persistentExposure
        ? "Owner action record, implementation artifact, and evidence status update."
        : "Monitoring note and next-cycle status check.",
    verificationStandard: highExposure
      ? "Evidence must be specific, dated, owner-attributable, and tied to the original signal."
      : "Evidence must show action taken, responsible owner, and next follow-up date.",
    superintendentReviewRequired: highExposure,
    boardExposureWarning: highExposure
      ? "Board exposure may increase if containment evidence is not verified before the next executive cycle."
      : persistentExposure
        ? "Board exposure remains possible if the issue persists across cycles."
        : "Board exposure remains contained under current monitoring posture.",
  };
}
