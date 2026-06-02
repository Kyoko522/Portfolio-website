'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi, compileResume } from '../../../lib/adminApi'

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// The "unrejectable résumé" workflow for one application: assemble from the
// profile bank, then step through Scanner → Surgeon → Stress Test, reviewing
// the AI's report between each step. The working LaTeX is editable throughout,
// can be compiled to a PDF preview, and saved as a résumé version.
export default function TailorPage() {
  const qc = useQueryClient()
  const [appId, setAppId] = useState('')
  const [tex, setTex] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('')
  const previewRef = useRef(null)
  const loadedRef = useRef('')

  const appsQuery = useQuery({
    queryKey: ['admin-applications'],
    queryFn: () => adminApi.get('/applications').then((r) => r.applications),
  })

  const sessionQuery = useQuery({
    queryKey: ['admin-tailoring', appId],
    queryFn: () => adminApi.get(`/tailoring/${appId}`).then((r) => r.session),
    enabled: !!appId,
  })

  const session = sessionQuery.data || null

  // Preselect an application when arriving via the "Tailor" button on the
  // Applications page (it sets ?app=<id>). Read once on mount so we never force
  // the user to type a URL — navigation is button-driven.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('app')
    if (fromUrl) setAppId(fromUrl)
  }, [])

  // Load server LaTeX into the editor whenever a new session revision arrives,
  // but don't clobber in-progress local edits on background refetches.
  useEffect(() => {
    if (!session) { loadedRef.current = ''; setTex(''); return }
    const rev = `${session.id}:${session.updatedAt}`
    if (rev !== loadedRef.current) {
      setTex(session.texSource || '')
      loadedRef.current = rev
    }
  }, [session])

  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current) }, [])

  const refreshSession = () => qc.invalidateQueries({ queryKey: ['admin-tailoring', appId] })

  // One mutation per AI step. Each posts to /tailoring/:id/<step>, then refreshes
  // the session so the new report / working LaTeX renders.
  const runStep = (name) => adminApi.post(`/tailoring/${appId}/${name}`)
  const onStepDone = (msg) => () => { setStatus(msg); refreshSession() }
  const onStepError = (e) => setStatus(`Failed: ${e.message}`)

  const assemble = useMutation({ mutationFn: () => runStep('assemble'), onSuccess: onStepDone('Assembled draft from your profile bank'), onError: onStepError })
  const scan = useMutation({ mutationFn: () => runStep('scan'), onSuccess: onStepDone('Scanner complete'), onError: onStepError })
  const operate = useMutation({ mutationFn: () => runStep('operate'), onSuccess: onStepDone('Surgeon rewrite complete'), onError: onStepError })
  const stress = useMutation({ mutationFn: () => runStep('stress'), onSuccess: onStepDone('Stress test complete'), onError: onStepError })

  const saveTex = useMutation({
    mutationFn: () => adminApi.put(`/tailoring/${appId}/tex`, { texSource: tex }),
    onSuccess: () => { setStatus('Saved edits'); refreshSession() },
    onError: (e) => setStatus(e.message),
  })

  const saveVersion = useMutation({
    mutationFn: () => adminApi.post(`/tailoring/${appId}/save-version`),
    onSuccess: () => setStatus('Saved as a résumé version (linked to this application)'),
    onError: (e) => setStatus(e.message),
  })

  const compile = useMutation({
    mutationFn: () => compileResume(tex),
    onSuccess: (blob) => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current)
      const url = URL.createObjectURL(blob)
      previewRef.current = url
      setPreviewUrl(url)
      setStatus('Compiled preview')
    },
    onError: (e) => setStatus(`Compile failed: ${e.message}`),
  })

  const apps = appsQuery.data || []
  const selectedApp = apps.find((a) => a.id === appId)
  const hasTex = !!session?.texSource
  const busy = assemble.isPending || scan.isPending || operate.isPending || stress.isPending

  return (
    <div>
      <div className="admin-page-header">
        <h2>Tailor résumé</h2>
        <select className="admin-app-select" value={appId} onChange={(e) => { setAppId(e.target.value); setPreviewUrl(null) }}>
          <option value="">Select an application…</option>
          {apps.map((a) => <option key={a.id} value={a.id}>{a.company} — {a.role}</option>)}
        </select>
      </div>

      {!appId && <p className="admin-muted">Pick a job application to start. Add one (with its job description) on the Applications page first.</p>}

      {appId && selectedApp && !selectedApp.jobDescription && (
        <p className="admin-error">This application has no job description. Add one on the Applications page — the tailoring engine needs it.</p>
      )}

      {appId && (
        <div className="admin-tailor-split">
          <div className="admin-tailor-steps">
            <StepRow n={1} title="Assemble" done={!!session && session.stage !== 'NEW'}
              desc="Pick the best-fit experience & projects for this job."
              action={<button className="btn-primary" disabled={busy} onClick={() => assemble.mutate()}>{assemble.isPending ? 'Assembling…' : session ? 'Re-assemble' : 'Assemble'}</button>} />

            <StepRow n={2} title="Scanner" done={!!session?.scannerReport}
              desc="Diagnose: match score, missing keywords, red flags."
              action={<button className="btn-secondary" disabled={busy || !hasTex} onClick={() => scan.mutate()}>{scan.isPending ? 'Scanning…' : 'Run Scanner'}</button>} />
            {session?.scannerReport && <ScannerCard report={session.scannerReport} />}

            <StepRow n={3} title="Surgeon" done={session?.stage === 'OPERATED' || session?.stage === 'TESTED'}
              desc="Rewrite bullets (XYZ formula), inject keywords, fix flags."
              action={<button className="btn-secondary" disabled={busy || !session?.scannerReport} onClick={() => operate.mutate()}>{operate.isPending ? 'Rewriting…' : 'Run Surgeon'}</button>} />

            <StepRow n={4} title="Stress Test" done={!!session?.stressReport}
              desc="ATS re-scan + 7-second skim, then final edits."
              action={<button className="btn-secondary" disabled={busy || !hasTex} onClick={() => stress.mutate()}>{stress.isPending ? 'Testing…' : 'Run Stress Test'}</button>} />
            {session?.stressReport && <StressCard report={session.stressReport} previous={session.matchScore} />}

            {status && <p className="admin-muted admin-small">{status}</p>}
          </div>

          <div className="admin-tailor-editor">
            <div className="admin-toolbar">
              <button className="btn" disabled={!hasTex || saveTex.isPending} onClick={() => saveTex.mutate()}>{saveTex.isPending ? 'Saving…' : 'Save edits'}</button>
              <button className="btn-secondary" disabled={!tex || compile.isPending} onClick={() => compile.mutate()}>{compile.isPending ? 'Compiling…' : 'Compile preview'}</button>
              <button className="btn-primary" disabled={!hasTex || saveVersion.isPending} onClick={() => saveVersion.mutate()}>{saveVersion.isPending ? 'Saving…' : 'Save as version'}</button>
            </div>
            <div className="admin-split">
              <div className="admin-pane">
                {hasTex ? (
                  <Editor height="100%" defaultLanguage="plaintext" theme="vs-dark" value={tex} onChange={(v) => setTex(v ?? '')} options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }} />
                ) : (
                  <div className="admin-pane-empty">Assemble a draft to see the résumé LaTeX here.</div>
                )}
              </div>
              <div className="admin-pane">
                {previewUrl ? <iframe title="preview" src={previewUrl} /> : <div className="admin-pane-empty">Compile to preview the PDF.</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StepRow({ n, title, desc, done, action }) {
  return (
    <div className="admin-step-row">
      <div className={`admin-step-badge${done ? ' done' : ''}`}>{done ? '✓' : n}</div>
      <div className="admin-step-body">
        <div className="admin-step-title">{title}</div>
        <div className="admin-muted admin-small">{desc}</div>
      </div>
      <div>{action}</div>
    </div>
  )
}

function Score({ value, label }) {
  const tone = value >= 80 ? 'good' : value >= 60 ? 'ok' : 'bad'
  return <span className={`admin-score admin-score-${tone}`}>{label}: {value}/100</span>
}

function ScannerCard({ report }) {
  return (
    <div className="admin-report-card">
      <Score value={report.matchScore} label="Match" />
      <h4>Highest-impact change</h4>
      <p className="admin-report-priority">{report.topPriorityChange}</p>
      {report.missingKeywords?.length > 0 && <>
        <h4>Missing keywords</h4>
        <ul className="admin-report-list">{report.missingKeywords.map((k, i) => <li key={i}><strong>{k.keyword}</strong> — <span className="admin-muted">{k.placement}</span></li>)}</ul>
      </>}
      {report.redFlags?.length > 0 && <>
        <h4>Red flags</h4>
        <ul className="admin-report-list">{report.redFlags.map((r, i) => <li key={i}>{r}</li>)}</ul>
      </>}
      {report.sectionRatings?.length > 0 && <>
        <h4>Section ratings</h4>
        <ul className="admin-report-list">{report.sectionRatings.map((s, i) => <li key={i}><strong>{s.section} ({s.score}/10)</strong> — <span className="admin-muted">{s.notes}</span></li>)}</ul>
      </>}
    </div>
  )
}

function StressCard({ report, previous }) {
  return (
    <div className="admin-report-card">
      <Score value={report.atsScore} label="ATS" />
      {previous != null && <span className="admin-muted admin-small"> {report.scoreImproved ? '▲ up' : '▼ down'} from {previous}</span>}
      <h4>Stop-the-scroll</h4>
      <p className="admin-report-priority">{report.stopTheScroll}</p>
      {report.formattingIssues?.length > 0 && <><h4>Formatting issues</h4><ul className="admin-report-list">{report.formattingIssues.map((x, i) => <li key={i}>{x}</li>)}</ul></>}
      {report.keywordsStillMissing?.length > 0 && <><h4>Keywords still missing</h4><p className="admin-muted admin-small">{report.keywordsStillMissing.join(' · ')}</p></>}
      {report.skippedSections?.length > 0 && <><h4>Would skip</h4><p className="admin-muted admin-small">{report.skippedSections.join(' · ')}</p></>}
    </div>
  )
}
