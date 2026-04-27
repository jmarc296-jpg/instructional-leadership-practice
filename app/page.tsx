const metrics = [
  {
    label: "Active Assignments",
    value: "142",
    subtext: "Across 28 leaders"
  },
  {
    label: "Completion Rate",
    value: "81%",
    subtext: "+6% vs last 90 days"
  },
  {
    label: "Top Development Gap",
    value: "Instructional Feedback",
    subtext: "Most common gap"
  },
  {
    label: "Readiness Growth",
    value: "+11%",
    subtext: "vs last 90 days"
  }
]

const leaders = [
  {
    name: "Principal #1",
    school: "High School A",
    focus: "Coaching",
    risk: "Medium Risk",
    action: "Assign coaching module"
  },
  {
    name: "Principal #2",
    school: "Middle School B",
    focus: "Instructional Feedback",
    risk: "High Risk",
    action: "Assign learning path"
  },
  {
    name: "Principal #3",
    school: "Elementary School C",
    focus: "Operations",
    risk: "Low Risk",
    action: "Provide resources"
  }
]

export default function DistrictPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white min-h-screen p-6">
        <div className="mb-10">
          <img
            src="/logo.png"
            alt="LeadSharper"
            className="w-full max-w-[180px]"
          />
        </div>

        <div className="space-y-4">
          <a href="/district" className="block rounded-xl bg-blue-600 px-4 py-3 font-medium">
            Dashboard
          </a>

          <a href="/assignments" className="block px-4 py-2 hover:text-blue-300">
            Assignments
          </a>

          <a href="/talent-review" className="block px-4 py-2 hover:text-blue-300">
            Leaders
          </a>

          <a href="/leader-learning-hub" className="block px-4 py-2 hover:text-blue-300">
            Development
          </a>

          <a href="/impact-dashboard" className="block px-4 py-2 hover:text-blue-300">
            Reports
          </a>

          <a href="/recommendations" className="block px-4 py-2 hover:text-blue-300">
            Recommendations
          </a>
        </div>

        <div className="mt-12 rounded-2xl bg-slate-900 p-5">
          <p className="text-sm text-slate-400">District Impact</p>
          <p className="mt-2 text-4xl font-bold text-blue-400">+11%</p>
          <p className="text-sm text-slate-400">Readiness growth</p>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            District Leadership Dashboard
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Identify leadership gaps. Assign development. Strengthen your pipeline.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {metric.value}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{metric.subtext}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Leaders Requiring Attention
            </h2>

            <a
              href="/assignments"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium"
            >
              Assign Development
            </a>
          </div>

          <div className="space-y-5">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="grid grid-cols-4 items-center rounded-xl border border-slate-200 p-5"
              >
                <div>
                  <p className="font-bold text-slate-900">{leader.name}</p>
                  <p className="text-sm text-slate-500">{leader.school}</p>
                </div>

                <div>{leader.focus}</div>

                <div>{leader.risk}</div>

                <div className="text-blue-600 font-medium">
                  {leader.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}