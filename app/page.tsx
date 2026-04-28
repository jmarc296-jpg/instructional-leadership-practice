import Link from "next/link"
import Image from "next/image"

const proofPoints = [
  { label: "Readiness signals", value: "Evidence-based" },
  { label: "District workflow", value: "Assignment driven" },
  { label: "Talent decisions", value: "Promotion aligned" }
]

const workflows = [
  {
    title: "Assess leadership judgment",
    text: "Use simulations to capture how leaders think through instruction, culture, talent, and execution."
  },
  {
    title: "Assign targeted practice",
    text: "Move from feedback to action with assigned modules, due dates, evidence, and coaching notes."
  },
  {
    title: "Connect growth to readiness",
    text: "Bring coaching history, performance signals, and promotion readiness into one district record."
  }
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#070b18]">
      <section className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <nav className="flex items-center justify-between rounded-3xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-24 overflow-hidden rounded-xl bg-white">
              <Image src="/logo.png" alt="LeadSharper" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">LeadSharper</p>
              <p className="text-xs text-black/50">Leadership readiness infrastructure</p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium text-black/65 md:flex">
            <Link href="/simulation-room" className="hover:text-black">Simulation</Link>
            <Link href="/workspace" className="hover:text-black">Workspace</Link>
            <Link href="/district" className="hover:text-black">Dashboard</Link>
            <Link href="/procurement" className="hover:text-black">Procurement</Link>
          </div>

          <Link href="/workspace" className="rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black">
            Open workspace
          </Link>
        </nav>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm lg:grid-cols-[1.02fr_0.98fr]">
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2563eb]">
              District leadership pipeline
            </p>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] md:text-6xl">
              Know who is ready before the role opens.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
              LeadSharper helps districts assess leadership judgment, assign targeted development, and connect coaching evidence to principal readiness decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/simulation-room" className="rounded-2xl bg-[#2563eb] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]">
                Try simulation
              </Link>
              <Link href="/workspace" className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:bg-black/[0.03]">
                View district workflow
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point.label} className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">{point.label}</p>
                  <p className="mt-2 text-sm font-semibold">{point.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-black/10 bg-[#111827] p-8 text-white lg:border-l lg:border-t-0 md:p-12">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Readiness command</p>
                  <p className="mt-2 text-xl font-semibold">District pipeline view</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Live
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                <Signal leader="A. Johnson" role="Assistant Principal" status="Coaching cycle active" readiness="74%" />
                <Signal leader="M. Rivera" role="Principal" status="Evidence added" readiness="81%" />
                <Signal leader="D. Carter" role="Dean of Culture" status="Simulation assigned" readiness="68%" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <DarkMetric label="Assignments" value="142" />
              <DarkMetric label="Evidence" value="87%" />
              <DarkMetric label="Ready" value="23" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {workflows.map((item, index) => (
            <div key={item.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-black/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Signal({ leader, role, status, readiness }: { leader: string; role: string; status: string; readiness: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white p-4 text-[#070b18]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{leader}</p>
          <p className="mt-1 text-sm text-black/55">{role}</p>
        </div>
        <p className="text-2xl font-semibold tracking-[-0.04em]">{readiness}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-black/55">{status}</p>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-black/10">
          <div className="h-full w-3/4 rounded-full bg-[#2563eb]" />
        </div>
      </div>
    </div>
  )
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-2xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="mt-1 text-xs text-white/45">{label}</p>
    </div>
  )
}
