export type DirectiveSignal = {
  id?: string
  school_name?: string | null
  leader_name?: string | null
  severity?: string | null
  status?: string | null
  summary?: string | null
  pressure_score?: number | null
}

export function generateDirective(signal: DirectiveSignal) {
  const school = signal.school_name ?? "District school"
  const leader = signal.leader_name ?? "assigned leader"
  const severity = (signal.severity ?? "medium").toLowerCase()
  const pressure = signal.pressure_score ?? 0

  if (severity === "high" && pressure >= 85) {
    return {
      level: "Board Exposure",
      directive:
        `Require immediate superintendent review for ${school}. Confirm intervention ownership, execution evidence, and escalation containment tied to ${leader}.`,
    }
  }

  if (severity === "high") {
    return {
      level: "Critical",
      directive:
        `Launch immediate cabinet monitoring cycle for ${school}. Verify instructional execution stabilization and evidence follow-through.`,
    }
  }

  if (severity === "medium") {
    return {
      level: "Elevated",
      directive:
        `Monitor ${school} for execution consistency and unresolved leadership instability indicators.`,
    }
  }

  return {
    level: "Monitoring",
    directive:
      `Maintain monitoring cadence for ${school} and confirm evidence continuity.`,
  }
}

export function generateDistrictNarrative(
  directives: {
    level: string
  }[]
) {
  const boardExposure = directives.filter(
    (x) => x.level === "Board Exposure"
  ).length

  const critical = directives.filter(
    (x) => x.level === "Critical"
  ).length

  if (boardExposure > 0) {
    return "District leadership posture now includes board exposure risk requiring direct superintendent containment."
  }

  if (critical > 0) {
    return "District leadership posture requires cabinet-level intervention monitoring and execution verification."
  }

  return "District operational posture remains under active monitoring."
}
