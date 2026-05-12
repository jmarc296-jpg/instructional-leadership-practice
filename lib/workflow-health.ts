import { WorkspaceActionRecord, WorkspaceEvidenceRecord, WorkspaceSignalRecord } from "@/lib/workspace-types";

export type WorkflowHealthMetrics = {
  signals_with_no_actions: number;
  actions_without_evidence: number;
  overdue_actions: number;
  unlinked_actions: number;
};

export function computeWorkflowHealth(
  signals: WorkspaceSignalRecord[],
  actions: WorkspaceActionRecord[],
  evidence: WorkspaceEvidenceRecord[]
): WorkflowHealthMetrics {
  const signalIdsWithActions = new Set(actions.map((action) => action.signal_id).filter((id): id is string => Boolean(id?.trim())));
  const actionsWithEvidence = new Set(evidence.map((item) => item.action_id).filter((id): id is string => Boolean(id?.trim())));
  const now = Date.now();

  const signalsWithNoActions = signals.filter((signal) => !signalIdsWithActions.has(signal.id)).length;
  const actionsWithoutEvidence = actions.filter((action) => {
    const hasEvidenceRow = actionsWithEvidence.has(action.id);
    const hasEvidenceNotes = Boolean(action.evidence_notes?.trim());
    return !hasEvidenceRow && !hasEvidenceNotes;
  }).length;
  const overdueActions = actions.filter((action) => {
    if (!action.due_date) return false;
    const due = Date.parse(action.due_date);
    if (Number.isNaN(due)) return false;
    return due < now && action.status !== "Complete";
  }).length;
  const unlinkedActions = actions.filter((action) => !action.signal_id?.trim()).length;

  return {
    signals_with_no_actions: signalsWithNoActions,
    actions_without_evidence: actionsWithoutEvidence,
    overdue_actions: overdueActions,
    unlinked_actions: unlinkedActions
  };
}
