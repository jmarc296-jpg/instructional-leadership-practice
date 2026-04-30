type DemoRecord = {
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  escalation: 'LOW' | 'MEDIUM' | 'HIGH'
  ownerChanged?: boolean
}

export function buildExecutiveSummary(data: DemoRecord[]) {
  return {
    atRiskLeaders: data.filter((d: DemoRecord) => d.risk === 'HIGH').length,
    immediateActions: data.filter((d: DemoRecord) => d.escalation === 'HIGH').length,
    ownershipShifts: data.filter((d: DemoRecord) => d.ownerChanged).length,
    summaryLine: 'Immediate intervention required to stabilize leadership performance and prevent downstream impact.'
  }
}
