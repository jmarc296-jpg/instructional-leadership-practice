const metrics = [
  {
    label: "Leaders Assessed",
    value: "284",
    subtext: "+18% this quarter"
  },
  {
    label: "Active Development Plans",
    value: "142",
    subtext: "Across 28 schools"
  },
  {
    label: "Ready Now Leaders",
    value: "61",
    subtext: "Promotion-ready"
  },
  {
    label: "High Risk Leaders",
    value: "19",
    subtext: "Immediate intervention needed"
  }
]

const leaders = [
  {
    name: "Principal Candidate A",
    school: "High School Network",
    gap: "Instructional Feedback",
    status: "Needs Development"
  },
  {
    name: "Assistant Principal B",
    school: "Middle School Network",
    gap: "Culture Leadership",
    status: "High Risk"
  },
  {
    name: "Principal C",
    school: "Elementary Network",
    gap: "Operational Execution",
    status: "Ready Soon"
  }
]

export default function DistrictPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex">

      <aside className="w-72 bg-slate-950 text-white min-h-screen p-6">
        <a href="/" className="block mb-10">
          <img
            src="/logo.png"
            alt="LeadSharper"
            className="w-full max-w-[180px]"
          />
        </a>

        <div className="space-y-3">
          <a href="/" className="block px-4 py-3 rounded-xl hover:bg-slate-800">
            Home
          </a>

          <a href="/district" className="block px-4 py-3 rounded-xl bg-blue-600">
            Dashboard
          </a>

          <a href="/assignments" className="block px-4 py-3 rounded-xl hover:bg-slate-800">
            Assignments
          </a>

          <a href="/talent-review" className="block px-4 py-3 rounded-xl hover:bg-slate-800">
            Talent Review
          </a>

          <a href="/leader-learning-hub" className="block px-4 py-3 rounded-xl hover:bg-slate-800">
            Development
          </a>

          <a href="/impact-dashboard" className="block px-4 py-3 rounded-xl hover:bg-slate-800">
            Impact Reports
          </a>
        </div>
      </aside>

      <section className="flex-1 p-10">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            District Command Center
          </p>

          <h1 className="mt-3 text-5xl font-semibold text-slate-900 tracking-tight">
            Leadership Pipeline Intelligence
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-8">
            Identify readiness gaps, assign development, and reduce costly leadership turnover.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl bg-white p-6 border border-slate-200"
            >
              <p className="text-sm text-slate-500">
                {metric.label}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {metric.value}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                Leaders Requiring Attention
              </h2>

              <p className="mt-2 text-slate-500">
                Highest-risk leadership gaps requiring intervention
              </p>
            </div>

            <a
              href="/assignments"
              className="rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold"
            >
              Assign Development
            </a>
          </div>

          <div className="space-y-4">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="grid grid-cols-4 items-center rounded-2xl border border-slate-200 p-5"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {leader.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {leader.school}
                  </p>
                </div>

                <div className="text-slate-700">
                  {leader.gap}
                </div>

                <div className="text-slate-700">
                  {leader.status}
                </div>

                <a
                  href="/assignments"
                  className="text-blue-600 font-semibold"
                >
                  Assign Support
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
