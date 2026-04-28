"use client";

import { useState } from "react";

export default function ExecutiveIntelligencePage() {
  const [riskData, setRiskData] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [successionData, setSuccessionData] = useState(null);

  async function runExecutiveAnalysis() {
    const riskRes = await fetch("/api/risk-engine", {
      method: "POST",
      body: JSON.stringify({
        instructionalLeadership: 55,
        teacherRetention: 60,
        studentAchievement: 50,
        executionReliability: 45,
        cultureHealth: 65,
        talentManagement: 50
      })
    });

    const risk = await riskRes.json();
    setRiskData(risk);

    const prescriptionRes = await fetch("/api/prescription-engine", {
      method: "POST",
      body: JSON.stringify({
        risk: risk.risk
      })
    });

    const prescription = await prescriptionRes.json();
    setPrescriptions(prescription);

    const successionRes = await fetch("/api/succession-engine", {
      method: "POST",
      body: JSON.stringify({
        instructionalLeadership: 75,
        staffManagement: 70,
        executionConsistency: 72,
        schoolCulture: 80,
        studentOutcomes: 68
      })
    });

    const succession = await successionRes.json();
    setSuccessionData(succession);
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Executive Intelligence Dashboard
      </h1>

      <button
        onClick={runExecutiveAnalysis}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Run District Analysis
      </button>

      {riskData && (
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold">Leadership Risk</h2>
          <pre>{JSON.stringify(riskData, null, 2)}</pre>
        </div>
      )}

      {prescriptions && (
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold">Intervention Plan</h2>
          <pre>{JSON.stringify(prescriptions, null, 2)}</pre>
        </div>
      )}

      {successionData && (
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold">Succession Readiness</h2>
          <pre>{JSON.stringify(successionData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
