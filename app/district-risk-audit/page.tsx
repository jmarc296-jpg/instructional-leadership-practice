"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const deliverables = [
  "District leadership risk snapshot",
  "High-risk campus identification",
  "Succession exposure map",
  "Board-ready summary report",
  "Executive action recommendations"
];

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
        <section className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Audit Request Received
            </p>

            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl tracking-[-0.04em]">
              We will follow up with next steps.
            </h1>

            <p className="mt-5 text-lg leading-8 text-neutral-600">
              LeadSharper will review your request and follow up to discuss data availability, district priorities, and audit fit.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <header className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <Link href="/">
          <Image src="/logo.png" alt="LeadSharper" width={240} height={70} priority className="h-auto w-[190px] sm:w-[250px]" />
        </Link>

        <Link href="/district-command-center" className="rounded-full border border-black px-5 py-2 text-sm font-medium transition hover:bg-black hover:text-white">
          Command Center
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            District Leadership Risk Audit
          </p>

          <h1 className="mt-6 text-4xl font-semibold sm:text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
            Identify leadership instability before it becomes a vacancy crisis.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            In 14 days, LeadSharper delivers a district-wide leadership risk assessment that surfaces high-risk campuses, succession exposure, and executive action priorities.
          </p>

          <div className="mt-8 rounded-3xl bg-black p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Pilot Audit
            </p>

            <p className="mt-4 text-4xl font-semibold">
              Starting at $15,000
            </p>

            <p className="mt-3 leading-7 text-white/70">
              Designed as a focused entry point before long-term monitoring or platform licensing.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-2xl font-semibold">
              What the audit includes
            </h2>

            <div className="mt-5 space-y-3">
              {deliverables.map((item) => (
                <div key={item} className="rounded-2xl border border-neutral-200 p-4 text-neutral-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-200 bg-white p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">
              Request an audit review
            </h2>

            <p className="mt-3 leading-7 text-neutral-600">
              Share a few details so we can determine fit and identify the right starting point.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <input required placeholder="Full Name" className="rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />
            <input required placeholder="Work Email" className="rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />
            <input required placeholder="District Name" className="rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />
            <input required placeholder="Number of Schools" className="rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />
            <input placeholder="Current Principal Vacancies" className="rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />
            <input placeholder="Approximate Enrollment" className="rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />
          </div>

          <textarea required placeholder="What leadership risk, turnover, or succession challenge are you trying to solve?" className="mt-5 min-h-[180px] w-full rounded-2xl border border-neutral-200 p-4 outline-none focus:border-black" />

          <button type="submit" className="mt-6 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:opacity-85">
            Request District Risk Audit
          </button>
        </form>
      </section>
    </main>
  );
}

