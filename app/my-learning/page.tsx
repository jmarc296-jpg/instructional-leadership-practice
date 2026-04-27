const assignedModules = [
  {
    title: "Leading Effective DDI Cycles",
    progress: 75,
    dueDate: "May 10"
  },
  {
    title: "Crucial Conversations",
    progress: 20,
    dueDate: "May 2"
  }
]

export default function MyLearningPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-8">My Learning Dashboard</h1>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p>Assigned Modules</p>
          <h2 className="text-3xl font-bold">6</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p>Completion Rate</p>
          <h2 className="text-3xl font-bold">68%</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p>Overdue Assignments</p>
          <h2 className="text-3xl font-bold text-red-600">2</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p>Readiness Growth</p>
          <h2 className="text-3xl font-bold text-green-600">+14%</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>

        {assignedModules.map((module) => (
          <div key={module.title} className="mb-4 border-b pb-4">
            <h3>{module.title}</h3>
            <p>{module.progress}% complete</p>
            <p>Due: {module.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

