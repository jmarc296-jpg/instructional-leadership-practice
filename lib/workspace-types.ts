export type WorkspaceRiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type WorkspaceActionStatus = "Not Started" | "In Progress" | "Evidence Needed" | "Complete";
export type WorkspaceEvidenceType = "walkthrough" | "student_work" | "assessment_data" | "observation" | "other";
export type WorkspaceRoleType = "principal" | "coach" | "teacher" | "district";

export type WorkspaceActionRecord = { id: string; district_id?: string; signal_id: string | null; school: string; owner_role: string; action_description: string; due_date: string | null; status: WorkspaceActionStatus | string; required_evidence: string | null; evidence_notes: string | null; created_at?: string; updated_at?: string; created_by_role?: string | null; };
export type WorkspaceActionCreateInput = { district_id?: string; signal_id?: string | null; school: string; owner_role: string; action_description: string; due_date?: string | null; status?: WorkspaceActionStatus | string; required_evidence?: string | null; evidence_notes?: string | null; created_by_role?: string | null; };
export type WorkspaceActionPatchInput = { id: string; status?: WorkspaceActionStatus | string; evidence_notes?: string; };

export type WorkspaceSignalRiskLevel = WorkspaceRiskLevel;
export type WorkspaceSignalRecord = { id: string; district_id?: string; created_at?: string; school_name: string; leader_name: string | null; indicator: string | null; severity: WorkspaceSignalRiskLevel; summary: string; owner: string | null; evidence_status: string | null; };
export type WorkspaceSignalCreateInput = { district_id?: string; school_name: string; leader_name?: string | null; indicator?: string | null; severity: WorkspaceSignalRiskLevel; summary: string; owner?: string | null; evidence_status?: string | null; };

export type WorkspaceEvidenceRecord = { id: string; district_id?: string; action_id: string; signal_id: string | null; school: string; evidence_type: WorkspaceEvidenceType | string; evidence_summary: string; submitted_by: string; submitted_by_role?: WorkspaceRoleType | null; created_at?: string; updated_at?: string; };
export type WorkspaceEvidenceCreateInput = { district_id?: string; action_id: string; signal_id?: string | null; school: string; evidence_type: WorkspaceEvidenceType | string; evidence_summary: string; submitted_by: string; submitted_by_role?: WorkspaceRoleType | null; };

export type WorkspaceExecutiveRecord = { id: string; district_id?: string; report_title: string; reporting_period: string; high_risk_signals: number; active_actions: number; completed_actions: number; evidence_submitted: number; summary: string; created_by_role?: WorkspaceRoleType | null; created_at?: string; };
export type WorkspaceExecutiveReportCreateInput = { district_id?: string; report_title: string; reporting_period: string; high_risk_signals: number; active_actions: number; completed_actions: number; evidence_submitted: number; summary: string; created_by_role?: WorkspaceRoleType | null; };
