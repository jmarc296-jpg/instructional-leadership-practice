export function normalizeRiskLabel(level: string) {
  if (level === "high") return "Immediate attention required"
  if (level === "medium") return "Monitor closely"
  return "Stable"
}

export function dedupeReports<T extends { title?: string; period?: string; summary?: string }>(reports: T[]) {
  const seen = new Set<string>()

  return reports
    .filter((r) => {
      const key = `${r.title ?? ""}-${r.period ?? ""}-${r.summary ?? ""}`

      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 5)
}
