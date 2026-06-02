import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api, compileResume } from '../lib/api';
import type { ResumeDraft, PublishResult } from '../lib/types';

export default function ResumeEditor() {
  const [tex, setTex] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const previewRef = useRef<string | null>(null);

  const draftQuery = useQuery<ResumeDraft>({
    queryKey: ['resume-draft'],
    queryFn: () => api.get<ResumeDraft>('/resume/draft'),
  });

  // Seed the editor once the draft loads (but don't clobber edits on refetch).
  useEffect(() => {
    if (draftQuery.data && !loaded) {
      setTex(draftQuery.data.texSource);
      setLoaded(true);
    }
  }, [draftQuery.data, loaded]);

  // Release the object URL when the component unmounts.
  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
  }, []);

  const save = useMutation({
    mutationFn: () => api.put<{ id: string; updatedAt: string }>('/resume/draft', { texSource: tex }),
    onSuccess: (d) => setStatus(`Saved at ${new Date(d.updatedAt).toLocaleTimeString()}`),
    onError: (e) => setStatus(`Save failed: ${(e as Error).message}`),
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

  const publish = useMutation({
    mutationFn: () => api.post<PublishResult>('/resume/publish'),
    onSuccess: (r) => setStatus(r.message),
    onError: (e) => setStatus(`Publish failed: ${(e as Error).message}`),
  });

  if (draftQuery.isLoading) return <div className="muted">Loading résumé…</div>;
  if (draftQuery.isError) {
    return <div className="error">Failed to load résumé: {(draftQuery.error as Error).message}</div>;
  }

  const busy = save.isPending || compile.isPending || publish.isPending;

  return (
    <div className="editor-page">
      <div className="toolbar">
        <button className="btn" onClick={() => save.mutate()} disabled={busy}>
          {save.isPending ? 'Saving…' : 'Save draft'}
        </button>
        <button className="btn-secondary" onClick={() => compile.mutate()} disabled={busy}>
          {compile.isPending ? 'Compiling…' : 'Compile preview'}
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            if (window.confirm('Publish the current résumé to your live site?')) publish.mutate();
          }}
          disabled={busy}
        >
          {publish.isPending ? 'Publishing…' : 'Publish'}
        </button>
        <span className="status muted small">{status}</span>
      </div>

      <div className="editor-split">
        <div className="editor-pane">
          <Editor
            height="100%"
            defaultLanguage="plaintext"
            value={tex}
            onChange={(v) => setTex(v ?? '')}
            options={{ minimap: { enabled: false }, wordWrap: 'on', fontSize: 13 }}
          />
        </div>
        <div className="preview-pane">
          {previewUrl ? (
            <iframe title="résumé preview" src={previewUrl} />
          ) : (
            <div className="muted center-pane">Click "Compile preview" to render the PDF.</div>
          )}
        </div>
      </div>
    </div>
  );
}
