import './globals.css'
import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Instructional Leadership Practice',
  description: 'Scenario-based quiz and review cards for instructional leaders.'
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
