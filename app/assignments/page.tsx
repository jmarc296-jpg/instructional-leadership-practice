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
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-6 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <a href="/district" className="inline-block rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold">
          Back to dashboard
        </a>

        <section className="rounded-[28px] border border-slate-200 bg-white px-7 py-8 sm:px-9">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Development Assignments
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Assign the next leadership move.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Demo users can review assigned modules, due dates, status, and the next action tied to each leadership gap.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Metric label="Active Assignments" value="142" />
          <Metric label="Overdue" value="9" />
          <Metric label="Completion Rate" value="81%" />
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Live demo assignments</h2>
              <p className="mt-2 text-sm text-slate-600">
                Click any action to move into the learning or evidence workflow.
              </p>
            </div>

            <a href="/recommendations" className="w-fit rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white">
              View recommendations
            </a>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-slate-200">
            {assignments.map((item) => (
              <div key={item.leader} className="grid gap-4 border-b border-slate-100 bg-white p-5 last:border-b-0 lg:grid-cols-[1.2fr_1fr_1fr_0.7fr_0.8fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold">{item.leader}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.school}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Gap</p>
                  <p className="mt-1 text-sm font-medium">{item.gap}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Module</p>
                  <p className="mt-1 text-sm font-medium">{item.module}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Due</p>
                  <p className="mt-1 text-sm font-medium">{item.due}</p>
                </div>

                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {item.status}
                </span>

                <a href="/leader-learning-hub" className="text-sm font-semibold text-blue-700">
                  {item.action}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  )
}
