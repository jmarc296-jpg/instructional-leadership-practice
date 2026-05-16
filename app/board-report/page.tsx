"use client"

import Link from "next/link";
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
        setError("Board report could not load live executive records.")
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

  const emptyState = !loading && signals.length === 0

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-6 py-10 text-[#071B4D]">
      <section className="mx-auto max-w-6xl space-y-8">

        <div className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0D6EFD]">
            Superintendent Briefing
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em]">
            Executive Accountability Report
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#475569]">
            LeadSharper converts district evidence into leadership risk signals,
            ownership tracking, escalation visibility, and board-aware executive records.
          </p>
        </div>

        {emptyState && (
          <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              No Live District Signals Loaded
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Executive reporting activates after district evidence intake.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#475569]">
              Upload structured district exports through the Data Intake workflow
              to generate leadership risk signals, ownership tracking, evidence verification,
              escalation visibility, and superintendent-ready executive records.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/data-intake"
                className="rounded-full bg-[#071B4D] px-6 py-4 text-center text-sm font-semibold text-white hover:bg-[#0D6EFD]"
              >
                Review Data Intake Model
              </Link>

              <Link
                href="/demo/run"
                className="rounded-full border border-[#CBD5E1] bg-white px-6 py-4 text-center text-sm font-semibold text-[#071B4D] hover:border-[#0D6EFD] hover:text-[#0D6EFD]"
              >
                Run Executive Demo
              </Link>
            </div>
          </section>
        )}

        {!emptyState && (
          <>
            <section className="rounded-[2rem] bg-[#071B4D] p-8 text-white">
              <p className="text-xs uppercase tracking-[0.24em] text-[#8EC5FF]">
                Immediate Executive Action
              </p>

              {!loading && !error && (
                <p className="mt-4 text-sm leading-7 whitespace-pre-line text-[#D8E3F7]">
                  {summary?.executiveNarrative}
                </p>
              )}
            </section>

            <section className="grid md:grid-cols-3 gap-4">
              <Card title="Total Signals" value={summary?.count ?? 0} />
              <Card title="High Risk" value={summary?.highRisk ?? 0} tone="high" />
              <Card title="Schools Impacted" value={insights.schools} />
            </section>
          </>
        )}

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
