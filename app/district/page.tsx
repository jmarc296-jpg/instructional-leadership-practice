'use client'

import { useMemo } from 'react'
import { getLeadershipIntelligenceSnapshots } from '@/lib/local-store'

type ReadinessBucket =
  | 'Principal Ready'
  | 'Nearly Ready'
  | 'Emerging'
  | 'High Risk'

export default function DistrictPage() {
  const snapshots = getLeadershipIntelligenceSnapshots()

  const districtMetrics = useMemo(() => {
    const readinessCounts: Record<ReadinessBucket, number> = {
      'Principal Ready': 0,
      'Nearly Ready': 0,
      'Emerging': 0,
      'High Risk': 0
    }

    const domainCounts: Record<string, number> = {}
    const recurringRisks: Record<string, number> = {}

    snapshots.forEach((snapshot) => {
      const profile = snapshot.profile as any
      const consequence = snapshot.consequences as any

      const score =
        profile?.instructionalPrecision +
        profile?.accountabilityStrength +
        profile?.communicationClarity

      const avgScore = score / 3

      if (avgScore >= 80) {
        readinessCounts['Principal Ready']++
      } else if (avgScore >= 65) {
        readinessCounts['Nearly Ready']++
      } else if (avgScore >= 50) {
        readinessCounts['Emerging']++
      } else {
        readinessCounts['High Risk']++
      }

      domainCounts[snapshot.domain] =
        (domainCounts[snapshot.domain] ?? 0) + 1

      const risk = consequence?.unresolvedRisk ?? 'Unknown'

      recurringRisks[risk] =
        (recurringRisks[risk] ?? 0) + 1
    })

    const topRisks = Object.entries(recurringRisks)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const topDomains = Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])

    return {
      totalLeaders: snapshots.length,
      readinessCounts,
      topRisks,
      topDomains
    }
  }, [snapshots])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-200">
            District Command Center
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Leadership Pipeline Intelligence
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Identify principal-ready talent, recurring leadership risks, and coaching priorities before high-stakes hiring decisions are made.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Principal Ready"
            value={districtMetrics.readinessCounts['Principal Ready']}
          />

          <MetricCard
            label="Nearly Ready"
            value={districtMetrics.readinessCounts['Nearly Ready']}
          />

          <MetricCard
            label="Emerging Leaders"
            value={districtMetrics.readinessCounts['Emerging']}
          />

          <MetricCard
            label="High Risk"
            value={districtMetrics.readinessCounts['High Risk']}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Most Practiced Leadership Domains
            </h2>

            <div className="mt-5 space-y-3">
              {districtMetrics.topDomains.map(([domain, count]) => (
                <div
                  key={domain}
                  className="flex justify-between rounded-2xl bg-slate-50 p-4"
                >
                  <span className="capitalize font-medium">
                    {domain}
                  </span>

                  <span className="font-semibold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Recurring Leadership Risks
            </h2>

            <div className="mt-5 space-y-3">
              {districtMetrics.topRisks.map(([risk, count]) => (
                <div
                  key={risk}
                  className="flex justify-between rounded-2xl bg-red-50 p-4"
                >
                  <span className="font-medium text-slate-700">
                    {risk}
                  </span>

                  <span className="font-semibold text-red-700">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Why Districts Buy This
          </h2>

          <div className="mt-4 space-y-3 text-slate-700">
            <p>
              Most districts rely on interviews and resumes to make principal hiring decisions.
            </p>

            <p>
              LeadSharper creates observable behavioral leadership data before promotions happen.
            </p>

            <p>
              This reduces failed placements, accelerates succession planning, and helps districts coach leaders before they inherit schools.
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}

function MetricCard({
  label,
  value
}: {
  label: string
  value: number
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-3xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  )
}

