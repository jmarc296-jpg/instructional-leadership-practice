type Props = {
  weakestDomain: string
  totalCompleted: number
}

const recommendations: Record<string, string> = {
  instruction:
    'You are strongest in execution speed, but need deeper instructional diagnosis. Next: walkthrough feedback simulations.',
  culture:
    'Your responses show weaker stakeholder management. Next: teacher accountability and culture repair scenarios.',
  data:
    'Your responses need stronger precision with evidence. Next: DDI and assessment analysis simulations.',
  leadership:
    'Your responses need stronger strategic clarity. Next: high-stakes leadership judgment reps.'
}

export function AdaptiveRecommendation({
  weakestDomain,
  totalCompleted
}: Props) {
  if (totalCompleted < 3) {
    return null
  }

  const recommendation =
    recommendations[weakestDomain?.toLowerCase()] ||
    'Continue mixed-domain reps to strengthen leadership versatility.'

  return (
    <section className="premium-panel rounded-[32px] border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-8 py-8 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">
        Adaptive Practice Engine
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
        Your next highest-leverage practice area
      </h3>

      <p className="mt-4 text-slate-600 leading-8">
        {recommendation}
      </p>

      <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
        Based on {totalCompleted} completed simulations
      </div>
    </section>
  )
}
