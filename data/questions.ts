import type { Card } from '@/types'

export const QUESTION_BANK: Card[] = [
  {
    id: 'q1',
    category: 'rigor',
    difficulty: 'strong',
    question:
      'A principal notices that students are compliant and on task, but most tasks require only recall and completion. What should the leader name and do next?',
    prompt:
      'Classrooms are calm, assignments are complete, and pacing is on track. During walkthroughs, however, students are rarely asked to explain thinking, justify reasoning, or grapple with grade-level complexity.',
    exemplar:
      'The leader should name the gap between compliance and rigor. The immediate move is to anchor the team in what rigorous instruction actually looks like: students doing the cognitive lift, engaging with grade-level work, and explaining their thinking. From there, the leader should tighten walkthrough look-fors and planning expectations so teachers are not just assigning work, but designing for student thinking and productive struggle.',
    isActive: true
  },
  {
    id: 'q2',
    category: 'ddi',
    difficulty: 'advanced',
    question:
      'A teacher team says students struggled with citing evidence, and their action step is simply to reteach the standard. What should an instructional leader push them to do instead?',
    prompt:
      'The team has completed an item analysis but is still naming the standard broadly rather than identifying the actual student breakdown.',
    exemplar:
      'The leader should push the team from standards naming to misconception diagnosis. Instead of planning a broad reteach, the team should identify the exact breakdown in student thinking, such as weak inference, irrelevant evidence selection, or incomplete explanation. Then they should build a short reteach with clear modeling, guided practice, and an independent check aligned directly to that misconception.',
    isActive: true
  },
  {
    id: 'q3',
    category: 'observation-feedback',
    difficulty: 'strong',
    question:
      'During walkthroughs, a leader sees strong curriculum materials in use, but the teacher is doing most of the talking and thinking. What feedback is most likely to move instruction forward?',
    prompt:
      'Students are following along and completing the task, but there is limited discourse, few checks for reasoning, and little evidence that students are carrying the cognitive load.',
    exemplar:
      'The leader should keep the feedback anchored to the current lesson and materials while shifting the focus to student thinking. A strong action step would name a specific moment in the lesson where the teacher should pause and require every student to explain reasoning, using structures such as turn-and-talk, written justification, or a brief partner protocol.',
    isActive: true
  },
  {
    id: 'q4',
    category: 'curriculum-alignment',
    difficulty: 'foundational',
    question:
      'A teacher says the district curriculum is too hard for students and wants to replace the core task with something easier. How should the principal respond?',
    prompt:
      'The teacher is trying to be responsive to student need, but the proposed change would lower the level of the task rather than preserve access to grade-level work.',
    exemplar:
      'The principal should protect access to grade-level content while supporting the teacher with stronger scaffolds. The response should affirm the challenge, but clarify that the answer is not to lower the bar. Instead, the principal should help the teacher plan supports such as chunking, vocabulary support, sentence frames, modeled thinking, and strategic small-group support.',
    isActive: true
  },
  {
    id: 'q5',
    category: 'ilt-leadership',
    difficulty: 'strong',
    question:
      'An ILT agenda tries to cover attendance, culture, pacing, walkthroughs, and assessment results in one meeting. What is the leadership problem?',
    prompt:
      'The team leaves each meeting with many notes but little follow-through, and no one instructional priority seems to move meaningfully from week to week.',
    exemplar:
      'The problem is lack of focus. Strong ILTs go deep on the most important instructional issue rather than touching many topics superficially. The leader should anchor the meeting to one priority problem tied to student outcomes, use evidence to diagnose it precisely, and drive toward a small number of clear action steps with owners and timelines.',
    isActive: true
  },
  {
    id: 'q6',
    category: 'principal-decision-making',
    difficulty: 'advanced',
    question:
      'A school has weak assessment completion during a district testing window, and teachers say they are too busy to manage makeups. What should the principal do?',
    prompt:
      'The issue is not resistance to testing itself. It is the absence of a clear system for ownership, daily monitoring, and short-cycle follow-through for students who miss testing sessions.',
    exemplar:
      'The principal should treat assessment completion as a systems problem, not a motivation problem. The immediate move is to establish a daily completion tracker by grade and subgroup, assign ownership for identifying missing students, and require a same-day or next-day makeup plan.',
    isActive: true
  },
  {
    id: 'q7',
    category: 'ddi',
    difficulty: 'strong',
    question:
      'A data team identifies a weak standard, but the proposed reteach would take an entire week and derail pacing. What should the leader coach instead?',
    prompt:
      'The upcoming unit begins in two days, and the team needs a response that is targeted, realistic, and instructionally coherent.',
    exemplar:
      'The leader should coach the team toward a short, skill-specific reteach rather than a full lesson redo. The reteach should target the exact misconception, fit within a 15 to 20 minute flex point, and follow a tight structure: diagnose, model, guided practice, and independent at-bat.',
    isActive: true
  },
  {
    id: 'q8',
    category: 'observation-feedback',
    difficulty: 'advanced',
    question:
      'A teacher receives strong action steps after an observation, but little changes in practice over time. What is likely missing from the leadership cycle?',
    prompt:
      'The leader gives thoughtful feedback and the teacher is agreeable in conversation, but implementation remains inconsistent across follow-up visits.',
    exemplar:
      'What is likely missing is a tight follow-up cycle. Improvement depends on more than a strong conversation. The leader should revisit the agreed action step quickly, look for that move specifically, and provide another layer of feedback based on evidence from implementation.',
    isActive: true
  },
  {
    id: 'q9',
    category: 'rigor',
    difficulty: 'advanced',
    question:
      'Students are discussing during class, but the conversation is mostly opinion-based and not grounded in text, evidence, or content. Is this rigorous discussion?',
    prompt:
      'The teacher has built strong participation routines, but the quality of discourse is inconsistent and not reliably tied to the lesson objective or standard.',
    exemplar:
      'Not yet. Participation alone is not rigor. Rigorous discussion requires students to use evidence, academic language, and precise reasoning tied to the content and standard. The leader should affirm the culture conditions that support participation, but coach the teacher to strengthen the prompts, require evidence-based responses, and press students to justify and extend their thinking.',
    isActive: true
  },
  {
    id: 'q10',
    category: 'curriculum-alignment',
    difficulty: 'strong',
    question:
      'A team says they are aligned to the curriculum because they are on the right lesson number. Why is that insufficient?',
    prompt:
      'Lesson completion is being used as the primary indicator of implementation quality, even though classrooms vary widely in task quality, questioning, and student thinking.',
    exemplar:
      'Pacing alone is not alignment. True alignment means the intended instructional moves, task demands, and learning goals of the curriculum are actually showing up in classroom practice. The leader should help the team define what aligned execution looks like and calibrate on observable evidence.',
    isActive: true
  },
  {
    id: 'q11',
    category: 'principal-decision-making',
    difficulty: 'foundational',
    question:
      'A principal has several urgent operational issues and one major instructional issue. How should the principal decide what gets protected time first?',
    prompt:
      'The school day is full of demands, and the principal feels pulled in multiple directions. Student achievement has stalled in a key content area.',
    exemplar:
      'The principal should protect time first for the work most directly tied to student outcomes. Operational issues matter, but instructional leadership cannot remain secondary if achievement is stagnant.',
    isActive: true
  },
  {
    id: 'q12',
    category: 'ilt-leadership',
    difficulty: 'advanced',
    question:
      'An ILT agrees on a schoolwide instructional priority, but different leaders describe it in different ways. Why does that matter?',
    prompt:
      'Everyone is using positive language, but there is no tight common definition of what the priority should look like in classrooms or planning meetings.',
    exemplar:
      'That matters because inconsistency at the leadership level leads to inconsistency in teacher implementation. The next move is to define the priority in concrete teacher and student actions, align look-fors, and use that same language across coaching, walkthroughs, and team meetings.',
    isActive: true
  }
]
