'use client'

export default function OnePagerPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 print:bg-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-3xl bg-slate-900 p-10 text-white print:bg-white print:text-slate-900 print:border">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300 print:text-blue-700">
            Executive One-Pager
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            LeadSharper: Leadership Readiness Infrastructure
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 print:text-slate-700">
            LeadSharper helps districts, charter networks, and university leadership programs measure principal readiness before leadership decisions become high stakes.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Card title="The Problem" text="Districts often promote or hire principals using interviews, references, and incomplete readiness signals." />
          <Card title="The Solution" text="LeadSharper uses realistic simulations, AI feedback, and behavioral intelligence to identify readiness, risk, and coaching priorities." />
          <Card title="The Outcome" text="Stronger principal pipelines, fewer failed placements, better coaching alignment, and clearer board-level reporting." />
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            Platform Layers
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Bullet text="Simulation-based leadership practice" />
            <Bullet text="Leadership Readiness Index" />
            <Bullet text="District risk dashboard" />
            <Bullet text="Succession and talent pipeline intelligence" />
            <Bullet text="Hiring decision support" />
            <Bullet text="Board-ready reporting and ROI tools" />
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8 print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            Pilot Model
          </h2>

          <p className="mt-4 text-slate-700 leading-7">
            Recommended pilot: 20–50 aspiring or current school leaders over 30 days. Leaders complete simulation reps, receive feedback, and generate district-level readiness insights.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Metric label="Pilot length" value="30 days" />
            <Metric label="Recommended cohort" value="20–50" />
            <Metric label="Ideal buyer" value="District / University" />
          </div>
        </section>

        <div className="print:hidden flex gap-3">
          <a href="/pilot" className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
            Apply for pilot
          </a>

          <button
            onClick={() => window.print()}
            className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </main>
  )
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm print:shadow-none print:border">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600 leading-7">{text}</p>
    </div>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
      {text}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-blue-700">{value}</div>
    </div>
  )
}
