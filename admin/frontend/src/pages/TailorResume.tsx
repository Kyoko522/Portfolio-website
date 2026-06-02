import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, compileResume } from '../lib/api';
import type { Application, TailoringSession, ScannerReport, StressReport } from '../lib/types';

// The "unrejectable résumé" workflow for one application: assemble from the
// profile bank, then step through Scanner → Surgeon → Stress Test, reviewing
// the AI's report between each step. The working LaTeX is editable throughout
// and can be compiled to PDF or saved as a résumé version.
export default function TailorResume() {
  const qc = useQueryClient();
  const [appId, setAppId] = useState('');
  const [tex, setTex] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const previewRef = useRef<string | null>(null);
  // Tracks the session revision we've loaded into the editor, so AI steps
  // refresh the editor but local typing isn't clobbered on refetch.
  const loadedRef = useRef<string>('');

  const appsQuery = useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: () => api.get<{ applications: Application[] }>('/applications').then((r) => r.applications),
  });

  const sessionQuery = useQuery<TailoringSession | null>({
    queryKey: ['tailoring', appId],
    queryFn: () => api.get<{ session: TailoringSession | null }>(`/tailoring/${appId}`).then((r) => r.session),
    enabled: !!appId,
  });

  const session = sessionQuery.data ?? null;

  // Load server LaTeX into the editor whenever a new session revision arrives.
  useEffect(() => {
    if (!session) { loadedRef.current = ''; setTex(''); return; }
    const rev = `${session.id}:${session.updatedAt}`;
    if (rev !== loadedRef.current) {
      setTex(session.texSource ?? '');
      loadedRef.current = rev;
    }
  }, [session]);

  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current); }, []);

  const refreshSession = () => qc.invalidateQueries({ queryKey: ['tailoring', appId] });

  // One mutation per AI step; they all hit /tailoring/:id/<step> and refresh.
  const assemble = useStepMutation(appId, 'assemble', 'Assembled draft from your profile bank', setStatus, refreshSession);
  const scan = useStepMutation(appId, 'scan', 'Scanner complete', setStatus, refreshSession);
  const operate = useStepMutation(appId, 'operate', 'Surgeon rewrite complete', setStatus, refreshSession);
  const stress = useStepMutation(appId, 'stress', 'Stress test complete', setStatus, refreshSession);

  const saveTex = useMutation({
    mutationFn: () => api.put(`/tailoring/${appId}/tex`, { texSource: tex }),
    onSuccess: () => { setStatus('Saved edits'); refreshSession(); },
    onError: (e) => setStatus((e as Error).message),
  });

  const saveVersion = useMutation({
    mutationFn: () => api.post(`/tailoring/${appId}/save-version`),
    onSuccess: () => setStatus('Saved as a résumé version (linked to this application)'),
    onError: (e) => setStatus((e as Error).message),
  });

  const compile = useMutation({
    mutationFn: () => compileResume(tex),
    onSuccess: (blob) => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      const url = URL.createObjectURL(blob);
      previewRef.current = url;
      setPreviewUrl(url);
      setStatus('Compiled preview');
    },
    onError: (e) => setStatus(`Compile failed: ${(e as Error).message}`),
  });

  const apps = appsQuery.data ?? [];
  const selectedApp = apps.find((a) => a.id === appId);
  const hasTex = !!session?.texSource;
  const busy = assemble.isPending || scan.isPending || operate.isPending || stress.isPending;

  return (
    <div className="tailor-page">
      <div className="page-header">
        <h2>Tailor résumé</h2>
        <select value={appId} onChange={(e) => { setAppId(e.target.value); setPreviewUrl(null); }} className="app-select">
          <option value="">Select an application…</option>
          {apps.map((a) => <option key={a.id} value={a.id}>{a.company} — {a.role}</option>)}
        </select>
      </div>

      {!appId && <p className="muted">Pick a job application to start. Add one (with its job description) on the Applications page first.</p>}

      {appId && selectedApp && !selectedApp.jobDescription && (
        <p className="error">This application has no job description. Add one on the Applications page — the tailoring engine needs it.</p>
      )}

      {appId && (
        <div className="tailor-split">
          {/* Left: the pipeline + reports */}
          <div className="tailor-steps">
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
            {session?.stressReport && <StressCard report={session.stressReport} previous={session.matchScore ?? undefined} />}

            {status && <p className="muted small tailor-status">{status}</p>}
          </div>

          {/* Right: editable LaTeX + preview */}
          <div className="tailor-editor">
            <div className="toolbar">
              <button className="btn" disabled={!hasTex || saveTex.isPending} onClick={() => saveTex.mutate()}>{saveTex.isPending ? 'Saving…' : 'Save edits'}</button>
              <button className="btn-secondary" disabled={!tex || compile.isPending} onClick={() => compile.mutate()}>{compile.isPending ? 'Compiling…' : 'Compile preview'}</button>
              <button className="btn-primary" disabled={!hasTex || saveVersion.isPending} onClick={() => saveVersion.mutate()}>{saveVersion.isPending ? 'Saving…' : 'Save as version'}</button>
            </div>
            <div className="editor-split">
              <div className="editor-pane">
                {hasTex ? (
                  <Editor height="100%" defaultLanguage="latex" value={tex} onChange={(v) => setTex(v ?? '')} options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }} />
                ) : (
                  <div className="muted editor-empty">Assemble a draft to see the résumé LaTeX here.</div>
                )}
              </div>
              <div className="preview-pane">
                {previewUrl ? <iframe title="preview" src={previewUrl} /> : <div className="muted editor-empty">Compile to preview the PDF.</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Builds one AI-step mutation. Defined as a hook so the four steps share logic.
function useStepMutation(
  appId: string,
  name: string,
  successMsg: string,
  setStatus: (s: string) => void,
  refresh: () => void,
) {
  return useMutation({
    mutationFn: () => api.post(`/tailoring/${appId}/${name}`),
    onSuccess: () => { setStatus(successMsg); refresh(); },
    onError: (e) => setStatus(`Failed: ${(e as Error).message}`),
  });
}

function StepRow({ n, title, desc, done, action }: { n: number; title: string; desc: string; done: boolean; action: React.ReactNode }) {
  return (
    <div className="step-row">
      <div className={`step-badge${done ? ' done' : ''}`}>{done ? '✓' : n}</div>
      <div className="step-body">
        <div className="step-title">{title}</div>
        <div className="muted small">{desc}</div>
      </div>
      <div className="step-action">{action}</div>
    </div>
  );
}

function Score({ value, label }: { value: number; label: string }) {
  const tone = value >= 80 ? 'good' : value >= 60 ? 'ok' : 'bad';
  return <span className={`score score-${tone}`}>{label}: {value}/100</span>;
}

function ScannerCard({ report }: { report: ScannerReport }) {
  return (
    <div className="report-card">
      <Score value={report.matchScore} label="Match" />
      <h4>Highest-impact change</h4>
      <p className="report-priority">{report.topPriorityChange}</p>

      {report.missingKeywords.length > 0 && <>
        <h4>Missing keywords</h4>
        <ul className="report-list">{report.missingKeywords.map((k, i) => <li key={i}><strong>{k.keyword}</strong> — <span className="muted">{k.placement}</span></li>)}</ul>
      </>}

      {report.redFlags.length > 0 && <>
        <h4>Red flags</h4>
        <ul className="report-list">{report.redFlags.map((r, i) => <li key={i}>{r}</li>)}</ul>
      </>}

      {report.sectionRatings.length > 0 && <>
        <h4>Section ratings</h4>
        <ul className="report-list">{report.sectionRatings.map((s, i) => <li key={i}><strong>{s.section} ({s.score}/10)</strong> — <span className="muted">{s.notes}</span></li>)}</ul>
      </>}
    </div>
  );
}

function StressCard({ report, previous }: { report: StressReport; previous?: number }) {
  return (
    <div className="report-card">
      <Score value={report.atsScore} label="ATS" />
      {previous != null && <span className="muted small"> {report.scoreImproved ? '▲ up' : '▼ down'} from {previous}</span>}
      <h4>Stop-the-scroll</h4>
      <p className="report-priority">{report.stopTheScroll}</p>
      {report.formattingIssues.length > 0 && <><h4>Formatting issues</h4><ul className="report-list">{report.formattingIssues.map((x, i) => <li key={i}>{x}</li>)}</ul></>}
      {report.keywordsStillMissing.length > 0 && <><h4>Keywords still missing</h4><p className="muted small">{report.keywordsStillMissing.join(' · ')}</p></>}
      {report.skippedSections.length > 0 && <><h4>Would skip</h4><p className="muted small">{report.skippedSections.join(' · ')}</p></>}
    </div>
  );
}
