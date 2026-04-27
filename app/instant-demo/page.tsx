'use client'

import { useEffect, useState } from 'react'
import { saveLeadershipIntelligenceSnapshot } from '@/lib/local-store'

type Evaluation = {
  readiness: number
  directness: number
  evidence: number
  studentImpact: number
  followThrough: number
  risk: string
  summary: string
  nextMove: string
}

type UserProfile = {
  name?: string
  currentRole?: string
  aspiringRole?: string
  district?: string
}

function evaluateResponse(response: string): Evaluation {
  const text = response.toLowerCase()

  const directness = text.includes('conversation') || text.includes('address') || text.includes('meet') ? 82 : 52
  const evidence = text.includes('data') || text.includes('evidence') || text.includes('observation') || text.includes('student') ? 86 : 48
  const studentImpact = text.includes('student') || text.includes('achievement') || text.includes('learning') ? 88 : 54
  const followThrough = text.includes('follow') || text.includes('monitor') || text.includes('check') || text.includes('timeline') ? 84 : 46

  const readiness = Math.round((directness + evidence + studentImpact + followThrough) / 4)

  const risk = readiness >= 80 ? 'Low' : readiness >= 65 ? 'Moderate' : 'High'

  const summary =
    readiness >= 80
      ? 'Your response reflects strong principal judgment. It names the issue, connects the concern to student impact, and includes a clear follow-through move.'
      : readiness >= 65
        ? 'Your response shows promise, but the leadership move needs more precision, evidence, or follow-through.'
        : 'Your response is too general for a high-stakes leadership moment. The risk is that the issue continues without clear accountability.'

  const nextMove =
    readiness >= 80
      ? 'Practice a more complex scenario involving staff resistance or parent escalation.'
      : readiness >= 65
        ? 'Strengthen the response by naming the evidence, the adult action, and the follow-up timeline.'
        : 'Rewrite the response with a clear conversation, specific evidence, student impact, and monitoring plan.'

  return {
    readiness,
    directness,
    evidence,
    studentImpact,
    followThrough,
    risk,
    summary,
    nextMove
  }
}

export default function InstantDemoPage() {
  const [response, setResponse] = useState('')
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [showRewrite, setShowRewrite] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem('leadsharper_user_profile')

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  function generateEvaluation() {
    const result = evaluateResponse(response)

    saveLeadershipIntelligenceSnapshot({
      cardId: 'instant-demo-leadership-scenario',
      domain: 'instructional leadership',
      score: {
        readiness: result.readiness,
        directness: result.directness,
        evidence: result.evidence,
        studentImpact: result.studentImpact,
        followThrough: result.followThrough
      },
      insights: {
        summary: result.summary
      },
      profile: {
        instructionalPrecision: result.evidence,
        accountabilityStrength: result.directness,
        communicationClarity: result.followThrough,
        studentImpactOrientation: result.studentImpact,
        riskLevel: result.risk.toLowerCase()
      },
      consequences: {
        unresolvedRisk:
          result.risk === 'High'
            ? 'Leadership response lacks enough evidence, accountability, or follow-through.'
            : result.risk === 'Moderate'
              ? 'Leadership response shows promise but may not create enough implementation clarity.'
              : 'Leadership response demonstrates strong readiness signals.',
        likelyConsequence: result.summary
      },
      recommendation: {
        priority: 'Next leadership rep',
        nextPracticeFocus: result.nextMove
      }
    })

    setEvaluation(result)
  }

  if (evaluation) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="rounded-3xl bg-slate-900 px-4 py-6 sm:p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              Live Evaluation
            </p>

            <h1 className="mt-4 text-3xl sm:text-4xl sm:text-5xl font-semibold tracking-tight">
              {profile?.name
                ? `${profile.name}, LeadSharper analyzed your leadership move.`
                : 'LeadSharper analyzed your leadership move.'}
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              This response now feeds the platform intelligence spine across reports and executive dashboards.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-5">
            <Metric label="Readiness" value={`${evaluation.readiness}%`} />
            <Metric label="Directness" value={`${evaluation.directness}%`} />
            <Metric label="Evidence" value={`${evaluation.evidence}%`} />
            <Metric label="Student Impact" value={`${evaluation.studentImpact}%`} />
            <Metric label="Follow-Through" value={`${evaluation.followThrough}%`} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
              <h2 className="text-3xl font-semibold text-slate-900">
                Risk Signal
              </h2>

              <div className="mt-4 text-3xl font-bold text-blue-700">
                {evaluation.risk}
              </div>

              <p className="mt-4 leading-7 text-slate-700">
                {evaluation.summary}
              </p>
            </div>

            <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
              <h2 className="text-3xl font-semibold text-slate-900">
                Recommended Next Move
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                {evaluation.nextMove}
              </p>
            </div>
          </section>

          {showRewrite && (
            <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
              <h2 className="text-3xl font-semibold text-slate-900">
                Stronger Leadership Response
              </h2>

              <p className="mt-4 leading-8 text-slate-700">
                I would meet directly with the teacher, name the instructional concern with evidence, and connect it to student learning. I would acknowledge the teacher&apos;s relationships with students while making clear that strong relationships must be matched by strong instruction. I would review recent student achievement data, identify the specific instructional practice that needs to change, and set a short follow-up cycle with coaching, observation, and a clear timeline for improvement.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                The key leadership move is balancing respect with accountability: preserve trust, name the gap, define the expected change, and monitor whether instruction improves.
              </p>
            </section>
          )}

          <section className="rounded-3xl bg-blue-50 px-4 py-6 sm:p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Why this matters
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-700">
              In a district implementation, this same evaluation pattern rolls up into readiness dashboards, coaching priorities, succession planning, and superintendent reporting.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowRewrite(!showRewrite)}
                className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
              >
                {showRewrite ? 'Hide stronger response' : 'See exemplar response'}
              </button>

              <button
                onClick={() => {
                  setEvaluation(null)
                  setResponse('')
                  setShowRewrite(false)
                }}
                className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
              >
                Try again
              </button>

              <a
                href="/evaluation-report"
                className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
              >
                View full evaluation report
              </a>

              <a
                href="/scenario-lab"
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
              >
                Practice harder scenario
              </a>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-3xl bg-slate-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Instant Demo
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl sm:text-5xl font-semibold tracking-tight">
            {profile?.name
              ? `${profile.name}, test LeadSharper in 90 seconds.`
              : 'Test LeadSharper in 90 seconds.'}
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            {profile?.currentRole
              ? `Respond as a ${profile.currentRole} and see how LeadSharper evaluates your readiness for ${profile.aspiringRole || 'your next leadership move'}.`
              : 'Respond to a real leadership scenario and watch the platform evaluate your readiness.'}
          </p>
        </section>

        <section className="rounded-3xl bg-white px-4 py-6 sm:p-8 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">
            Scenario
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            {profile?.district
              ? `In ${profile.district}, a veteran teacher has strong relationships with students but consistently delivers weak instruction. Student achievement is declining, and your instructional coach says this issue has been avoided for months. What do you do?`
              : 'A veteran teacher has strong relationships with students but consistently delivers weak instruction. Student achievement is declining, and your instructional coach says this issue has been avoided for months. What do you do?'}
          </p>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="mt-6 min-h-[240px] w-full rounded-2xl border border-slate-300 p-4"
            placeholder="Describe exactly how you would address this situation as a school leader..."
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <span>Recommended: 150-300 words | Be specific about actions, stakeholders, and timeline.</span>
            <span>{response.trim() ? `${response.trim().split(/\s+/).length} words entered` : "0 words entered"}</span>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Evaluated on: Clarity | Accountability | Coaching | Decision-Making
          </p>

          <p className="mt-6 text-sm font-medium text-slate-500">
            Built for principal supervisors, cabinet leaders, and district leadership pipelines.
          </p>

          <button
            disabled={response.trim().length < 20}
            onClick={generateEvaluation}
            className="mt-4 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white disabled:bg-slate-300"
          >
            Generate Readiness Evaluation
          </button>
        </section>
      </div>
    </main>
  )
}

function Metric({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-bold text-blue-700">{value}</div>
    </div>
  )
}


