"use client"

import { useEffect, useState } from "react"

type Signal = {
  id: string
  school_name: string
  leader_name: string
  severity: "low" | "medium" | "high"
  summary: string
  created_at: string
}

export default function BoardReportPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/executive-summary", { cache: "no-store" })
      const data = await res.json()

      // TEMP: fetch full list separately (cleaner later)
      const raw = await fetch("/api/signals", { cache: "no-store" }).then(r => r.json())

      setSignals(raw.signals || [])
      setLoading(false)
    }

    load()
  }, [])

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-6 py-10 text-[#071B4D]">
      <section className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-semibold mb-6">
          Board Leadership Risk Report
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">

            {signals.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-[#D8E3F7] bg-white p-5 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{s.school_name}</p>
                    <p className="text-sm text-[#64748B]">
                      {s.leader_name}
                    </p>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full
                    ${s.severity === "high" ? "bg-red-100 text-red-700" :
                      s.severity === "medium" ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"}
                  `}>
                    {s.severity.toUpperCase()}
                  </span>
                </div>

                <p className="mt-3 text-sm text-[#475569]">
                  {s.summary}
                </p>
              </div>
            ))}

          </div>
        )}
      </section>
    </main>
  )
}
