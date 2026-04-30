export function buildExecutiveSummary(data: any) {
  return {
    atRiskLeaders: data.filter(d => d.risk === 'HIGH').length,
    immediateActions: data.filter(d => d.escalation === 'HIGH').length,
    ownershipShifts: data.filter(d => d.ownerChanged).length,
    summaryLine: 'Immediate intervention required to stabilize leadership performance and prevent downstream impact.'
  }
}
