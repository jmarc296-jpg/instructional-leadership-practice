const assignments = [
  {
    leader: "Principal #1",
    module: "Instructional Coaching Foundations",
    dueDate: "May 10",
    completion: "75%",
    status: "In Progress",
    notification: "Reminder Scheduled"
  },
  {
    leader: "Principal #2",
    module: "Observation & Feedback Excellence",
    dueDate: "May 2",
    completion: "20%",
    status: "Overdue",
    notification: "Overdue Notice Sent"
  },
  {
    leader: "Principal #3",
    module: "Strategic Staffing Decisions",
    dueDate: "May 18",
    completion: "100%",
    status: "Completed",
    notification: "Completion Confirmed"
  }
]

const metrics = [
  { label: "Active Assignments", value: "18" },
  { label: "Due This Week", value: "6" },
  { label: "Overdue", value: "3" },
  { label: "Completed", value: "42" }
]

function statusClass(status: string) {
  if (status === "Completed") return "bg-green-100 text-green-700"
  if (status === "Overdue") return "bg-red-100 text-red-700"
  return "bg-blue-100 text-blue-700"
}

export default function AssignmentDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-950 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Assignment Manager
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            Track assigned leadership development.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Monitor due dates, completion, notification status, and follow-up actions across assigned modules.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">{metric.value}</h2>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-950">
              Assignment Tracker
            </h2>

            <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
              Create Assignment
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-500">
            <div>Leader</div>
            <div className="col-span-2">Module</div>
            <div>Due Date</div>
            <div>Completion</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          <div className="divide-y divide-slate-100">
            {assignments.map((assignment) => (
              <div key={assignment.leader + assignment.module} className="grid grid-cols-7 gap-4 py-5 items-center">
                <div className="font-semibold text-slate-900">
                  {assignment.leader}
                </div>

                <div className="col-span-2">
                  <p className="font-medium text-slate-900">{assignment.module}</p>
                  <p className="text-sm text-slate-500">{assignment.notification}</p>
                </div>

                <div className="text-slate-700">
                  {assignment.dueDate}
                </div>

                <div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: assignment.completion }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{assignment.completion}</p>
                </div>

                <div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>

                <div>
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

