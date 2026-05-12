import { leadershipModules, type LeadershipModule } from "@/lib/leadership-modules";

export type WorkspaceStatus = "assigned" | "in_progress" | "evidence_submitted" | "complete";
export type AssignmentTiming = "on_track" | "due_soon" | "overdue";
export type RiskSeverity = "low" | "medium" | "high";

export type WorkspaceAssignment = {
  id: string;
  title: string;
  module: string;
  moduleId?: string;
  assignee: string;
  role: string;
  dueDate: string;
  status?: WorkspaceStatus | "Not Started" | "In Progress" | "Evidence Added" | "Complete";
  evidence: string;
  coachingNote: string;
  createdAt?: string;
  dueAt?: string;
  lastUpdatedAt?: string;
  evidenceNote?: string;
  evidenceUpdatedAt?: string;
  followUpNote?: string;
  completedAt?: string;
  sourceSignalId?: string;
};

export type CreateWorkspaceAssignmentInput = {
  signalId: string;
  schoolName?: string | null;
  leaderName?: string | null;
  owner?: string | null;
  signalSummary?: string | null;
  moduleTitle: string;
  moduleId?: string;
  leaderAction: string;
  evidenceRequired: string;
  suggestedTimeline: string;
  severity?: string | null;
};

export const WORKSPACE_ASSIGNMENTS_KEY = "leadsharper-workspace-assignments";
export const workspaceModules = leadershipModules.map((moduleItem) => moduleItem.title);

function normalizeModuleTitle(value: string) {
  return value.trim().toLowerCase();
}

const legacyModuleToIdMap: Record<string, string> = {
  "ddi meeting internalization": "m4",
  "instructional walkthrough calibration": "m1",
  "reteach planning cycle": "m4",
  "leader feedback practice": "m6",
  "talent review readiness": "m9",
  "promotion readiness simulation": "m9"
};

export function resolveModuleFromAssignment(assignment: Pick<WorkspaceAssignment, "module" | "moduleId">): LeadershipModule {
  if (assignment.moduleId) {
    const exactMatch = leadershipModules.find((moduleItem) => moduleItem.id === assignment.moduleId);
    if (exactMatch) return exactMatch;
  }
  const normalizedTitle = normalizeModuleTitle(assignment.module);
  const titleMatch = leadershipModules.find((moduleItem) => normalizeModuleTitle(moduleItem.title) === normalizedTitle);
  if (titleMatch) return titleMatch;
  const mappedId = legacyModuleToIdMap[normalizedTitle];
  const mappedMatch = leadershipModules.find((moduleItem) => moduleItem.id === mappedId);
  if (mappedMatch) return mappedMatch;
  return leadershipModules[9];
}

function getDueDateFromTimeline(timeline: string) {
  const normalized = timeline.toLowerCase();
  const daysMatch = normalized.match(/(\d+)\s*(school\s*)?day/);
  const weeksMatch = normalized.match(/(\d+)\s*week/);
  const days = daysMatch ? Number(daysMatch[1]) : weeksMatch ? Number(weeksMatch[1]) * 7 : 7;
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now.toISOString().slice(0, 10);
}

function getDefaultDueAt(createdAtIso: string) {
  const due = new Date(createdAtIso);
  due.setDate(due.getDate() + 5);
  return due.toISOString();
}

export function getWorkspaceAssignments(): WorkspaceAssignment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WORKSPACE_ASSIGNMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WorkspaceAssignment[]) : [];
  } catch {
    return [];
  }
}

function saveWorkspaceAssignments(assignments: WorkspaceAssignment[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(WORKSPACE_ASSIGNMENTS_KEY, JSON.stringify(assignments));
  }
}

export function resolveAssignmentStatus(assignment: WorkspaceAssignment): WorkspaceStatus {
  if (assignment.completedAt || assignment.status === "complete" || assignment.status === "Complete") return "complete";
  if (assignment.evidenceNote?.trim() || assignment.evidenceUpdatedAt || assignment.status === "evidence_submitted" || assignment.status === "Evidence Added") return "evidence_submitted";
  if (assignment.status === "in_progress" || assignment.status === "In Progress") return "in_progress";
  return "assigned";
}

export function resolveAssignmentTiming(assignment: WorkspaceAssignment): AssignmentTiming {
  if (!assignment.dueAt) return "on_track";
  const dueTime = new Date(assignment.dueAt).getTime();
  if (Number.isNaN(dueTime)) return "on_track";

  const now = Date.now();
  const msRemaining = dueTime - now;
  if (msRemaining < 0) return "overdue";

  const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
  if (msRemaining <= twoDaysMs) return "due_soon";
  return "on_track";
}

function shiftSeverity(severity: RiskSeverity, delta: number): RiskSeverity {
  const ordered: RiskSeverity[] = ["low", "medium", "high"];
  const idx = ordered.indexOf(severity);
  const bounded = Math.max(0, Math.min(ordered.length - 1, idx + delta));
  return ordered[bounded];
}

export function calculateSignalRiskAdjustment(
  signal: { severity?: string | null; owner?: string | null; leader_name?: string | null },
  assignment?: WorkspaceAssignment
): { baseSeverity: RiskSeverity; adjustedSeverity: RiskSeverity; reason: string; adjusted: boolean } {
  const baseSeverity: RiskSeverity = signal.severity?.toLowerCase() === "high" ? "high" : signal.severity?.toLowerCase() === "medium" ? "medium" : "low";

  if (!assignment) {
    const hasOwner = Boolean((signal.owner ?? signal.leader_name ?? "").trim());
    if (!hasOwner) return { baseSeverity, adjustedSeverity: shiftSeverity(baseSeverity, 1), reason: "Unassigned signal has elevated execution risk.", adjusted: true };
    return { baseSeverity, adjustedSeverity: baseSeverity, reason: "No workspace execution record yet.", adjusted: false };
  }

  const status = resolveAssignmentStatus(assignment);
  const timing = resolveAssignmentTiming(assignment);
  const hasEvidence = Boolean(assignment.evidenceNote?.trim());

  if ((status === "complete" || status === "evidence_submitted") && hasEvidence) {
    return { baseSeverity, adjustedSeverity: shiftSeverity(baseSeverity, -1), reason: "Execution completed with evidence reduces immediate risk.", adjusted: true };
  }

  if (timing === "overdue" && !hasEvidence) {
    return { baseSeverity, adjustedSeverity: shiftSeverity(baseSeverity, 1), reason: "Overdue assignment without evidence increases risk.", adjusted: true };
  }

  if (status === "in_progress") {
    return { baseSeverity, adjustedSeverity: shiftSeverity(baseSeverity, -1), reason: "In-progress execution slightly reduces risk.", adjusted: true };
  }

  const hasOwner = Boolean((assignment.assignee ?? "").trim());
  if (!hasOwner) {
    return { baseSeverity, adjustedSeverity: shiftSeverity(baseSeverity, 1), reason: "Assignment exists but is unassigned, increasing risk.", adjusted: true };
  }

  return { baseSeverity, adjustedSeverity: baseSeverity, reason: "Execution state does not change baseline risk.", adjusted: false };
}

export function updateWorkspaceAssignmentStatus(id: string, status: WorkspaceStatus): boolean {
  const existing = getWorkspaceAssignments();
  const nowIso = new Date().toISOString();
  const updated = existing.map((assignment) =>
    assignment.id === id
      ? {
          ...assignment,
          status,
          lastUpdatedAt: nowIso,
          completedAt: status === "complete" ? nowIso : assignment.completedAt
        }
      : assignment
  );
  saveWorkspaceAssignments(updated);
  return true;
}

export function updateWorkspaceAssignmentEvidence(id: string, evidenceNote: string, followUpNote?: string): boolean {
  const existing = getWorkspaceAssignments();
  const nowIso = new Date().toISOString();
  const updated = existing.map((assignment) =>
    assignment.id === id
      ? {
          ...assignment,
          evidenceNote,
          followUpNote: followUpNote ?? assignment.followUpNote,
          evidenceUpdatedAt: nowIso,
          lastUpdatedAt: nowIso,
          status: evidenceNote.trim() ? "evidence_submitted" : resolveAssignmentStatus(assignment)
        }
      : assignment
  );
  saveWorkspaceAssignments(updated);
  return true;
}

export function createWorkspaceAssignmentFromSignal(input: CreateWorkspaceAssignmentInput): { created: boolean; duplicate: boolean; assignmentId: string } {
  const existing = getWorkspaceAssignments();
  const targetModuleId = input.moduleId ?? resolveModuleFromAssignment({ module: input.moduleTitle, moduleId: undefined }).id;

  const duplicate = existing.find((assignment) => {
    const sourceMatch = assignment.sourceSignalId ? assignment.sourceSignalId === input.signalId : assignment.id.includes(input.signalId);
    const moduleMatch = (assignment.moduleId ?? resolveModuleFromAssignment(assignment).id) === targetModuleId;
    return sourceMatch && moduleMatch;
  });

  if (duplicate) return { created: false, duplicate: true, assignmentId: duplicate.id };

  const assignmentId = `signal-${input.signalId}-${targetModuleId}`;
  const createdAt = new Date().toISOString();
  const assignment: WorkspaceAssignment = {
    id: assignmentId,
    title: `${input.schoolName?.trim() || "School"}: ${input.signalSummary?.trim() || "Leadership intervention"}`,
    module: input.moduleTitle,
    moduleId: targetModuleId,
    assignee: input.owner?.trim() || input.leaderName?.trim() || "Unassigned leader",
    role: input.severity?.toLowerCase() === "high" ? "High-Risk Owner" : "Leader",
    dueDate: getDueDateFromTimeline(input.suggestedTimeline),
    status: "assigned",
    evidence: "",
    coachingNote: `Leader action: ${input.leaderAction}\nEvidence required: ${input.evidenceRequired}`,
    evidenceNote: "",
    followUpNote: "",
    sourceSignalId: input.signalId,
    createdAt,
    dueAt: getDefaultDueAt(createdAt),
    lastUpdatedAt: createdAt
  };

  saveWorkspaceAssignments([assignment, ...existing]);
  return { created: true, duplicate: false, assignmentId };
}

export const workspaceStatuses: WorkspaceStatus[] = ["assigned", "in_progress", "evidence_submitted", "complete"];
