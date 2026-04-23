type Props = {
  text: string
}

export function EmptyState({ text }: Props) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
      {text}
    </div>
  )
}
