type Props = {
  score: number
}

export function StakeholderReaction({ score }: Props) {
  let reaction = ''
  let label = ''

  if (score >= 4) {
    label = 'Stakeholder Response'
    reaction =
      "The stakeholder acknowledges your feedback and agrees to move forward, but asks for clarity around execution expectations."
  } else if (score === 3) {
    label = 'Stakeholder Pushback'
    reaction =
      "The stakeholder partially agrees, but pushes back and says your expectations feel unclear and difficult to implement."
  } else {
    label = 'Stakeholder Escalation'
    reaction =
      "The stakeholder becomes defensive and escalates concern, questioning your leadership approach and next steps."
  }

  return (
    <section className="rounded-3xl border border-red-100 bg-red-50 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
        {label}
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
        Real-time reaction
      </h3>

      <p className="mt-4 text-slate-700 leading-8">
        {reaction}
      </p>

      <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-medium text-slate-700">
        How do you respond now?
      </div>
    </section>
  )
}
