export default function DemoScriptPage() {
  const moments = [
    {
      title: "The Problem",
      line: "Districts often know who is available for leadership roles, but not who is truly ready."
    },
    {
      title: "The Product Shift",
      line: "LeadSharper turns leadership judgment into observable simulation data."
    },
    {
      title: "The Individual Value",
      line: "Leaders get immediate feedback on how they communicate, coach, act, and follow through."
    },
    {
      title: "The District Value",
      line: "District teams see readiness, risk, coaching priorities, and succession strength across the pipeline."
    },
    {
      title: "The Business Case",
      line: "The platform reduces failed placements, strengthens internal pipelines, and gives boards clearer visibility."
    },
    {
      title: "The Ask",
      line: "The best next step is a 30-day pilot with a defined leadership cohort."
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Founder Demo Script
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            A clean talk track for selling LeadSharper.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Use this page to guide a live demo with a superintendent, talent leader, university partner, or internal champion.
          </p>
        </section>

        <section className="space-y-4">
          {moments.map((moment, index) => (
            <div key={moment.title} className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-sm font-semibold text-blue-700">
                Step {index + 1}
              </div>

              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {moment.title}
              </h2>

              <p className="mt-3 text-lg leading-8 text-slate-700">
                “{moment.line}”
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Recommended demo path
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <LinkCard title="Instant Demo" href="/instant-demo" />
            <LinkCard title="District Dashboard" href="/district" />
            <LinkCard title="Pilot Proposal" href="/pilot-proposal" />
          </div>
        </section>
      </div>
    </main>
  )
}

function LinkCard({ title, href }: { title: string; href: string }) {
  return (
    <a href={href} className="rounded-2xl bg-white p-5 font-semibold text-blue-700">
      {title} →
    </a>
  )
}
