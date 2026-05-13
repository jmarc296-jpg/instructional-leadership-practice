export type PressureSignal = {
  id?: string
  school_name?: string | null
  leader_name?: string | null
  severity?: string | null
  status?: string | null
  created_at?: string | null
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

export function getPressureScore(signal: PressureSignal) {
  const severity = (signal.severity ?? "medium").toLowerCase()
  const status = (signal.status ?? "new").toLowerCase()
  const daysOpen = getDaysOpen(signal.created_at)

  let score = 0

  if (severity === "high") score += 45
  if (severity === "medium") score += 25
  if (severity === "low") score += 10

  score += Math.min(daysOpen * 2, 30)

  if (status === "escalated") score += 20
  if (status === "cabinet_review") score += 30
  if (status === "resolved") score -= 25

  return Math.max(0, Math.min(score, 100))
}

export function getPressureLevel(score: number) {
  if (score >= 85) return "Board Exposure"
  if (score >= 70) return "System Alert"
  if (score >= 50) return "Critical"
  if (score >= 30) return "Elevated"

  return "Monitoring"
}

export function getPressureNarrative(
  signal: PressureSignal
) {
  const score = getPressureScore(signal)
  const level = getPressureLevel(score)
  const school = signal.school_name ?? "District school"

  if (level === "Board Exposure") {
    return `${school} has crossed the executive pressure threshold and now represents board-level operational exposure.`
  }

  if (level === "System Alert") {
    return `${school} has unresolved instability signals requiring immediate cabinet visibility and execution verification.`
  }

  if (level === "Critical") {
    return `${school} is showing sustained operational instability and requires leadership intervention follow-through.`
  }

  if (level === "Elevated") {
    return `${school} should remain under active monitoring until execution evidence stabilizes.`
  }

  return `${school} is currently under monitored operational review.`
}
