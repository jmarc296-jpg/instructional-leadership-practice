type ActionRecord = {
  escalation: 'LOW' | 'MEDIUM' | 'HIGH'
}

export function useEscalation(actions: ActionRecord[]) {
  const escalated = actions.filter((a: ActionRecord) => a.escalation === 'HIGH')
  return {
    hasEscalation: escalated.length > 0,
    escalatedActions: escalated,
    escalationCount: escalated.length
  }
}
