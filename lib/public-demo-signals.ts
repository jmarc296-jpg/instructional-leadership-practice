export type PublicDemoSignal = {
  id: string;
  school_name: string;
  leader_name: string;
  severity: "high" | "medium" | "low";
  summary: string;
  recommended_action: string;
  evidence_status: "missing" | "partial" | "verified";
  created_at: string;
};

export const publicDemoSignals: PublicDemoSignal[] = [
  {
    id: "demo-grade-9-algebra-risk",
    school_name: "Pilot District",
    leader_name: "Grade 9 Leadership Signal",
    severity: "high",
    summary:
      "Grade 9 Algebra proficiency is below target and follow-up evidence is not yet strong enough to confirm instructional correction.",
    recommended_action:
      "Assign cabinet owner, verify reteach execution evidence, and require a follow-up performance check within the next leadership cycle.",
    evidence_status: "partial",
    created_at: "2026-05-13T00:00:00.000Z",
  },
  {
    id: "demo-ddi-follow-up-gap",
    school_name: "Riverside Middle School",
    leader_name: "Jordan Ellis",
    severity: "high",
    summary:
      "DDI follow-up is inconsistent across grade-level teams, creating risk that identified misconceptions are not being retaught with urgency.",
    recommended_action:
      "Require reteach evidence from the next two data meetings and escalate unresolved gaps to the network leader.",
    evidence_status: "missing",
    created_at: "2026-05-12T00:00:00.000Z",
  },
  {
    id: "demo-literacy-execution-watch",
    school_name: "Maxwell K-8",
    leader_name: "Instructional Leadership Team",
    severity: "medium",
    summary:
      "Walkthrough evidence shows lesson alignment is improving, but student discourse and evidence-based writing routines remain uneven.",
    recommended_action:
      "Monitor implementation through focused walkthroughs and collect two artifacts of student-facing literacy practice.",
    evidence_status: "partial",
    created_at: "2026-05-11T00:00:00.000Z",
  },
];
