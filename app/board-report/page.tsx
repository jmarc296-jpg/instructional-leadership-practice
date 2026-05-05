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

        if (!summaryJson?.ok) {
          throw new Error(summaryJson?.error || "Executive summary failed.")
        }

        if (!signalsJson?.ok) {
          throw new Error(signalsJson?.error || "Signals feed failed.")
        }

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

  const groupedSignals = useMemo(() => {
    return {
      high: signals.filter((signal) => signal.severity === "high"),
      medium: signals.filter((signal) => signal.severity === "medium"),
      low: signals.filter((signal) => signal.severity === "low"),
    }
  }, [signals])

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-6 py-10 text-[#071B4D]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0D6EFD]">
            Board Leadership Risk Report
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Leadership risk, ownership, evidence, and executive action.
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#475569]">
            This report translates live leadership signals into a superintendent-ready briefing:
            where risk is concentrated, what execution gaps remain, and what action should happen next.
          </p>
        </div>

        <section className="mb-8 rounded-[2rem] border border-[#D8E3F7] bg-[#071B4D] p-8 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8EC5FF]">
            Executive Readout
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Recommended superintendent action
          </h2>

          {loading && (
            <p className="mt-4 text-sm leading-7 text-[#D8E3F7]">
              Loading live executive intelligence...
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm leading-7 text-[#FECACA]">
              {error}
            </p>
          )}

          {!loading && !error && (
            <p className="mt-4 max-w-5xl whitespace-pre-line text-sm leading-7 text-[#D8E3F7]">
              {summary?.executiveNarrative ||
                "No leadership risk signals have been captured yet. Upload district evidence to begin."}
            </p>
          )}
        </section>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Metric label="Signals" value={summary?.count ?? 0} />
          <Metric label="High Risk" value={summary?.highRisk ?? 0} tone="high" />
          <Metric label="Medium Risk" value={summary?.mediumRisk ?? 0} tone="medium" />
          <Metric label="Low Risk" value={summary?.lowRisk ?? 0} tone="low" />
        </div>

        {!loading && !error && signals.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-[#CBD5E1] bg-white p-8 text-[#64748B]">
            No leadership risk signals have been captured yet. Upload district evidence to begin.
          </div>
        )}

        {!loading && !error && signals.length > 0 && (
          <div className="space-y-6">
            <SignalGroup title="High Risk" tone="high" signals={groupedSignals.high} />
            <SignalGroup title="Medium Risk" tone="medium" signals={groupedSignals.medium} />
            <SignalGroup title="Low Risk" tone="low" signals={groupedSignals.low} />
          </div>
        )}
      </section>
    </main>
  )
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: "high" | "medium" | "low"
}) {
  const color =
    tone === "high"
      ? "text-[#B42318]"
      : tone === "medium"
        ? "text-[#B54708]"
        : tone === "low"
          ? "text-[#027A48]"
          : "text-[#071B4D]"

  return (
    <div className="rounded-3xl border border-[#D8E3F7] bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">
        {label}
      </p>
      <p className={`mt-3 text-4xl font-semibold tracking-[-0.04em] ${color}`}>
        {value}
      </p>
    </div>
  )
}

function SignalGroup({
  title,
  tone,
  signals,
}: {
  title: string
  tone: "high" | "medium" | "low"
  signals: Signal[]
}) {
  if (signals.length === 0) return null

  return (
    <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
        {title}
      </p>

      <div className="mt-5 grid gap-4">
        {signals.map((signal) => (
          <article
            key={signal.id}
            className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#071B4D]">
                  {signal.school_name || "School not specified"}
                </h3>
                <p className="mt-1 text-sm text-[#64748B]">
                  {signal.leader_name || "Leader not specified"}
                </p>
              </div>

              <SeverityBadge tone={tone} />
            </div>

            <p className="mt-4 text-sm leading-6 text-[#475569]">
              {signal.summary || "No summary provided."}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function SeverityBadge({ tone }: { tone: "high" | "medium" | "low" }) {
  const styles = {
    high: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
    medium: "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]",
    low: "bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]",
  }

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${styles[tone]}`}>
      {tone} risk
    </span>
  )
}
