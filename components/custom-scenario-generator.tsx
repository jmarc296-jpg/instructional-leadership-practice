'use client'

import { useState } from 'react'

type Props = {
  onGenerate: (scenario: {
    scenario: string
    prompt: string
    domain: string
  }) => void
}

export function CustomScenarioGenerator({ onGenerate }: Props) {
  const [role, setRole] = useState('')
  const [schoolType, setSchoolType] = useState('')
  const [challenge, setChallenge] = useState('')

  function handleGenerate(event: React.FormEvent) {
    event.preventDefault()

    const generatedScenario = {
      domain: 'custom leadership simulation',
      scenario: `You are serving as a ${role || 'school leader'} in a ${schoolType || 'school'} environment. You are currently facing a major challenge involving ${challenge || 'staff leadership issues'}. Multiple stakeholders are watching how you respond.`,
      prompt: `What is your immediate leadership response, and how will you stabilize the situation while maintaining accountability and trust?`
    }

    onGenerate(generatedScenario)

    setRole('')
    setSchoolType('')
    setChallenge('')
  }

  return (
    <section className="premium-panel rounded-[32px] border border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-8 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        AI Scenario Generator
      </div>

      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
        Practice your real leadership challenge
      </h3>

      <p className="mt-4 max-w-3xl text-slate-600 leading-8">
        Generate personalized simulations based on your actual leadership reality.
      </p>

      <form onSubmit={handleGenerate} className="mt-6 grid gap-4 md:grid-cols-3">
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role (ex: Principal)"
          className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
        />

        <input
          value={schoolType}
          onChange={(e) => setSchoolType(e.target.value)}
          placeholder="School Type"
          className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
        />

        <input
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder="Current Challenge"
          className="rounded-2xl border border-slate-300 px-4 py-3 text-sm"
        />

        <button
          type="submit"
          className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 md:col-span-3"
        >
          Generate Custom Scenario
        </button>
      </form>
    </section>
  )
}
