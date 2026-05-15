'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VAULT_BLOB } from './secret/encrypted'

const LOCKOUT_MS    = 30 * 60 * 1000  // 30 minutes
const WARN_AFTER    = 3               // show remaining count after this many fails

async function deriveKey(password, salt) {
  const raw = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    raw,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
}

async function tryDecrypt(password) {
  const bytes = Uint8Array.from(atob(VAULT_BLOB), c => c.charCodeAt(0))
  const salt          = bytes.slice(0, 16)
  const iv            = bytes.slice(16, 28)
  const ciphertextTag = bytes.slice(28)
  try {
    const key      = await deriveKey(password, salt)
    const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, ciphertextTag)
    return new TextDecoder().decode(plainBuf)
  } catch {
    return null
  }
}

function getMaxAttempts() {
  const stored = localStorage.getItem('vault_max')
  if (stored) return parseInt(stored, 10)
  const max = Math.floor(Math.random() * 3) + 6  // 6, 7, or 8
  localStorage.setItem('vault_max', String(max))
  return max
}

function getLockoutState() {
  const lockoutTime = localStorage.getItem('vault_lockout')
  if (!lockoutTime) return { locked: false, remaining: 0 }
  const elapsed = Date.now() - parseInt(lockoutTime, 10)
  if (elapsed >= LOCKOUT_MS) {
    localStorage.removeItem('vault_lockout')
    localStorage.removeItem('vault_attempts')
    localStorage.removeItem('vault_max')
    return { locked: false, remaining: 0 }
  }
  return { locked: true, remaining: LOCKOUT_MS - elapsed }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function VaultPage() {
  const [password,  setPassword]  = useState('')
  const [error,     setError]     = useState(false)
  const [shake,     setShake]     = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [attempts,  setAttempts]  = useState(0)
  const [maxAttempts, setMaxAttempts] = useState(7)
  const [locked,    setLocked]    = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router   = useRouter()
  const inputRef = useRef(null)

  useEffect(() => {
    fetch('/api/vault-log', { method: 'POST' }).catch(() => {})

    const { locked: isLocked, remaining } = getLockoutState()
    const stored = parseInt(localStorage.getItem('vault_attempts') || '0', 10)
    const max    = getMaxAttempts()
    setAttempts(stored)
    setMaxAttempts(max)
    if (isLocked) { setLocked(true); setCountdown(remaining) }
  }, [])

  // Countdown timer while locked out
  useEffect(() => {
    if (!locked) return
    const id = setInterval(() => {
      const { locked: stillLocked, remaining } = getLockoutState()
      if (!stillLocked) {
        setLocked(false)
        setAttempts(0)
        setMaxAttempts(getMaxAttempts())
        setCountdown(0)
      } else {
        setCountdown(remaining)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [locked])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (locked) return
    setLoading(true)
    setError(false)

    const plaintext = await tryDecrypt(password)

    if (plaintext) {
      sessionStorage.setItem('vault_auth', '1')
      sessionStorage.setItem('vault_data', plaintext)
      router.push('/vault/secret')
    } else {
      const newAttempts = attempts + 1
      localStorage.setItem('vault_attempts', String(newAttempts))
      setAttempts(newAttempts)

      if (newAttempts >= maxAttempts) {
        localStorage.setItem('vault_lockout', String(Date.now()))
        setLocked(true)
        setCountdown(LOCKOUT_MS)
      }

      setError(true)
      setShake(true)
      setPassword('')
      setLoading(false)
      setTimeout(() => { setShake(false); inputRef.current?.focus() }, 600)
    }
  }

  const remaining = maxAttempts - attempts
  const showWarning = !locked && attempts >= WARN_AFTER
  const mins = String(Math.floor(countdown / 60000)).padStart(2, '0')
  const secs = String(Math.floor((countdown % 60000) / 1000)).padStart(2, '0')

  return (
    <main className="gate">
      <div className={`card${shake ? ' shake' : ''}`}>
        <p className="label">{"// restricted access"}</p>
        <h1 className="title">VAULT</h1>

        {locked ? (
          <>
            <p className="sub locked-sub">access suspended</p>
            <div className="lockout-box">
              <p className="lockout-icon">🔒</p>
              <p className="lockout-msg">{"// too many failed attempts"}</p>
              <p className="lockout-timer">{mins}:{secs}</p>
              <p className="lockout-hint">retry after cooldown expires</p>
            </div>
          </>
        ) : (
          <>
            <p className="sub">enter passphrase to continue</p>
            <form onSubmit={handleSubmit} className="form">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                placeholder="passphrase"
                autoFocus
                disabled={loading}
                className={`inp${error ? ' err' : ''}`}
              />
              {error && !showWarning && (
                <p className="errmsg">{"// access denied — invalid passphrase"}</p>
              )}
              {showWarning && (
                <p className="errmsg warn">
                  {"// "}{remaining} attempt{remaining !== 1 ? 's' : ''} remaining before lockout
                </p>
              )}
              <button type="submit" disabled={loading} className="btn">
                {loading ? 'decrypting…' : 'authenticate →'}
              </button>
            </form>
          </>
        )}

        <a href="/" className="hint">nothing to see here</a>
      </div>

      <style>{`
        .gate {
          min-height: 100vh;
          background: var(--color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
        }
        .card {
          background: var(--color-primary-darker);
          border: 1px solid rgba(132,94,194,0.35);
          border-radius: 14px;
          padding: 2.8rem 3.2rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 0 80px rgba(132,94,194,0.12), 0 0 24px rgba(132,94,194,0.08);
        }
        .card.shake { animation: shake 0.55s cubic-bezier(.36,.07,.19,.97) both; }
        .label {
          font-family: 'GeistMono', 'Courier New', monospace;
          font-size: 0.72rem;
          color: var(--color-secondary);
          letter-spacing: 0.12em;
          margin-bottom: 0.6rem;
        }
        .title {
          font-size: 3.2rem;
          font-weight: 600;
          color: var(--color-primary);
          letter-spacing: 0.4em;
          margin-bottom: 0.4rem;
          text-shadow: 0 0 24px rgba(132,94,194,0.45);
        }
        .sub {
          font-size: 0.78rem;
          color: var(--color-primary-lighter);
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
        }
        .locked-sub { color: #ff6b6b; margin-bottom: 1.4rem; }
        .lockout-box {
          background: rgba(255,107,107,0.06);
          border: 1px solid rgba(255,107,107,0.25);
          border-radius: 9px;
          padding: 1.6rem 1.2rem;
          margin-bottom: 0.5rem;
        }
        .lockout-icon { font-size: 2rem; margin: 0 0 0.6rem; }
        .lockout-msg {
          font-family: 'GeistMono', 'Courier New', monospace;
          font-size: 0.7rem;
          color: #ff6b6b;
          letter-spacing: 0.06em;
          margin-bottom: 1rem;
        }
        .lockout-timer {
          font-family: 'GeistMono', 'Courier New', monospace;
          font-size: 2.4rem;
          font-weight: 700;
          color: #ff6b6b;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
        }
        .lockout-hint {
          font-size: 0.68rem;
          color: rgba(255,107,107,0.5);
          letter-spacing: 0.05em;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .inp {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(132,94,194,0.45);
          border-radius: 7px;
          padding: 0.8rem 1rem;
          color: var(--color-white);
          font-size: 1rem;
          font-family: 'GeistMono', 'Courier New', monospace;
          letter-spacing: 0.25em;
          text-align: center;
          outline: none;
          width: 100%;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .inp:focus { border-color: var(--color-primary); box-shadow: 0 0 18px rgba(132,94,194,0.2); }
        .inp.err { border-color: #ff6b6b; box-shadow: 0 0 14px rgba(255,107,107,0.2); }
        .inp::placeholder { color: rgba(255,255,255,0.18); letter-spacing: 0.1em; }
        .inp:disabled { opacity: 0.6; cursor: not-allowed; }
        .errmsg {
          font-family: 'GeistMono', 'Courier New', monospace;
          font-size: 0.7rem;
          color: #ff6b6b;
          letter-spacing: 0.04em;
          text-align: left;
          padding-left: 2px;
        }
        .errmsg.warn { color: #f0a500; }
        .btn {
          background: var(--color-primary);
          color: var(--color-primary-darker);
          border: none;
          border-radius: 7px;
          padding: 0.82rem;
          font-size: 0.88rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.06em;
          transition: background 0.25s, transform 0.1s, opacity 0.2s;
          margin-top: 0.25rem;
        }
        .btn:hover:not(:disabled) { background: var(--color-background-variant); color: #fff; }
        .btn:active:not(:disabled) { transform: scale(0.98); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .hint {
          display: block;
          font-size: 0.65rem;
          color: rgba(163,163,204,0.3);
          margin-top: 2rem;
          letter-spacing: 0.08em;
          text-decoration: none;
          cursor: default;
        }
        .hint:hover { color: rgba(163,163,204,0.3); text-decoration: none; }
        @keyframes shake {
          10%,90%     { transform: translate3d(-2px,0,0); }
          20%,80%     { transform: translate3d(4px,0,0); }
          30%,50%,70% { transform: translate3d(-8px,0,0); }
          40%,60%     { transform: translate3d(8px,0,0); }
        }
        @media (max-width: 480px) {
          .card { margin: 1rem; padding: 2rem 1.5rem; }
          .title { font-size: 2.5rem; }
        }
      `}</style>
    </main>
  )
}
