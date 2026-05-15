import {
  leadershipModules,
  type LeadershipModule,
  type SignalLikeInput,
} from "@/lib/leadership-modules";

export type ExecutiveInterpretation = {
  module: LeadershipModule;
  confidencePosture: "high" | "moderate" | "limited";
  matchedEvidence: string[];
  missingEvidence: string[];
  escalationRationale: string;
  superintendentQuestion: string;
  nextExecutiveAction: string;
  auditImplication: string;
};

function normalize(value?: string | null) {
  return (value ?? "").toLowerCase();
}

function getSignalText(input: SignalLikeInput) {
  return [
    input.summary,
    input.indicator,
    input.recommended_action,
    input.recommendedAction,
    input.severity,
    input.school_name,
    input.leader_name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function scoreLeadershipModule(text: string, moduleItem: LeadershipModule) {
  const evidenceMatches = moduleItem.evidenceStreams.filter((stream) =>
    text.includes(stream.toLowerCase())
  );

  const indicatorMatches = moduleItem.operationalIndicators.filter((indicator) =>
    text.includes(indicator.toLowerCase())
  );

  const keywordMatches = moduleItem.keywords.filter((keyword) =>
    keyword && text.includes(keyword.toLowerCase())
  );

  return {
    moduleItem,
    score:
      evidenceMatches.length * 3 +
      indicatorMatches.length * 4 +
      keywordMatches.length,
    evidenceMatches,
    indicatorMatches,
  };
}

export function interpretLeadershipSignal(
  input: SignalLikeInput
): ExecutiveInterpretation {
  const text = getSignalText(input);

  const scoredModules = leadershipModules
    .map((moduleItem) => scoreLeadershipModule(text, moduleItem))
    .sort((a, b) => b.score - a.score);

  const bestMatch = scoredModules[0];
  const selectedModule =
    bestMatch && bestMatch.score > 0 ? bestMatch.moduleItem : leadershipModules[2];

  const matchedEvidence = [
    ...new Set([
      ...(bestMatch?.evidenceMatches ?? []),
      ...(bestMatch?.indicatorMatches ?? []),
    ]),
  ];

  const missingEvidence = selectedModule.evidenceStreams.filter(
    (stream) =>
      !matchedEvidence
        .map((item) => item.toLowerCase())
        .includes(stream.toLowerCase())
  );

  const severity = normalize(input.severity);
  const hasHighSeverity =
    severity.includes("high") || severity.includes("critical");
  const hasLimitedEvidence = matchedEvidence.length === 0;

  const confidencePosture =
    matchedEvidence.length >= 2
      ? "high"
      : matchedEvidence.length === 1
        ? "moderate"
        : "limited";

  const escalationRationale = hasHighSeverity
    ? `Signal severity is elevated and maps to ${selectedModule.operationalDomain}. Executive follow-through should be verified against defined evidence.`
    : hasLimitedEvidence
      ? `The signal maps to ${selectedModule.operationalDomain}, but available evidence is limited. District leaders should confirm source documentation before escalation.`
      : `The signal contains operational evidence connected to ${selectedModule.operationalDomain} and should move into owned execution review.`;

  return {
    module: selectedModule,
    confidencePosture,
    matchedEvidence,
    missingEvidence,
    escalationRationale,
    superintendentQuestion: selectedModule.executiveQuestion,
    nextExecutiveAction: selectedModule.recommendedExecutiveAction,
    auditImplication: selectedModule.auditExposure,
  };
}
