'use client'

import { useState } from 'react'

export function WaitlistCapture() {
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
          context: 'Early access waitlist'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.message || 'Something went wrong.')
        return
      }

      setStatus('success')
      setMessage('You are on the waitlist. We will follow up soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Unable to submit right now. Please try again.')
    }
  }

  return (
    <section className="premium-panel rounded-[32px] border border-slate-200 bg-white px-8 py-8 shadow-sm">
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
          Early Access
        </div>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Join the first cohort of school leaders using LeadSharper
        </h3>

        <p className="mt-4 text-slate-600 leading-8">
          We are opening pilot partnerships with districts, principal preparation programs,
          leadership coaches, and charter networks.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm w-full sm:w-[320px]"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
          </button>
        </form>

        {message ? (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
            {message}
          </p>
        ) : (
          <p className="mt-4 text-xs text-slate-500">
            Pilot spots are limited during beta rollout.
          </p>
        )}
      </div>
    </section>
  )
}
