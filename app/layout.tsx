import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadSharper | Instructional Leadership Practice',
  description:
    'Build stronger instructional leadership judgment through scenario-based coaching, DDI, and school leadership practice.',

  keywords: [
    'instructional leadership',
    'principal coaching',
    'school leadership',
    'teacher coaching',
    'DDI',
    'principal development',
    'education leadership'
  ],

  openGraph: {
    title: 'LeadSharper',
    description:
      'Practice real instructional leadership decisions through high-quality scenario reps.',
    type: 'website'
  },

  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}