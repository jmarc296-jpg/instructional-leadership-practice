"use client";

import Link from "next/link";
import { LeadSharperLogo } from "@/components/brand/leadsharper-logo";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F6F8FC] text-[#071B4D]">
      <section className="mx-auto max-w-7xl px-6 py-8">

        {/* NAV */}
        <nav className="flex items-center justify-between rounded-full border border-[#D8E3F7] bg-white/90 px-5 py-3 shadow-sm backdrop-blur">
          <Link href="/" className="flex items-center">
            <LeadSharperLogo
              size="lg"
              imageClassName="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <Link href="/data-intake" className="hover:text-[#0D6EFD]">Data Intake</Link>
            <Link href="/board-report" className="hover:text-[#0D6EFD]">Board Report</Link>
            <Link href="/demo/run" className="hover:text-[#0D6EFD]">Demo</Link>
          </div>

          <Link
            href="/demo/run"
            className="rounded-full bg-[#071B4D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D6EFD]"
          >
            Run Executive Demo
          </Link>
        </nav>

        {/* HERO */}
        <section className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

          {/* LEFT - CORE MESSAGE */}
          <div>
            <div className="mb-5 inline-flex rounded-full border border-[#B2DDFF] bg-[#EFF6FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#175CD3]">
              District Executive Accountability Infrastructure
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl leading-[1.05]">
              See leadership risk early.<br />Act before it spreads.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475569]">
              Review Data Intake Model. LeadSharper converts it into leadership signals, assigns ownership,
              tracks follow-through, and generates executive-ready reports for superintendent decision cycles.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo/run"
                className="rounded-full bg-[#071B4D] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#0D6EFD]"
              >
                Run Executive Demo
              </Link>

              <Link
                href="/data-intake"
                className="rounded-full border border-[#CBD5E1] bg-white px-7 py-4 text-center text-sm font-semibold text-[#071B4D] transition hover:border-[#0D6EFD] hover:text-[#0D6EFD]"
              >
                Review Data Intake Model
              </Link>
            </div>

            {/* TRUST STRIP */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Trust text="Built for superintendent and cabinet workflows" />
              <Trust text="Connects detection to ownership to evidence to decision" />
              <Trust text="Works with existing district data sources" />
              <Trust text="Pilot-ready in under 60 minutes" />
            </div>
          </div>

          {/* RIGHT - OPERATING LOOP (TIGHTENED) */}
          <div className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              Operating Loop
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] leading-tight">
              Evidence becomes executive action.
            </h2>

            <p className="mt-3 text-sm text-[#64748B] leading-6">
              Not a dashboard. Executive accountability infrastructure for district operating cycles.
            </p>

            <div className="mt-6 space-y-4">

              <Step
                num="01"
                title="Upload evidence"
                body="Walkthroughs, DDI notes, evaluations, and leadership support data."
              />

              <Step
                num="02"
                title="Generate signals"
                body="Risk identified by school, leader, severity, and source."
              />

              <Step
                num="03"
                title="Assign ownership"
                body="Every signal moves to a named owner with a timeline."
              />

              <Step
                num="04"
                title="Track evidence"
                body="Follow-through is documented and visible to cabinet."
              />

              <Step
                num="05"
                title="Executive record"
                body="Board-aware executive record for superintendent decision cycles."
              />

            </div>
          </div>
        </section>

        {/* PROOF SECTION - HARDENED */}
        <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
                What makes this real
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] leading-tight">
                Built for executive accountability, not dashboard viewing.
              </h2>

              <p className="mt-4 text-base leading-7 text-[#475569]">
                LeadSharper does not stop at insight. It connects risk to ownership, ownership to action,
                and action to evidence. The result is a system that shows whether leadership support is actually happening.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Metric label="Signals" value="Captured" />
              <Metric label="Ownership" value="Assigned" />
              <Metric label="Evidence" value="Tracked" />
              <Metric label="Decisions" value="Supported" />
            </div>

          </div>
        </section>

        {/* PILOT CTA */}
        <section className="mt-8 rounded-[2rem] border border-[#D8E3F7] bg-[#071B4D] p-8 text-white shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-center">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8EC5FF]">
                Pilot pathway
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] leading-tight">
                Start small. Prove impact. Then scale.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#D8E3F7]">
                3-5 schools. Real data. Weekly executive review. Clear ownership. Documented follow-through.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/data-intake"
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-semibold text-[#071B4D] hover:bg-[#EAF2FF]"
              >
                Start Data Intake
              </Link>

              <Link
                href="/board-report"
                className="rounded-full border border-white/30 px-6 py-4 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                View Executive record
              </Link>
            </div>

          </div>
        </section>

      </section>
    </main>
  )
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="flex gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071B4D] text-xs font-bold text-white">
          {num}
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-[#64748B] mt-1">{body}</p>
        </div>
      </div>
    </div>
  )
}

function Trust({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-[#D8E3F7] bg-white px-4 py-3 text-sm font-semibold text-[#475569] shadow-sm">
      {text}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[#D8E3F7] bg-[#F7FAFF] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#071B4D]">{value}</p>
    </div>
  )
}
