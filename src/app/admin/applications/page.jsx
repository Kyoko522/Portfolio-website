'use client'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi, coverLetterPdf, APPLICATION_STATUSES } from '../../../lib/adminApi'

export default function ApplicationsPage() {
  const qc = useQueryClient()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const appsQuery = useQuery({
    queryKey: ['admin-applications'],
    queryFn: () => adminApi.get('/applications').then((r) => r.applications),
  })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-applications'] })

  const setStatus = useMutation({
    mutationFn: ({ id, status }) => adminApi.patch(`/applications/${id}/status`, { status }),
    onSuccess: invalidate,
  })
  const remove = useMutation({
    mutationFn: (id) => adminApi.del(`/applications/${id}`),
    onSuccess: invalidate,
  })

  if (appsQuery.isLoading) return <div className="admin-muted">Loading applications…</div>
  if (appsQuery.isError) return <div className="admin-error">Failed to load: {appsQuery.error.message}</div>

  const apps = appsQuery.data ?? []

  return (
    <div>
      <div className="admin-page-header">
        <h2>Applications</h2>
        <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : 'Add application'}
        </button>
      </div>

      {showForm && <AddForm onDone={() => setShowForm(false)} />}

      {apps.length === 0 ? (
        <p className="admin-muted">No applications yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Cover letters</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <Fragment key={app.id}>
                <tr>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>
                    <select
                      className="admin-status-select"
                      value={app.status}
                      onChange={(e) => setStatus.mutate({ id: app.id, status: e.target.value })}
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{app.coverLetters?.length ?? 0}</td>
                  <td className="admin-row-actions">
                    <button
                      className="btn-ghost"
                      title={app.jobDescription ? 'Tailor a résumé for this job' : 'Add a job description first'}
                      disabled={!app.jobDescription}
                      onClick={() => router.push(`/admin/tailor?app=${app.id}`)}
                    >
                      Tailor
                    </button>
                    <button className="btn-ghost" onClick={() => setExpanded(expanded === app.id ? null : app.id)}>
                      {expanded === app.id ? 'Hide' : 'Details'}
                    </button>
                    <button
                      className="btn-ghost danger"
                      onClick={() => {
                        if (window.confirm(`Delete the ${app.company} application?`)) remove.mutate(app.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expanded === app.id && (
                  <tr className="admin-detail">
                    <td colSpan={5}>
                      <Detail app={app} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function AddForm({ onDone }) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ company: '', role: '', jobUrl: '', jobDescription: '', notes: '' })

  const create = useMutation({
    mutationFn: () =>
      adminApi.post('/applications', {
        company: form.company,
        role: form.role,
        jobUrl: form.jobUrl || undefined,
        jobDescription: form.jobDescription || undefined,
        notes: form.notes || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-applications'] })
      onDone()
    },
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <form
      className="admin-card admin-form"
      style={{ marginBottom: '1.2rem' }}
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate()
      }}
    >
      <div className="admin-form-row">
        <label>
          Company
          <input value={form.company} onChange={set('company')} required />
        </label>
        <label>
          Role
          <input value={form.role} onChange={set('role')} required />
        </label>
      </div>
      <label>
        Job URL
        <input value={form.jobUrl} onChange={set('jobUrl')} placeholder="https://…" />
      </label>
      <label>
        Job description
        <textarea rows={5} value={form.jobDescription} onChange={set('jobDescription')} />
      </label>
      <label>
        Notes
        <textarea rows={2} value={form.notes} onChange={set('notes')} />
      </label>
      {create.isError && <div className="admin-error">{create.error.message}</div>}
      <button className="btn-primary" type="submit" disabled={create.isPending}>
        {create.isPending ? 'Saving…' : 'Save application'}
      </button>
    </form>
  )
}

function Detail({ app }) {
  const qc = useQueryClient()
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-applications'] })

  const generate = useMutation({
    mutationFn: () => adminApi.post('/coverletter/generate', { applicationId: app.id }),
    onSuccess: invalidate,
  })

  return (
    <div style={{ padding: '0.4rem 0.2rem' }}>
      {app.jobUrl && (
        <p>
          <a href={app.jobUrl} target="_blank" rel="noopener noreferrer">
            {app.jobUrl}
          </a>
        </p>
      )}
      {app.jobDescription && (
        <details>
          <summary className="admin-muted">Job description</summary>
          <pre className="admin-jd">{app.jobDescription}</pre>
        </details>
      )}
      {app.notes && <p className="admin-muted admin-small">Notes: {app.notes}</p>}

      <div style={{ marginTop: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ color: 'var(--color-light)' }}>Cover letters</h4>
          <button className="btn-secondary" onClick={() => generate.mutate()} disabled={generate.isPending}>
            {generate.isPending ? 'Generating…' : 'Generate with Claude'}
          </button>
        </div>
        {generate.isError && <div className="admin-error">{generate.error.message}</div>}
        {(app.coverLetters ?? []).length === 0 ? (
          <p className="admin-muted admin-small">No cover letters yet.</p>
        ) : (
          (app.coverLetters ?? []).map((cl) => <CoverLetterCard key={cl.id} cl={cl} onChange={invalidate} />)
        )}
      </div>
    </div>
  )
}

function CoverLetterCard({ cl, onChange }) {
  const [content, setContent] = useState(cl.content)
  const [downloading, setDownloading] = useState(false)

  const save = useMutation({
    mutationFn: () => adminApi.put(`/coverletter/${cl.id}`, { content }),
    onSuccess: onChange,
  })
  const remove = useMutation({
    mutationFn: () => adminApi.del(`/coverletter/${cl.id}`),
    onSuccess: onChange,
  })

  // Downloads the current (possibly edited) text as a PDF.
  async function download() {
    setDownloading(true)
    try {
      const blob = await coverLetterPdf(content)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'cover-letter.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert(`Download failed: ${e.message}`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="admin-cl-card">
      <textarea rows={12} value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="admin-cl-actions">
        <span className="admin-muted admin-small">
          {cl.model ?? 'edited'} · {new Date(cl.createdAt).toLocaleDateString()}
        </span>
        <div className="admin-spacer" />
        <button className="btn-secondary" onClick={download} disabled={downloading}>
          {downloading ? 'Preparing…' : 'Download PDF'}
        </button>
        <button className="btn" onClick={() => save.mutate()} disabled={save.isPending || content === cl.content}>
          {save.isPending ? 'Saving…' : 'Save edits'}
        </button>
        <button className="btn-ghost danger" onClick={() => remove.mutate()}>
          Delete
        </button>
      </div>
    </div>
  )
}
