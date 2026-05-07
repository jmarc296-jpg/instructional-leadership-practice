export type Severity = "High" | "Medium" | "Low";
export type ActionStatus = "Not Started" | "In Progress" | "Evidence Needed" | "Complete";

export const workspaceSummary = {
  activeSignals: 14,
  highRiskSchools: 4,
  openActionPlans: 11,
  evidenceDueThisWeek: 7,
  reportsReady: 2
};

export const signalRows = [
  { id: "sig-101", school: "Roosevelt Middle School", leaderRole: "Principal", severity: "High" as Severity, source: "Principal supervisor walkthrough + DDI", evidenceSummary: "Grade 7 CFU checks are inconsistent across math classrooms.", recommendedSupport: "Supervisor-led coaching calibration cycle" },
  { id: "sig-102", school: "Lincoln High School", leaderRole: "Assistant Principal, Instruction", severity: "Medium" as Severity, source: "Coaching debrief", evidenceSummary: "Reteach plans identify standards but miss student misconception groups.", recommendedSupport: "Weekly reteach planning protocol reset" },
  { id: "sig-103", school: "Jefferson Elementary School", leaderRole: "Principal", severity: "Low" as Severity, source: "Instructional leadership team tracker", evidenceSummary: "ILT action items are logged but close-out dates are inconsistent.", recommendedSupport: "Principal supervisor follow-through cadence" }
];

export const actionRows = [
  { id: "act-201", owner: "Principal Supervisor", school: "Roosevelt Middle School", supportMove: "Lead weekly coaching quality review with AP and coach", dueDate: "2026-05-13", status: "In Progress" as ActionStatus, evidenceRequirement: "Two coaching scripts, look-for tracker, and implementation trend" },
  { id: "act-202", owner: "Network Superintendent", school: "Lincoln High School", supportMove: "Reset reteach planning routine with content leads", dueDate: "2026-05-12", status: "Evidence Needed" as ActionStatus, evidenceRequirement: "Reteach agenda, grouped misconceptions, and 10-day mastery check" },
  { id: "act-203", owner: "Executive Director of Schools", school: "Jefferson Elementary School", supportMove: "Tighten ILT completion protocol with clear owners", dueDate: "2026-05-15", status: "Not Started" as ActionStatus, evidenceRequirement: "Updated ILT tracker with owners, dates, and completion verification" }
];

export const recentEvidence = [
  { id: "ev-301", school: "Roosevelt Middle School", actionId: "act-201", category: "Coaching script review", submittedBy: "A. Johnson, Principal Supervisor", submittedAt: "2026-05-05" },
  { id: "ev-302", school: "Lincoln High School", actionId: "act-202", category: "DDI reteach protocol", submittedBy: "M. Perez, AP Instruction", submittedAt: "2026-05-04" }
];
