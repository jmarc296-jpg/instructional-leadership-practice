"use client"

import { useState } from "react"
import Papa from "papaparse"

type IntakeRow = {
  school_name?: string
  leader_name?: string
  risk_level?: string
  issue?: string
  recommended_action?: string
}

const requiredHeaders = [
  "school_name",
  "leader_name",
  "risk_level",
  "issue",
  "recommended_action",
]

function validateRows(rows: IntakeRow[]) {
  if (rows.length === 0) return "CSV has no data rows."

  const missingRequiredData = rows.some(
    (row) => !row.school_name || !row.leader_name || !row.risk_level || !row.issue
  )

  if (missingRequiredData) {
    return "Each row must include school_name, leader_name, risk_level, and issue."
  }

  return ""
}

export default function DataIntakePage() {
  const [fileName, setFileName] = useState("")
  const [status, setStatus] = useState("")
  const [rows, setRows] = useState<IntakeRow[]>([])
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setStatus("Reading file...")

    const text = await file.text()

    Papa.parse<IntakeRow>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const headers = result.meta.fields || []
        const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))

        if (missingHeaders.length > 0) {
          setRows([])
          setStatus(`Missing required column(s): ${missingHeaders.join(", ")}`)
          return
        }

        const parsedRows = result.data
        const validationError = validateRows(parsedRows)

        if (validationError) {
          setRows([])
          setStatus(validationError)
          return
        }

        setRows(parsedRows)
        setStatus(`${parsedRows.length} rows prepared for signal generation.`)
      },
      error: () => {
        setRows([])
        setStatus("CSV could not be parsed. Check the template and try again.")
      },
    })
  }

  async function submitRows() {
    if (rows.length === 0) {
      setStatus("Upload a valid CSV before generating signals.")
      return
    }

    setIsUploading(true)
    setStatus("Generating leadership signals...")

    const response = await fetch("/api/data-intake-signals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows }),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      setStatus(data.error || "Signal generation failed.")
      setIsUploading(false)
      return
    }

    setStatus(`${data.inserted} leadership signals generated. Review /board-report for the executive view.`)
    setIsUploading(false)
  }

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-6 py-10 text-[#071B4D]">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0D6EFD]">
            Data Intake Center
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Turn district evidence into leadership signals.
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#475569]">
            Upload CSV evidence from walkthroughs, DDI notes, evaluation flags, or leadership support reviews.
            LeadSharper validates the file, generates persisted signals, and pushes them into the executive report.
          </p>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
          <div className="rounded-3xl border border-[#D8E3F7] bg-[#F7FAFF] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.03em]">
                  Required CSV columns
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#475569]">
                  school_name, leader_name, risk_level, issue, recommended_action
                </p>
              </div>

              <a
                href="/templates/leadsharper-district-intake-template.csv"
                download
                className="inline-flex rounded-full bg-[#071B4D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D6EFD]"
              >
                Download CSV Template
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6">
            <label className="block">
              <span className="text-sm font-semibold text-[#071B4D]">
                Upload CSV intake file
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mt-4 block w-full cursor-pointer rounded-2xl border border-[#CBD5E1] bg-white p-3 text-sm text-[#475569]"
              />
            </label>

            {fileName && (
              <p className="mt-4 text-sm font-semibold text-[#071B4D]">
                Selected: {fileName}
              </p>
            )}

            {status && (
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {status}
              </p>
            )}

            <button
              onClick={submitRows}
              disabled={isUploading || rows.length === 0}
              className="mt-5 rounded-full bg-[#071B4D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D6EFD] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? "Generating..." : "Generate Leadership Signals"}
            </button>
          </div>
        </div>

        {rows.length > 0 && (
          <div className="mt-6 rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              Intake Preview
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              Rows ready for processing
            </h2>

            <div className="mt-5 overflow-hidden rounded-3xl border border-[#E2E8F0]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#F8FAFC] text-xs uppercase tracking-[0.16em] text-[#64748B]">
                  <tr>
                    <th className="p-4">School</th>
                    <th className="p-4">Leader</th>
                    <th className="p-4">Risk</th>
                    <th className="p-4">Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((row, index) => (
                    <tr key={index} className="border-t border-[#E2E8F0]">
                      <td className="p-4">{row.school_name}</td>
                      <td className="p-4">{row.leader_name}</td>
                      <td className="p-4">{row.risk_level}</td>
                      <td className="p-4">{row.issue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
