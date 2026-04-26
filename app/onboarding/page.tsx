'use client'

import { useState } from 'react'

export default function OnboardingPage() {
  const [submitted, setSubmitted] = useState(false)

  const saveProfile = (formData: FormData) => {
    const profile = {
      name: formData.get('name'),
      currentRole: formData.get('currentRole'),
      aspiringRole: formData.get('aspiringRole'),
      district: formData.get('district')
    }

    localStorage.setItem(
      'leadsharper_user_profile',
      JSON.stringify(profile)
    )

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-semibold text-slate-900">
            Your leadership profile is activated.
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            LeadSharper will now personalize your scenarios, evaluations, and readiness insights.
          </p>

          <a
            href="/instant-demo"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
          >
            Start personalized practice
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Leadership Identity Setup
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
          Build your leadership profile
        </h1>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            saveProfile(new FormData(e.currentTarget))
          }}
        >
          <input
            name="name"
            placeholder="Your name"
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            name="currentRole"
            placeholder="Current role"
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            name="aspiringRole"
            placeholder="Aspiring role"
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            name="district"
            placeholder="District / organization"
            className="w-full rounded-2xl border p-4"
            required
          />

          <button className="w-full rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white">
            Activate my profile
          </button>
        </form>
      </div>
    </main>
  )
}
