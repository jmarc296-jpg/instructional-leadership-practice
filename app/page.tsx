import Image from "next/image"
import { TopNav } from "@/components/home/top-nav"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-12">

        <TopNav />

        {/* HERO */}
        <section className="rounded-[32px] bg-white border border-slate-200 px-6 py-10 lg:px-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                LeadSharper
              </p>

              <h1 className="mt-5 text-4xl lg:text-6xl font-semibold tracking-tight text-slate-950 leading-tight">
                Measure principal readiness before bad hires become expensive.
              </h1>

              <p className="mt-5 text-lg text-slate-600 leading-8 max-w-xl">
                LeadSharper helps districts assess leadership judgment through simulations, identify development gaps, and build stronger principal pipelines.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/instant-demo"
                  className="rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700"
                >
                  Try Simulation
                </a>

                <a
                  href="/district"
                  className="rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  View District Dashboard
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="LeadSharper"
                width={520}
                height={340}
                priority
                className="w-full max-w-[500px] h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* BUYER PATHS */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card
            title="For School Leaders"
            text="Practice real leadership scenarios and receive immediate feedback."
            href="/instant-demo"
            cta="Start Simulation >"
          />

          <Card
            title="For District Teams"
            text="Track readiness, identify risks, and strengthen succession planning."
            href="/district"
            cta="View Dashboard >"
          />

          <Card
            title="Pilot Programs"
            text="Launch a pilot cohort and evaluate leadership readiness at scale."
            href="/pilot"
            cta="Launch Pilot >"
          />
        </section>

        {/* WHY IT MATTERS */}
        <section className="rounded-[32px] bg-slate-900 text-white px-8 py-10">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300 font-semibold">
            Why districts buy
          </p>

          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold leading-tight max-w-4xl">
            Interviews and resumes do not predict leadership performance.
          </h2>

          <p className="mt-5 text-lg text-slate-300 leading-8 max-w-2xl">
            LeadSharper creates real performance signals before promotions, placements, and coaching decisions become costly mistakes.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-[32px] bg-blue-50 px-8 py-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900">
            Ready to evaluate a pilot?
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-8">
            Start with a small cohort. Measure readiness. Make stronger leadership decisions.
          </p>

          <a
            href="/pilot"
            className="inline-block mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700"
          >
            Apply for Pilot
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
      className="rounded-3xl bg-white border border-slate-200 p-7 hover:border-slate-300 transition"
    >
      <h3 className="text-2xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-slate-600 leading-7">
        {text}
      </p>

      <div className="mt-5 text-blue-600 font-semibold">
        {cta}
      </div>
    </a>
  )
}
