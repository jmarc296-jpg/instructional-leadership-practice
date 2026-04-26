import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

type Snapshot = {
  domain?: string
  savedAt?: string
  profile?: {
    instructionalPrecision?: number
    accountabilityStrength?: number
    communicationClarity?: number
    studentImpactOrientation?: number
    riskLevel?: string
  }
  consequences?: {
    unresolvedRisk?: string
    likelyConsequence?: string
  }
  recommendation?: {
    priority?: string
    nextPracticeFocus?: string
  }
}

function average(values: number[]) {
  const valid = values.filter((value) => Number.isFinite(value) && value > 0)
  if (!valid.length) return 0
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length)
}

export function getPlatformIntelligence() {
  const snapshots = getLeadershipIntelligenceSnapshots() as Snapshot[]

  const profiles = snapshots.map((snapshot) => snapshot.profile ?? {})

  const instructionalPrecision = average(
    profiles.map((profile) => Number(profile.instructionalPrecision ?? 0))
  )

  const accountabilityStrength = average(
    profiles.map((profile) => Number(profile.accountabilityStrength ?? 0))
  )

  const communicationClarity = average(
    profiles.map((profile) => Number(profile.communicationClarity ?? 0))
  )

  const studentImpactOrientation = average(
    profiles.map((profile) => Number(profile.studentImpactOrientation ?? 0))
  )

  const overallReadiness = average([
    instructionalPrecision,
    accountabilityStrength,
    communicationClarity,
    studentImpactOrientation
  ])

  const highRisk = snapshots.filter(
    (snapshot) => String(snapshot.profile?.riskLevel ?? '').toLowerCase() === 'high'
  ).length

  const moderateRisk = snapshots.filter(
    (snapshot) => String(snapshot.profile?.riskLevel ?? '').toLowerCase() === 'moderate'
  ).length

  const lowRisk = snapshots.filter(
    (snapshot) => String(snapshot.profile?.riskLevel ?? '').toLowerCase() === 'low'
  ).length

  const risks = snapshots.reduce<Record<string, number>>((acc, snapshot) => {
    const risk = snapshot.consequences?.unresolvedRisk ?? 'No dominant risk detected'
    acc[risk] = (acc[risk] ?? 0) + 1
    return acc
  }, {})

  const topRisk =
    Object.entries(risks).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    'Not enough data yet'

  const latest = snapshots[snapshots.length - 1] ?? null

  const readinessLabel =
    overallReadiness >= 80
      ? 'Principal ready'
      : overallReadiness >= 65
        ? 'Nearly ready'
        : overallReadiness >= 50
          ? 'Emerging'
          : 'Not enough data'

  return {
    hasLiveData: snapshots.length > 0,
    totalReps: snapshots.length,
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
    latest
  }
}
