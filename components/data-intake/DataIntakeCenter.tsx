"use client";

import { useMemo, useState } from "react";

const datasetTypes = [
  {
    id: "principal-roster",
    title: "Principal Roster",
    description: "Principal names, schools, roles, years in role, and school type.",
    fields: ["Principal Name", "School", "Role", "Years in Role", "School Type"]
  },
  {
    id: "evaluation-coaching",
    title: "Evaluation / Coaching Data",
    description: "Observation ratings, coaching frequency, goals, notes, and walkthrough trends.",
    fields: ["Principal Name", "School", "Evaluation Score", "Coaching Frequency", "Coaching Notes", "Leadership Goal"]
  },
  {
    id: "student-performance",
    title: "Student Performance Data",
    description: "Achievement trends, growth, subgroup performance, and assessment completion.",
    fields: ["School", "Proficiency Rate", "Growth Metric", "Subgroup Gap", "Assessment Completion"]
  },
  {
    id: "talent-hr",
    title: "Talent / HR Data",
    description: "Vacancies, retention, tenure, resignation history, and internal pipeline data.",
    fields: ["Principal Name", "School", "Years in Role", "Retention Status", "Vacancy Risk", "Resignation Date"]
  },
  {
    id: "succession-pipeline",
    title: "Succession Pipeline Data",
    description: "Assistant principal readiness, internal candidates, and successor pools.",
    fields: ["Candidate Name", "Current Role", "Target Role", "Readiness Level", "Development Need"]
  }
];

const sampleColumns = [
  "Building Leader Name",
  "Site Assignment",
  "Role Type",
  "Years Assigned",
  "Eval Composite",
  "Coaching Notes",
  "Student Proficiency",
  "Vacancy Flag"
];

export default function DataIntakeCenter() {
  const [selectedType, setSelectedType] = useState(datasetTypes[0]);
  const [fileName, setFileName] = useState("");
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const requiredFields = useMemo(() => selectedType.fields, [selectedType]);

  function handleMapping(column: string, value: string) {
    setMappings((current) => ({
      ...current,
      [column]: value
    }));
  }

  const mappedCount = Object.values(mappings).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-10 text-[#111111] sm:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 border-b border-black/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">
            LeadSharper
          </p>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Data Intake Center
            </h1>
            <p className="mt-4 text-lg leading-8 text-black/65">
              Upload district leadership data, map messy fields, check data quality,
              and push clean records into the risk, prescription, and succession engines.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">1. Upload data</h2>
              <p className="mt-2 text-sm leading-6 text-black/60">
                Start with CSV or Excel. Direct sync comes later after buyer validation.
              </p>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-black/25 bg-black/[0.02] px-6 py-12 text-center transition hover:bg-black/[0.04]">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setFileName(file?.name ?? "");
                }}
              />
              <span className="text-base font-semibold">
                {fileName || "Choose CSV or Excel file"}
              </span>
              <span className="mt-2 text-sm text-black/55">
                Principal roster, evaluation data, HR data, performance data, or succession pipeline.
              </span>
            </label>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold">2. Choose dataset type</h2>
              <div className="mt-4 grid gap-3">
                {datasetTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type);
                      setMappings({});
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedType.id === type.id
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white hover:border-black/30"
                    }`}
                  >
                    <div className="font-semibold">{type.title}</div>
                    <div
                      className={`mt-1 text-sm leading-6 ${
                        selectedType.id === type.id ? "text-white/70" : "text-black/55"
                      }`}
                    >
                      {type.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">3. Map columns</h2>
              <p className="mt-2 text-sm leading-6 text-black/60">
                Match district file columns to LeadSharper fields. This is what makes messy data usable.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/10">
              <div className="grid grid-cols-2 bg-black px-4 py-3 text-sm font-semibold text-white">
                <div>District Column</div>
                <div>LeadSharper Field</div>
              </div>

              {sampleColumns.map((column) => (
                <div key={column} className="grid grid-cols-2 items-center border-t border-black/10 px-4 py-3">
                  <div className="text-sm font-medium">{column}</div>
                  <select
                    value={mappings[column] || ""}
                    onChange={(event) => handleMapping(column, event.target.value)}
                    className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  >
                    <option value="">Select field</option>
                    {requiredFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-[#f8f7f4] p-5">
              <h2 className="text-2xl font-semibold">4. Data health check</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <span>Mapped fields</span>
                  <span className="font-semibold">{mappedCount}/{sampleColumns.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <span>Missing required fields</span>
                  <span className="font-semibold">{Math.max(requiredFields.length - mappedCount, 0)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <span>Duplicate records</span>
                  <span className="font-semibold">Pending file parse</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <span>Outdated records</span>
                  <span className="font-semibold">Pending file parse</span>
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white transition hover:bg-black/85"
            >
              Run LeadSharper Engines
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}
