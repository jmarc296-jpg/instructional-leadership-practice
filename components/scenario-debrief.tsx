type Props = {
  score: number
}

export function ScenarioDebrief({ score }: Props) {
  const recommendation =
    score >= 4
      ? 'Your leadership move is strong enough to use in a real coaching conversation. Continue tightening precision and follow-through.'
      : score === 3
      ? 'Your response has the right direction, but needs sharper evidence, clearer next steps, and stronger accountability language.'
      : 'Pause and rebuild the response by naming the instructional issue, grounding it in evidence, and stating the next leadership move.'

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
        Scenario Debrief
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
        What this rep is telling you
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-300">
        {recommendation}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-white/60">
            Focus
          </div>
          <div className="mt-2 text-sm font-semibold">
            Precision
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-white/60">
            Move
          </div>
          <div className="mt-2 text-sm font-semibold">
            Name the issue
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-white/60">
            Next Rep
          </div>
          <div className="mt-2 text-sm font-semibold">
            Tighten evidence
          </div>
        </div>
      </div>
    </div>
  )
}
