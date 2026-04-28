const metrics = [
  { label: "Leaders Assessed", value: "284", subtext: "+18% this quarter" },
  { label: "Development Plans", value: "142", subtext: "Across 28 schools" },
  { label: "Ready Now", value: "61", subtext: "Promotion-ready" },
  { label: "High Risk", value: "19", subtext: "Needs intervention" }
]

const leaders = [
  {
    name: "Assistant Principal A",
    school: "High School Network",
    gap: "Instructional Feedback",
    status: "Needs Development"
  },
  {
    name: "Dean B",
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
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:block">
          <a href="/" className="block rounded-2xl bg-slate-50 p-4">
            <img src="/logo.png" alt="LeadSharper" className="w-full max-w-[170px]" />
          </a>

          <nav className="mt-8 space-y-1 text-sm font-medium">
            <NavLink href="/" label="Home" />
            <NavLink href="/district" label="Dashboard" active />
            <NavLink href="/assignments" label="Assignments" />
            <NavLink href="/talent-review" label="Talent Review" />
            <NavLink href="/leader-learning-hub" label="Development" />
            <NavLink href="/impact-dashboard" label="Impact Reports" />
            <NavLink href="/recommendations" label="Recommendations" />
          </nav>

          <div className="mt-10 rounded-[22px] bg-slate-950 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Cohort Signal
            </p>
            <p className="mt-4 text-3xl font-semibold">+11%</p>
            <p className="mt-1 text-sm text-slate-300">Readiness growth</p>
          </div>
        </aside>

        <section className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <header className="rounded-[28px] border border-slate-200 bg-white px-7 py-8 sm:px-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                District Command Center
              </p>

              <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                    Leadership pipeline intelligence
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                    Identify readiness gaps, prioritize development, and reduce costly leadership turnover.
                  </p>
                </div>

                <a
                  href="/assignments"
                  className="w-fit rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Assign development
                </a>
              </div>
            </header>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                    {metric.value}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">{metric.subtext}</p>
                </div>
              ))}
            </section>

            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    Leaders requiring attention
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Highest-priority readiness gaps that need follow-up.
                  </p>
                </div>

                <a href="/talent-review" className="text-sm font-semibold text-blue-700">
                  Open talent review &gt;
                </a>
              </div>

              <div className="mt-5 divide-y divide-slate-100">
                {leaders.map((leader) => (
                  <div key={leader.name} className="grid gap-4 py-5 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center">
                    <div>
                      <p className="font-semibold text-slate-950">{leader.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{leader.school}</p>
                    </div>

                    <p className="text-sm text-slate-700">{leader.gap}</p>

                    <p className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {leader.status}
                    </p>

                    <a href="/assignments" className="text-sm font-semibold text-blue-700">
                      Assign support
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

function NavLink({
  href,
  label,
  active = false
}: {
  href: string
  label: string
  active?: boolean
}) {
  return (
    <a
      href={href}
      className={
        active
          ? "block rounded-full bg-blue-700 px-4 py-3 text-white"
          : "block rounded-full px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }
    >
      {label}
    </a>
  )
}
