type DemoRecord = {
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  escalation: 'LOW' | 'MEDIUM' | 'HIGH'
  ownerChanged?: boolean
}

export function buildExecutiveSummary(data: DemoRecord[]) {
  const escalations = data.filter((d) => d.escalation === 'HIGH')

  return {
    atRiskLeaders: data.filter((d) => d.risk === 'HIGH').length,
    immediateActions: escalations.length,
    ownershipShifts: data.filter((d) => d.ownerChanged).length,
    escalationCount: escalations.length,
    summaryLine: 'Decision needed: confirm owners, evidence expectations, and follow-up cadence for all high-risk signals this week.'
  }
}
