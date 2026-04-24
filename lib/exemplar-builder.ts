type ExemplarInput = {
  domain?: string
  scenario?: string
  prompt?: string
}

export function buildExemplarResponse({
  domain = 'leadership',
  scenario = '',
  prompt = ''
}: ExemplarInput) {
  const lowerScenario = scenario.toLowerCase()
  const lowerPrompt = prompt.toLowerCase()

  if (
    lowerScenario.includes('burned out') ||
    lowerScenario.includes('overwhelmed') ||
    lowerPrompt.includes('morale')
  ) {
    return 'I would first acknowledge that staff fatigue is real and that too many competing initiatives often create confusion. At the same time, I would be clear that inconsistent execution around our highest-leverage priorities is impacting students. I would narrow the focus to 1-2 non-negotiables, clearly define what strong implementation looks like, and align coaching and support around those priorities. From there, I would create visibility through walkthroughs, feedback cycles, and regular progress checks so accountability feels clear and manageable rather than punitive.'
  }

  if (
    lowerScenario.includes('walkthrough') ||
    lowerPrompt.includes('feedback') ||
    domain.toLowerCase().includes('instruction')
  ) {
    return 'I would name the instructional pattern clearly and ground it in observable evidence from the walkthrough. I would avoid making it personal and instead connect the feedback to student thinking, task demand, and the lesson outcome. Then I would identify one specific instructional move the teacher can implement immediately, model what it looks like, and set a short follow-up cycle to see whether the change improves student learning.'
  }

  if (
    lowerScenario.includes('data') ||
    lowerPrompt.includes('ddi') ||
    lowerPrompt.includes('assessment')
  ) {
    return 'I would begin by anchoring the conversation in the most recent student evidence and naming the highest-leverage gap. Then I would push the team to move from broad observations to a precise misconception, identify the students most impacted, and select one reteach action that directly addresses the gap. I would close by naming who is responsible, when the reteach will happen, and what evidence we will review to determine whether it worked.'
  }

  if (
    lowerScenario.includes('pushback') ||
    lowerScenario.includes('resists') ||
    lowerPrompt.includes('resistance')
  ) {
    return 'I would acknowledge the concern without lowering the expectation. I would listen for the underlying barrier, clarify the non-negotiable tied to student learning, and separate preference from required practice. Then I would define the next action, provide support where needed, and set a clear follow-up point so the conversation ends with both relationship preservation and accountability.'
  }

  if (
    lowerScenario.includes('culture') ||
    lowerScenario.includes('behavior') ||
    lowerScenario.includes('discipline')
  ) {
    return 'I would identify the culture pattern using specific evidence rather than general frustration. Then I would clarify the adult actions that must become consistent across classrooms and common spaces. I would align the team around a small number of expectations, monitor implementation closely, and follow up with both support and accountability so students experience predictable systems.'
  }

  return 'I would begin by naming the core leadership issue clearly and grounding it in specific evidence. Then I would acknowledge the stakeholder reality while keeping the expectation anchored to student outcomes. From there, I would narrow the next step to one high-leverage action, identify who owns it, define what successful implementation looks like, and set a clear follow-up cycle to monitor progress.'
}
