import type { Card, Domain } from '@/types'

function normalizeDomain(input: string): Domain {
  const value = input.toLowerCase().trim()

  if (value.includes('rigor')) return 'rigor'
  if (value.includes('ddi')) return 'ddi'
  if (value.includes('coaching')) return 'coaching'
  if (value.includes('assessment')) return 'assessment'
  if (value.includes('culture')) return 'culture'
  if (value.includes('leadership')) return 'leadership'

  return 'leadership'
}

function cleanTopic(input: string) {
  return input.trim().replace(/\s+/g, ' ')
}

export function generateAiQuestion(topic: string, domainInput = 'leadership'): Card {
  const cleaned = cleanTopic(topic)
  const domain = normalizeDomain(domainInput)

  return {
    id: `ai-${Date.now()}`,
    domain,
    difficulty: 'medium',
    stem: `A leader is working on ${cleaned} and notices uneven teacher execution.`,
    scenario: `During walkthroughs and coaching, the leader sees partial implementation related to ${cleaned}. Teachers understand the general expectation, but execution remains inconsistent across classrooms.`,
    prompt: 'What should the leader do next?',
    exemplar:
      `The leader should tighten clarity and follow-through around ${cleaned}. That means naming the specific gap in execution, grounding the feedback in observable evidence, and identifying one concrete next move teachers can implement immediately. This matters because inconsistent execution weakens impact and makes it harder to know whether the strategy is actually improving student outcomes.`,
    coachInsight: {
      title: 'Tighten clarity before accountability',
      text:
        `When execution is uneven, leaders should avoid broad reminders and instead name the specific implementation gap, the evidence behind it, and the immediate next move tied to stronger student impact.`
    },
    tags: ['ai-generated', domain, cleaned.toLowerCase()]
  }
}