import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function SectionShell({ children, className = '' }: Props) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white shadow-sm ${className}`.trim()}
    >
      {children}
    </div>
  )
}
