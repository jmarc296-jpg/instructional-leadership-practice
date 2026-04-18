'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Practice' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/admin', label: 'Admin' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/bulk-upload', label: 'Bulk Upload' }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="card">
      <nav className="nav">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${active ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
