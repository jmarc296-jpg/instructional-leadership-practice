"use client"

import { useEffect, useMemo, useState } from "react"

type Summary = {
  ok: boolean
  source?: string
  count?: number
  highRisk?: number
  mediumRisk?: number
  lowRisk?: number
  executiveNarrative?: string
}

type Signal = {
  id: string
  school_name?: string
  leader_name?: string
  severity?: "high" | "medium" | "low"
  summary?: string
  recommended_action?: string
  evidence?: string
  created_at?: string
}

export default function BoardReportPage() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadReport() {
      try {
        const [summaryResponse, signalsResponse] = await Promise.all([
          fetch("/api/executive-summary", { cache: "no-store" }),
          fetch("/api/signals", { cache: "no-store" }),
        ])

        const summaryJson = await summaryResponse.json()
        const signalsJson = await signalsResponse.json()

        if (!summaryJson?.ok) throw new Error()
        if (!signalsJson?.ok) throw new Error()

        setSummary(summaryJson)
        setSignals(signalsJson.signals || [])
      } catch {
        setError("Board report could not load live system intelligence.")
      } finally {
        setLoading(false)
      }
    }

    loadReport()
  }, [])

  const insights = useMemo(() => {
    const high = signals.filter(s => s.severity === "high")
    const missingActions = signals.filter(s => !s.recommended_action).length
    const missingEvidence = signals.filter(s => !s.evidence || s.evidence === "not_started").length
    const schools = new Set(signals.map(s => s.school_name)).size

    return {
      high,
      missingActions,
      missingEvidence,
      schools,
    }
  }, [signals])

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-6 py-10 text-[#071B4D]">
      <section className="mx-auto max-w-6xl space-y-8">

        {/* HEADER */}
        <div className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0D6EFD]">
            Superintendent Briefing
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em]">
            Leadership Risk & Required Action
          </h1>
        </div>

        {/* EXECUTIVE ACTION */}
        <section className="rounded-[2rem] bg-[#071B4D] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-[#8EC5FF]">
            Immediate Action
          </p>

          {!loading && !error && (
            <p className="mt-4 text-sm leading-7 whitespace-pre-line text-[#D8E3F7]">
              {summary?.executiveNarrative}
            </p>
          )}
        </section>

        {/* RISK POSTURE */}
        <section className="grid md:grid-cols-3 gap-4">
          <Card title="Total Signals" value={summary?.count ?? 0} />
          <Card title="High Risk" value={summary?.highRisk ?? 0} tone="high" />
          <Card title="Schools Impacted" value={insights.schools} />
        </section>

        {/* EXECUTION BREAKDOWN */}
        <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6">
          <h2 className="text-lg font-semibold">Execution Gaps</h2>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <Card title="Missing Ownership" value={insights.missingActions} tone="high" />
            <Card title="Missing Evidence" value={insights.missingEvidence} tone="medium" />
          </div>
        </section>

        {/* PRIORITY SIGNALS */}
        <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6">
          <h2 className="text-lg font-semibold">Top Priority Risks</h2>

          <div className="mt-4 space-y-3">
            {insights.high.slice(0, 5).map(signal => (
              <div key={signal.id} className="p-4 rounded-xl border bg-[#F8FAFC]">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{signal.school_name}</p>
                    <p className="text-sm text-[#64748B]">{signal.leader_name}</p>
                  </div>
                  <Badge />
                </div>
                <p className="mt-2 text-sm text-[#475569]">{signal.summary}</p>
              </div>
            ))}
          </div>
        </section>

      </section>
    </main>
  )
}

function Card({ title, value, tone }: any) {
  const color =
    tone === "high" ? "text-red-600" :
    tone === "medium" ? "text-orange-500" :
    "text-[#071B4D]"

  return (
    <div className="bg-white p-5 rounded-2xl border">
      <p className="text-xs uppercase text-[#64748B]">{title}</p>
      <p className={`text-4xl mt-2 font-semibold ${color}`}>{value}</p>
    </div>
  )
}

function Badge() {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
      HIGH
    </span>
  )
}

