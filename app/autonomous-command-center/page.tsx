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
  last_updated: string;
};

function riskClass(risk: string) {
  if (risk === "Immediate") return "bg-red-100 text-red-800 border-red-200";
  if (risk === "High") return "bg-orange-100 text-orange-800 border-orange-200";
  if (risk === "Low") return "bg-green-100 text-green-800 border-green-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

export default function AutonomousCommandCenter() {
  const [actions, setActions] = useState<LeadershipAction[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/autonomous-engine");
      const result = await response.json();
      setActions(result.data || []);
    }

    loadData();
  }, []);

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
          <div key={item.id} className="rounded-xl bg-white p-6 shadow">
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

            <p className="mt-5 text-xs text-[#6b7280]">
              Last updated: {item.last_updated ? new Date(item.last_updated).toLocaleString() : "Not available"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}