import { Navigation } from '@/components/navigation'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container stack">
      <Navigation />
      {children}
    </div>
  )
}
