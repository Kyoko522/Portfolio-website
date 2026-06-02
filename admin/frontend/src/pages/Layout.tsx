import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useLogout, useMe } from '../auth';

export default function Layout() {
  const { data: user } = useMe();
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">Résumé Portal</div>
        <nav className="nav">
          <NavLink to="/resume">Résumé</NavLink>
          <NavLink to="/profile">Profile bank</NavLink>
          <NavLink to="/tailor">Tailor</NavLink>
          <NavLink to="/applications">Applications</NavLink>
        </nav>
        <div className="spacer" />
        <span className="muted small">{user?.email}</span>
        <button
          className="btn-ghost"
          onClick={() => logout.mutate(undefined, { onSuccess: () => navigate('/login') })}
        >
          Log out
        </button>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
