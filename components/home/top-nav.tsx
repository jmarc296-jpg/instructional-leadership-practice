'use client'

import Image from 'next/image'

export default function TopNav() {
  return (
    <header className="w-full border-b border-white/10 bg-[#020617]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-[150px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Image src="/logo.png" alt="LeadSharper" width={132} height={38} priority className="h-8 w-auto object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-white">LeadSharper</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Command Layer</div>
          </div>
        </div>

        <a href="/demo/run" className="rounded-full border border-white/15 px-6 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/30 hover:bg-white/[0.05]">
          Enter
        </a>
      </div>
    </header>
  )
}
