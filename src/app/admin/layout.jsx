import './admin.css'
import AdminProviders from '../../../components/admin/AdminProviders'
import AdminShell from '../../../components/admin/AdminShell'

export const metadata = {
  title: 'Résumé Portal',
  // Keep the private admin console out of search engines.
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <AdminProviders>
        <AdminShell>{children}</AdminShell>
      </AdminProviders>
    </div>
  )
}
