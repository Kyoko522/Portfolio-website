'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useQuery, useMutation } from '@tanstack/react-query'
import { adminApi, compileResume } from '../../../lib/adminApi'

// Monaco touches `window`, so load it client-only.
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function ResumePage() {
  const [tex, setTex] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('')
  const previewRef = useRef(null)

  const draftQuery = useQuery({
    queryKey: ['admin-resume-draft'],
    queryFn: () => adminApi.get('/resume/draft'),
  })

  useEffect(() => {
    if (draftQuery.data && !loaded) {
      setTex(draftQuery.data.texSource)
      setLoaded(true)
    }
  }, [draftQuery.data, loaded])

  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    },
    [],
  )

  const save = useMutation({
    mutationFn: () => adminApi.put('/resume/draft', { texSource: tex }),
    onSuccess: (d) => setStatus(`Saved at ${new Date(d.updatedAt).toLocaleTimeString()}`),
    onError: (e) => setStatus(`Save failed: ${e.message}`),
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

  const publish = useMutation({
    mutationFn: () => adminApi.post('/resume/publish'),
    onSuccess: (r) => setStatus(r.message),
    onError: (e) => setStatus(`Publish failed: ${e.message}`),
  })

  if (draftQuery.isLoading) return <div className="admin-muted">Loading résumé…</div>
  if (draftQuery.isError) {
    return <div className="admin-error">Failed to load résumé: {draftQuery.error.message}</div>
  }

  const busy = save.isPending || compile.isPending || publish.isPending

  return (
    <div className="admin-editor-page">
      <div className="admin-toolbar">
        <button className="btn" onClick={() => save.mutate()} disabled={busy}>
          {save.isPending ? 'Saving…' : 'Save draft'}
        </button>
        <button className="btn-secondary" onClick={() => compile.mutate()} disabled={busy}>
          {compile.isPending ? 'Compiling…' : 'Compile preview'}
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            if (window.confirm('Publish the current résumé to your live site?')) publish.mutate()
          }}
          disabled={busy}
        >
          {publish.isPending ? 'Publishing…' : 'Publish'}
        </button>
        <span className="admin-status admin-muted admin-small">{status}</span>
      </div>

      <div className="admin-split">
        <div className="admin-pane">
          <Editor
            height="100%"
            defaultLanguage="plaintext"
            theme="vs-dark"
            value={tex}
            onChange={(v) => setTex(v ?? '')}
            options={{ minimap: { enabled: false }, wordWrap: 'on', fontSize: 13 }}
          />
        </div>
        <div className="admin-pane">
          {previewUrl ? (
            <iframe title="résumé preview" src={previewUrl} />
          ) : (
            <div className="admin-pane-empty">Click "Compile preview" to render the PDF.</div>
          )}
        </div>
      </div>
    </div>
  )
}
