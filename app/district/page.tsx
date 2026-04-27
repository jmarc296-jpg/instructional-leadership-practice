import Image from "next/image"

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
    gap: "Coaching",
    risk: "Medium Risk",
    nextStep: "Assign coaching module"
  },
  {
    name: "Principal #2",
    school: "Middle School B",
    gap: "Instructional Feedback",
    risk: "High Risk",
    nextStep: "Assign learning path"
  },
  {
    name: "Principal #3",
    school: "Elementary School C",
    gap: "Operations",
    risk: "Low Risk",
    nextStep: "Provide resources"
  }
]

export default function DistrictPage() {
  return (
    <main className="min-h-screen bg-slate-100 lg:flex">

      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white p-6">
        <div className="mb-10">
          <Image
            src="/logo.png"
            alt="LeadSharper"
            width={240}
            height={90}
            className="w-[180px] h-auto object-contain bg-transparent"
          />
        </div>

        <div className="space-y-5 text-slate-300">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold">Dashboard</div>
          <div>Assignments</div>
          <div>Leaders</div>
          <div>Development</div>
          <div>Reports</div>
          <div>Recommendations</div>
        </div>

        <div className="mt-16 bg-slate-900 rounded-2xl p-5">
          <p className="text-sm text-slate-400">District Impact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mt-3">
            +11%
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Readiness growth
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <section className="bg-gradient-to-r from-slate-950 to-blue-900 text-white px-10 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            District Leadership Dashboard
          </h1>

          <p className="text-slate-300 text-lg">
            Identify leadership gaps. Assign development. Strengthen your pipeline.
          </p>
        </section>

        <div className="px-4 py-6 sm:p-8">

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-slate-100"
              >
                <p className="text-sm text-slate-500">
                  {metric.label}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {metric.value}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  {metric.subtext}
                </p>
              </div>
            ))}
          </section>

          <section className="bg-white rounded-2xl shadow-sm px-4 py-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Leaders Requiring Attention
              </h2>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                Assign Development
              </button>
            </div>

            <div className="space-y-4">
              {leaders.map((leader) => (
                <div
                  key={leader.name}
                  className="border border-slate-100 rounded-xl px-6 py-4 grid grid-cols-4 items-center gap-6 hover:bg-slate-50 transition"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {leader.name}
                    </h3>
                    <p className="text-slate-500">
                      {leader.school}
                    </p>
                  </div>

                  <div className="font-medium text-slate-800">
                    {leader.gap}
                  </div>

                  <div className={
                    leader.risk === "High Risk"
                      ? "bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
                      : leader.risk === "Medium Risk"
                      ? "bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
                      : "bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                  }>
                    {leader.risk}
                  </div>

                  <div className="text-blue-600 font-medium text-right">
                    {leader.nextStep}
                  </div>
                </div>
              ))}
            </div>
          </section>

<section className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
  <h3 className="text-xl font-bold text-slate-900 mb-2">
    District Insight
  </h3>

  <p className="text-slate-600">
    Coaching and instructional feedback represent 68% of current leadership gaps.
    Addressing these two competencies first will likely produce the fastest district-wide readiness gains.
  </p>
</section>

</div>
</div>
</main>
  )
}







