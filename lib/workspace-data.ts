export type WorkspaceStatus = "Not Started" | "In Progress" | "Evidence Added" | "Complete"

export type WorkspaceAssignment = {
  id: string
  title: string
  module: string
  assignee: string
  role: string
  dueDate: string
  status: WorkspaceStatus
  evidence: string
  coachingNote: string
  createdAt: string
}

export const workspaceModules = [
  "DDI Meeting Internalization",
  "Instructional Walkthrough Calibration",
  "Reteach Planning Cycle",
  "Leader Feedback Practice",
  "Talent Review Readiness",
  "Promotion Readiness Simulation"
]

export const workspaceStatuses: WorkspaceStatus[] = [
  "Not Started",
  "In Progress",
  "Evidence Added",
  "Complete"
]
