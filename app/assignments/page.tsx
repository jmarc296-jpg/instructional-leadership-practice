import Link from "next/link"
import { EnterpriseShell } from "@/components/shell/enterprise-shell"

const assignments = [
  {
    leader: "Assistant Principal A",
    school: "East High School",
    gap: "Instructional Feedback",
    module: "Coaching Difficult Conversations",
    due: "May 10",
    status: "In Progress",
    action: "Continue module"
  },
  {
    leader: "Dean B",
    school: "Lincoln Middle School",
    gap: "Culture Leadership",
    module: "School Culture Reset",
    due: "May 17",
    status: "Not Started",
    action: "Start module"
  },
  {
    leader: "Principal C",
    school: "Washington Elementary",
    gap: "Operational Execution",
    module: "Systems Execution Sprint",
    due: "May 24",
    status: "Completed",
    action: "View evidence"
  }
]

export default function AssignmentsPage() {
  return (
    <EnterpriseShell>
      <main className="min-h-screen bg-[#f7f5f0]">
        <section className="border-b border-black/10 bg-[#111827] text-white">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              Assignments
            </p>
            <div className="mt-3 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
                  Assign the next leadership move.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                  Review assigned modules, due dates, status, and the next action tied to each leadership gap.
                </p>
              </div>

              <Link
                href="/workspace"
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-white/90"
              >
                Open workspace
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Metric label="Active Assignments" value="142" />
            <Metric label="Overdue" value="9" />
            <Metric label="Completion Rate" value="81%" />
          </div>

          <section className="mt-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em]">Assignment queue</h2>
                <p className="mt-1 text-sm text-black/55">
                  District view of leadership practice, evidence status, and next required action.
                </p>
              </div>

              <Link
                href="/recommendations"
                className="rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
              >
                View recommendations
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/10">
              <div className="grid grid-cols-[1.3fr_1fr_1.2fr_0.7fr_0.8fr_0.9fr] bg-[#f7f5f0] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                <div>Leader</div>
                <div>Gap</div>
                <div>Module</div>
                <div>Due</div>
                <div>Status</div>
                <div className="text-right">Action</div>
              </div>

              {assignments.map((assignment) => (
                <div
                  key={assignment.leader}
                  className="grid grid-cols-[1.3fr_1fr_1.2fr_0.7fr_0.8fr_0.9fr] items-center border-t border-black/10 px-5 py-5"
                >
                  <div>
                    <p className="font-semibold">{assignment.leader}</p>
                    <p className="mt-1 text-sm text-black/55">{assignment.school}</p>
                  </div>

                  <p className="text-sm font-medium">{assignment.gap}</p>

                  <p className="text-sm font-medium">{assignment.module}</p>

                  <p className="text-sm font-medium">{assignment.due}</p>

                  <div>
                    <span className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-[#111827]">
                      {assignment.status}
                    </span>
                  </div>

                  <div className="text-right">
                    <Link
                      href="/workspace"
                      className="text-sm font-semibold text-[#1d4ed8] underline-offset-4 hover:underline"
                    >
                      {assignment.action}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </EnterpriseShell>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-sm text-black/55">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
    </div>
  )
}
