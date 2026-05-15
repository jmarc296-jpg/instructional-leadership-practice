import { executiveModules, type ExecutiveModule } from "@/lib/modules/executive-modules";

export type LeadershipModule = ExecutiveModule & {
  leadershipFocus: string;
  whenToAssign: string;
  leaderAction: string;
  evidenceRequired: string;
  suggestedTimeline: string;
  alignedSignalType: string;
  keywords: string[];
};

export type SignalLikeInput = {
  summary?: string | null;
  indicator?: string | null;
  recommended_action?: string | null;
  recommendedAction?: string | null;
  severity?: string | null;
  school_name?: string | null;
  leader_name?: string | null;
};

export const leadershipModules: LeadershipModule[] = executiveModules.map((moduleItem) => ({
  ...moduleItem,
  leadershipFocus: moduleItem.operationalDomain,
  whenToAssign: moduleItem.governanceConcern,
  leaderAction: moduleItem.recommendedExecutiveAction,
  evidenceRequired: moduleItem.requiredEvidence,
  suggestedTimeline: moduleItem.accountabilityWindow,
  alignedSignalType: moduleItem.id,
  keywords: [
    ...moduleItem.operationalIndicators,
    ...moduleItem.evidenceStreams,
  ].map((value) => value.toLowerCase())
}));

export function recommendLeadershipModule(
  input: SignalLikeInput
): LeadershipModule {
  const text = `
    ${input.summary ?? ""}
    ${input.indicator ?? ""}
    ${input.recommended_action ?? ""}
    ${input.recommendedAction ?? ""}
  `.toLowerCase();

  for (const moduleItem of leadershipModules) {
    if (
      moduleItem.keywords.some((keyword) =>
        text.includes(keyword.toLowerCase())
      )
    ) {
      return moduleItem;
    }
  }

  return leadershipModules[2];
}
