"use client";

import { useEffect, useState } from "react";

type LeadershipAction = {
  campus: string;
  status: string;
  risk: string;
};

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

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10">
      <h1 className="mb-2 text-4xl font-bold text-[#111827]">
        Autonomous Command Center
      </h1>

      <p className="mb-8 max-w-3xl text-[#4b5563]">
        Live leadership action monitoring powered by the autonomous risk engine.
      </p>

      <div className="grid gap-4">
        {actions.map((action, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111827]">
                {action.campus}
              </h2>

              <span className="rounded-full bg-[#111827] px-3 py-1 text-sm font-semibold text-white">
                {action.risk}
              </span>
            </div>

            <p className="mt-3 text-[#4b5563]">
              Status: {action.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
