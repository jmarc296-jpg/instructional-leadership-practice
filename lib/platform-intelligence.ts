import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

type IntelligenceSnapshot = {
  domain?: string
  profile?: any
  consequences?: any
  recommendation?: any
  savedAt?: string
}

export function getPlatformIntelligence() {
  const snapshots = getLeadershipIntelligenceSnapshots() as IntelligenceSnapshot[]

  const totalReps = snapshots.length

  const avg = (values: number[]) =>
    values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0

  const profileScores = snapshots.map((s) => s.profile || {})

  const instructionalPrecision = avg(
    profileScores.map((p) => Number(p.instructionalPrecision || 0)).filter(Boolean)
  )

  const accountabilityStrength = avg(
    profileScores.map((p) => Number(p.accountabilityStrength || 0)).filter(Boolean)
  )

  const communicationClarity = avg(
    profileScores.map((p) => Number(p.communicationClarity || 0)).filter(Boolean)
  )

  const studentImpactOrientation = avg(
    profileScores.map((p) => Number(p.studentImpactOrientation || 0)).filter(Boolean)
  )

  const overallReadiness = avg([
    instructionalPrecision,
    accountabilityStrength,
    communicationClarity,
    studentImpactOrientation
  ].filter(Boolean))

  const highRisk = snapshots.filter(
    (s) => String(s.profile?.riskLevel || '').toLowerCase() === 'high'
  ).length

  const moderateRisk = snapshots.filter(
    (s) => String(s.profile?.riskLevel || '').toLowerCase() === 'moderate'
  ).length

  const lowRisk = snapshots.filter(
    (s) => String(s.profile?.riskLevel || '').toLowerCase() === 'low'
  ).length

  const recurringRisks = snapshots.reduce<Record<string, number>>((acc, snapshot) => {
    const risk = snapshot.consequences?.unresolvedRisk || 'No dominant risk detected'
    acc[risk] = (acc[risk] || 0) + 1
    return acc
  }, {})

  const topRisk =
    Object.entries(recurringRisks).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    'Not enough data yet'

  const readinessLabel =
    overallReadiness >= 80
      ? 'Principal ready'
      : overallReadiness >= 65
        ? 'Nearly ready'
        : overallReadiness >= 50
          ? 'Emerging'
          : 'Not enough data'

  return {
    totalReps,
    overallReadiness,
    readinessLabel,
    instructionalPrecision,
    accountabilityStrength,
    communicationClarity,
    studentImpactOrientation,
    highRisk,
    moderateRisk,
    lowRisk,
    topRisk,
    latest: snapshots[snapshots.length - 1] || null,
    hasLiveData: snapshots.length > 0
  }
}
