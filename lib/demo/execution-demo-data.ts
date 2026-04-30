export const demoSignals = [
  {
    id: "signal-001",
    school: "Lincoln Middle School",
    leader: "Principal Dana Mitchell",
    risk: "High",
    riskScore: 87,
    signal: "Instructional walkthroughs show inconsistent reteach execution across Grade 6 math.",
    action: "Launch 10-day reteach accountability cycle focused on priority standard alignment.",
    owner: "Principal Dana Mitchell",
    dueDate: "Friday",
    evidence: "Reteach plans, student work samples, and walkthrough notes",
    escalation: "Immediate",
    ownershipShift: "Principal"
  },
  {
    id: "signal-002",
    school: "Eastview High School",
    leader: "Principal Marcus Reed",
    risk: "Critical",
    riskScore: 94,
    signal: "Algebra I proficiency remains below target after two data cycles with limited evidence of reteach follow-through.",
    action: "Escalate to network review with required evidence upload and weekly monitoring.",
    owner: "Network Superintendent",
    dueDate: "Wednesday",
    evidence: "DDI tracker, teacher action plans, assessment retake data",
    escalation: "Critical",
    ownershipShift: "Principal → Network Superintendent"
  },
  {
    id: "signal-003",
    school: "Harborview Elementary",
    leader: "Principal Elena Torres",
    risk: "Medium",
    riskScore: 71,
    signal: "Reading intervention groups are identified, but progress monitoring evidence is incomplete.",
    action: "Require evidence check and intervention adjustment before next DDI cycle.",
    owner: "Principal Elena Torres",
    dueDate: "Monday",
    evidence: "Intervention tracker and subgroup progress notes",
    escalation: "System Alert",
    ownershipShift: "Principal"
  }
]

export const demoExecutiveSummary = {
  headline: "3 schools require execution follow-through this week.",
  risk: "1 critical leadership risk requires network ownership.",
  action: "System has generated required actions, due dates, evidence expectations, and escalation levels.",
  outcome: "District leaders can now see where leadership follow-through is happening and where ownership must shift."
}
