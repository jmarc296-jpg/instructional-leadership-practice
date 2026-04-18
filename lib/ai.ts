import type { Card } from '@/types'

export function generateDraft(topic: string): Card {
  const cleaned = topic.trim() || 'instructional leadership'
  return {
    id: `ai-${Date.now()}`,
    category: 'observation-feedback',
    difficulty: 'strong',
    question: `A leader is working on ${cleaned} and notices uneven teacher execution. What should the leader do next?`,
    prompt:
      `During walkthroughs and coaching, the leader sees partial implementation related to ${cleaned}. Teachers understand the general expectation, but execution remains inconsistent across classrooms.`,
    exemplar:
      'The leader should move from broad encouragement to precise coaching. That means naming the exact implementation gap, clarifying what strong execution should look like, and following up in a short cycle with observation, feedback, and support. The goal is not just awareness, but consistent teacher action tied to student outcomes.',
    isActive: true,
    createdAt: new Date().toISOString()
  }
}
