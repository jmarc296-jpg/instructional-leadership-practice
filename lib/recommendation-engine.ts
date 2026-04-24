import type { Card } from '@/types'
import type { LeadershipProfile } from './leadership-profile'
import type { ConsequenceRecord } from './consequence-engine'

export type LeadershipRecommendation = {
  priority: string
  nextPracticeFocus: string
  rationale: string
}

export function recommendNextMove(
  card: Card,
  profile: LeadershipProfile,
  consequence: ConsequenceRecord
): LeadershipRecommendation {
  if (consequence.severity === 'high') {
    return {
      priority: 'High',
      nextPracticeFocus: 'Practice naming the issue, evidence, ownership, and follow-up in one clear leadership move.',
      rationale: consequence.likelyConsequence
    }
  }

  if (profile.evidenceUse < 60) {
    return {
      priority: 'Moderate',
      nextPracticeFocus: 'Practice grounding leadership feedback in observable evidence before moving to action.',
      rationale: 'The response shows a need for stronger evidence-based leadership language.'
    }
  }

  if (profile.studentImpactOrientation < 60) {
    return {
      priority: 'Moderate',
      nextPracticeFocus: 'Practice connecting adult actions directly to student learning and outcomes.',
      rationale: 'The response needs a clearer line between leadership action and student impact.'
    }
  }

  return {
    priority: 'Low',
    nextPracticeFocus: `Continue building precision in ${card.domain} scenarios.`,
    rationale: 'The response shows a solid foundation and should now be strengthened through repeated practice.'
  }
}
