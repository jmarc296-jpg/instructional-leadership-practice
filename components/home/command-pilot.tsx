'use client'

import { useState } from 'react'

const routes = [
  { label: 'I am a superintendent', href: '/superintendent' },
  { label: 'Show district ROI', href: '/roi' },
  { label: 'I need procurement materials', href: '/procurement' },
  { label: 'Show the buyer data room', href: '/data-room' },
  { label: 'I want a guided demo', href: '/demo' },
  { label: 'Test LeadSharper in 90 seconds', href: '/instant-demo' },
  { label: 'Show readiness scoring', href: '/readiness' },
  { label: 'Show pilot proposal', href: '/pilot-proposal' },
  { label: 'Apply for pilot', href: '/pilot' }
]

export function CommandPilot() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const matches = routes.filter((route) =>
    route.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed bottom-5 left-5 z-50 hidden w-[360px] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl md:block">
      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-left text-sm font-semibold text-white"
      >
        Ask LeadSharper where to go →
      </button>

      {open && (
        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: I need ROI, procurement, district demo..."
            className="w-full rounded-2xl border border-slate-300 p-4 text-sm"
            autoFocus
          />

          <div className="mt-3 max-h-72 space-y-2 overflow-auto">
            {(query ? matches : routes).map((route) => (
              <a
                key={route.href}
                href={route.href}
                className="block rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
              >
                {route.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

