"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getDistrictIntelligence } from "@/lib/district-intelligence"

const criticalActions = [
  {
    school: "East High School",
    issue: "No principal successor identified",
    urgency: "High"
  },
  {
    school: "Lincoln Middle School",
    issue: "Principal retention risk",
    urgency: "High"
  },
  {
    school: "West Elementary",
    issue: "Assistant principal ready for promotion",
    urgency: "Medium"
  }
]

export default function ExecutiveCommandCenterPage() {
  const [snapshots, setSnapshots] = useState<any[]>([])
  const intelligence = getDistrictIntelligence()

  const pipelineData = [
    {
      title: "Leadership Bench Health",
      value: `${intelligence.averageReadiness}%`,
      subtext: "District pipeline health"
    },
    {
      title: "Promotion Ready Leaders",
      value: intelligence.readyNow.toString(),
      subtext: "Ready in next 6 months"
    },
    {
      title: "Retention Risks",
      value: intelligence.highRisk.toString(),
      subtext: "Require immediate action"
    },
    {
      title: "Leadership Stability Score",
      value: intelligence.stabilityScore.toString(),
      subtext: "Predictive leadership health model"
    }
  ]

  useEffect(() => {
    setSnapshots(intelligence.simulationSignals.slice(0, 5))
  }, [intelligence])

  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">

      <section className="rounded-[2rem] bg-[#111827] p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          Superintendent Command Center
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Leadership Pipeline Intelligence
        </h1>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pipelineData.map((item) => (
          <div key={item.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="mt-3 text-4xl font-bold">{item.value}</p>
            <p className="mt-2 text-sm text-gray-600">{item.subtext}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Immediate Leadership Actions</h2>

          <div className="mt-5 space-y-4">
            {criticalActions.map((action) => (
              <div key={action.school} className="rounded-2xl border border-black/10 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{action.school}</h3>
                  <span className="text-sm text-red-600 font-semibold">
                    {action.urgency}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{action.issue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">AI Risk Feed</h2>

          <div className="mt-5 space-y-4">
            {snapshots.length > 0 ? (
              snapshots.map((snapshot, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[#f7f7f4] p-4"
                >
                  <p className="font-semibold">
                    {snapshot.role || "School Leader"}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {snapshot.unresolvedRisk || "Strong leadership signal detected"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href="/talent-decisions"
                      className="rounded-xl bg-[#111827] px-3 py-2 text-xs font-semibold text-white"
                    >
                      Make Decision
                    </Link>

                    <Link
                      href="/leader-learning-hub"
                      className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold"
                    >
                      Assign Development
                    </Link>

                    <Link
                      href="/simulation-room"
                      className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold"
                    >
                      Launch Simulation
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-[#f7f7f4] p-4">
                No simulation intelligence yet. Complete leadership reps to generate district insights.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}








