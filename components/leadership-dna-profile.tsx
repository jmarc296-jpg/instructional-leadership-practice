type Props = {
  strongestDomain: string
  weakestDomain: string
  totalCompleted: number
}

function getProfile(strongestDomain: string, weakestDomain: string) {
  const strong = strongestDomain.toLowerCase()
  const weak = weakestDomain.toLowerCase()

  if (strong === 'instruction' && weak === 'culture') {
    return {
      archetype: 'The Executor',
      description:
        'You move quickly and drive instructional clarity, but may need stronger relationship preservation during difficult leadership moments.'
    }
  }

  if (strong === 'culture' && weak === 'data') {
    return {
      archetype: 'The Diplomat',
      description:
        'You navigate people well and maintain trust, but need stronger precision with evidence and performance data.'
    }
  }

  if (strong === 'data' && weak === 'leadership') {
    return {
      archetype: 'The Strategist',
      description:
        'You diagnose issues well through evidence, but need stronger executive decision-making under pressure.'
    }
  }

  if (strong === 'leadership' && weak === 'instruction') {
    return {
      archetype: 'The Vision Driver',
      description:
        'You think strategically and communicate direction well, but need stronger instructional coaching precision.'
    }
  }

  return {
    archetype: 'The Balanced Leader',
    description:
      'You show balanced leadership judgment across domains. Continue increasing precision under pressure.'
  }
}

export function LeadershipDnaProfile({
  strongestDomain,
  weakestDomain,
  totalCompleted
}: Props) {
  if (totalCompleted < 5) {
    return null
  }

  const profile = getProfile(strongestDomain, weakestDomain)

  return (
    <section className="premium-panel rounded-[32px] border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-8 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">
        Leadership DNA Profile
      </div>

      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
        {profile.archetype}
      </h3>

      <p className="mt-4 max-w-3xl text-slate-600 leading-8">
        {profile.description}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Strongest Area
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-950">
            {strongestDomain}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Growth Area
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-950">
            {weakestDomain}
          </div>
        </div>
      </div>
    </section>
  )
}
