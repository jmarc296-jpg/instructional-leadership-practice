import { validateScenarioQuality } from '@/lib/scenario-quality-validator'

type ExemplarInput = {
  domain?: string
  scenario?: string
  prompt?: string
}

const fallbackExemplar =
  'I would begin by naming the core issue using specific evidence and acknowledging the stakeholder reality without lowering expectations. Then I would identify the highest-leverage action, clarify ownership, define what successful implementation looks like, and create a follow-up cycle to monitor progress. The goal is to ensure adult actions directly improve student outcomes.'

export function buildExemplarResponse({
  domain = 'leadership',
  scenario = '',
  prompt = ''
}: ExemplarInput) {
  const lowerDomain = domain.toLowerCase()
  const lowerScenario = scenario.toLowerCase()
  const lowerPrompt = prompt.toLowerCase()

  let exemplar = fallbackExemplar

  if (
    lowerScenario.includes('burned out') ||
    lowerScenario.includes('overwhelmed') ||
    lowerPrompt.includes('morale')
  ) {
    exemplar =
      'I would first acknowledge that staff fatigue is real and that too many competing initiatives often create confusion. At the same time, I would be clear that inconsistent execution around our highest-leverage instructional priorities is impacting students. I would narrow the focus to 1-2 non-negotiables, define what strong implementation looks like, align coaching and support around those priorities, and create weekly walkthrough and feedback cycles so accountability feels clear, manageable, and connected to student outcomes.'
  } else if (
    lowerScenario.includes('walkthrough') ||
    lowerPrompt.includes('feedback') ||
    lowerDomain.includes('instruction')
  ) {
    exemplar =
      'I would name the instructional pattern clearly and ground it in observable walkthrough evidence. I would avoid making the feedback personal and instead connect the issue to student thinking, task demand, and lesson outcomes. Then I would identify one specific instructional move the teacher can implement immediately, model what it looks like, and set a short follow-up cycle to monitor whether the change improves student learning.'
  } else if (
    lowerScenario.includes('data') ||
    lowerPrompt.includes('ddi') ||
    lowerPrompt.includes('assessment')
  ) {
    exemplar =
      'I would anchor the team in the most recent student data and name the highest-leverage gap. Then I would move the team from broad observations to a precise misconception, identify which students need reteach, assign one targeted instructional action, and set a follow-up review date to determine whether student performance improved.'
  } else if (
    lowerScenario.includes('pushback') ||
    lowerScenario.includes('resists') ||
    lowerPrompt.includes('resistance')
  ) {
    exemplar =
      'I would acknowledge the concern without lowering the expectation. I would listen for the underlying barrier, clarify the non-negotiable tied to student learning, and separate personal preference from required practice. Then I would define the next action, provide targeted support, and set a clear follow-up point so the conversation preserves trust while still creating accountability for implementation.'
  } else if (
    lowerScenario.includes('culture') ||
    lowerScenario.includes('behavior') ||
    lowerScenario.includes('discipline')
  ) {
    exemplar =
      'I would identify the culture pattern using specific evidence rather than general frustration. Then I would clarify the adult actions that must become consistent across classrooms and common spaces, align the team around a small number of expectations, monitor implementation through regular checks, and follow up with both support and accountability so students experience predictable systems.'
  }

  const quality = validateScenarioQuality({ exemplar })

  return quality.passes ? exemplar : fallbackExemplar
}
