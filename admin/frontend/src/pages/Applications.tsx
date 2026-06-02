import { Fragment, useState, type FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import {
  APPLICATION_STATUSES,
  type Application,
  type CoverLetter,
  type Status,
} from '../lib/types';

export default function Applications() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const appsQuery = useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: () => api.get<{ applications: Application[] }>('/applications').then((r) => r.applications),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ['applications'] });

  const setStatus = useMutation({
    mutationFn: (vars: { id: string; status: Status }) =>
      api.patch(`/applications/${vars.id}/status`, { status: vars.status }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/applications/${id}`),
    onSuccess: invalidate,
  });

  if (appsQuery.isLoading) return <div className="muted">Loading applications…</div>;
  if (appsQuery.isError) {
    return <div className="error">Failed to load: {(appsQuery.error as Error).message}</div>;
  }

  const apps = appsQuery.data ?? [];

  return (
    <div className="applications-page">
      <div className="page-header">
        <h2>Applications</h2>
        <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : 'Add application'}
        </button>
      </div>

      {showForm && <AddForm onDone={() => setShowForm(false)} />}

      {apps.length === 0 ? (
        <p className="muted">No applications yet.</p>
      ) : (
        <table className="apps-table">
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
                      className={`status-select status-${app.status}`}
                      value={app.status}
                      onChange={(e) => setStatus.mutate({ id: app.id, status: e.target.value as Status })}
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{app.coverLetters?.length ?? 0}</td>
                  <td className="row-actions">
                    <button
                      className="btn-ghost"
                      onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                    >
                      {expanded === app.id ? 'Hide' : 'Details'}
                    </button>
                    <button
                      className="btn-ghost danger"
                      onClick={() => {
                        if (window.confirm(`Delete the ${app.company} application?`)) remove.mutate(app.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expanded === app.id && (
                  <tr className="detail-row">
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
  );
}

function AddForm({ onDone }: { onDone: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({ company: '', role: '', jobUrl: '', jobDescription: '', notes: '' });

  const create = useMutation({
    mutationFn: () =>
      api.post('/applications', {
        company: form.company,
        role: form.role,
        jobUrl: form.jobUrl || undefined,
        jobDescription: form.jobDescription || undefined,
        notes: form.notes || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['applications'] });
      onDone();
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate();
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form className="card add-form" onSubmit={submit}>
      <div className="form-row">
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
      {create.isError && <div className="error">{(create.error as Error).message}</div>}
      <button className="btn-primary" type="submit" disabled={create.isPending}>
        {create.isPending ? 'Saving…' : 'Save application'}
      </button>
    </form>
  );
}

function Detail({ app }: { app: Application }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['applications'] });

  const generate = useMutation({
    mutationFn: () => api.post('/coverletter/generate', { applicationId: app.id }),
    onSuccess: invalidate,
  });

  return (
    <div className="detail">
      {app.jobUrl && (
        <p>
          <a href={app.jobUrl} target="_blank" rel="noopener noreferrer">
            {app.jobUrl}
          </a>
        </p>
      )}
      {app.jobDescription && (
        <details>
          <summary>Job description</summary>
          <pre className="jd">{app.jobDescription}</pre>
        </details>
      )}
      {app.notes && <p className="muted small">Notes: {app.notes}</p>}

      <div className="cover-letters">
        <div className="cl-header">
          <h4>Cover letters</h4>
          <button
            className="btn-secondary"
            onClick={() => generate.mutate()}
            disabled={generate.isPending}
            title={app.jobDescription ? '' : 'Add a job description first'}
          >
            {generate.isPending ? 'Generating…' : 'Generate with Claude'}
          </button>
        </div>
        {generate.isError && <div className="error">{(generate.error as Error).message}</div>}
        {(app.coverLetters ?? []).length === 0 ? (
          <p className="muted small">No cover letters yet.</p>
        ) : (
          (app.coverLetters ?? []).map((cl) => <CoverLetterCard key={cl.id} cl={cl} onChange={invalidate} />)
        )}
      </div>
    </div>
  );
}

function CoverLetterCard({ cl, onChange }: { cl: CoverLetter; onChange: () => void }) {
  const [content, setContent] = useState(cl.content);

  const save = useMutation({
    mutationFn: () => api.put(`/coverletter/${cl.id}`, { content }),
    onSuccess: onChange,
  });
  const remove = useMutation({
    mutationFn: () => api.del(`/coverletter/${cl.id}`),
    onSuccess: onChange,
  });

  return (
    <div className="cl-card">
      <textarea rows={12} value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="cl-actions">
        <span className="muted small">
          {cl.model ?? 'edited'} · {new Date(cl.createdAt).toLocaleDateString()}
        </span>
        <div className="spacer" />
        <button className="btn" onClick={() => save.mutate()} disabled={save.isPending || content === cl.content}>
          {save.isPending ? 'Saving…' : 'Save edits'}
        </button>
        <button className="btn-ghost danger" onClick={() => remove.mutate()}>
          Delete
        </button>
      </div>
    </div>
  );
}
