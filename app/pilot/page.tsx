'use client'

import { useState } from 'react'

export default function PilotPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-semibold text-slate-900">
            Pilot interest received.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Thanks for reaching out. We’ll follow up to learn more about your leadership pipeline priorities.
          </p>
          <a href="/" className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
            Back to LeadSharper
          </a>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Pilot Partnership
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Bring leadership readiness intelligence to your pipeline.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            LeadSharper is opening limited pilot partnerships for districts, charter networks, and university leadership programs.
          </p>

          <div className="mt-8 space-y-4 text-slate-200">
            <p>• Launch a leadership cohort</p>
            <p>• Measure readiness through simulations</p>
            <p>• Identify coaching risks and talent strengths</p>
            <p>• Generate district-level reporting</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Apply for a pilot
          </h2>

          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)

await fetch('/api/waitlist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: formData.get('name'),
    email: formData.get('email'),
    organization: formData.get('organization'),
    role: formData.get('role'),
    organizationType: formData.get('organizationType'),
    challenge: formData.get('challenge')
  })
})

setSubmitted(true)
            }}
          >
            <input name="name" className="w-full rounded-2xl border p-4" placeholder="Full name" required />
            <input name="email" className="w-full rounded-2xl border p-4" placeholder="Work email" type="email" required />
            <input name="organization" className="w-full rounded-2xl border p-4" placeholder="Organization" required />
            <input name="role" className="w-full rounded-2xl border p-4" placeholder="Role / title" required />

            <select name="organizationType" className="w-full rounded-2xl border p-4" required defaultValue="">
              <option value="" disabled>Organization type</option>
              <option>District</option>
              <option>Charter network</option>
              <option>University prep program</option>
              <option>Leadership nonprofit</option>
              <option>Other</option>
            </select>

            <textarea name="challenge"
              className="min-h-[140px] w-full rounded-2xl border p-4"
              placeholder="What leadership pipeline challenge are you trying to solve?"
              required
            />

            <button className="w-full rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700">
              Submit pilot interest
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}




