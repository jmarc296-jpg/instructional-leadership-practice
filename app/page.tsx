"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111827]">

      <section className="px-10 py-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight">
          Prevent Leadership Failure Before It Impacts Schools
        </h1>

        <p className="mt-6 text-xl text-[#4b5563] max-w-3xl">
          LeadSharper is an execution system that forces leadership action before school performance declines.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="/autonomous-command-center" className="bg-[#111827] text-white px-6 py-3 rounded-lg font-semibold">
            See Execution System in Action
          </a>
        </div>
      </section>

      <section className="px-10 py-16 bg-[#f8f7f4]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">
            From Insight to Enforcement
          </h2>

          <p className="mt-6 text-lg text-[#4b5563] max-w-3xl">
            Most systems identify problems. LeadSharper enforces action.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              Assign leadership action
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              Assign ownership
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              Set deadline
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              Require evidence
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              Escalate if ignored
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold">
          If Leaders Don’t Act
        </h2>

        <div className="mt-8 space-y-4 text-lg text-[#4b5563]">
          <p>Day 0 → Action assigned to principal</p>
          <p>Day 3 → No evidence → flagged</p>
          <p>Day 5 → Overdue → escalated to Critical</p>
          <p>Day 7 → Ownership shifts beyond the school</p>
        </div>
      </section>

      <section className="px-10 py-16 bg-[#111827] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">
            Built for Superintendents
          </h2>

          <p className="mt-6 text-lg max-w-3xl text-[#d1d5db]">
            This system ensures leadership actions happen before they impact student outcomes.
          </p>
        </div>
      </section>

    </main>
  );
}