const workflow = [
  {
    step: "1",
    title: "Assess Readiness",
    description: "Leaders complete simulation reps tied to real school leadership decisions.",
    href: "/instant-demo"
  },
  {
    step: "2",
    title: "Review Signals",
    description: "District teams review readiness scores and development gaps.",
    href: "/district"
  },
  {
    step: "3",
    title: "Assign Development",
    description: "Targeted learning gets assigned based on leadership gaps.",
    href: "/assignments"
  },
  {
    step: "4",
    title: "Complete Learning",
    description: "Leaders complete modules and application work.",
    href: "/leader-learning-hub"
  },
  {
    step: "5",
    title: "Measure Growth",
    description: "District teams review readiness growth and completion.",
    href: "/impact-dashboard"
  },
  {
    step: "6",
    title: "Make Placement Decisions",
    description: "Use evidence for succession and promotion decisions.",
    href: "/talent-review"
  }
]

export default function WorkflowPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">

        <a
          href="/"
          className="inline-block rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold"
        >
          Back Home
        </a>

        <section className="rounded-[28px] border border-slate-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
            District Workflow
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
            How districts actually use LeadSharper
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600 leading-8">
            This is the full operational workflow districts use year-round—not just during a pilot.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {workflow.map((item) => (
            <a
              key={item.step}
              href={item.href}
              className="rounded-[24px] border border-slate-200 bg-white p-6 hover:shadow-sm"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white font-semibold">
                  {item.step}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-blue-700">
                    Open step →
                  </p>
                </div>
              </div>
            </a>
          ))}
        </section>

      </div>
    </main>
  )
}
