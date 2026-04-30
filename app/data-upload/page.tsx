"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function DataUploadPage() {
  const [results, setResults] = useState<any[]>([]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (parsed) => {
        const response = await fetch("/api/data-ingestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            schools: parsed.data
          })
        });

        const data = await response.json();
        setResults(data.results);
      }
    });
  };

  return (
    <main className="min-h-screen p-10 bg-[#f8f7f4]">
      <h1 className="text-4xl font-bold mb-6">
        District Data Upload
      </h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-8"
      />

      <div className="space-y-4">
        {results.map((school, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-semibold">
              {school.schoolName}
            </h2>
            <p>Risk Score: {school.riskScore}</p>
            <p>Status: {school.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
