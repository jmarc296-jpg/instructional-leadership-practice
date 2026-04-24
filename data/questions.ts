import { buildExemplarResponse } from '@/lib/exemplar-builder'

import type { Card } from '@/types'

export const QUESTION_BANK: Card[] = [
  {
    id: 'coach-001',
    domain: 'coaching',
    difficulty: 'advanced',
    stem: 'A strong teacher is quietly resisting feedback.',
    scenario:
      'During a walkthrough, you notice a veteran teacher leading most of the thinking during a rigorous math task. Students appear compliant, but very few are doing the actual cognitive heavy lifting. When you bring this up in feedback, the teacher responds: "My students canâ€™t handle full independence yet. If I step back, the lesson falls apart." This teacher is respected by peers and has strong parent relationships.',
    prompt:
      'What do you say and do next to address instructional rigor without damaging trust?',
    exemplar:
      'A strong leader affirms the teacherâ€™s commitment to students while naming the instructional concern directly. They use specific evidence from the walkthrough, clarify why over-scaffolding limits student independence, and align on one concrete adjustment for the next lesson. They preserve trust while maintaining instructional expectations.'
  },

  {
    id: 'coach-002',
    domain: 'coaching',
    difficulty: 'expert',
    stem: 'A teacher breaks down during feedback.',
    scenario:
      'You begin delivering direct feedback after observing a weak lesson. Midway through the conversation, the teacher begins crying and says they feel like they can never meet expectations.',
    prompt:
      'How do you handle the moment without lowering standards?',
    exemplar:
      'A strong leader regulates the moment with empathy while maintaining accountability. They pause appropriately, acknowledge emotion, and return the conversation to specific growth actions.'
  },

  {
    id: 'ddi-001',
    domain: 'data',
    difficulty: 'advanced',
    stem: 'Your DDI meeting is going off the rails.',
    scenario:
      'Your Algebra team just reviewed unit assessment results and only 18% of students were proficient. Teachers immediately begin blaming attendance, pacing gaps, and motivation. Nobody is analyzing student misconceptions.',
    prompt:
      'How do you redirect the meeting in real time?',
    exemplar:
      'A strong leader interrupts unproductive narratives, redirects the team toward actual student work and misconceptions, and drives clear reteach planning.'
  },

  {
    id: 'ddi-002',
    domain: 'data',
    difficulty: 'expert',
    stem: 'Your team wants to reteach everything.',
    scenario:
      'After benchmark results decline, teachers propose reteaching the entire unit. You know pacing is already behind and instructional time is limited.',
    prompt:
      'What is your next move?',
    exemplar:
      'A strong leader prioritizes the highest-leverage standards, identifies core misconceptions, and prevents broad reteach decisions that derail pacing.'
  },

  {
    id: 'walkthrough-001',
    domain: 'instruction',
    difficulty: 'advanced',
    stem: 'Walkthrough data contradicts teacher perception.',
    scenario:
      'Walkthrough data shows only 32% of classrooms consistently checking for understanding before independent practice. Teachers argue walkthrough snapshots are unfair.',
    prompt:
      'How do you move teachers toward ownership?',
    exemplar:
      'A strong leader avoids defensiveness, grounds the conversation in patterns, and aligns the team around clear instructional expectations.'
  },

  {
    id: 'walkthrough-002',
    domain: 'instruction',
    difficulty: 'expert',
    stem: 'Your strongest teacher refuses curriculum alignment.',
    scenario:
      'One of your highest-performing teachers consistently modifies curriculum materials and skips required protocols because they believe their personal lessons are stronger.',
    prompt:
      'How do you address this?',
    exemplar:
      'A strong leader acknowledges results while addressing system alignment. They investigate effectiveness and reinforce consistency expectations.'
  },

  {
    id: 'leadership-001',
    domain: 'leadership',
    difficulty: 'expert',
    stem: 'A top performer is damaging culture.',
    scenario:
      'One of your highest-performing teachers openly undermines leadership decisions in team meetings. Other staff are beginning to disengage.',
    prompt:
      'What do you do?',
    exemplar:
      'A strong leader addresses the issue directly, protects culture, and ensures strong performance does not excuse harmful behavior.'
  },

  {
    id: 'leadership-002',
    domain: 'leadership',
    difficulty: 'expert',
    stem: 'Execution keeps breaking down.',
    scenario:
      'Your leadership team consistently leaves meetings with action steps, but weeks later little gets completed.',
    prompt:
      'What system do you build?',
    exemplar:
      'A strong leader builds accountability systems, clarifies ownership, and creates tighter execution follow-up.'
  },

  {
    id: 'principal-001',
    domain: 'leadership',
    difficulty: 'expert',
    stem: 'District pressure is rising.',
    scenario:
      'Testing results declined. District leaders want immediate gains. Your teachers are exhausted and morale is fragile.',
    prompt:
      'What do you prioritize first?',
    exemplar:
      'A strong leader avoids initiative overload, identifies one high-leverage focus, and creates clarity for execution.'
  },

  {
    id: 'equity-001',
    domain: 'equity',
    difficulty: 'advanced',
    stem: 'Your SWD subgroup continues to underperform.',
    scenario:
      'Your overall proficiency improved, but students with disabilities remain significantly behind. Teachers point to intervention services as the solution.',
    prompt:
      'What leadership move do you make?',
    exemplar:
      'A strong leader addresses weak Tier 1 instruction first and ensures interventions are not replacing strong core instruction.'
  },

  {
    id: 'equity-002',
    domain: 'equity',
    difficulty: 'expert',
    stem: 'ELL students are not accessing grade-level work.',
    scenario:
      'Your walkthroughs show ELL students consistently receiving simplified work rather than proper scaffolds for grade-level tasks.',
    prompt:
      'How do you address this pattern?',
    exemplar:
      'A strong leader addresses access without lowering rigor and ensures scaffolds support thinking rather than replace it.'
  },

  {
    id: 'operations-001',
    domain: 'leadership',
    difficulty: 'advanced',
    stem: 'Testing completion is collapsing.',
    scenario:
      'Your school is midway through district testing and completion rates are only at 42%. Teachers are frustrated and students are missing sessions.',
    prompt:
      'What do you do in the next 24 hours?',
    exemplar:
      'A strong leader quickly builds operational clarity, addresses execution gaps, and ensures completion systems are tightened immediately.'
  },

  {
    id: 'culture-001',
    domain: 'leadership',
    difficulty: 'expert',
    stem: 'Your staff is burned out.',
    scenario:
      'You need stronger execution, but your staff feels overwhelmed after multiple district initiatives.',
    prompt:
      'How do you increase accountability without destroying morale?',
    exemplar:
      'A strong leader removes noise, protects focus, and increases accountability around the highest-leverage priorities only.'
  },

  {
    id: 'student-work-001',
    domain: 'instruction',
    difficulty: 'advanced',
    stem: 'Student work reveals deeper misunderstanding.',
    scenario:
      'Teachers believe a lesson went well, but student work reveals widespread misconceptions.',
    prompt:
      'How do you lead the debrief?',
    exemplar:
      'A strong leader grounds the conversation in evidence and helps teachers identify instructional implications.'
  },

  {
    id: 'family-001',
    domain: 'leadership',
    difficulty: 'expert',
    stem: 'A powerful parent is applying pressure.',
    scenario:
      'A well-connected parent demands special treatment for their child after a disciplinary incident.',
    prompt:
      'How do you respond?',
    exemplar:
      'A strong leader maintains fairness, communicates clearly, and avoids setting harmful precedents.'
  }
]

export const questionsWithStrongExemplars = QUESTION_BANK.map((question) => ({
  ...question,
  exemplar: buildExemplarResponse({
    domain: question.domain,
    scenario: question.scenario,
    prompt: question.prompt
  })
}))



