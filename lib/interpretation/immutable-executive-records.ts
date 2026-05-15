export type ImmutableExecutiveRecord = {
  id: string;
  signalId: string;
  lifecycleStage: string;
  escalationLevel: string;
  executiveOwner: string;
  actionSummary: string;
  evidenceReference: string;
  rationale: string;
  createdAt: string;
  immutableHash: string;
};

type ExecutiveRecordInput = {
  signalId: string;
  lifecycleStage: string;
  escalationLevel: string;
  executiveOwner: string;
  actionSummary: string;
  evidenceReference: string;
  rationale: string;
};

function buildImmutableHash(input: ExecutiveRecordInput) {
  const raw = [
    input.signalId,
    input.lifecycleStage,
    input.escalationLevel,
    input.executiveOwner,
    input.actionSummary,
    input.evidenceReference,
    input.rationale,
  ].join("|");

  let hash = 0;

  for (let index = 0; index < raw.length; index += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(index);
    hash |= 0;
  }

  return `exec_${Math.abs(hash)}`;
}

export function createImmutableExecutiveRecord(
  input: ExecutiveRecordInput
): ImmutableExecutiveRecord {
  const createdAt = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    signalId: input.signalId,
    lifecycleStage: input.lifecycleStage,
    escalationLevel: input.escalationLevel,
    executiveOwner: input.executiveOwner,
    actionSummary: input.actionSummary,
    evidenceReference: input.evidenceReference,
    rationale: input.rationale,
    createdAt,
    immutableHash: buildImmutableHash(input),
  };
}
