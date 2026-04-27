'use client'

import { getPlatformIntelligence } from '@/lib/platform-intelligence'

export default function GrowthPlanPage() {
  const intelligence = getPlatformIntelligence()

  const focus =
    intelligence.highRisk > 0
      ? 'Leadership accountability'
      : intelligence.moderateRisk > 0
        ? 'Execution consistency'
        : 'Advanced leadership readiness'

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-emerald-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Leadership Growth Engine
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Your personalized development plan.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper now turns leadership simulations into monthly growth planning.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Metric label="Current Readiness" value={`${intelligence.overallReadiness}%`} />
          <Metric label="Primary Risk Area" value={intelligence.topRisk} />
          <Metric label="Development Focus" value={focus} />
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Your next 30 days
          </h2>

          <div className="mt-6 space-y-4">
            <Task text="Complete 3 new leadership simulations" />
            <Task text="Practice one conflict-management scenario" />
            <Task text="Complete one coaching rewrite exercise" />
            <Task text="Meet with supervisor to review readiness growth" />
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Why districts retain this
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            LeadSharper becomes sticky when it powers continuous leadership growth, not one-time evaluations.
          </p>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-2xl font-bold text-blue-700">{value}</div>
    </div>
  )
}

function Task({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 text-slate-700">
      {text}
    </div>
  )
}
