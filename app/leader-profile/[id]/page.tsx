const leader = {
  name: "Principal #1",
  role: "Principal",
  school: "High School A",
  readinessScore: "82%",
  promotionReadiness: "Ready Now",
  retentionRisk: "Low"
}

const growthAreas = [
  "Instructional Feedback",
  "Coaching Conversations"
]

const assignedModules = [
  "Observation & Feedback Excellence",
  "Instructional Coaching Foundations"
]

const completedModules = [
  "School Culture Systems",
  "Strategic Staffing Decisions"
]

export default function LeaderProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          {leader.name}
        </h1>

        <p className="text-slate-600 mb-8">
          {leader.role} | {leader.school}
        </p>

        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border">
            <p>Readiness Score</p>
            <h2 className="text-3xl font-bold mt-2">
              {leader.readinessScore}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <p>Promotion Readiness</p>
            <h2 className="text-2xl font-bold mt-2">
              {leader.promotionReadiness}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <p>Retention Risk</p>
            <h2 className="text-2xl font-bold mt-2">
              {leader.retentionRisk}
            </h2>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          <section className="bg-white p-6 rounded-2xl border">
            <h2 className="font-semibold mb-4">Growth Areas</h2>

            {growthAreas.map((area) => (
              <div key={area} className="bg-red-50 p-3 rounded-xl mb-3">
                {area}
              </div>
            ))}
          </section>

          <section className="bg-white p-6 rounded-2xl border">
            <h2 className="font-semibold mb-4">Assigned Modules</h2>

            {assignedModules.map((module) => (
              <div key={module} className="bg-yellow-50 p-3 rounded-xl mb-3">
                {module}
              </div>
            ))}
          </section>

          <section className="bg-white p-6 rounded-2xl border">
            <h2 className="font-semibold mb-4">Completed Modules</h2>

            {completedModules.map((module) => (
              <div key={module} className="bg-green-50 p-3 rounded-xl mb-3">
                {module}
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}

