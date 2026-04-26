'use client'

import { useEffect, useState } from 'react'

export function PilotScarcityBar() {
  const [spotsLeft, setSpotsLeft] = useState(7)

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 4) return prev
        return prev - 1
      })
    }, 45000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Founding Cohort
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {spotsLeft} pilot spots remaining this quarter
          </h3>

          <p className="mt-2 text-slate-600">
            We’re intentionally keeping onboarding small to work closely with early design partners.
          </p>
        </div>

        <a
          href="/pilot"
          className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
        >
          Secure a pilot spot
        </a>
      </div>
    </div>
  )
}
