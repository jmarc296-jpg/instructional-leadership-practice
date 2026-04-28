import { getDistrictIntelligence } from "./district-intelligence"

export function getPredictiveRisks() {
  const intelligence = getDistrictIntelligence()

  return {
    projectedVacancies: intelligence.highRisk + 2,
    likelyDepartures: Math.floor(intelligence.highRisk * 0.6),
    promotionSuccessProbability: "87%"
  }
}
