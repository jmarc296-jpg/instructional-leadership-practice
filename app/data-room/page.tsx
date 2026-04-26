export default function DataRoomPage() {
  const assets = [
    { title: "Executive One-Pager", href: "/one-pager", description: "Forwardable overview for cabinet, board, and internal champions." },
    { title: "Procurement Packet", href: "/procurement", description: "Implementation, pilot scope, privacy, and purchasing-readiness details." },
    { title: "ROI Calculator", href: "/roi", description: "Estimate principal turnover exposure and avoided cost." },
    { title: "Board Report", href: "/board-report", description: "Printable leadership pipeline readiness brief." },
    { title: "District Demo", href: "/district", description: "Pipeline readiness, risk, strengths, and estimated financial impact." },
    { title: "Security Center", href: "/security", description: "Privacy, access control, and district data ownership overview." },
    { title: "Guided Demo", href: "/demo", description: "Step-by-step walkthrough of the LeadSharper platform." },
    { title: "Pilot Application", href: "/pilot", description: "Apply for a limited district or university pilot partnership." }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Buyer Data Room
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Everything needed to evaluate LeadSharper.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A clean evaluation hub for district leaders, university partners, procurement teams, and internal champions.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {assets.map((asset) => (
            <a
              key={asset.title}
              href={asset.href}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {asset.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {asset.description}
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                Open asset →
              </div>
            </a>
          ))}
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Recommended evaluation path
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Step label="1" title="Review one-pager" />
            <Step label="2" title="Open district demo" />
            <Step label="3" title="Calculate ROI" />
            <Step label="4" title="Apply for pilot" />
          </div>
        </section>
      </div>
    </main>
  )
}

function Step({ label, title }: { label: string; title: string }) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
        {label}
      </div>
      <div className="mt-4 font-semibold text-slate-900">{title}</div>
    </div>
  )
}
