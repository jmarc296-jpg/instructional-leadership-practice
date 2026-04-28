import { talentLeaders, districtBenchStrength } from "@/lib/talent/mock-data"
import { getLeadershipIntelligenceSnapshots } from "@/lib/local-store"

type UploadedDistrictRecord = {
  leaderName?: string
  role?: string
  school?: string
  retentionRisk?: string
  readinessScore?: number
  vacancyRisk?: string
}

function getUploadedDistrictData(): UploadedDistrictRecord[] {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem("districtUploadedData")
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getDistrictIntelligence() {
  const uploadedData = getUploadedDistrictData()
  const hasUploadedData = uploadedData.length > 0

  const leaderSource = hasUploadedData ? uploadedData : talentLeaders

  const readyNow = leaderSource.filter(
    (leader: any) => Number(leader.readinessScore || 0) >= 85
  ).length

  const highRisk = hasUploadedData
    ? uploadedData.filter(
        (item) =>
          item.vacancyRisk === "High" ||
          item.vacancyRisk === "Critical" ||
          item.retentionRisk === "High" ||
          item.retentionRisk === "Critical"
      ).length
    : districtBenchStrength.filter(
        (item) =>
          item.vacancyRisk === "High" ||
          item.vacancyRisk === "Critical"
      ).length

  const averageReadiness =
    leaderSource.length > 0
      ? Math.round(
          leaderSource.reduce(
            (sum: number, leader: any) =>
              sum + Number(leader.readinessScore || 0),
            0
          ) / leaderSource.length
        )
      : 0

  const simulationSignals =
    typeof window !== "undefined"
      ? getLeadershipIntelligenceSnapshots()
      : []

  const stabilityScore = Math.max(
    65,
    Math.min(
      99,
      averageReadiness + readyNow * 2 - highRisk * 3
    )
  )

  return {
    hasUploadedData,
    totalLeaders: leaderSource.length,
    readyNow,
    highRisk,
    averageReadiness,
    stabilityScore,
    simulationSignals,
    uploadedData
  }
}
