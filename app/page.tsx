import Image from 'next/image'
import { TopNav } from '@/components/home/top-nav'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <TopNav />

        <section className="rounded-[36px] bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                LeadSharper
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
                Measure principal readiness before the job is on the line.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
                LeadSharper helps districts and leadership programs turn real school leadership decisions into readiness data, coaching priorities, and succession intelligence.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/instant-demo" className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  Test LeadSharper in 90 seconds
                </a>

                <a href="/district" className="rounded-2xl border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  View district view
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-8">
              <Image
                src="/logo.png"
                alt="LeadSharper"
                width={320}
                height={320}
                priority
                className="h-auto w-full max-w-[320px]"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Card
            title="For School Leaders"
            text="Practice high-stakes leadership moments and receive immediate readiness feedback."
            href="/instant-demo"
            cta="Start simulation"
          />

          <Card
            title="For District Teams"
            text="See readiness, risk, coaching needs, and succession signals across the leadership pipeline."
            href="/district"
            cta="View district view"
          />

          <Card
            title="For Growth Planning"
            text="Turn simulation results into a recurring 30-day leadership development plan."
            href="/growth-plan"
            cta="View growth engine"
          />
        </section>

        <section className="rounded-[32px] bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Why this matters
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight">
            Districts do not just need more leadership training. They need better evidence of readiness.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Interviews, resumes, and reputation are not enough. LeadSharper creates observable leadership performance data before promotion, placement, or coaching decisions become high stakes.
          </p>
        </section>

        <section className="rounded-[32px] bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Ready to evaluate a pilot?
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            Start with a small leadership cohort, generate readiness signals, and determine whether LeadSharper can strengthen your district or program pipeline.
          </p>

          <a href="/pilot" className="mt-6 inline-block rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white hover:bg-blue-700">
            Apply for pilot access
          </a>
        </section>
      </div>
    </main>
  )
}

function Card({
  title,
  text,
  href,
  cta
}: {
  title: string
  text: string
  href: string
  cta: string
}) {
  return (
    <a href={href} className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
      <div className="mt-5 text-sm font-semibold text-blue-700">{cta} ?</div>
    </a>
  )
}
