import type { Card } from '@/types'

export const QUESTION_BANK: Card[] = [
  {
    id: 'rigor-001',
    domain: 'rigor',
    difficulty: 'medium',
    stem: 'Students are successful, but the teacher is carrying most of the thinking.',
    scenario:
      'During a walkthrough, the teacher asks a series of leading questions, provides sentence starters for every response, and heavily cues students toward the correct answer. Most students respond correctly, but very few explain their thinking independently.',
    prompt: 'What concern should the leader name, and why does it matter?',
    exemplar:
      'The leader should name over-scaffolding. Support is being provided, but students are not doing enough of the cognitive work themselves. This matters because apparent success may be teacher-dependent rather than evidence of real understanding or transfer.',
    coachInsight: {
      title: 'Over-scaffolding limits independence',
      text:
        'Rigor drops when the adult carries the thinking load. Coach toward releasing responsibility so students explain, justify, and reason independently.'
    },
    tags: ['rigor', 'scaffolding', 'student-thinking']
  },
  {
    id: 'ddi-001',
    domain: 'ddi',
    difficulty: 'medium',
    stem: 'The team is making conclusions from incomplete data.',
    scenario:
      'In a data meeting, the principal celebrates that Algebra I proficiency increased to 68 percent on the latest unit assessment. However, only 17 of 32 students completed the assessment during the window.',
    prompt: 'What is the highest-leverage leadership move here?',
    exemplar:
      'The leader should pause the conclusion and name that the current data set is incomplete. Before interpreting proficiency, the team needs a plan to ensure missing students complete the assessment. Participation is too low to make a sound instructional judgment.',
    coachInsight: {
      title: 'Participation drives valid decisions',
      text:
        'Incomplete data distorts decisions. Always verify test-taker rate before interpreting proficiency.'
    },
    tags: ['ddi', 'assessment', 'participation']
  },
  {
    id: 'coaching-001',
    domain: 'coaching',
    difficulty: 'hard',
    stem: 'The feedback is accurate, but too broad to improve practice.',
    scenario:
      'After an observation, a principal tells the teacher, "You need stronger checks for understanding." The teacher nods, but there is no shared clarity on what was missing or what to do differently.',
    prompt: 'What should the principal do differently?',
    exemplar:
      'The principal should narrow the feedback to a specific moment and action. Identify where the check was missing, what students showed, and what the teacher should do next before independent practice.',
    coachInsight: {
      title: 'Precision drives improvement',
      text:
        'Generic feedback slows growth. Anchor feedback in one concrete moment and one clear next action.'
    },
    tags: ['coaching', 'feedback', 'precision']
  },
  {
    id: 'rigor-002',
    domain: 'rigor',
    difficulty: 'hard',
    stem: 'Students are engaged, but the task is not rigorous.',
    scenario:
      'Students are highlighting and discussing, but only identifying obvious details instead of analyzing or justifying thinking.',
    prompt: 'What should the leader name in feedback?',
    exemplar:
      'The leader should name that engagement is present, but the task demand is too low. Students are busy, but not thinking deeply. The task needs to require analysis, inference, or justification.',
    coachInsight: {
      title: 'Engagement is not rigor',
      text:
        'Strong participation does not equal strong thinking. Always check the cognitive demand of the task.'
    },
    tags: ['rigor', 'engagement', 'task-quality']
  },
  {
    id: 'ddi-002',
    domain: 'ddi',
    difficulty: 'hard',
    stem: 'The reteach plan does not match the misconception.',
    scenario:
      'Students struggled on a multi-step equation. The team plans to reteach the full lesson, but most errors were only in isolating the variable.',
    prompt: 'What should the leader push on next?',
    exemplar:
      'The leader should push the team to narrow the reteach to the specific misconception. A full lesson redo wastes time when the issue is isolated.',
    coachInsight: {
      title: 'Precision reteach accelerates learning',
      text:
        'Target the exact breakdown. Reteaching everything slows progress and dilutes impact.'
    },
    tags: ['ddi', 'reteach', 'misconception']
  },
  {
    id: 'coaching-002',
    domain: 'coaching',
    difficulty: 'medium',
    stem: 'The teacher is doing too much during guided practice.',
    scenario:
      'During guided practice, the teacher steps in immediately when students hesitate. Students complete tasks, but show little independent reasoning.',
    prompt: 'What is the coaching point?',
    exemplar:
      'The teacher is rescuing too quickly. Students need space to think and struggle productively. Without that, independence will not develop.',
    coachInsight: {
      title: 'Do not rescue too early',
      text:
        'Students build ownership through productive struggle. Support should advance thinking, not replace it.'
    },
    tags: ['coaching', 'independence', 'guided-practice']
  }
]