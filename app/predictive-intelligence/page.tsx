"use client";

import { useEffect, useState } from "react";

export default function PredictiveIntelligence() {
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    async function loadPredictions() {
      const response = await fetch("/api/predictive-risk");
      const data = await response.json();

      setPredictions(data.predictions);
    }

    loadPredictions();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10">
      <h1 className="text-4xl font-bold mb-8">
        Predictive District Intelligence
      </h1>

      {predictions.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow mb-4"
        >
          <h2 className="font-bold text-xl">
            {item.school}
          </h2>
          <p>Current Risk: {item.currentRisk}</p>
          <p>Projected Risk: {item.projectedRisk}</p>
          <p>Probability: {item.probability}</p>
        </div>
      ))}
    </main>
  );
}
