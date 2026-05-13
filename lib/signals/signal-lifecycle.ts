export type SignalSeverity = "low" | "medium" | "high"

export type SignalStatus =
  | "new"
  | "assigned"
  | "in_progress"
  | "evidence_requested"
  | "evidence_submitted"
  | "verified"
  | "escalated"
  | "cabinet_review"
  | "resolved"
  | "closed"

export type EscalationLevel =
  | "Monitor"
  | "Immediate"
  | "Critical"
  | "System Alert"
  | "Board Exposure"

export type LeadershipSignalInput = {
  severity?: SignalSeverity | string | null
  status?: SignalStatus | string | null
  created_at?: string | null
  evidence_status?: string | null
  school_name?: string | null
  leader_name?: string | null
  summary?: string | null
}

export function getUnresolvedDays(createdAt?: string | null) {
  if (!createdAt) return 0

  const created = new Date(createdAt)
  if (Number.isNaN(created.getTime())) return 0

  const now = new Date()
  const diff = now.getTime() - created.getTime()

  return Math.max(0, Math.floor(diff / 86400000))
}

export function isClosedStatus(status?: string | null) {
  return ["verified", "resolved", "closed"].includes((status ?? "").toLowerCase())
}

export function getEscalationLevel(signal: LeadershipSignalInput): EscalationLevel {
  const severity = (signal.severity ?? "medium").toLowerCase()
  const status = (signal.status ?? "new").toLowerCase()
  const unresolvedDays = getUnresolvedDays(signal.created_at)
  const evidenceStatus = (signal.evidence_status ?? "").toLowerCase()

  if (isClosedStatus(status)) return "Monitor"

  if (severity === "high" && unresolvedDays >= 14) return "Board Exposure"
  if (severity === "high" && unresolvedDays >= 7) return "System Alert"
  if (severity === "high" && evidenceStatus !== "verified") return "Critical"
  if (severity === "medium" && unresolvedDays >= 10) return "Critical"
  if (severity === "medium" && unresolvedDays >= 5) return "Immediate"
  if (severity === "low" && unresolvedDays >= 10) return "Immediate"

  return "Monitor"
}

export function getCabinetReviewRequired(signal: LeadershipSignalInput) {
  const escalationLevel = getEscalationLevel(signal)

  return ["Critical", "System Alert", "Board Exposure"].includes(escalationLevel)
}

export function getSignalPressureNarrative(signal: LeadershipSignalInput) {
  const escalationLevel = getEscalationLevel(signal)
  const unresolvedDays = getUnresolvedDays(signal.created_at)
  const school = signal.school_name ?? "This school"
  const leader = signal.leader_name ?? "the assigned leader"

  if (escalationLevel === "Board Exposure") {
    return `${school} has an unresolved leadership risk tied to ${leader}. The signal has crossed the board exposure threshold and requires superintendent review.`
  }

  if (escalationLevel === "System Alert") {
    return `${school} has a persistent high-severity leadership risk. Cabinet review is required before this becomes a board-level exposure issue.`
  }

  if (escalationLevel === "Critical") {
    return `${school} has an elevated unresolved signal. Evidence is not strong enough to confirm execution correction.`
  }

  if (escalationLevel === "Immediate") {
    return `${school} requires near-term follow-up. The signal has remained open for ${unresolvedDays} day${unresolvedDays === 1 ? "" : "s"}.`
  }

  return `${school} is being monitored. Current evidence does not yet require cabinet escalation.`
}
