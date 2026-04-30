export type RiskSeverity = "Low" | "Moderate" | "High" | "Critical";

export type RiskSignal = {
  id: string;
  domain: "Instruction" | "Achievement" | "Retention" | "Succession" | "Culture";
  signal: string;
  description: string;
  threshold: string;
  severity: RiskSeverity;
  recommendedModule: string;
  owner: string;
  timeline: string;
};

export const riskSignals: RiskSignal[] = [
  {
    id: "walkthrough-frequency-low",
    domain: "Instruction",
    signal: "Low walkthrough frequency",
    description:
      "Instructional visibility is inconsistent, limiting the leader's ability to identify trends, coach in real time, and monitor implementation.",
    threshold: "Fewer than 3 documented walkthroughs per week",
    severity: "High",
    recommendedModule: "Instructional Leadership Reset",
    owner: "Principal Supervisor",
    timeline: "30 Days"
  },
  {
    id: "feedback-quality-weak",
    domain: "Instruction",
    signal: "Weak feedback quality",
    description:
      "Feedback lacks specificity, evidence, or a clear teacher action, reducing the likelihood that observation leads to improved practice.",
    threshold: "More than 40% of feedback entries lack a measurable next step",
    severity: "High",
    recommendedModule: "Feedback Quality Reset",
    owner: "Principal Supervisor",
    timeline: "30 Days"
  },
  {
    id: "reteach-execution-weak",
    domain: "Achievement",
    signal: "Weak reteach execution",
    description:
      "Teams are identifying student misconceptions but not consistently converting analysis into targeted reteach actions with follow-up evidence.",
    threshold: "Less than 70% of reteach plans include skill, misconception, evidence, and follow-up date",
    severity: "Critical",
    recommendedModule: "Reteach Execution System",
    owner: "Academic Team",
    timeline: "30 Days"
  },
  {
    id: "teacher-retention-decline",
    domain: "Retention",
    signal: "Teacher retention decline",
    description:
      "Staff stability is weakening, increasing instructional disruption and reducing the leader's ability to sustain improvement efforts.",
    threshold: "Retention risk exceeds prior-year trend or vacancy pressure increases midyear",
    severity: "Moderate",
    recommendedModule: "Staff Stability Intervention",
    owner: "Talent Team",
    timeline: "45 Days"
  },
  {
    id: "succession-bench-weakness",
    domain: "Succession",
    signal: "Succession bench weakness",
    description:
      "The district lacks clear evidence of ready-now or emerging leadership capacity for key school leadership roles.",
    threshold: "No identified ready-now successor or limited evidence of assistant principal development",
    severity: "High",
    recommendedModule: "Leadership Bench Builder",
    owner: "Principal Supervisor",
    timeline: "60 Days"
  },
  {
    id: "attendance-risk-rising",
    domain: "Culture",
    signal: "Attendance risk rising",
    description:
      "Student attendance patterns are weakening, creating pressure on achievement, intervention effectiveness, and schoolwide routines.",
    threshold: "Chronic absenteeism increases for 2 consecutive reporting periods",
    severity: "High",
    recommendedModule: "Attendance Accountability Sprint",
    owner: "School Leadership Team",
    timeline: "30 Days"
  }
];

export function getRiskSignalsBySeverity(severity: RiskSeverity) {
  return riskSignals.filter((signal) => signal.severity === severity);
}

export function getRiskSignalsByDomain(domain: RiskSignal["domain"]) {
  return riskSignals.filter((signal) => signal.domain === domain);
}

export function getRecommendedModule(signalName: string) {
  return riskSignals.find((signal) => signal.signal === signalName)?.recommendedModule;
}
