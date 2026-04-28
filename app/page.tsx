import Image from 'next/image'
import { TopNav } from '@/components/home/top-nav'

const workflow = [
  {
    step: '1',
    title: 'Simulate',
    text: 'Leaders respond to real school leadership scenarios before the stakes are live.'
  },
  {
    step: '2',
    title: 'Diagnose',
    text: 'LeadSharper surfaces readiness gaps, risk signals, and coaching priorities.'
  },
  {
    step: '3',
    title: 'Assign',
    text: 'District teams assign targeted development based on the leader response.'
  },
  {
    step: '4',
    title: 'Track',
    text: 'Dashboards show completion, growth, and leadership pipeline movement.'
  },
  {
    step: '5',
    title: 'Decide',
    text: 'Talent teams use readiness evidence to support promotion and succession decisions.'
  }
]

const useCases = [
  'Aspiring principal cohorts',
  'New principal onboarding',
  'Leadership academies',
  'Succession planning',
  'Principal supervisor coaching',
  'Leadership retention strategy'
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <TopNav />

        <section className="rounded-[36px] bg-white px-4 py-6 sm:p-8 border border-slate-200">
          <div className="flex flex-col gap-4 py-6 sm:p-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                LeadSharper
              </p>

              <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-slate-950">
                Measure principal readiness before the job is on the line.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
                LeadSharper helps districts assess leadership readiness through real-world simulations,
                identify development gaps, and make stronger promotion decisions.
              </p>

              <p className="mt-4 text-sm font-medium text-slate-500">
                Built from real district leadership coaching, DDI systems, APT facilitation,
                and principal pipeline development.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/instant-demo"
                  className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Test LeadSharper in 90 seconds
                </a>

                <a
                  href="/district"
                  className="rounded-2xl border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  View district intelligence
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="LeadSharper"
                width={560}
                height={360}
                priority
                className="h-auto w-full max-w-[560px] object-contain"
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
            text="See readiness, risk, coaching needs, and succession signals across your leadership pipeline."
            href="/district"
            cta="View district intelligence"
          />

          <Card
            title="For District Pilot Programs"
            text="Launch readiness pilots for aspiring and new principals."
            href="/pilot"
            cta="Explore pilot"
          />
        </section>

        <section className="rounded-[32px] bg-slate-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Why this matters
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl sm:text-4xl font-semibold tracking-tight">
            Districts do not just need more leadership training. They need better evidence of readiness.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Interviews, resumes, and reputation are not enough. LeadSharper creates observable leadership performance data before promotion, placement, or coaching decisions become high stakes.
          </p>
        </section>

        <section className="rounded-[32px] bg-white border border-slate-200 px-4 py-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Closed-loop readiness system
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900">
              From leadership simulation to promotion decision.
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              LeadSharper connects assessment, development, tracking, and talent review into one practical workflow for district leadership teams.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {workflow.map((item) => (
              <WorkflowStep
                key={item.step}
                step={item.step}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[32px] bg-white border border-slate-200 px-4 py-6 sm:p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Built for district leadership decisions
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {useCases.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] bg-blue-50 px-4 py-6 sm:p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Ready to evaluate a pilot?
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-slate-700">
            Start with a small leadership cohort and determine whether LeadSharper can strengthen your district pipeline.
          </p>

          <a
            href="/pilot"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Schedule a Pilot Conversation
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
    <a
      href={href}
      className="rounded-3xl bg-white p-7 border border-slate-200 transition hover:border-slate-300"
    >
      <h3 className="text-2xl font-semibold text-slate-950">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>

      <div className="mt-5 text-sm font-semibold text-blue-700">
        {cta}
      </div>
    </a>
  )
}

function WorkflowStep({
  step,
  title,
  text
}: {
  step: string
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {step}
      </div>

      <h3 className="mt-4 font-semibold text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  )
}
