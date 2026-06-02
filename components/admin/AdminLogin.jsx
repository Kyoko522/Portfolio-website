'use client'
import { useState } from 'react'
import { useLogin } from './auth'

export default function AdminLogin() {
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    login.mutate({ email, password })
  }

  return (
    <div className="admin-center">
      <form className="admin-card admin-login" onSubmit={submit}>
        <h1>Resume Portal</h1>
        <p className="admin-muted admin-small">Sign in to manage your resume and applications.</p>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {login.isError && <div className="admin-error">{login.error.message}</div>}
        <button className="btn-primary" type="submit" disabled={login.isPending}>
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
