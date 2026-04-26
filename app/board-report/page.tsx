'use client'

export default function BoardReportPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-3xl bg-white p-10 shadow-sm print:shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Board-Ready Report
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
            Leadership Pipeline Readiness Brief
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            A superintendent-ready summary of principal readiness, succession risk, and leadership development priorities.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm print:shadow-none">
          <h2 className="text-3xl font-semibold text-slate-900">
            Executive Summary
          </h2>

          <p className="mt-5 leading-8 text-slate-700">
            The district’s leadership pipeline requires stronger visibility into principal readiness, coaching needs, and succession risk. LeadSharper provides simulation-based leadership intelligence to help identify future principal talent, reduce failed placements, and align coaching support before high-stakes leadership decisions are made.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Metric label="Principal-ready candidates" value="18" />
          <Metric label="Leaders needing coaching" value="42" />
          <Metric label="High-risk promotions" value="9" />
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm print:shadow-none">
          <h2 className="text-3xl font-semibold text-slate-900">
            Recommended Board Talking Points
          </h2>

          <ul className="mt-5 list-disc space-y-4 pl-6 text-slate-700">
            <li>Principal readiness can be measured before leaders enter high-stakes school roles.</li>
            <li>Simulation-based leadership data provides a stronger signal than interviews alone.</li>
            <li>District coaching investments can be aligned to recurring leadership risk patterns.</li>
            <li>Succession planning becomes more proactive when readiness, risk, and growth trends are visible.</li>
          </ul>
        </section>

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <h2 className="text-3xl font-semibold">
            Recommended Next Step
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            Launch a limited leadership readiness pilot with assistant principals, new principals, or aspiring leaders to establish baseline readiness data and inform district coaching priorities.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <a
              href="/pilot"
              className="inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Apply for pilot access
            </a>

            <button
              onClick={() => window.print()}
              className="inline-block rounded-2xl border border-slate-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Print / Save as PDF
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-4xl font-semibold text-blue-700">{value}</div>
    </div>
  )
}

