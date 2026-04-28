export type RiskLevel = "Low" | "Moderate" | "High" | "Critical"

export type TalentLeader = {
  id: string
  name: string
  currentRole: string
  targetRole: string
  school: string
  network: string
  readinessScore: number
  vacancyRisk: RiskLevel
  successorStatus: string
  lastSimulation: string
  evaluatorConfidence: number
  competencies: {
    instructionalLeadership: number
    talentManagement: number
    operations: number
    culture: number
    communityLeadership: number
  }
  developmentPriorities: string[]
}

export const talentLeaders: TalentLeader[] = [
  {
    id: "tl-001",
    name: "Marcus Johnson",
    currentRole: "Assistant Principal",
    targetRole: "Principal",
    school: "Lincoln High School",
    network: "East Network",
    readinessScore: 88,
    vacancyRisk: "Low",
    successorStatus: "Ready Now",
    lastSimulation: "Difficult Staff Conversation",
    evaluatorConfidence: 92,
    competencies: {
      instructionalLeadership: 91,
      talentManagement: 84,
      operations: 86,
      culture: 89,
      communityLeadership: 82
    },
    developmentPriorities: [
      "Sustain instructional coaching cadence across departments",
      "Strengthen board-facing communication for complex school improvement work"
    ]
  },
  {
    id: "tl-002",
    name: "Alyssa Ramirez",
    currentRole: "Dean of Instruction",
    targetRole: "Assistant Principal",
    school: "Roosevelt Middle School",
    network: "Central Network",
    readinessScore: 76,
    vacancyRisk: "Moderate",
    successorStatus: "Ready in 12 Months",
    lastSimulation: "Data-Driven Instruction Meeting",
    evaluatorConfidence: 84,
    competencies: {
      instructionalLeadership: 82,
      talentManagement: 68,
      operations: 71,
      culture: 79,
      communityLeadership: 72
    },
    developmentPriorities: [
      "Build stronger adult accountability routines",
      "Increase confidence managing operational systems during high-pressure windows"
    ]
  },
  {
    id: "tl-003",
    name: "James Carter",
    currentRole: "Assistant Principal",
    targetRole: "Principal",
    school: "Kennedy K-8",
    network: "West Network",
    readinessScore: 64,
    vacancyRisk: "High",
    successorStatus: "Needs Development",
    lastSimulation: "Parent Escalation and Staff Response",
    evaluatorConfidence: 78,
    competencies: {
      instructionalLeadership: 59,
      talentManagement: 61,
      operations: 73,
      culture: 70,
      communityLeadership: 67
    },
    developmentPriorities: [
      "Tighten instructional feedback quality",
      "Practice direct performance conversations with veteran staff"
    ]
  },
  {
    id: "tl-004",
    name: "Danielle Brooks",
    currentRole: "Instructional Coach",
    targetRole: "Dean of Instruction",
    school: "Garfield Academy",
    network: "South Network",
    readinessScore: 83,
    vacancyRisk: "Low",
    successorStatus: "Near Ready",
    lastSimulation: "Observation Debrief",
    evaluatorConfidence: 89,
    competencies: {
      instructionalLeadership: 93,
      talentManagement: 74,
      operations: 77,
      culture: 85,
      communityLeadership: 80
    },
    developmentPriorities: [
      "Move from coaching influence to formal leadership authority",
      "Practice leading cross-grade implementation cycles"
    ]
  },
  {
    id: "tl-005",
    name: "Terrance Wilson",
    currentRole: "Assistant Principal",
    targetRole: "Principal",
    school: "Hayes Middle School",
    network: "East Network",
    readinessScore: 52,
    vacancyRisk: "Critical",
    successorStatus: "High Risk",
    lastSimulation: "Crisis Leadership",
    evaluatorConfidence: 73,
    competencies: {
      instructionalLeadership: 48,
      talentManagement: 46,
      operations: 62,
      culture: 58,
      communityLeadership: 51
    },
    developmentPriorities: [
      "Complete structured residency before principal consideration",
      "Rebuild core instructional leadership evidence base"
    ]
  }
]

export const districtBenchStrength = [
  {
    school: "Lincoln High School",
    principalSuccessors: 2,
    apSuccessors: 1,
    vacancyRisk: "Low",
    nextAction: "Keep in active principal pipeline"
  },
  {
    school: "Roosevelt Middle School",
    principalSuccessors: 1,
    apSuccessors: 2,
    vacancyRisk: "Moderate",
    nextAction: "Prioritize AP readiness coaching"
  },
  {
    school: "Kennedy K-8",
    principalSuccessors: 0,
    apSuccessors: 1,
    vacancyRisk: "High",
    nextAction: "Build external slate and internal residency"
  },
  {
    school: "Hayes Middle School",
    principalSuccessors: 0,
    apSuccessors: 0,
    vacancyRisk: "Critical",
    nextAction: "Immediate succession planning required"
  }
]
