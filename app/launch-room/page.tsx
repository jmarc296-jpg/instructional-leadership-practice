export default function LaunchRoomPage() {
  const checks = [
    { area: "First Impression", status: "Ready", note: "Homepage clearly positions LeadSharper as leadership readiness infrastructure." },
    { area: "Instant Demo", status: "Ready", note: "User can test the product and receive a readiness evaluation." },
    { area: "Pilot Funnel", status: "Ready", note: "Pilot form captures lead details and sends branded follow-up emails." },
    { area: "District Value", status: "Ready", note: "District and superintendent pages show readiness, risk, and executive value." },
    { area: "Buyer Assets", status: "Ready", note: "Data room, ROI, pricing, procurement, and board materials are available." },
    { area: "Trust Layer", status: "Ready", note: "Security, privacy, and no-student-PII messaging are visible." },
    { area: "Navigation", status: "Needs QA", note: "Confirm every visible button routes correctly before sharing." },
    { area: "Mobile Experience", status: "Needs QA", note: "Test homepage, pilot form, instant demo, and district pages on phone." }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Launch Readiness Command Center
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Final check before LeadSharper goes public.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Use this page to verify that the product is clear, credible, functional, and ready for high-stakes buyer conversations.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Launch checklist
          </h2>

          <div className="mt-6 space-y-4">
            {checks.map((check) => (
              <div key={check.area} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{check.area}</h3>
                  <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    check.status === "Ready"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {check.status}
                  </span>
                </div>

                <p className="mt-3 leading-7 text-slate-700">{check.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Golden rule before sharing
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            If a buyer clicks it, it must work, explain itself, or stay hidden. Anything confusing should be fixed before outreach.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/" className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
              Review homepage
            </a>

            <a href="/instant-demo" className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900">
              Test instant demo
            </a>

            <a href="/pilot" className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900">
              Test pilot funnel
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
