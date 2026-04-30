export type DistrictScenarioRecord = {
  school: string
  signal: string
  action: string
  owner: string
  due: string
  evidence: string
  escalation: 'LOW' | 'MEDIUM' | 'HIGH'
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  ownerChanged?: boolean
}

export const districtScenario: DistrictScenarioRecord[] = [
  {
    school: 'High School A',
    signal: 'Grade 9 literacy pipeline concern: 12% average performance',
    action: 'Prioritize targeted literacy intervention plan and weekly evidence review',
    owner: 'Principal Coach',
    due: 'This Friday',
    evidence: 'DDI action tracker + student group evidence',
    escalation: 'HIGH',
    risk: 'HIGH',
    ownerChanged: true
  },
  {
    school: 'High School Network',
    signal: 'Cluster-wide math proficiency remains below target',
    action: 'Assign supplemental math support and monitor Algebra I and Geometry progress',
    owner: 'Academic Lead',
    due: 'Next Tuesday',
    evidence: 'Tier data + unit assessment trend',
    escalation: 'HIGH',
    risk: 'HIGH'
  },
  {
    school: 'High School B',
    signal: 'ELA comparison requires caution due to incomplete unit data',
    action: 'Normalize unit completion data before final staffing recommendation',
    owner: 'Data Lead',
    due: 'Next Friday',
    evidence: 'Assessment export',
    escalation: 'MEDIUM',
    risk: 'MEDIUM'
  }
]
