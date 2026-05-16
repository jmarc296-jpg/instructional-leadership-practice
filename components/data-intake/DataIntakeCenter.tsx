"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const sources = [
  { title: "Principal Evaluations", description: "Observation ratings, rubric scores, leadership goals, and evaluation trends.", status: "CSV / Excel" },
  { title: "Retention Data", description: "Leader tenure, staff retention, resignation history, and mobility patterns.", status: "CSV / Excel" },
  { title: "School Performance", description: "Achievement, growth, subgroup gaps, assessment completion, and school trajectory.", status: "CSV / Excel" },
  { title: "Vacancy Data", description: "Open roles, expected transitions, hard-to-fill schools, and timeline risk.", status: "CSV / Excel" },
  { title: "Succession Bench", description: "Assistant principals, aspiring leaders, readiness levels, and development needs.", status: "CSV / Excel" },
  { title: "District Systems", description: "Compatible with common HR, evaluation, and performance data systems.", status: "Compatible" }
];

const mappingRows = [
  ["Building Leader", "Principal Name"],
  ["Site", "School"],
  ["Eval Composite", "Leadership Score"],
  ["Years Assigned", "Tenure"],
  ["Vacancy Flag", "Vacancy Risk"]
];

const outputs = [
  ["Records Processed", "2,341"],
  ["Principals Flagged", "14"],
  ["Urgent Interventions", "4"],
  ["Succession Gaps", "6"]
];

export default function DataIntakeCenter() {
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [fileName, setFileName] = useState("");
  const readyToProcess = useMemo(() => Boolean(fileName), [fileName]);

  return (
    <main className="min-h-screen bg-[#EEF3FB] text-[#071B4D]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="LeadSharper"
            width={240}
            height={70}
            priority
            className="h-auto w-[260px]"
          />
        </Link>

        <Link
          href="/district-command-center"
          className="rounded-full border border-[#0D6EFD]/20 px-6 py-3 text-sm font-semibold hover:bg-white"
        >
          Command Center
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0D6EFD]">
              District Data Readiness
            </p>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Turn district evidence into executive accountability records.
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-[#31456E]">
              Upload evaluation, talent, performance, and succession files. LeadSharper maps district fields, checks data quality, and prepares records for risk signals, ownership, evidence verification, and executive records.
            </p>

            <div className="mt-10 rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Upload source file</h2>

              <p className="mt-3 text-[#31456E]">
                Structured district exports are enough for a pilot without live integrations.
              </p>

              <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#0D6EFD]/30 bg-[#F7FAFF] px-6 py-12 text-center transition hover:border-[#0D6EFD]">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setFileName(file?.name ?? "");
                  }}
                />

                <span className="text-base font-bold text-[#071B4D]">
                  {fileName || "Choose CSV or Excel file"}
                </span>

                <span className="mt-2 text-sm text-[#31456E]">
                  Principal roster, evaluation export, HR file, assessment file, or succession tracker.
                </span>
              </label>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-6 border-b border-[#D8E3F7] pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0D6EFD]">
                  Intake Readiness
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  District data sources
                </h2>
              </div>

              <div className="rounded-full bg-[#EEF3FB] px-4 py-2 text-xs font-bold text-[#071B4D]">
                Pilot-ready
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {sources.map((source) => (
                <button
                  key={source.title}
                  onClick={() => setSelectedSource(source)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedSource.title === source.title
                      ? "border-[#0D6EFD] bg-[#F7FAFF]"
                      : "border-[#D8E3F7] bg-white hover:border-[#0D6EFD]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold">{source.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#31456E]">
                      {source.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#31456E]">
                    {source.description}
                  </p>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="grid gap-6 py-12 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D6EFD]">Step 1</p>
            <h2 className="mt-3 text-2xl font-bold">Map district columns</h2>

            <div className="mt-6 space-y-3">
              {mappingRows.map(([districtField, leadSharperField]) => (
                <div key={districtField} className="flex items-center justify-between rounded-2xl bg-[#F7FAFF] px-4 py-4">
                  <span className="text-sm font-semibold text-[#31456E]">{districtField}</span>
                  <span className="text-sm font-bold text-[#071B4D]">{leadSharperField}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D6EFD]">Step 2</p>
            <h2 className="mt-3 text-2xl font-bold">Check data health</h2>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-[#F7FAFF] px-4 py-4">
                <p className="text-sm font-bold">Missing leadership scores</p>
                <p className="mt-1 text-sm text-[#31456E]">12 records need review</p>
              </div>

              <div className="rounded-2xl bg-[#F7FAFF] px-4 py-4">
                <p className="text-sm font-bold">Duplicate leaders</p>
                <p className="mt-1 text-sm text-[#31456E]">3 possible duplicates found</p>
              </div>

              <div className="rounded-2xl bg-[#F7FAFF] px-4 py-4">
                <p className="text-sm font-bold">Outdated files</p>
                <p className="mt-1 text-sm text-[#31456E]">2 files older than 90 days</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#071B4D] bg-[#071B4D] p-6 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-300">Step 3</p>
            <h2 className="mt-3 text-2xl font-bold">Generate outputs</h2>

            <div className="mt-6 space-y-3">
              {outputs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4">
                  <span className="text-sm font-semibold text-white/70">{label}</span>
                  <span className="text-2xl font-bold">{value}</span>
                </div>
              ))}
            </div>

            <button
              disabled={!readyToProcess}
              className="mt-6 w-full rounded-full bg-[#0057FF] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#0046cc] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {readyToProcess ? "Generate Executive Accountability Review" : "Upload file to continue"}
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}
