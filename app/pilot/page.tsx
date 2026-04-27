'use client'

import { useState } from 'react'

export default function PilotPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-6">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-semibold text-slate-900">
            Pilot interest received.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Thanks for reaching out. We&apos;ll follow up to learn more about your leadership pipeline priorities.
          </p>
          <a href="/" className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
            Explore Platform
          </a>

<a 
  href="mailto:jmarc296@gmail.com"
  target="_blank"
  className="mt-4 ml-4 inline-block rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
>
  Book a demo call
</a>

</section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl bg-slate-900 p-7 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Pilot Partnership
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Bring leadership readiness intelligence to your pipeline.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            LeadSharper is opening limited pilot partnerships for districts, charter networks, and university leadership programs.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Accelerate principal pipeline decisions
              </h3>
              <p className="mt-2 max-w-md text-slate-300 leading-7">
                Identify who is ready now and who needs development before high-stakes placements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Reduce failed leadership placements
              </h3>
              <p className="mt-2 max-w-md text-slate-300 leading-7">
                Surface coaching gaps before they become turnover risks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Create board-ready reporting
              </h3>
              <p className="mt-2 max-w-md text-slate-300 leading-7">
                Give superintendents and cabinet teams district-wide leadership intelligence.
              </p>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Limited 2026 pilot cohort: 5 district partners
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Request a district pilot
          </h2>

          <p className="mt-3 text-slate-600 leading-7">
            We will follow up within 48 hours to discuss fit, timeline, and implementation goals.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setIsSubmitting(true)
              setErrorMessage('')

              const formData = new FormData(e.currentTarget)

              try {
                const response = await fetch('/api/waitlist', {
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

                if (!response.ok) {
                  throw new Error('Submission failed')
                }

                setSubmitted(true)
              } catch {
                setErrorMessage('Something went wrong. Please try again or email directly.')
              } finally {
                setIsSubmitting(false)
              }
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

            <textarea
              name="challenge"
              className="min-h-[140px] w-full rounded-2xl border p-4"
              placeholder="What leadership pipeline challenge are you trying to solve?"
              required
            />

            {errorMessage && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSubmitting ? 'Submitting...' : 'Request Pilot Access'}
            </button>

            <p className="text-center text-sm text-slate-500">
              No long-term contract required for pilot partnerships.
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}





