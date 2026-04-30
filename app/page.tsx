import Link from 'next/link'

const executiveSignals = [
  '2 escalations require action this week',
  '1 leadership gap has no clear owner',
  '3 actions are overdue without evidence'
]

const workflow = [
  {
    label: 'What is breaking down?',
    detail: 'LeadSharper identifies leadership risk across walkthrough trends, coaching evidence, staffing exposure, and execution gaps.'
  },
  {
    label: 'Who owns the response?',
    detail: 'Every risk signal becomes an assigned action with an owner, due date, and evidence expectation.'
  },
  {
    label: 'What needs executive attention?',
    detail: 'Escalations surface before leadership instability becomes a board, staffing, or student-outcome issue.'
  }
]

const buyerReactions = [
  {
    moment: 'First 10 seconds',
    reaction: 'The buyer should immediately understand the problem: leadership risk exists, but it is not visible enough to act on.'
  },
  {
    moment: 'After the signal snapshot',
    reaction: 'The buyer should feel urgency because the site names specific action gaps, not abstract platform benefits.'
  },
  {
    moment: 'After the workflow',
    reaction: 'The buyer should see the operating system: signal, action, owner, evidence, escalation.'
  },
  {
    moment: 'At the CTA',
    reaction: 'The buyer should know the next step is not a generic demo. It is seeing how their leadership risks would be surfaced and acted on.'
  }
]

export default function Home() {
  return (
    <main className='min-h-screen bg-slate-950 text-white'>
      

        <div className='grid gap-3 md:grid-cols-3'>
          <div className='rounded-xl border border-red-400/30 bg-red-500/10 p-4'>
            <div className='text-xs font-semibold uppercase tracking-wide text-red-200'>Executive Escalations</div>
            <div className='mt-1 text-2xl font-bold'>2</div>
            <div className='text-xs text-red-200'>Action required this week</div>
          </div>
          <div className='rounded-xl border border-orange-400/30 bg-orange-500/10 p-4'>
            <div className='text-xs font-semibold uppercase tracking-wide text-orange-200'>Unassigned Ownership</div>
            <div className='mt-1 text-2xl font-bold'>1</div>
            <div className='text-xs text-orange-200'>No clear owner</div>
          </div>
          <div className='rounded-xl border border-slate-400/30 bg-slate-500/10 p-4'>
            <div className='text-xs font-semibold uppercase tracking-wide text-slate-200'>Overdue Actions</div>
            <div className='mt-1 text-2xl font-bold'>3</div>
            <div className='text-xs text-slate-200'>No evidence logged</div>
          </div>
        </div>
        <div className='max-w-4xl'>
          <div className='mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200'>
            
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-white md:text-6xl'>
            You have leadership risk right now. You just canÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢t see it clearly.
          </h1>

          <p className='mt-6 max-w-3xl text-lg leading-8 text-slate-300'>
            No owner. No follow-up. No evidence.
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <Link
              href='/demo/run'
              className='rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-sm'
            >
              Open the issues
            </Link>
            <Link
              href='/board-report'
              className='rounded-xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white'
            >
              Open board view
            </Link>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          {executiveSignals.map((signal) => (
            <div key={signal} className='rounded-2xl border border-red-400/30 bg-red-500/10 p-5'>
              <div className='text-sm font-semibold uppercase tracking-wide text-red-200'>
                Act Now
              </div>
              <div className='mt-2 text-xl font-bold text-white'>
                {signal}
              </div>
            </div>
          ))}
        </div>

        <div className='rounded-3xl border border-white/10 bg-white/5 p-6'>
          <div className='text-sm font-semibold uppercase tracking-wide text-slate-400'>
            Built from real district workflows
          </div>
          <p className='mt-3 max-w-4xl text-lg text-slate-200'>
            LeadSharper reflects the way district teams already work: DDI cycles, walkthrough patterns, coaching logs, staffing signals, evidence tracking, and cabinet-level follow-up.
          </p>
        </div>

        <section className='grid gap-5 lg:grid-cols-3'>
          {workflow.map((item) => (
            <div key={item.label} className='rounded-2xl border border-white/10 bg-white p-6 text-slate-950'>
              <div className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                {item.label}
              </div>
              <p className='mt-3 text-base leading-7 text-slate-700'>
                {item.detail}
              </p>
            </div>
          ))}
        </section>

        <section className='rounded-3xl border border-white/10 bg-white p-6 text-slate-950'>
          <div className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Buyer reaction test
          </div>
          <h2 className='mt-2 text-3xl font-bold'>
            The site should create urgency in under 30 seconds.
          </h2>

          <div className='mt-6 grid gap-4 md:grid-cols-2'>
            {buyerReactions.map((item) => (
              <div key={item.moment} className='rounded-2xl border bg-slate-50 p-5'>
                <div className='font-semibold text-slate-950'>{item.moment}</div>
                <p className='mt-2 text-sm leading-6 text-slate-700'>{item.reaction}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-red-400/30 bg-red-500/10 p-6'>
          <div className='text-sm font-semibold uppercase tracking-wide text-red-200'>
            Consequence
          </div>
          <p className='mt-3 text-2xl font-bold text-white'>
            If these issues are not addressed this week, leadership risk compounds and instructional execution weakens within the next 2ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“3 weeks.
          </p>
        </section>
      </section>
    </main>
  )
}




