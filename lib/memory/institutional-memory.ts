export type MemorySignal = {
  id?: string
  school_name?: string | null
  leader_name?: string | null
  severity?: string | null
  summary?: string | null
  status?: string | null
  created_at?: string | null
}

function normalize(value?: string | null) {
  return (value ?? "unknown").trim().toLowerCase()
}

function getDaysOpen(value?: string | null) {
  if (!value) return 0

  const created = new Date(value)

  if (Number.isNaN(created.getTime())) return 0

  return Math.max(
    0,
    Math.floor((Date.now() - created.getTime()) / 86400000)
  )
}

export function getInstitutionalPatterns(signals: MemorySignal[]) {
  const schoolMap = new Map<string, MemorySignal[]>()
  const leaderMap = new Map<string, MemorySignal[]>()

  for (const signal of signals) {
    const schoolKey = normalize(signal.school_name)
    const leaderKey = normalize(signal.leader_name)

    schoolMap.set(schoolKey, [...(schoolMap.get(schoolKey) ?? []), signal])
    leaderMap.set(leaderKey, [...(leaderMap.get(leaderKey) ?? []), signal])
  }

  const recurringSchoolPatterns = Array.from(schoolMap.entries())
    .filter(([, items]) => items.length >= 2)
    .map(([_, items]) => ({
      type: "Recurring School Instability",
      school: items[0]?.school_name ?? "District School",
      count: items.length,
      severity: items.some((x) => x.severity === "high")
        ? "high"
        : items.some((x) => x.severity === "medium")
          ? "medium"
          : "low",
      narrative:
        `${items[0]?.school_name ?? "This school"} has generated ${items.length} leadership instability signals. This pattern indicates recurring execution breakdown rather than isolated variance.`,
    }))

  const recurringLeaderPatterns = Array.from(leaderMap.entries())
    .filter(([, items]) => items.length >= 2)
    .map(([_, items]) => ({
      type: "Recurring Leader Escalation",
      school: items[0]?.school_name ?? "District School",
      count: items.length,
      severity: items.some((x) => x.severity === "high")
        ? "high"
        : items.some((x) => x.severity === "medium")
          ? "medium"
          : "low",
      narrative:
        `${items[0]?.leader_name ?? "This leader"} has repeated unresolved leadership signals tied to execution, follow-through, or stability concerns.`,
    }))

  const staleHighRisk = signals
    .filter(
      (signal) =>
        signal.severity === "high" &&
        getDaysOpen(signal.created_at) >= 7
    )
    .map((signal) => ({
      type: "Stale High Severity Risk",
      school: signal.school_name ?? "District School",
      count: getDaysOpen(signal.created_at),
      severity: "high",
      narrative:
        `${signal.school_name ?? "This signal"} has remained unresolved for ${getDaysOpen(signal.created_at)} days and now represents elevated escalation exposure.`,
    }))

  return [
    ...recurringSchoolPatterns,
    ...recurringLeaderPatterns,
    ...staleHighRisk,
  ]
}

export function getInstitutionalNarrative(
  signals: MemorySignal[]
) {
  const patterns = getInstitutionalPatterns(signals)

  const highRiskPatterns = patterns.filter(
    (pattern) => pattern.severity === "high"
  )

  if (highRiskPatterns.length > 0) {
    return "Institutional memory indicates recurring high-severity instability patterns requiring cabinet-level intervention and superintendent visibility."
  }

  if (patterns.length > 0) {
    return "Institutional memory indicates recurring operational instability patterns across leadership execution."
  }

  return "No recurring instability patterns detected yet. Continue monitoring for unresolved execution drift and recurring escalation signals."
}
