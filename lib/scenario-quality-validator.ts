export function validateScenarioQuality({ exemplar }: { exemplar: string }) {
  const lower = exemplar.toLowerCase()

  const checks = {
    acknowledgesStakeholderReality:
      lower.includes('acknowledge') ||
      lower.includes('listen') ||
      lower.includes('understand') ||
      lower.includes('concern') ||
      lower.includes('fatigue'),

    namesSpecificProblem:
      lower.includes('data') ||
      lower.includes('evidence') ||
      lower.includes('pattern') ||
      lower.includes('issue') ||
      lower.includes('gap') ||
      lower.includes('misconception'),

    definesAction:
      lower.includes('implement') ||
      lower.includes('create') ||
      lower.includes('align') ||
      lower.includes('narrow') ||
      lower.includes('identify') ||
      lower.includes('define'),

    includesFollowUp:
      lower.includes('follow-up') ||
      lower.includes('monitor') ||
      lower.includes('progress check') ||
      lower.includes('walkthrough') ||
      lower.includes('feedback cycle') ||
      lower.includes('review'),

    tiesToStudents:
      lower.includes('student') ||
      lower.includes('learning') ||
      lower.includes('achievement') ||
      lower.includes('outcomes') ||
      lower.includes('performance')
  }

  const score = Object.values(checks).filter(Boolean).length

  return {
    score,
    passes: score >= 4,
    checks
  }
}
