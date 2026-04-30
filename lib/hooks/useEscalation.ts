export function useEscalation(actions: any[]) {
  const escalated = actions.filter(a => a.escalation === 'HIGH')
  return {
    hasEscalation: escalated.length > 0,
    escalatedActions: escalated
  }
}
