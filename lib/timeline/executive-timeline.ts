export type TimelineSignal = {
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

export function buildTimeline(signal: TimelineSignal) {
  const daysOpen = getDaysOpen(signal.created_at)
  const severity = (signal.severity ?? "medium").toLowerCase()

  const phases = [
    {
      phase: "Signal Detected",
      completed: true,
      narrative:
        "Leadership instability signal entered executive monitoring.",
    },
    {
      phase: "Ownership Assigned",
      completed: daysOpen >= 1,
      narrative:
        "Leadership ownership and intervention responsibility assigned.",
    },
    {
      phase: "Evidence Verification",
      completed: daysOpen >= 3,
      narrative:
        "Execution evidence reviewed for implementation fidelity.",
    },
    {
      phase: "Cabinet Review",
      completed:
        severity === "high" && daysOpen >= 5,
      narrative:
        "Cabinet-level review triggered due to sustained instability.",
    },
    {
      phase: "Board Exposure Threshold",
      completed:
        severity === "high" && daysOpen >= 10,
      narrative:
        "Signal crossed executive exposure threshold and requires superintendent containment.",
    },
  ]

  return {
    school_name: signal.school_name,
    severity,
    days_open: daysOpen,
    phases,
  }
}
