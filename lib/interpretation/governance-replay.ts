import { type ImmutableExecutiveRecord } from "@/lib/interpretation/immutable-executive-records";

export type GovernanceReplayEvent = {
  id: string;
  sequence: number;
  stage: string;
  escalationLevel: string;
  executiveOwner: string;
  timestamp: string;
  summary: string;
  rationale: string;
  immutableHash: string;
};

export type GovernanceReplayTimeline = {
  signalId: string;
  totalEvents: number;
  currentStage: string;
  highestEscalation: string;
  unresolved: boolean;
  replayNarrative: string;
  events: GovernanceReplayEvent[];
};

function escalationRank(level: string) {
  const normalized = level.toLowerCase();

  if (normalized === "critical") return 4;
  if (normalized === "elevated") return 3;
  if (normalized === "watch") return 2;
  if (normalized === "contained") return 1;

  return 0;
}

export function buildGovernanceReplayTimeline(
  signalId: string,
  records: ImmutableExecutiveRecord[]
): GovernanceReplayTimeline {
  const relatedRecords = records
    .filter((record) => record.signalId === signalId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );

  const events = relatedRecords.map((record, index) => ({
    id: record.id,
    sequence: index + 1,
    stage: record.lifecycleStage,
    escalationLevel: record.escalationLevel,
    executiveOwner: record.executiveOwner,
    timestamp: record.createdAt,
    summary: record.actionSummary,
    rationale: record.rationale,
    immutableHash: record.immutableHash,
  }));

  const currentStage = events.at(-1)?.stage ?? "no-record";
  const highestEscalation =
    events
      .map((event) => event.escalationLevel)
      .sort((a, b) => escalationRank(b) - escalationRank(a))[0] ??
    "none";

  const unresolved = !["closed", "contained"].includes(
    currentStage.toLowerCase()
  );

  const replayNarrative =
    events.length === 0
      ? "No executive replay history has been preserved for this signal yet."
      : unresolved
        ? "This signal remains open in the executive governance replay and requires continued monitoring."
        : "This signal has a preserved governance history and appears operationally contained.";

  return {
    signalId,
    totalEvents: events.length,
    currentStage,
    highestEscalation,
    unresolved,
    replayNarrative,
    events,
  };
}
