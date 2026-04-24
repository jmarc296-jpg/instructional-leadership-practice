import type { Card } from '@/types'
import { scoreResponseAgainstExemplar } from './response-scoring'
import { analyzeResponse } from './response-insights'
import { updateLeadershipProfile } from './leadership-profile'
import { updateConsequences } from './consequence-engine'
import { recommendNextMove } from './recommendation-engine'

export function processLeadershipDecision(response: string, card: Card) {
  const score = scoreResponseAgainstExemplar(response, card)
  const insights = analyzeResponse(response, card)
  const profile = updateLeadershipProfile(card, score, insights)
  const consequences = updateConsequences(card, response, score, insights)
  const recommendation = recommendNextMove(card, profile, consequences)

  return {
    score,
    insights,
    profile,
    consequences,
    recommendation
  }
}
