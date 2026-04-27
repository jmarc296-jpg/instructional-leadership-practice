const modules = [
  {
    title: "Leading Effective DDI Cycles",
    competency: "DDI",
    time: "45 min",
    format: "Simulation",
    alignment: "Data Analysis + Reteach Planning"
  },
  {
    title: "Navigating Crucial Conversations",
    competency: "People Leadership",
    time: "30 min",
    format: "Video",
    alignment: "Staff Accountability"
  },
  {
    title: "Instructional Coaching Foundations",
    competency: "Coaching",
    time: "50 min",
    format: "Toolkit",
    alignment: "Teacher Development"
  },
  {
    title: "Building School Culture Systems",
    competency: "School Culture",
    time: "40 min",
    format: "Simulation",
    alignment: "Culture Leadership"
  },
  {
    title: "Strategic Staffing Decisions",
    competency: "Staffing",
    time: "35 min",
    format: "Toolkit",
    alignment: "Talent Management"
  },
  {
    title: "Operational Leadership Systems",
    competency: "Operations",
    time: "25 min",
    format: "Video",
    alignment: "School Operations"
  }
]

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Leadership Development Library</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module.title} className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">{module.title}</h2>
            <p>{module.competency}</p>
            <p>{module.time}</p>
            <p>{module.format}</p>
            <p>{module.alignment}</p>

            <button className="mt-4 w-full bg-black text-white py-2 rounded-xl">
              Assign Module
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
