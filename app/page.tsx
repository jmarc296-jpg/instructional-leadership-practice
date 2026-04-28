import Image from "next/image"
import { TopNav } from "@/components/home/top-nav"

const paths = [
  {
    title: "School Leaders",
    text: "Practice difficult leadership moments and receive readiness feedback.",
    href: "/instant-demo",
    cta: "Start simulation"
  },
  {
    title: "District Teams",
    text: "See readiness patterns, risk signals, and development priorities.",
    href: "/district",
    cta: "View dashboard"
  },
  {
    title: "Pilot Cohorts",
    text: "Evaluate readiness across aspiring and current school leaders.",
    href: "/pilot",
    cta: "Explore pilot"
  }
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-6 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TopNav />

        <section className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white">
          <div className="grid gap-10 px-7 py-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                LeadSharper
              </p>

              <h1 className="mt-5 max-w-3xl text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-[4.25rem]">
                Leadership readiness before placement decisions.
              </h1>

              <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-slate-600">
                LeadSharper helps districts assess leadership judgment, diagnose development gaps, and build stronger principal pipelines through simulation-based readiness evidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/instant-demo"
                  className="rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
                >
                  Try the simulation
                </a>

                <a
                  href="/workflow"
                  className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  View district workflow
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-[24px] bg-slate-50 p-8">
              <Image
                src="/logo.png"
                alt="LeadSharper"
                width={520}
                height={320}
                priority
                className="h-auto w-full max-w-[430px] object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          {paths.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-[24px] border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
            >
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
                {item.title}
              </h2>

              <p className="mt-3 min-h-[56px] text-[0.95rem] leading-7 text-slate-600">
                {item.text}
              </p>

              <p className="mt-5 text-sm font-semibold text-blue-700">
                {item.cta} &gt;
              </p>
            </a>
          ))}
        </section>

        <section className="mt-7 rounded-[28px] bg-slate-950 px-7 py-10 text-white sm:px-10 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
              Why it matters
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              Interviews and reputation do not show how leaders respond under pressure.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              LeadSharper creates observable readiness signals before promotion, placement, and coaching decisions become costly.
            </p>
          </div>
        </section>

        <section className="mt-7 mb-4 rounded-[28px] border border-blue-100 bg-blue-50 px-7 py-9 sm:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                Evaluate a pilot cohort.
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                Start with a focused group, measure readiness, and identify the next development moves.
              </p>
            </div>

            <a
              href="/pilot"
              className="w-fit rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Apply for pilot
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}




