'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../../lib/adminApi'

// The "global spot" for all career material. You maintain it once; the Tailor
// page lets Claude select the best-fit subset per job. Four collections, each
// with add / edit / delete, all backed by the shared admin backend.
export default function ProfileBankPage() {
  const bankQuery = useQuery({ queryKey: ['admin-profile'], queryFn: () => adminApi.get('/profile') })

  if (bankQuery.isLoading) return <div className="admin-muted">Loading profile…</div>
  if (bankQuery.isError) return <div className="admin-error">Failed to load: {bankQuery.error.message}</div>

  const bank = bankQuery.data

  return (
    <div>
      <div className="admin-page-header">
        <h2>Profile bank</h2>
        <span className="admin-muted admin-small">Everything the AI can draw from when tailoring a résumé.</span>
      </div>
      <ExperienceSection items={bank.experiences} />
      <ProjectSection items={bank.projects} />
      <EducationSection items={bank.education} />
      <SkillSection items={bank.skills} />
    </div>
  )
}

// ── Shared CRUD plumbing ──
function useCrud(collection) {
  const qc = useQueryClient()
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-profile'] })
  return {
    create: useMutation({ mutationFn: (data) => adminApi.post(`/profile/${collection}`, data), onSuccess: invalidate }),
    update: useMutation({ mutationFn: (v) => adminApi.put(`/profile/${collection}/${v.id}`, v.data), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id) => adminApi.del(`/profile/${collection}/${id}`), onSuccess: invalidate }),
  }
}

function Section({ title, count, onAdd, adding, children }) {
  return (
    <section className="admin-bank-section">
      <div className="admin-bank-head">
        <h3>{title} <span className="admin-muted admin-small">({count})</span></h3>
        <button className="btn-primary" onClick={onAdd}>{adding ? 'Cancel' : 'Add'}</button>
      </div>
      {children}
    </section>
  )
}

function Lines({ value, onChange, placeholder }) {
  return (
    <textarea
      rows={4}
      placeholder={placeholder || 'One item per line'}
      value={value.join('\n')}
      onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.replace(/\r$/, '')).filter((s) => s.trim() !== ''))}
    />
  )
}

function Tags({ value, onChange, placeholder }) {
  return (
    <input
      placeholder={placeholder || 'Comma separated'}
      value={value.join(', ')}
      onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
    />
  )
}

function ItemCard({ title, subtitle, onEdit, onDelete, children }) {
  return (
    <div className="admin-bank-item">
      <div className="admin-bank-item-head">
        <div>
          <strong>{title}</strong>
          {subtitle && <span className="admin-muted admin-small"> — {subtitle}</span>}
        </div>
        <div className="admin-row-actions">
          <button className="btn-ghost" onClick={onEdit}>Edit</button>
          <button className="btn-ghost danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
      {children}
    </div>
  )
}

function FormActions({ onCancel, onSave, busy, disabled }) {
  return (
    <div className="admin-bank-form-actions">
      <button className="btn" onClick={onCancel}>Cancel</button>
      <button className="btn-primary" onClick={onSave} disabled={busy || disabled}>{busy ? 'Saving…' : 'Save'}</button>
    </div>
  )
}

// ── Experience ──
const emptyExp = { company: '', title: '', location: '', startDate: '', endDate: '', current: false, bullets: [], skills: [] }

function ExperienceSection({ items }) {
  const crud = useCrud('experiences')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  return (
    <Section title="Experience" count={items.length} adding={adding} onAdd={() => { setAdding((a) => !a); setEditing(null) }}>
      {adding && <ExperienceForm initial={emptyExp} busy={crud.create.isPending} onCancel={() => setAdding(false)} onSave={(d) => crud.create.mutate(d, { onSuccess: () => setAdding(false) })} />}
      {items.map((e) =>
        editing === e.id ? (
          <ExperienceForm key={e.id} initial={e} busy={crud.update.isPending} onCancel={() => setEditing(null)} onSave={(d) => crud.update.mutate({ id: e.id, data: d }, { onSuccess: () => setEditing(null) })} />
        ) : (
          <ItemCard key={e.id}
            title={`${e.title} @ ${e.company}`}
            subtitle={[e.location, [e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}
            onEdit={() => { setEditing(e.id); setAdding(false) }}
            onDelete={() => window.confirm('Delete this experience?') && crud.remove.mutate(e.id)}>
            {e.bullets.length > 0 && <ul className="admin-bank-bullets">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
            {e.skills.length > 0 && <p className="admin-muted admin-small">{e.skills.join(' · ')}</p>}
          </ItemCard>
        ),
      )}
    </Section>
  )
}

function ExperienceForm({ initial, onSave, onCancel, busy }) {
  const [f, setF] = useState({ ...initial, location: initial.location || '', startDate: initial.startDate || '', endDate: initial.endDate || '' })
  return (
    <div className="admin-bank-form">
      <div className="admin-form-grid">
        <label>Title<input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></label>
        <label>Company<input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} /></label>
        <label>Location<input value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} /></label>
        <label>Start<input placeholder="Jan 2024" value={f.startDate} onChange={(e) => setF({ ...f, startDate: e.target.value })} /></label>
        <label>End<input placeholder="Present" value={f.endDate} disabled={f.current} onChange={(e) => setF({ ...f, endDate: e.target.value })} /></label>
        <label className="admin-checkbox-row"><input type="checkbox" checked={f.current} onChange={(e) => setF({ ...f, current: e.target.checked })} /> Current role</label>
      </div>
      <label>Accomplishment bullets (one per line — facts; the AI rewrites them)<Lines value={f.bullets} onChange={(bullets) => setF({ ...f, bullets })} /></label>
      <label>Skills / tools used<Tags value={f.skills} onChange={(skills) => setF({ ...f, skills })} /></label>
      <FormActions onCancel={onCancel} onSave={() => onSave(f)} busy={busy} disabled={!f.title || !f.company} />
    </div>
  )
}

// ── Projects ──
const emptyProj = { name: '', description: '', url: '', bullets: [], skills: [] }

function ProjectSection({ items }) {
  const crud = useCrud('projects')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  return (
    <Section title="Projects" count={items.length} adding={adding} onAdd={() => { setAdding((a) => !a); setEditing(null) }}>
      {adding && <ProjectForm initial={emptyProj} busy={crud.create.isPending} onCancel={() => setAdding(false)} onSave={(d) => crud.create.mutate(d, { onSuccess: () => setAdding(false) })} />}
      {items.map((p) =>
        editing === p.id ? (
          <ProjectForm key={p.id} initial={p} busy={crud.update.isPending} onCancel={() => setEditing(null)} onSave={(d) => crud.update.mutate({ id: p.id, data: d }, { onSuccess: () => setEditing(null) })} />
        ) : (
          <ItemCard key={p.id} title={p.name} subtitle={p.description || undefined}
            onEdit={() => { setEditing(p.id); setAdding(false) }}
            onDelete={() => window.confirm('Delete this project?') && crud.remove.mutate(p.id)}>
            {p.bullets.length > 0 && <ul className="admin-bank-bullets">{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
            {p.skills.length > 0 && <p className="admin-muted admin-small">{p.skills.join(' · ')}</p>}
          </ItemCard>
        ),
      )}
    </Section>
  )
}

function ProjectForm({ initial, onSave, onCancel, busy }) {
  const [f, setF] = useState({ ...initial, description: initial.description || '', url: initial.url || '' })
  return (
    <div className="admin-bank-form">
      <div className="admin-form-grid">
        <label>Name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label>URL<input placeholder="https://…" value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} /></label>
      </div>
      <label>Short description<input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></label>
      <label>Highlights (one per line)<Lines value={f.bullets} onChange={(bullets) => setF({ ...f, bullets })} /></label>
      <label>Skills / tools<Tags value={f.skills} onChange={(skills) => setF({ ...f, skills })} /></label>
      <FormActions onCancel={onCancel} onSave={() => onSave(f)} busy={busy} disabled={!f.name} />
    </div>
  )
}

// ── Education ──
const emptyEdu = { school: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '', notes: '' }

function EducationSection({ items }) {
  const crud = useCrud('education')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  return (
    <Section title="Education" count={items.length} adding={adding} onAdd={() => { setAdding((a) => !a); setEditing(null) }}>
      {adding && <EducationForm initial={emptyEdu} busy={crud.create.isPending} onCancel={() => setAdding(false)} onSave={(d) => crud.create.mutate(d, { onSuccess: () => setAdding(false) })} />}
      {items.map((ed) =>
        editing === ed.id ? (
          <EducationForm key={ed.id} initial={ed} busy={crud.update.isPending} onCancel={() => setEditing(null)} onSave={(d) => crud.update.mutate({ id: ed.id, data: d }, { onSuccess: () => setEditing(null) })} />
        ) : (
          <ItemCard key={ed.id} title={ed.school}
            subtitle={[[ed.degree, ed.field].filter(Boolean).join(', '), ed.gpa ? `GPA ${ed.gpa}` : ''].filter(Boolean).join(' · ')}
            onEdit={() => { setEditing(ed.id); setAdding(false) }}
            onDelete={() => window.confirm('Delete this education entry?') && crud.remove.mutate(ed.id)}>
            {ed.notes && <p className="admin-muted admin-small">{ed.notes}</p>}
          </ItemCard>
        ),
      )}
    </Section>
  )
}

function EducationForm({ initial, onSave, onCancel, busy }) {
  const [f, setF] = useState({
    school: initial.school, degree: initial.degree || '', field: initial.field || '', location: initial.location || '',
    startDate: initial.startDate || '', endDate: initial.endDate || '', gpa: initial.gpa || '', notes: initial.notes || '',
  })
  return (
    <div className="admin-bank-form">
      <div className="admin-form-grid">
        <label>School<input value={f.school} onChange={(e) => setF({ ...f, school: e.target.value })} /></label>
        <label>Degree<input value={f.degree} onChange={(e) => setF({ ...f, degree: e.target.value })} /></label>
        <label>Field<input value={f.field} onChange={(e) => setF({ ...f, field: e.target.value })} /></label>
        <label>GPA<input value={f.gpa} onChange={(e) => setF({ ...f, gpa: e.target.value })} /></label>
        <label>Start<input value={f.startDate} onChange={(e) => setF({ ...f, startDate: e.target.value })} /></label>
        <label>End<input value={f.endDate} onChange={(e) => setF({ ...f, endDate: e.target.value })} /></label>
      </div>
      <label>Notes (honors, relevant coursework…)<input value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></label>
      <FormActions onCancel={onCancel} onSave={() => onSave(f)} busy={busy} disabled={!f.school} />
    </div>
  )
}

// ── Skills ──
function SkillSection({ items }) {
  const crud = useCrud('skills')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const groups = new Map()
  for (const s of items) {
    const c = s.category || 'General'
    groups.set(c, [...(groups.get(c) || []), s])
  }

  const add = () => {
    if (!name.trim()) return
    crud.create.mutate({ name: name.trim(), category: category.trim() || undefined }, { onSuccess: () => setName('') })
  }

  return (
    <section className="admin-bank-section">
      <div className="admin-bank-head"><h3>Skills <span className="admin-muted admin-small">({items.length})</span></h3></div>
      <div className="admin-skill-add">
        <input placeholder="Skill (e.g. TypeScript)" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <input placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button className="btn-primary" onClick={add} disabled={crud.create.isPending}>Add</button>
      </div>
      {[...groups.entries()].map(([cat, skills]) => (
        <div key={cat} className="admin-skill-group">
          <span className="admin-muted admin-small admin-skill-cat">{cat}</span>
          <div className="admin-skill-chips">
            {skills.map((s) => (
              <span key={s.id} className="admin-chip">
                {s.name}
                <button className="admin-chip-x" title="Remove" onClick={() => crud.remove.mutate(s.id)}>×</button>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
