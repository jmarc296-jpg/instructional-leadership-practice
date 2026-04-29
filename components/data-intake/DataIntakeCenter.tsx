"use client";

import { useMemo, useState } from "react";

const sources = [
  {
    id: "evaluations",
    title: "Principal Evaluations",
    description: "Observation ratings, rubric scores, leadership goals, and evaluation trends.",
    status: "CSV / Excel"
  },
  {
    id: "retention",
    title: "Retention Data",
    description: "Leader tenure, staff retention, resignation history, and mobility patterns.",
    status: "CSV / Excel"
  },
  {
    id: "performance",
    title: "School Performance",
    description: "Achievement, growth, subgroup gaps, assessment completion, and school trajectory.",
    status: "CSV / Excel"
  },
  {
    id: "vacancies",
    title: "Vacancy Data",
    description: "Open roles, expected transitions, hard-to-fill schools, and timeline risk.",
    status: "CSV / Excel"
  },
  {
    id: "succession",
    title: "Succession Bench",
    description: "Assistant principals, aspiring leaders, readiness levels, and development needs.",
    status: "CSV / Excel"
  },
  {
    id: "integrations",
    title: "HRIS / Platform Sync",
    description: "Future connections for Whetstone, TORSH, Google Drive, Frontline, and HR systems.",
    status: "Coming Next"
  }
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
    <main className="min-h-screen bg-[#f6f9ff] px-6 py-8 text-[#071a3d] sm:px-10">
      <section className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-[#0b63ff]/10 pb-6">
          <a href="/" className="text-sm font-bold text-[#0b63ff]">
            LeadSharper
          </a>

          <a href="/executive-intelligence" className="rounded-full border border-[#0b63ff]/20 bg-white px-5 py-3 text-sm font-bold text-[#071a3d] shadow-sm hover:border-[#0b63ff]">
            Executive Intelligence
          </a>
        </header>

        <div className="grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#0b63ff]">
              Data Intake Center
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Turn messy district files into leadership intelligence.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#34476b]">
              Upload evaluation, talent, performance, and succession files. LeadSharper maps district fields, checks data quality, and prepares the records for risk, prescription, and succession analysis.
            </p>

            <div className="mt-8 rounded-[2rem] border border-[#0b63ff]/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Upload source file</h2>
              <p className="mt-2 text-sm leading-6 text-[#34476b]">
                Start with CSV or Excel. Direct platform sync comes after pilot validation.
              </p>

              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#0b63ff]/30 bg-[#f6f9ff] px-6 py-10 text-center transition hover:border-[#0b63ff]">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setFileName(file?.name ?? "");
                  }}
                />
                <span className="text-base font-bold text-[#071a3d]">
                  {fileName || "Choose CSV or Excel file"}
                </span>
                <span className="mt-2 text-sm text-[#34476b]">
                  Principal roster, evaluation export, HR file, assessment file, or succession tracker.
                </span>
              </label>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#0b63ff]/10 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-6 border-b border-[#0b63ff]/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0b63ff]">
                  Intake Readiness
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  District data sources
                </h2>
              </div>

              <div className="rounded-full bg-[#eaf2ff] px-4 py-2 text-xs font-bold text-[#0b63ff]">
                Pilot-ready
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedSource.id === source.id
                      ? "border-[#0b63ff] bg-[#eef5ff]"
                      : "border-[#0b63ff]/10 bg-white hover:border-[#0b63ff]/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{source.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#34476b]">
                      {source.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#34476b]">
                    {source.description}
                  </p>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="grid gap-6 pb-12 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-[#0b63ff]/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0b63ff]">
              Step 1
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Map district columns</h2>

            <div className="mt-6 space-y-3">
              {mappingRows.map(([districtField, leadSharperField]) => (
                <div key={districtField} className="flex items-center justify-between rounded-2xl bg-[#f6f9ff] px-4 py-4">
                  <span className="text-sm font-semibold text-[#34476b]">{districtField}</span>
                  <span className="text-sm font-bold text-[#071a3d]">? {leadSharperField}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#0b63ff]/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0b63ff]">
              Step 2
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Check data health</h2>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-[#f6f9ff] px-4 py-4">
                <p className="text-sm font-bold">Missing leadership scores</p>
                <p className="mt-1 text-sm text-[#34476b]">12 records need review</p>
              </div>

              <div className="rounded-2xl bg-[#f6f9ff] px-4 py-4">
                <p className="text-sm font-bold">Duplicate leaders</p>
                <p className="mt-1 text-sm text-[#34476b]">3 possible duplicates found</p>
              </div>

              <div className="rounded-2xl bg-[#f6f9ff] px-4 py-4">
                <p className="text-sm font-bold">Outdated files</p>
                <p className="mt-1 text-sm text-[#34476b]">2 files older than 90 days</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#0b63ff]/10 bg-[#071a3d] p-6 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#58a6ff]">
              Step 3
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Generate outputs</h2>

            <div className="mt-6 space-y-3">
              {outputs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4">
                  <span className="text-sm font-semibold text-white/70">{label}</span>
                  <span className="text-2xl font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <button
              disabled={!readyToProcess}
              className="mt-6 w-full rounded-full bg-[#0b63ff] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#2f7dff] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {readyToProcess ? "Run LeadSharper Analysis" : "Upload file to continue"}
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}

