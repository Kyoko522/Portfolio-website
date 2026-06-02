'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMe, useLogout } from './auth'
import AdminLogin from './AdminLogin'

export default function AdminShell({ children }) {
  const { data: user, isLoading } = useMe()
  const logout = useLogout()
  const pathname = usePathname()

  if (isLoading) {
    return (
      <div className="admin-center admin-muted">Loading…</div>
    )
  }

  if (!user) return <AdminLogin />

  const navItem = (href, label) => (
    <Link href={href} className={pathname === href ? 'active' : ''}>
      {label}
    </Link>
  )

  return (
    <>
      <header className="admin-topbar">
        <div className="admin-brand">Resume Portal</div>
        <nav className="admin-nav">
          {navItem('/admin/resume', 'Résumé')}
          {navItem('/admin/profile', 'Profile bank')}
          {navItem('/admin/tailor', 'Tailor')}
          {navItem('/admin/applications', 'Applications')}
        </nav>
        <div className="admin-spacer" />
        <span className="admin-muted admin-small">{user.email}</span>
        <button className="btn-ghost" onClick={() => logout.mutate()}>
          Log out
        </button>
      </header>
      <main className="admin-content">{children}</main>
    </>
  )
}
