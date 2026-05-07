import { WorkspaceActionStatus, WorkspaceEvidenceType, WorkspaceRoleType, WorkspaceSignalRiskLevel } from "@/lib/workspace-types";

const riskMap: Record<string, WorkspaceSignalRiskLevel> = { low: "LOW", medium: "MEDIUM", high: "HIGH" };
const evidenceMap: Record<string, WorkspaceEvidenceType> = {
  walkthrough: "walkthrough",
  student_work: "student_work",
  assessment_data: "assessment_data",
  observation: "observation",
  other: "other"
};
const roleMap: Record<string, WorkspaceRoleType> = { principal: "principal", coach: "coach", teacher: "teacher", district: "district" };

export function normalizeRiskLevel(value: string | null | undefined): WorkspaceSignalRiskLevel | null {
  return riskMap[String(value ?? "").trim().toLowerCase()] ?? null;
}
export function normalizeEvidenceType(value: string | null | undefined): WorkspaceEvidenceType | null {
  return evidenceMap[String(value ?? "").trim().toLowerCase()] ?? null;
}
export function normalizeRole(value: string | null | undefined): WorkspaceRoleType | null {
  return roleMap[String(value ?? "").trim().toLowerCase()] ?? null;
}
export function normalizeActionStatus(value: string | null | undefined): WorkspaceActionStatus | null {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "not started") return "Not Started";
  if (normalized === "in progress") return "In Progress";
  if (normalized === "evidence needed") return "Evidence Needed";
  if (normalized === "complete") return "Complete";
  return null;
}
