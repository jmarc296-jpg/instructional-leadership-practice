'use client'

import { useState } from 'react'

export function PilotCta() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          context: 'Pilot conversation request'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.message || 'Something went wrong.')
        return
      }

      setStatus('success')
      setMessage('Request received. We will follow up soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Unable to submit right now. Please try again.')
    }
  }

  return (
    <section className="premium-panel rounded-[32px] border border-slate-200 bg-slate-950 px-8 py-8 text-white shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
            District Pilot Ready
          </div>

          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Bring simulation-based leadership practice to your principals.
          </h3>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            LeadSharper is built for leadership pipelines, principal coaching,
            instructional leadership development, and district-level implementation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white/10 p-5">
          <div className="text-sm font-semibold text-white">
            Request a pilot conversation
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm text-slate-950"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="premium-button rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Submitting...' : 'Request Pilot Conversation'}
            </button>
          </div>

          {message ? (
            <p className={`mt-3 text-sm ${status === 'success' ? 'text-emerald-300' : 'text-red-300'}`}>
              {message}
            </p>
          ) : (
            <p className="mt-3 text-xs leading-6 text-slate-400">
              Use this to start a district, cohort, or principal pipeline pilot conversation.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
