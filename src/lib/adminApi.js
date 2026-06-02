// Talks to the admin backend through the Next rewrite (/admin-api -> backend
// /api). Same-origin from the browser's view, so the httpOnly auth cookie is
// sent automatically with credentials:'include'.
const BASE = '/admin-api'

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (res.status === 204) return undefined

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await res.json() : await res.text()

  if (!res.ok) {
    const err = new Error(body?.message || body?.error || res.statusText)
    err.status = res.status
    err.body = body
    throw err
  }
  return body
}

export const adminApi = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: (path, data) => request(path, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  patch: (path, data) => request(path, { method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  del: (path) => request(path, { method: 'DELETE' }),
}

// The compile endpoint returns a PDF (binary), not JSON.
export async function compileResume(texSource) {
  const res = await fetch(BASE + '/resume/compile', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texSource }),
  })
  if (!res.ok) {
    let message = 'Compilation failed'
    try {
      const b = await res.json()
      message = b.message || message
    } catch {
      /* non-JSON error body */
    }
    const err = new Error(message)
    err.status = res.status
    throw err
  }
  return res.blob()
}

// Compiles cover-letter text to a downloadable PDF (returns a Blob).
export async function coverLetterPdf(content) {
  const res = await fetch(BASE + '/coverletter/pdf', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) {
    let message = 'PDF generation failed'
    try {
      const b = await res.json()
      message = b.message || message
    } catch {
      /* non-JSON error body */
    }
    const err = new Error(message)
    err.status = res.status
    throw err
  }
  return res.blob()
}

export const APPLICATION_STATUSES = [
  'DRAFT',
  'APPLIED',
  'WAITING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
]
