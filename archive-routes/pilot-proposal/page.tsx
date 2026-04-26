'use client'

export default function PilotProposalPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 print:bg-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white print:bg-white print:text-slate-900 print:border">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300 print:text-blue-700">
            Pilot Proposal
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            LeadSharper 30-Day Leadership Readiness Pilot
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 print:text-slate-700">
            A focused pilot to help districts measure principal readiness, identify coaching priorities, and reduce leadership placement risk.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">Pilot Purpose</h2>
          <p className="mt-4 leading-8 text-slate-700">
            The pilot will provide district leaders with simulation-based evidence of leadership readiness across a defined cohort of aspiring or current school leaders.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Card title="Cohort" text="20–50 aspiring principals, assistant principals, new principals, or leadership fellows." />
          <Card title="Timeline" text="30 days from launch to executive report." />
          <Card title="Output" text="District readiness dashboard, risk radar, and board-ready summary." />
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">Pilot Sequence</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Step week="Week 1" text="Cohort launch and orientation" />
            <Step week="Week 2" text="Simulation completion and feedback" />
            <Step week="Week 3" text="Readiness and risk analysis" />
            <Step week="Week 4" text="Executive report and next steps" />
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-10 print:border">
          <h2 className="text-3xl font-semibold text-slate-900">Decision Criteria</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-700">
            <li>Does LeadSharper create useful readiness data beyond interviews and observations?</li>
            <li>Does the platform identify meaningful coaching priorities?</li>
            <li>Can district leaders use the dashboard to strengthen succession planning?</li>
            <li>Does the pilot create enough value to justify district-wide implementation?</li>
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">Recommended Investment</h2>
          <p className="mt-4 leading-8 text-slate-700">
            Recommended pilot range: <strong>$15K–$25K</strong>, depending on cohort size, implementation support, and reporting needs.
          </p>
        </section>

        <div className="print:hidden flex flex-wrap gap-3">
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
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  )
}

function Step({ week, text }: { week: string; text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="text-sm font-semibold text-blue-700">{week}</div>
      <div className="mt-2 text-slate-700">{text}</div>
    </div>
  )
}
