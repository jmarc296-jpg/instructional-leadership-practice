"use client";

import { useEffect, useState } from "react";

export default function WeeklyIntelligence() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    async function loadAlerts() {
      const response = await fetch("/api/weekly-monitor");
      const data = await response.json();

      setAlerts(data.weeklyAlerts);
    }

    loadAlerts();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10">
      <h1 className="text-4xl font-bold mb-8">
        Weekly District Intelligence
      </h1>

      {alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow mb-4"
        >
          <h2 className="font-bold text-xl">
            {alert.school}
          </h2>
          <p>Risk Score: {alert.risk}</p>
          <p>Recommended Action: {alert.action}</p>
        </div>
      ))}
    </main>
  );
}
