const BASE = '/api';

export interface ApiError extends Error {
  status?: number;
  body?: unknown;
}

// Thin fetch wrapper. credentials:'include' sends the auth cookie; non-2xx
// responses are turned into thrown ApiErrors carrying the status + parsed body.
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    ...options,
  });

  if (res.status === 204) return undefined as T;

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (body as { message?: string; error?: string })?.message ??
      (body as { error?: string })?.error ??
      res.statusText;
    const err = new Error(message) as ApiError;
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  del: (path: string) => request<void>(path, { method: 'DELETE' }),
};

// The compile endpoint returns a PDF (binary), not JSON — handled separately.
export async function compileResume(texSource: string): Promise<Blob> {
  const res = await fetch(BASE + '/resume/compile', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texSource }),
  });
  if (!res.ok) {
    let message = 'Compilation failed';
    try {
      const b = await res.json();
      message = b.message ?? message;
    } catch {
      /* non-JSON error */
    }
    const err = new Error(message) as ApiError;
    err.status = res.status;
    throw err;
  }
  return res.blob();
}
