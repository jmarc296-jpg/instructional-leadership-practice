const metrics = [
  { label: "Readiness Growth", value: "+11%", subtext: "Across active cohort" },
  { label: "Plans Completed", value: "87", subtext: "Targeted development plans" },
  { label: "Risk Reduction", value: "-24%", subtext: "High-risk leader movement" },
  { label: "Ready Now Movement", value: "+14", subtext: "Leaders moved to ready now" }
]

const outcomes = [
  "14 leaders moved from needs-development to ready-now",
  "9 high-risk leaders completed targeted support plans",
  "81% assignment completion across active cohort",
  "Instructional feedback gap reduced by 18%"
]

export default function ImpactDashboardPage() {
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
            Impact Dashboard
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            Prove leadership growth after targeted development.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Track readiness movement, development completion, and district-level return on leadership investment.
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white border border-slate-200 p-6">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">{metric.value}</h2>
              <p className="mt-2 text-sm text-slate-400">{metric.subtext}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] bg-white border border-slate-200 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Cohort Outcomes
          </h2>

          <div className="mt-6 space-y-4">
            {outcomes.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-5 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] bg-slate-900 text-white px-8 py-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            Executive Signal
          </h2>

          <p className="mt-5 text-lg text-slate-300 max-w-3xl leading-8">
            The district is showing measurable readiness growth, but operational leadership remains the highest-leverage development priority for the next cycle.
          </p>

          <a
            href="/procurement"
            className="inline-block mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold"
          >
            View Procurement Overview
          </a>
        </section>

      </div>
    </main>
  )
}

