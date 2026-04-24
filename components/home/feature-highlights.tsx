import { MessageSquareMore, LineChart, ShieldCheck } from 'lucide-react'

const cards = [
  {
    title: 'Coaching conversations',
    text: 'Navigate resistance, accountability moments, and teacher development conversations with more clarity and control.',
    Icon: MessageSquareMore
  },
  {
    title: 'Difficult DDI meetings',
    text: 'Lead data conversations that produce action, not excuses, when urgency is high and execution is uneven.',
    Icon: LineChart
  },
  {
    title: 'Instructional judgment',
    text: 'Make stronger calls when walkthrough evidence, politics, pacing, and student outcomes collide at the same time.',
    Icon: ShieldCheck
  }
]

export function FeatureHighlights() {
  return (
    <section className="grid gap-5 lg:grid-cols-3">
      {cards.map(({ title, text, Icon }) => (
        <div
          key={title}
          className="premium-panel rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)]"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Icon size={22} />
          </div>

          <h3 className="text-xl font-bold text-slate-900">{title}</h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
        </div>
      ))}
    </section>
  )
}

