'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveLeadershipIntelligenceSnapshot } from '@/lib/local-store'

export default function ActivateDemoPage() {
  const [activated, setActivated] = useState(false)
  const router = useRouter()

  function activateDemo() {
    const demoSnapshots = [
      {
        domain: 'instructional leadership',
        risk: 'low',
        precision: 88,
        accountability: 82,
        clarity: 86,
        impact: 91,
        riskText: 'Strong instructional judgment with clear student-impact orientation.'
      },
      {
        domain: 'conflict leadership',
        risk: 'moderate',
        precision: 68,
        accountability: 61,
        clarity: 72,
        impact: 70,
        riskText: 'Leader may delay difficult staff accountability conversations.'
      },
      {
        domain: 'data-driven instruction',
        risk: 'low',
        precision: 84,
        accountability: 78,
        clarity: 80,
        impact: 87,
        riskText: 'Leader uses evidence well to guide instructional next steps.'
      },
      {
        domain: 'culture leadership',
        risk: 'high',
        precision: 55,
        accountability: 48,
        clarity: 60,
        impact: 58,
        riskText: 'Response lacks urgency around adult behavior and culture protection.'
      },
      {
        domain: 'teacher coaching',
        risk: 'moderate',
        precision: 74,
        accountability: 66,
        clarity: 71,
        impact: 76,
        riskText: 'Coaching move is promising but needs tighter follow-through.'
      }
    ]

    demoSnapshots.forEach((item, index) => {
      saveLeadershipIntelligenceSnapshot({
        cardId: `demo-snapshot-${index + 1}`,
        domain: item.domain,
        score: {
          readiness: Math.round((item.precision + item.accountability + item.clarity + item.impact) / 4)
        },
        insights: {
          summary: item.riskText
        },
        profile: {
          instructionalPrecision: item.precision,
          accountabilityStrength: item.accountability,
          communicationClarity: item.clarity,
          studentImpactOrientation: item.impact,
          riskLevel: item.risk
        },
        consequences: {
          unresolvedRisk: item.riskText,
          likelyConsequence: item.riskText
        },
        recommendation: {
          priority: 'Targeted leadership development',
          nextPracticeFocus: 'Continue simulation reps aligned to the highest-risk leadership domain.'
        }
      })
    })

    setActivated(true)

    setTimeout(() => {
      router.push("/district")
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Demo Data Engine
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Activate a live district intelligence demo.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            This seeds realistic leadership intelligence so the superintendent report, district dashboard, and platform intelligence pages all feel connected.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          {!activated ? (
            <>
              <h2 className="text-3xl font-semibold text-slate-900">
                Bring the platform to life.
              </h2>

              <p className="mt-4 text-slate-600">
                Add realistic demo intelligence snapshots to this browser session.
              </p>

              <button
                onClick={activateDemo}
                className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
              >
                Launch district demo
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-slate-900">
                District demo ready.
              </h2>

              <p className="mt-4 text-slate-600">
                Your executive pages now have live intelligence signals to display.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/superintendent" className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
                  View superintendent dashboard
                </a>

                <a href="/dashboard" className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900">
                  View report
                </a>

                <a href="/district" className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900">
                  View district dashboard
                </a>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

