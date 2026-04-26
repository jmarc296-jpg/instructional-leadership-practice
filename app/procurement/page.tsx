'use client'

export default function ProcurementPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 print:bg-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white print:bg-white print:text-slate-900 print:border">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300 print:text-blue-700">
            Procurement Readiness Packet
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Everything a district needs to evaluate LeadSharper.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 print:text-slate-700">
            A board, cabinet, or purchasing-ready overview of use case, implementation, data privacy, pilot scope, and expected outcomes.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card title="Primary Use Case" text="Leadership readiness measurement for aspiring principals, assistant principals, new principals, and district leadership pipelines." />
          <Card title="Buyer" text="Superintendents, chief talent officers, chief academic officers, principal supervisors, universities, and leadership preparation programs." />
          <Card title="Pilot Scope" text="Recommended 30-day pilot with 20–50 leaders completing simulation reps, readiness checks, and district-level reporting." />
          <Card title="Expected Outcomes" text="Stronger pipeline visibility, clearer coaching priorities, reduced hiring risk, and better succession planning." />
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            Implementation Plan
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Step title="Week 1" text="Launch cohort and orient leaders." />
            <Step title="Week 2" text="Complete readiness simulations." />
            <Step title="Week 3" text="Review risk and growth patterns." />
            <Step title="Week 4" text="Generate district report and next steps." />
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            District Risk Reduction
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-700">
            <li>Identify leaders who avoid difficult conversations before promotion.</li>
            <li>Surface weak instructional feedback patterns before coaching cycles fail.</li>
            <li>Strengthen succession planning before vacancies create urgency.</li>
            <li>Provide cabinet and board-ready reporting on leadership pipeline health.</li>
          </ul>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8 print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            Procurement Notes
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Metric label="Pilot length" value="30 days" />
            <Metric label="Recommended cohort" value="20–50 leaders" />
            <Metric label="Data requirement" value="No student PII required" />
          </div>
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

function Step({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="text-sm font-semibold text-blue-700">{title}</div>
      <div className="mt-2 text-slate-700">{text}</div>
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
