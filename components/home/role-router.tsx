'use client'

import { useState } from 'react'

const paths = [
  {
    role: 'School Leader',
    text: 'Practice a leadership scenario and get immediate feedback.',
    href: '/instant-demo'
  },
  {
    role: 'District Leader',
    text: 'See readiness, risk, coaching, and pipeline intelligence.',
    href: '/district'
  },
  {
    role: 'Superintendent',
    text: 'View bench strength, succession risk, and turnover exposure.',
    href: '/superintendent'
  },
  {
    role: 'University Program',
    text: 'Explore certification, readiness, and leadership prep pathways.',
    href: '/certification'
  },
  {
    role: 'Buyer / Investor',
    text: 'Open the full evaluation data room.',
    href: '/data-room'
  }
]

export function RoleRouter() {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Start smarter
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            What brought you to LeadSharper?
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Choose your role and we’ll take you to the most relevant experience.
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="text-sm font-semibold text-slate-400 hover:text-slate-700"
        >
          Hide
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {paths.map((path) => (
          <a
            key={path.role}
            href={path.href}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-950">
              {path.role}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {path.text}
            </p>

            <div className="mt-4 text-sm font-semibold text-blue-700">
              Start here →
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
