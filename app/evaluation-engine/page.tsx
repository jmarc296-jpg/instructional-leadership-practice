import Link from "next/link"
import { EnterpriseShell } from "@/components/shell/enterprise-shell"

const competencies = [
  {
    competency: "Instructional Leadership",
    score: "84",
    benchmark: "Top quartile",
    feedback: "Strong instructional diagnosis. Identified root cause quickly."
  },
  {
    competency: "People Management",
    score: "71",
    benchmark: "Developing",
    feedback: "Needed greater specificity in feedback conversation sequencing."
  },
  {
    competency: "Operational Judgment",
    score: "89",
    benchmark: "Top quartile",
    feedback: "Strong prioritization and systems thinking."
  },
  {
    competency: "Culture Leadership",
    score: "68",
    benchmark: "Emerging",
    feedback: "Response lacked urgency around staff trust repair."
  }
]

const timeline = [
  "Simulation completed",
  "Response transcribed",
  "Rubric scored",
  "Benchmark comparison completed",
  "Promotion recommendation generated"
]

export default function EvaluationEnginePage() {
  return (
    <EnterpriseShell>
      <main className="min-h-screen bg-[#f7f5f0]">
        <section className="border-b border-black/10 bg-[#111827] text-white">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              Evaluation Engine
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
                  Score leadership judgment with actual evidence.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                  Move beyond interviews and subjective principal selection processes.
                </p>
              </div>

              <Link
                href="/workspace"
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#111827]"
              >
                Assign follow-up coaching
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          
          <div className="space-y-5">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                Simulation Prompt
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                Veteran teacher delivering weak instruction
              </h2>

              <p className="mt-4 text-sm leading-7 text-black/60">
                A veteran teacher has strong relationships with students but student achievement is declining. 
                Your instructional coach says weak instruction has gone unaddressed for months. 
                What do you do?
              </p>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                Candidate Response Analysis
              </p>

              <div className="mt-5 space-y-4">
                {competencies.map((item) => (
                  <div key={item.competency} className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{item.competency}</p>
                        <p className="mt-1 text-sm text-black/55">{item.feedback}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-semibold">{item.score}</p>
                        <p className="text-xs text-black/45">{item.benchmark}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                Promotion Recommendation
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                Ready in 6 months
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/60">
                Candidate demonstrates strong operational leadership and instructional diagnosis.
                Additional coaching required in people management and culture repair before principal placement.
              </p>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                Evaluation Workflow
              </p>

              <div className="mt-5 space-y-3">
                {timeline.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </EnterpriseShell>
  )
}
