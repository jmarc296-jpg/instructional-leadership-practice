import Link from "next/link"
import { EnterpriseShell } from "@/components/shell/enterprise-shell"

const competencies = [
  {
    competency: "Instructional Diagnosis",
    score: 84,
    level: "Strong",
    evidence: "Identifies declining achievement as an instructional quality issue, not just a relationship or compliance issue.",
    risk: "Needs to name the specific classroom evidence that will be collected before coaching."
  },
  {
    competency: "Adult Accountability",
    score: 71,
    level: "Developing",
    evidence: "Names the need to address the concern directly with the veteran teacher.",
    risk: "Feedback sequence is not yet tight enough to ensure urgency, clarity, and follow-through."
  },
  {
    competency: "Coaching Strategy",
    score: 78,
    level: "Proficient",
    evidence: "Balances support with clear expectations for improved instructional practice.",
    risk: "Needs a stronger timeline for observation, coaching, and progress monitoring."
  },
  {
    competency: "Student Outcome Focus",
    score: 89,
    level: "Strong",
    evidence: "Anchors the leadership response in declining student achievement and instructional impact.",
    risk: "Could connect the intervention more explicitly to short-cycle student data."
  }
]

const rubricLevels = [
  {
    level: "Level 1",
    label: "Avoids",
    description: "Protects adult comfort, delays action, or treats the issue as a relationship problem only."
  },
  {
    level: "Level 2",
    label: "Names",
    description: "Acknowledges weak instruction but offers broad or low-specificity support."
  },
  {
    level: "Level 3",
    label: "Acts",
    description: "Names the instructional concern, sets expectations, and initiates a coaching cycle."
  },
  {
    level: "Level 4",
    label: "Systematizes",
    description: "Creates evidence-based accountability with clear coaching, monitoring, and student outcome measures."
  }
]

const evidenceTags = [
  "Names instructional concern",
  "Protects student outcomes",
  "Uses coach evidence",
  "Requires direct conversation",
  "Sets monitoring cycle",
  "Maintains relational trust"
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
                  Turn principal judgment into defensible evidence.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                  Score scenario responses against calibrated leadership competencies, surface risk, and generate coaching-ready next steps.
                </p>
              </div>

              <Link
                href="/workspace"
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-white/90"
              >
                Assign follow-up
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="space-y-5">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                    Scenario
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    Veteran teacher with strong relationships and weak instruction
                  </h2>
                </div>

                <span className="rounded-full border border-black/10 bg-[#f7f5f0] px-3 py-1 text-xs font-semibold text-black/60">
                  Principal Readiness Simulation
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-black/60">
                A veteran teacher has strong relationships with students but consistently delivers weak instruction.
                Student achievement is declining, and your instructional coach says this issue has been avoided for months.
                What do you do?
              </p>

              <div className="mt-5 rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">Candidate response summary</p>
                <p className="mt-2 text-sm leading-6 text-black/65">
                  Candidate would meet with the coach, review evidence, observe the teacher, hold a direct feedback conversation,
                  create a coaching plan, and monitor student work and walkthrough evidence over the next several weeks.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em]">Competency scoring</h2>
                  <p className="mt-1 text-sm text-black/55">
                    Each score is tied to observable leadership evidence, not personality fit.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#f7f5f0] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">Composite</p>
                  <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">80.5</p>
                </div>
              </div>

              <div className="space-y-3">
                {competencies.map((item) => (
                  <div key={item.competency} className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">{item.competency}</p>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/55">{item.level}</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-black/60">
                          <span className="font-semibold text-black/75">Evidence: </span>{item.evidence}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-black/60">
                          <span className="font-semibold text-black/75">Risk: </span>{item.risk}
                        </p>
                      </div>

                      <div className="w-full md:w-36">
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-semibold tracking-[-0.04em]">{item.score}</p>
                          <p className="text-xs text-black/40">/100</p>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10">
                          <div className="h-full rounded-full bg-[#111827]" style={{ width: `${item.score}%` }} />
                        </div>
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
                Decision Summary
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                Ready with targeted coaching
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/60">
                The candidate shows strong student-outcome orientation and instructional diagnosis. Before principal placement,
                the district should verify adult accountability moves through one additional evidence cycle.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <DecisionMetric label="Readiness" value="80.5" />
                <DecisionMetric label="Placement risk" value="Moderate" />
                <DecisionMetric label="Coaching need" value="Adult feedback" />
                <DecisionMetric label="Next review" value="30 days" />
              </div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-[-0.02em]">Rubric calibration</h2>
              <p className="mt-1 text-sm text-black/55">
                Evaluators score the quality of judgment, not whether the answer sounds polished.
              </p>

              <div className="mt-5 space-y-3">
                {rubricLevels.map((level) => (
                  <div key={level.level} className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">{level.level}</p>
                      <p className="text-sm font-semibold">{level.label}</p>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-black/60">{level.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-[-0.02em]">Evidence detected</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {evidenceTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/10 bg-[#f7f5f0] px-3 py-2 text-xs font-semibold text-black/60">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </EnterpriseShell>
  )
}

function DecisionMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  )
}
