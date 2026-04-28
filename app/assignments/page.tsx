const assignments = [
  {
    leader: "Assistant Principal A",
    school: "East High School",
    gap: "Instructional Feedback",
    module: "Coaching Difficult Conversations",
    status: "In Progress"
  },
  {
    leader: "Principal B",
    school: "Lincoln Middle School",
    gap: "Operational Leadership",
    module: "Systems Execution",
    status: "Assigned"
  },
  {
    leader: "Dean C",
    school: "Washington Elementary",
    gap: "Culture Leadership",
    module: "School Culture Reset",
    status: "Completed"
  }
]

export default function AssignmentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/district"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Dashboard
        </a>

        {/* HERO */}
        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Development Assignments
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            Turn leadership gaps into action.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Assign targeted development based on simulation results, readiness reviews, and district talent priorities.
          </p>
        </section>

        {/* METRICS */}
        <section className="grid md:grid-cols-3 gap-6">
          <MetricCard
            label="Active Assignments"
            value="142"
          />

          <MetricCard
            label="Completion Rate"
            value="81%"
          />

          <MetricCard
            label="Avg Growth"
            value="+11%"
          />
        </section>

        {/* ASSIGNMENT TABLE */}
        <section className="rounded-[32px] bg-white border border-slate-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                Current Development Plans
              </h2>

              <p className="mt-2 text-slate-600">
                Track leadership development execution across your district.
              </p>
            </div>

            <a
              href="/leader-learning-hub"
              className="rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold"
            >
              View Learning Hub
            </a>
          </div>

          <div className="space-y-4">
            {assignments.map((item) => (
              <div
                key={item.leader}
                className="grid grid-cols-5 items-center rounded-2xl border border-slate-200 p-5"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {item.leader}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.school}
                  </p>
                </div>

                <div>{item.gap}</div>

                <div>{item.module}</div>

                <div>{item.status}</div>

                <a
                  href="/leader-learning-hub"
                  className="text-blue-600 font-semibold"
                >
                  Manage
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function MetricCard({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-7">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  )
}
