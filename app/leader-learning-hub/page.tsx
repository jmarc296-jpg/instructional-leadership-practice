export default function LeaderLearningHub() {
  const assignments = [
    {
      module: "Observation & Feedback Excellence",
      due: "May 10",
      progress: "75%",
      status: "In Progress"
    },
    {
      module: "Coaching Foundations",
      due: "May 20",
      progress: "40%",
      status: "In Progress"
    }
  ]

  const tasks = [
    "Complete simulation scenario",
    "Submit reflection response",
    "Meet with supervisor for coaching debrief"
  ]

  const growthAreas = [
    {
      competency: "Instructional Feedback",
      before: "42%",
      after: "68%"
    },
    {
      competency: "Coaching Conversations",
      before: "51%",
      after: "73%"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <section className="bg-gradient-to-r from-black to-blue-900 text-white p-10 rounded-3xl mb-8">
          <p className="text-sm tracking-[0.3em] text-blue-300 mb-3">
            LEADER LEARNING HUB
          </p>

          <h1 className="text-5xl font-bold mb-4">
            Your personalized leadership development journey.
          </h1>

          <p className="text-xl text-slate-200 max-w-3xl">
            Complete assigned modules, strengthen leadership competencies,
            and track your growth toward promotion readiness.
          </p>
        </section>

        {/* Metrics */}
        <section className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Active Modules</p>
            <h2 className="text-4xl font-bold mt-2">2</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Simulations Completed</p>
            <h2 className="text-4xl font-bold mt-2">4</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Completion Rate</p>
            <h2 className="text-4xl font-bold mt-2 text-green-600">82%</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Promotion Readiness</p>
            <h2 className="text-4xl font-bold mt-2 text-blue-600">
              +14%
            </h2>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-8">

          {/* Assigned Modules */}
          <section className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">
              Assigned Modules
            </h2>

            {assignments.map((item) => (
              <div
                key={item.module}
                className="border rounded-2xl p-5 mb-4"
              >
                <h3 className="font-semibold text-xl">
                  {item.module}
                </h3>

                <p className="text-slate-500 mt-1">
                  Due: {item.due}
                </p>

                <div className="w-full bg-slate-200 rounded-full h-3 mt-4">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: item.progress }}
                  />
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {item.progress} complete • {item.status}
                </p>
              </div>
            ))}
          </section>

          {/* Upcoming Tasks */}
          <section className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">
              Upcoming Tasks
            </h2>

            {tasks.map((task) => (
              <div
                key={task}
                className="bg-slate-50 border rounded-2xl p-5 mb-4"
              >
                {task}
              </div>
            ))}

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-6">
              <h3 className="font-semibold mb-2">
                Next Coaching Meeting
              </h3>
              <p>May 14 • 3:00 PM</p>
            </div>
          </section>
        </div>

        {/* Growth */}
        <section className="bg-white p-8 rounded-3xl shadow-sm mb-8">
          <h2 className="text-3xl font-bold mb-6">
            Competency Growth
          </h2>

          {growthAreas.map((area) => (
            <div key={area.competency} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {area.competency}
                </span>
                <span className="text-slate-500">
                  {area.before} → {area.after}
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: area.after }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Certification */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-3">
            Certification Progress
          </h2>

          <p className="text-xl mb-4">
            Instructional Coaching Certification
          </p>

          <div className="w-full bg-white/20 rounded-full h-4">
            <div
              className="bg-white h-4 rounded-full"
              style={{ width: "82%" }}
            />
          </div>

          <p className="mt-3">82% complete</p>
        </section>
      </div>
    </main>
  )
}