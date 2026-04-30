"use client";

import { useEffect, useState } from "react";

export default function IntegrationsCenter() {
  const [integrations, setIntegrations] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/integrations");
      const data = await response.json();

      setIntegrations(data.integrations);
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10">
      <h1 className="text-4xl font-bold mb-8">
        District Integrations Center
      </h1>

      {integrations.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow mb-4"
        >
          <h2 className="font-bold text-xl">
            {item.platform}
          </h2>
          <p>Status: {item.status}</p>
          <p>Last Sync: {item.lastSync}</p>
        </div>
      ))}
    </main>
  );
}
