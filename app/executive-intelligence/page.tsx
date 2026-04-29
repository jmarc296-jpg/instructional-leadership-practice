"use client";

const leaders = [
  {
    principal: "Jane Carter",
    school: "Priority Campus 01",
    risk: "High",
    score: "84",
    action: "90-day coaching plan"
  },
  {
    principal: "Marcus Reed",
    school: "Roosevelt Middle School",
    risk: "High",
    score: "79",
    action: "Immediate intervention"
  },
  {
    principal: "Alicia Grant",
    school: "East Elementary",
    risk: "Moderate",
    score: "68",
    action: "Monitor next cycle"
  },
  {
    principal: "David Kim",
    school: "North Preparatory",
    risk: "Moderate",
    score: "63",
    action: "Targeted support"
  }
];

const metrics = [
  ["District Risk Score", "72", "Moderate exposure"],
  ["Likely Openings", "3", "Next 12 months"],
  ["Succession Readiness", "58%", "Bench strength"],
  ["Urgent Interventions", "4", "This quarter"]
];

const succession = [
  ["Ready Now", "7 leaders"],
  ["Ready in 12 Months", "12 leaders"],
  ["Critical Pipeline Gaps", "3 roles"]
];

export default function ExecutiveIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#f6f9ff] px-6 py-8 text-[#071a3d] sm:px-10">
      <section className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-[#0b63ff]/10 pb-6">
          <a href="/" className="text-sm font-bold text-[#0b63ff]">
            LeadSharper
          </a>

          <a
            href="/data-intake"
            className="rounded-full border border-[#0b63ff]/20 bg-white px-5 py-3 text-sm font-bold text-[#071a3d] shadow-sm hover:border-[#0b63ff]"
          >
            Upload Data
          </a>
        </header>

        <div className="py-10">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#0b63ff]">
            Executive Intelligence
          </p>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                District leadership risk profile.
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#34476b]">
                A decision-ready view of principal risk, intervention urgency, vacancy exposure, and succession readiness.
              </p>
            </div>

            <button className="rounded-full bg-[#0057FF] px-7 py-4 text-sm font-bold text-white hover:bg-[#0046cc]">
              Refresh Analysis
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map(([label, value, context]) => (
            <section key={label} className="rounded-[1.5rem] border border-[#0b63ff]/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0b63ff]">
                {label}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                {value}
              </p>
              <p className="mt-2 text-sm font-medium text-[#34476b]">
                {context}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[2rem] border border-[#0b63ff]/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-[#0b63ff]/10 pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0b63ff]">
                  Principal Risk
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Leaders requiring attention
                </h2>
              </div>

              <p className="text-sm font-semibold text-[#34476b]">
                Sorted by risk exposure
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#0b63ff]/10">
              <div className="grid grid-cols-[1.1fr_1fr_0.6fr_0.7fr_1fr] bg-[#071a3d] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                <div>Principal</div>
                <div>School</div>
                <div>Risk</div>
                <div>Score</div>
                <div>Action</div>
              </div>

              {leaders.map((leader) => (
                <div
                  key={leader.principal}
                  className="grid grid-cols-[1.1fr_1fr_0.6fr_0.7fr_1fr] items-center border-t border-[#0b63ff]/10 px-4 py-4 text-sm"
                >
                  <div className="font-bold">{leader.principal}</div>
                  <div className="text-[#34476b]">{leader.school}</div>
                  <div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      leader.risk === "High"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {leader.risk}
                    </span>
                  </div>
                  <div className="font-bold">{leader.score}</div>
                  <div className="font-semibold text-[#0057FF]">{leader.action}</div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-[#0b63ff]/10 bg-[#071a3d] p-6 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#58a6ff]">
                Recommended Intervention
              </p>

              <h2 className="mt-4 text-2xl font-semibold">
                Jane Carter
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-100">
                Priority Campus 01
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="font-bold text-white">Primary Risk</p>
                  <p className="mt-1 text-blue-100">Instructional leadership decline paired with staff retention pressure.</p>
                </div>

                <div>
                  <p className="font-bold text-white">Prescription</p>
                  <p className="mt-1 text-blue-100">Launch a 90-day coaching plan focused on observation cadence, feedback quality, and data-driven follow-through.</p>
                </div>

                <div>
                  <p className="font-bold text-white">Timeline</p>
                  <p className="mt-1 text-blue-100">Immediate action this quarter.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#0b63ff]/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0b63ff]">
                Succession Readiness
              </p>

              <div className="mt-5 space-y-3">
                {succession.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-[#f6f9ff] px-4 py-4">
                    <p className="text-sm font-semibold text-[#34476b]">{label}</p>
                    <p className="text-lg font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
