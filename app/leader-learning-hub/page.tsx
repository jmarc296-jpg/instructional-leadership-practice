const modules = [
  {
    title: "Coaching Difficult Conversations",
    category: "Instructional Leadership",
    duration: "45 Minutes",
    completion: "81%"
  },
  {
    title: "Systems Execution",
    category: "Operational Leadership",
    duration: "60 Minutes",
    completion: "73%"
  },
  {
    title: "School Culture Reset",
    category: "Culture Leadership",
    duration: "50 Minutes",
    completion: "88%"
  },
  {
    title: "Leading Through Conflict",
    category: "People Leadership",
    duration: "40 Minutes",
    completion: "79%"
  }
]

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/assignments"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Assignments
        </a>

        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Leader Learning Hub
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            Development built around real leadership gaps.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Assign targeted learning experiences tied directly to simulation performance and readiness reviews.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.title}
              className="rounded-3xl bg-white border border-slate-200 p-7"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                {module.category}
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {module.title}
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {module.duration}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Completion</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {module.completion}
                  </p>
                </div>
              </div>

              <a
                href="/impact-dashboard"
                className="inline-block mt-6 text-blue-600 font-semibold"
              >
                Track Impact
              </a>
            </div>
          ))}
        </section>

      </div>
    </main>
  )
}
