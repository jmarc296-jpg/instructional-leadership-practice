export type LeadershipModule = {
  id: string;
  title: string;
  leadershipFocus: string;
  whenToAssign: string;
  leaderAction: string;
  evidenceRequired: string;
  suggestedTimeline: string;
  alignedSignalType: string;
  keywords: string[];
};

export type SignalLikeInput = {
  summary?: string | null;
  indicator?: string | null;
  recommended_action?: string | null;
  recommendedAction?: string | null;
  severity?: string | null;
  school_name?: string | null;
  leader_name?: string | null;
};

export const leadershipModules: LeadershipModule[] = [
  { id: "m1", title: "Instructional Coaching Follow-Through", leadershipFocus: "Coaching execution cadence", whenToAssign: "Walkthrough actions are assigned but not implemented consistently.", leaderAction: "Run two coaching cycles with explicit next-step commitments and owner check-ins.", evidenceRequired: "Coaching notes, implementation tracker, and follow-up observation results.", suggestedTimeline: "10 school days", alignedSignalType: "coaching", keywords: ["coaching", "walkthrough"] },
  { id: "m2", title: "High-Leverage Checks for Understanding", leadershipFocus: "Lesson-level instructional rigor", whenToAssign: "Classroom practice shows weak or inconsistent checks for understanding.", leaderAction: "Lead teacher planning around CFU checkpoints and monitor execution in real time.", evidenceRequired: "Lesson plans with CFU points, walkthrough notes, and student response samples.", suggestedTimeline: "2 weeks", alignedSignalType: "cfu", keywords: ["cfu", "check for understanding"] },
  { id: "m3", title: "Releasing Cognitive Lift / Reducing Over-Scaffolding", leadershipFocus: "Student cognitive demand", whenToAssign: "Students are over-supported and independent thinking is limited.", leaderAction: "Recalibrate scaffolds and require independent release segments in target lessons.", evidenceRequired: "Adjusted lesson plans, student work artifacts, and observation notes.", suggestedTimeline: "2-3 weeks", alignedSignalType: "scaffold", keywords: ["scaffold", "independent"] },
  { id: "m4", title: "Data-Driven Reteach Execution", leadershipFocus: "Intervention quality", whenToAssign: "Reteach plans exist but are not tied to misconception evidence.", leaderAction: "Facilitate reteach planning tied to student misconceptions and assign implementation owners.", evidenceRequired: "Reteach plans, misconception analysis, and post-reteach assessment trends.", suggestedTimeline: "10 school days", alignedSignalType: "reteach", keywords: ["reteach", "misconception", "data", "ddi"] },
  { id: "m5", title: "ILT Accountability Cycle", leadershipFocus: "Instructional leadership team discipline", whenToAssign: "ILT actions are discussed but not monitored through completion.", leaderAction: "Implement weekly ILT action tracker with owner accountability.", evidenceRequired: "ILT agenda, owner tracker, and completion log.", suggestedTimeline: "Weekly cycle", alignedSignalType: "ilt", keywords: ["ilt"] },
  { id: "m6", title: "Evidence-Based Feedback", leadershipFocus: "Feedback specificity", whenToAssign: "Leader feedback lacks concrete evidence and next moves.", leaderAction: "Anchor feedback in observed evidence and assign measurable follow-through tasks.", evidenceRequired: "Feedback scripts, teacher action plans, and observed implementation changes.", suggestedTimeline: "1-2 weeks", alignedSignalType: "feedback", keywords: ["feedback", "evidence"] },
  { id: "m7", title: "Climate and Culture Response", leadershipFocus: "School climate stabilization", whenToAssign: "Culture incidents or behavior patterns are rising without coordinated response.", leaderAction: "Deploy cross-role climate response plan with daily monitoring points.", evidenceRequired: "Incident trends, intervention logs, and staff implementation checks.", suggestedTimeline: "2 weeks", alignedSignalType: "climate", keywords: ["climate", "culture", "discipline"] },
  { id: "m8", title: "Attendance Intervention Follow-Through", leadershipFocus: "Attendance ownership", whenToAssign: "Attendance plans are drafted without consistent adult follow-through.", leaderAction: "Assign student-level outreach owners and track completion daily.", evidenceRequired: "Outreach logs, family contact records, and attendance movement report.", suggestedTimeline: "5 school days", alignedSignalType: "attendance", keywords: ["attendance"] },
  { id: "m9", title: "Succession Readiness", leadershipFocus: "Leadership pipeline readiness", whenToAssign: "Leadership vacancies or transition risk lack succession response.", leaderAction: "Activate succession candidate supports and assign readiness milestones.", evidenceRequired: "Candidate readiness tracker and milestone completion evidence.", suggestedTimeline: "30 days", alignedSignalType: "succession", keywords: ["succession", "vacancy", "pipeline"] },
  { id: "m10", title: "Principal Execution Routines", leadershipFocus: "Operational leadership rhythm", whenToAssign: "Principal execution is inconsistent across assigned priorities.", leaderAction: "Establish weekly execution review with explicit owner and evidence checkpoints.", evidenceRequired: "Execution agenda, owner updates, and verified evidence log.", suggestedTimeline: "Weekly cycle", alignedSignalType: "execution", keywords: [] }
];

export function recommendLeadershipModule(input: SignalLikeInput): LeadershipModule {
  const text = `${input.summary ?? ""} ${input.indicator ?? ""} ${input.recommended_action ?? ""} ${input.recommendedAction ?? ""}`.toLowerCase();
  for (const moduleItem of leadershipModules) {
    if (moduleItem.keywords.some((keyword) => text.includes(keyword))) {
      return moduleItem;
    }
  }
  return leadershipModules[9];
}
