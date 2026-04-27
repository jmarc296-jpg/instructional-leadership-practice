'use client'

import { useState } from 'react'
import {
  saveLeadershipIntelligenceSnapshot
} from '@/lib/local-store'

export default function FounderDemoPage() {
  const [activated, setActivated] = useState(false)

  function activateFounderDemo() {
    localStorage.removeItem('leadsharper-intelligence-snapshots')

    const demoData = [
      {
        domain: 'instructional leadership',
        readiness: 88,
        risk: 'low',
        summary: 'Strong instructional leadership and execution discipline.'
      },
      {
        domain: 'staff accountability',
        readiness: 61,
        risk: 'moderate',
        summary: 'Leader delays difficult conversations.'
      },
      {
        domain: 'culture leadership',
        readiness: 52,
        risk: 'high',
        summary: 'Needs stronger urgency around adult accountability.'
      },
      {
        domain: 'data-driven instruction',
        readiness: 84,
        risk: 'low',
        summary: 'Strong evidence-based decision making.'
      }
    ]

    demoData.forEach((item, index) => {
      saveLeadershipIntelligenceSnapshot({
        cardId: `founder-demo-${index}`,
        domain: item.domain,
        score: {
          readiness: item.readiness
        },
        insights: {
          summary: item.summary
        },
        profile: {
          instructionalPrecision: item.readiness,
          accountabilityStrength: item.readiness,
          communicationClarity: item.readiness,
          studentImpactOrientation: item.readiness,
          riskLevel: item.risk
        },
        consequences: {
          unresolvedRisk: item.summary,
          likelyConsequence: item.summary
        },
        recommendation: {
          priority: 'Leadership development',
          nextPracticeFocus: item.domain
        }
      })
    })

    localStorage.setItem(
      'leadsharper_user_profile',
      JSON.stringify({
        name: 'Dr. Sarah Mitchell',
        currentRole: 'Assistant Principal',
        aspiringRole: 'Principal',
        district: 'Cleveland Metropolitan School District'
      })
    )

    setActivated(true)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-5xl space-y-8">

        <section className="rounded-3xl bg-slate-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Executive Demo Mode Mode
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl sm:text-5xl font-semibold tracking-tight">
            Make LeadSharper instantly feel enterprise-ready.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            One click activates realistic leadership data across the entire platform for live demos.
          </p>
        </section>

        {!activated ? (
          <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm">
            <button
              onClick={activateFounderDemo}
              className="rounded-2xl bg-blue-600 px-8 py-5 text-white font-semibold"
            >
              Activate Full Platform Demo
            </button>
          </section>
        ) : (
          <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Demo environment activated
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a href="/instant-demo" className="rounded-2xl border p-5">
                Instant Demo
              </a>

              <a href="/district" className="rounded-2xl border p-5">
                District Dashboard
              </a>

              <a href="/superintendent" className="rounded-2xl border p-5">
                Superintendent Dashboard
              </a>

              <a href="/dashboard" className="rounded-2xl border p-5">
                Executive Reports
              </a>
            </div>
          </section>
        )}

      </div>
    </main>
  )
}


