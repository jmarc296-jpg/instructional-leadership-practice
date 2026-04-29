"use client";

import { useState } from "react";

export default function ExecutiveIntelligencePage() {
  const [riskData, setRiskData] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any>(null);
  const [successionData, setSuccessionData] = useState<any>(null);

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
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-10 text-[#111111] sm:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="border-b border-black/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-black/50">
            Executive Intelligence
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Leadership intelligence for executive teams.
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-black/60">
            Identify leadership risk, prescribe interventions, and protect succession pipelines.
          </p>
        </div>

        <button
          onClick={runExecutiveAnalysis}
          className="mt-10 rounded-full bg-black px-7 py-4 text-sm font-bold text-white hover:bg-black/85"
        >
          Run District Analysis
        </button>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {riskData && (
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Leadership Risk</h2>
              <pre className="mt-4 text-sm text-black/60 whitespace-pre-wrap">
                {JSON.stringify(riskData, null, 2)}
              </pre>
            </div>
          )}

          {prescriptions && (
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Intervention Plan</h2>
              <pre className="mt-4 text-sm text-black/60 whitespace-pre-wrap">
                {JSON.stringify(prescriptions, null, 2)}
              </pre>
            </div>
          )}

          {successionData && (
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Succession Readiness</h2>
              <pre className="mt-4 text-sm text-black/60 whitespace-pre-wrap">
                {JSON.stringify(successionData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
