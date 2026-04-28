"use client"

import { useState } from "react"
import { parseDistrictCSV } from "@/lib/ingestion/district-parser"

export default function UploadDistrictDataPage() {
  const [status, setStatus] = useState("")
  const [records, setRecords] = useState<any[]>([])

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      setStatus("Processing district data...")

      const parsed = await parseDistrictCSV(file)

      localStorage.setItem(
        "districtUploadedData",
        JSON.stringify(parsed)
      )

      setRecords(parsed)
      setStatus(`Successfully uploaded ${parsed.length} leadership records`)
    } catch (error) {
      setStatus("Upload failed. Please verify CSV formatting.")
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] p-10">
      <h1 className="text-4xl font-bold">
        Upload District Data
      </h1>

      <p className="mt-4 text-gray-600">
        Upload leadership roster, vacancies, retention, and readiness data.
      </p>

      <div className="mt-8 rounded-3xl border bg-white p-8">
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
        />

        <p className="mt-4 text-sm text-gray-600">
          {status}
        </p>
      </div>

      {records.length > 0 && (
        <div className="mt-8 rounded-3xl border bg-white p-8">
          <h2 className="text-2xl font-bold">
            Uploaded Leadership Records
          </h2>

          <div className="mt-4 space-y-3">
            {records.slice(0, 5).map((record, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#f7f7f4] p-4"
              >
                {record.leaderName} | {record.role}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
