export type ExecutiveModule = {
  id: string;
  title: string;
  operationalDomain: string;
  executiveQuestion: string;
  governanceConcern: string;
  evidenceStreams: string[];
  operationalIndicators: string[];
  escalationTriggers: string[];
  auditExposure: string;
  recommendedExecutiveAction: string;
  requiredEvidence: string;
  accountabilityWindow: string;
};

export const executiveModules: ExecutiveModule[] = [
  {
    id: "m1",
    title: "Instructional Execution Integrity",
    operationalDomain: "Instructional leadership execution",
    executiveQuestion: "Are instructional expectations being implemented consistently across schools and classrooms?",
    governanceConcern: "Execution inconsistency across instructional leadership routines.",
    evidenceStreams: [
      "walkthrough observations",
      "coaching feedback records",
      "lesson implementation reviews"
    ],
    operationalIndicators: [
      "inconsistent walkthrough evidence",
      "low implementation follow-through",
      "instructional variance between classrooms"
    ],
    escalationTriggers: [
      "repeated unresolved instructional signals",
      "missing implementation evidence",
      "continued execution deterioration"
    ],
    auditExposure: "District instructional expectations cannot be verified consistently.",
    recommendedExecutiveAction: "Assign leadership follow-through review with evidence verification checkpoints.",
    requiredEvidence: "Walkthrough records, implementation notes, and leadership follow-up evidence.",
    accountabilityWindow: "10 school days"
  },
  {
    id: "m2",
    title: "Assessment and Intervention Reliability",
    operationalDomain: "Academic intervention governance",
    executiveQuestion: "Are intervention systems producing measurable academic response?",
    governanceConcern: "Intervention execution lacks measurable evidence of impact.",
    evidenceStreams: [
      "assessment participation",
      "reteach tracking",
      "student proficiency movement"
    ],
    operationalIndicators: [
      "low reteach completion",
      "assessment participation decline",
      "stagnant proficiency movement"
    ],
    escalationTriggers: [
      "multiple failed intervention cycles",
      "missing intervention evidence",
      "persistent subgroup underperformance"
    ],
    auditExposure: "District intervention systems may lack defensible implementation evidence.",
    recommendedExecutiveAction: "Initiate intervention accountability review tied to student outcome evidence.",
    requiredEvidence: "Assessment trends, reteach records, and subgroup response documentation.",
    accountabilityWindow: "2 weeks"
  },
  {
    id: "m3",
    title: "Leadership Accountability Discipline",
    operationalDomain: "Leadership execution governance",
    executiveQuestion: "Are assigned leadership actions being executed and verified consistently?",
    governanceConcern: "Leadership ownership and follow-through are inconsistent.",
    evidenceStreams: [
      "leadership action trackers",
      "owner completion records",
      "directive response logs"
    ],
    operationalIndicators: [
      "overdue assignments",
      "missing evidence",
      "unresolved directives"
    ],
    escalationTriggers: [
      "repeated overdue actions",
      "unverified completion claims",
      "missing ownership accountability"
    ],
    auditExposure: "District leadership execution cannot be validated consistently.",
    recommendedExecutiveAction: "Escalate unresolved leadership actions into executive review cadence.",
    requiredEvidence: "Assignment logs, evidence submissions, and completion verification records.",
    accountabilityWindow: "Weekly executive review"
  }
];

export const executiveModuleCategories = [
  "Instructional Execution",
  "Academic Intervention",
  "Leadership Accountability",
  "Attendance Stabilization",
  "Climate Escalation",
  "Operational Compliance",
  "Staffing and Succession",
  "Multi-Tier Intervention Governance"
] as const;

export function getExecutiveModuleById(id: string) {
  return executiveModules.find((moduleItem) => moduleItem.id === id);
}

export function getExecutiveModuleFallback() {
  return executiveModules[0];
}
