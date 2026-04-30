"use client";

import { useEffect, useState } from "react";

type LeadershipAction = {
  id: string;
  campus: string;
  signal: string | null;
  action: string | null;
  owner: string | null;
  status: string;
  risk: string;
  evidence: string | null;
  due_date: string | null;
  last_reviewed: string | null;
  last_updated: string;
};

function riskClass(risk: string) {
  if (risk === "System Alert") return "bg-black text-white border-black";
  if (risk === "Critical") return "bg-red-600 text-white border-red-700";
  if (risk === "Immediate") return "bg-red-100 text-red-800 border-red-200";
  if (risk === "High") return "bg-orange-100 text-orange-800 border-orange-200";
  if (risk === "Low") return "bg-green-100 text-green-800 border-green-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

function isOverdue(item: LeadershipAction) {
  if (!item.due_date || item.status === "Complete") return false;
  return new Date(item.due_date) < new Date();
}

export default function AutonomousCommandCenter() {
  const [actions, setActions] = useState<LeadershipAction[]>([]);
  const [evidenceDrafts, setEvidenceDrafts] = useState<Record<string, string>>({});

  async function loadData() {
    const response = await fetch("/api/autonomous-engine");
    const result = await response.json();
    setActions(result.data || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveEvidence(id: string) {
    const evidence = evidenceDrafts[id];

    if (!evidence || evidence.trim().length === 0) return;

    await fetch("/api/autonomous-engine", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        evidence,
        status: "In Progress"
      })
    });

    setEvidenceDrafts((current) => ({ ...current, [id]: "" }));
    await loadData();
  }

  const immediate = actions.filter((item) => item.risk === "Immediate").length;
  const high = actions.filter((item) => item.risk === "High").length;
  const low = actions.filter((item) => item.risk === "Low").length;

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10">
      <h1 className="mb-2 text-4xl font-bold text-[#111827]">
        Autonomous Command Center
      </h1>

      <p className="mb-8 max-w-3xl text-[#4b5563]">
        Live leadership action monitoring powered by the autonomous risk engine.
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-semibold text-[#6b7280]">Immediate</p>
          <p className="mt-2 text-3xl font-bold text-[#111827]">{immediate}</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-semibold text-[#6b7280]">High</p>
          <p className="mt-2 text-3xl font-bold text-[#111827]">{high}</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-semibold text-[#6b7280]">Low</p>
          <p className="mt-2 text-3xl font-bold text-[#111827]">{low}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {actions.map((item) => (
          <div key={item.id} className={`rounded-xl p-6 shadow ${
  item.risk === "System Alert"
    ? "bg-black text-white"
    : item.risk === "Critical"
    ? "bg-red-50 border border-red-300"
    : "bg-white"
}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827]">
                  {item.campus}
                </h2>

                <p className="mt-2 text-sm font-semibold text-[#6b7280]">
                  Owner: {item.owner || "Unassigned"} | Status: {item.status}
                </p>
              </div>

              <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${riskClass(item.risk)}`}>
                {item.risk}
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-[#6b7280]">Signal</p>
                <p className="mt-1 text-[#111827]">{item.signal || "No signal captured"}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#6b7280]">Recommended Action</p>
                <p className="mt-1 text-[#111827]">{item.action || "No action assigned"}</p>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-[#f8f7f4] p-4">
              <p className="text-sm font-semibold text-[#6b7280]">Evidence</p>
              <p className="mt-1 text-[#111827]">
                {item.evidence || "No evidence logged yet."}
              </p>

              {item.status !== "Complete" && (
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    value={evidenceDrafts[item.id] || ""}
                    onChange={(event) =>
                      setEvidenceDrafts((current) => ({
                        ...current,
                        [item.id]: event.target.value
                      }))
                    }
                    placeholder="Log evidence of execution..."
                    className="w-full rounded-lg border border-[#d1d5db] px-4 py-2 text-sm"
                  />

                  <button
                    onClick={() => saveEvidence(item.id)}
                    className="rounded-lg bg-[#111827] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Save Evidence
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-2 text-sm text-[#6b7280] md:grid-cols-3">
              <p>Due: {item.due_date || "Not set"}</p>
              <p>Last reviewed: {item.last_reviewed ? new Date(item.last_reviewed).toLocaleString() : "Not reviewed"}</p>
              <p>Last updated: {item.last_updated ? new Date(item.last_updated).toLocaleString() : "Not available"}</p>
            </div>

            {!item.evidence && item.status !== "Complete" && (
              <p className="mt-3 text-sm font-semibold text-red-600">
                Evidence missing
              </p>
            )}

            {isOverdue(item) && (
              <p className="mt-1 text-sm font-semibold text-red-800">
                Overdue
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}