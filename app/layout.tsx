import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Instructional Leadership Practice',
  description: 'Scenario-based quiz and review cards for instructional leaders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}