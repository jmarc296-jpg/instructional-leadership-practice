"use client";

import { useState } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f6f9ff] flex items-center justify-center px-6">
        <div className="max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-sm border border-[#0b63ff]/10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0b63ff]">
            Request Received
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#071a3d]">
            We’ll be in touch shortly.
          </h1>

          <p className="mt-4 text-lg text-[#34476b] leading-8">
            We’re currently onboarding pilot district partners and will reach out to schedule your walkthrough.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f9ff] px-6 py-10 text-[#071a3d] sm:px-10">
      <section className="mx-auto max-w-4xl">
        <div className="border-b border-[#0b63ff]/10 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0b63ff]">
            Request Demo
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
            See your district’s leadership risk profile.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#34476b]">
            Tell us about your district and we’ll schedule a walkthrough.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[2rem] border border-[#0b63ff]/10 bg-white p-8 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              required
              placeholder="Full Name"
              className="rounded-xl border border-[#0b63ff]/10 p-4"
            />

            <input
              required
              placeholder="Email"
              className="rounded-xl border border-[#0b63ff]/10 p-4"
            />

            <input
              required
              placeholder="District Name"
              className="rounded-xl border border-[#0b63ff]/10 p-4"
            />

            <input
              required
              placeholder="Number of Schools"
              className="rounded-xl border border-[#0b63ff]/10 p-4"
            />
          </div>

          <textarea
            required
            placeholder="What leadership challenge are you trying to solve?"
            className="mt-6 min-h-[180px] w-full rounded-xl border border-[#0b63ff]/10 p-4"
          />

          <button
            type="submit"
            className="mt-8 rounded-full bg-[#0057FF] px-8 py-4 text-sm font-bold text-white hover:bg-[#0046cc]"
          >
            Request Demo
          </button>
        </form>
      </section>
    </main>
  );
}
