const metrics = [
  {
    label: "Ready Now Leaders",
    value: "61",
    subtext: "Promotion-ready immediately"
  },
  {
    label: "Ready Soon Leaders",
    value: "94",
    subtext: "6-12 months development needed"
  },
  {
    label: "High Risk Leaders",
    value: "19",
    subtext: "Not ready for promotion"
  }
]

const leaders = [
  {
    name: "Assistant Principal A",
    currentRole: "Assistant Principal",
    readiness: "Ready Now",
    risk: "Low Risk"
  },
  {
    name: "Dean B",
    currentRole: "Dean of Students",
    readiness: "Ready Soon",
    risk: "Medium Risk"
  },
  {
    name: "Principal C",
    currentRole: "Current Principal",
    readiness: "Needs Development",
    risk: "High Risk"
  }
]

export default function TalentReviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/executive-command-center"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Dashboard
        </a>

        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Talent Review
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            Succession planning with real readiness data.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Identify promotable leaders, reduce failed placements, and build stronger internal pipelines.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl bg-white border border-slate-200 p-7"
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
        </section>

        <section className="rounded-[32px] bg-white border border-slate-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Promotion Readiness Matrix
            </h2>

            <p className="mt-3 text-slate-600">
              Leaders currently under review for future placement decisions.
            </p>
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
                    {leader.currentRole}
                  </p>
                </div>

                <div>{leader.readiness}</div>

                <div>{leader.risk}</div>

                <a
                  href="/promotion-readiness/1"
                  className="text-blue-600 font-semibold"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

