import { questionsWithStrongExemplars } from '@/data/questions'

const DEMO_SAFE_IDS = [
  'walkthrough-001',
  'walkthrough-002'
]

export const demoSafeQuestions = questionsWithStrongExemplars.filter((question) =>
  DEMO_SAFE_IDS.includes(question.id)
)
