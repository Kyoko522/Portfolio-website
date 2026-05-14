'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// No data.js import — all content comes from sessionStorage after decryption

export default function VaultContent() {
  const router = useRouter()

  // Safe: this component is never SSR'd (dynamic ssr:false in page.js)
  const raw    = sessionStorage.getItem('vault_data')
  const authed = sessionStorage.getItem('vault_auth') === '1'

  // Parse once — sessionStorage data is static for this session
  let CATEGORIES = [], SECTIONS = {}
  try {
    if (raw) { ({ CATEGORIES = [], SECTIONS = {} } = JSON.parse(raw)) }
  } catch { /* leave empty */ }

  const WIKI_CATS  = CATEGORIES.filter(c => c.group === 'Wiki')
  const TOOLS_CATS = CATEGORIES.filter(c => c.group === 'Tools')

  const [activeId,     setActiveId]     = useState('movies')
  const [openSections, setOpenSections] = useState(() => new Set(['streaming', 'single-server', 'aggregators']))
  const [query,        setQuery]        = useState('')
  const [sidebarOpen,  setSidebarOpen]  = useState(false)

  const logout = useCallback(() => {
    sessionStorage.removeItem('vault_auth')
    sessionStorage.removeItem('vault_data')
    router.push('/vault')
  }, [router])

  const toggleSection = useCallback((id) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  if (!authed || !raw) {
    router.replace('/vault')
    return null
  }

  const activeCat = CATEGORIES.find(c => c.id === activeId)

  const currentSections = (SECTIONS[activeId] || []).map(s => ({
    ...s,
    sites: s.sites.filter(site => site.active !== false),
  }))

  const hasContent = currentSections.length > 0

  const expandAll   = () => setOpenSections(new Set(currentSections.map(s => s.id)))
  const collapseAll = () => setOpenSections(new Set())

  const filteredSections = hasContent && query.trim()
    ? currentSections
        .map(s => ({ ...s, sites: s.sites.filter(site => site.name.toLowerCase().includes(query.toLowerCase())) }))
        .filter(s => s.sites.length > 0)
    : currentSections

  return (
    <div className="vs-root">
      {/* Top bar */}
      <header className="vs-bar">
        <div className="vs-bar-left">
          <button className="vs-hamburger" onClick={() => setSidebarOpen(v => !v)} aria-label="menu">☰</button>
          <span className="vs-logo">🔐 <strong>vault</strong></span>
          <span className="vs-slash">/</span>
          <span className="vs-section-name">{activeCat?.icon} {activeCat?.name}</span>
        </div>
        <div className="vs-bar-right">
          <button onClick={logout} className="vs-logout">lock</button>
        </div>
      </header>

      <div className="vs-layout">
        {sidebarOpen && <div className="vs-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <nav className={`vs-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="vs-nav-group">
            <p className="vs-nav-heading">Wiki</p>
            {WIKI_CATS.map(cat => (
              <button
                key={cat.id}
                className={`vs-nav-item${activeId === cat.id ? ' active' : ''}`}
                onClick={() => { setActiveId(cat.id); setQuery(''); setOpenSections(new Set()); setSidebarOpen(false) }}
              >
                <span className="vs-nav-icon">{cat.icon}</span>{cat.name}
              </button>
            ))}
          </div>
          <div className="vs-nav-group">
            <p className="vs-nav-heading">Tools</p>
            {TOOLS_CATS.map(cat => (
              <button
                key={cat.id}
                className={`vs-nav-item${activeId === cat.id ? ' active' : ''}`}
                onClick={() => { setActiveId(cat.id); setQuery(''); setOpenSections(new Set()); setSidebarOpen(false) }}
              >
                <span className="vs-nav-icon">{cat.icon}</span>{cat.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="vs-main">
          {hasContent ? (
            <>
              <div className="vs-main-header">
                <div>
                  <h2 className="vs-main-title">{activeCat?.icon} {activeCat?.name}</h2>
                  <p className="vs-main-desc">{activeCat?.desc}</p>
                </div>
              </div>

              <div className="vs-search-row">
                <input
                  type="text"
                  placeholder="search sites..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="vs-search"
                />
                <div className="vs-accordion-btns">
                  <button onClick={expandAll}   className="vs-xbtn">expand all</button>
                  <button onClick={collapseAll} className="vs-xbtn">collapse all</button>
                </div>
              </div>

              <div className="vs-sections">
                {filteredSections.map(section => (
                  <div key={section.id} className="vs-section">
                    <button className="vs-section-head" onClick={() => toggleSection(section.id)}>
                      <span className="vs-section-arrow">{openSections.has(section.id) ? '▾' : '▸'}</span>
                      <span className="vs-section-title">{section.title}</span>
                      <span className="vs-section-count">{section.sites.length} sites</span>
                    </button>
                    {openSections.has(section.id) && (
                      <div className="vs-section-body">
                        {section.tip && <p className="vs-tip">💡 {section.tip}</p>}
                        <div className="vs-site-grid">
                          {section.sites.map(site => (
                            <a
                              key={site.name}
                              href={site.url ?? `https://duckduckgo.com/?q=${encodeURIComponent(site.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`vs-site-pill${site.starred ? ' starred' : ''}`}
                            >{site.starred && <span className="vs-star">★</span>}{site.name}</a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {query && filteredSections.length === 0 && (
                  <p className="vs-empty">No sites match &quot;{query}&quot;</p>
                )}
              </div>
            </>
          ) : (
            <div className="vs-cat-view">
              <div className="vs-cat-icon">{activeCat?.icon}</div>
              <h2 className="vs-cat-title">{activeCat?.name}</h2>
              <p className="vs-cat-desc">{activeCat?.desc}</p>
              <p className="vs-coming-soon">{"// coming soon"}</p>
            </div>
          )}
        </main>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .vs-root {
          min-height: 100vh;
          background: var(--color-background);
          color: var(--color-white);
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-direction: column;
        }
        .vs-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem; height: 52px;
          background: var(--color-primary-darker);
          border-bottom: 1px solid rgba(132,94,194,0.3);
          position: sticky; top: 0; z-index: 100; flex-shrink: 0;
        }
        .vs-bar-left, .vs-bar-right { display: flex; align-items: center; gap: 0.75rem; }
        .vs-hamburger {
          display: none; background: none; border: none;
          color: var(--color-primary-lighter); font-size: 1.2rem; cursor: pointer;
        }
        .vs-logo { font-family: 'GeistMono','Courier New',monospace; font-size: 0.85rem; color: var(--color-primary); letter-spacing: 0.05em; }
        .vs-slash { color: rgba(163,163,204,0.4); font-size: 0.85rem; }
        .vs-section-name { font-size: 0.82rem; color: var(--color-primary-lighter); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
        .vs-logout {
          font-family: 'GeistMono','Courier New',monospace; font-size: 0.75rem;
          background: none; border: 1px solid rgba(132,94,194,0.4); border-radius: 4px;
          color: var(--color-primary-lighter); padding: 0.3rem 0.65rem; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .vs-logout:hover { border-color: var(--color-primary); color: var(--color-white); }
        .vs-layout { display: flex; flex: 1; overflow: hidden; position: relative; height: calc(100vh - 52px); }
        .vs-sidebar {
          width: 240px; flex-shrink: 0;
          background: var(--color-primary-darker);
          border-right: 1px solid rgba(132,94,194,0.2);
          overflow-y: auto; padding: 1rem 0;
        }
        .vs-nav-group { margin-bottom: 1.25rem; }
        .vs-nav-heading { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(163,163,204,0.5); padding: 0 1rem 0.4rem; text-transform: uppercase; }
        .vs-nav-item {
          display: flex; align-items: center; gap: 0.5rem; width: 100%;
          padding: 0.45rem 1rem; background: none; border: none;
          color: var(--color-primary-lighter); font-family: 'Poppins',sans-serif;
          font-size: 0.8rem; text-align: left; cursor: pointer;
          border-left: 2px solid transparent;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .vs-nav-item:hover { background: rgba(132,94,194,0.12); color: var(--color-white); }
        .vs-nav-item.active { background: rgba(132,94,194,0.18); color: var(--color-white); border-left-color: var(--color-primary); }
        .vs-nav-icon { font-size: 0.9rem; flex-shrink: 0; }
        .vs-main { flex: 1; overflow-y: auto; padding: 2rem 2.5rem; min-width: 0; }
        .vs-main-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .vs-main-title { font-size: 1.5rem; font-weight: 600; color: var(--color-white); margin-bottom: 0.3rem; }
        .vs-main-desc { font-size: 0.82rem; color: var(--color-primary-lighter); max-width: 500px; }
        .vs-search-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .vs-search {
          flex: 1; min-width: 180px; max-width: 320px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(132,94,194,0.35);
          border-radius: 6px; padding: 0.55rem 0.9rem; color: var(--color-white);
          font-family: 'Poppins',sans-serif; font-size: 0.82rem; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vs-search:focus { border-color: var(--color-primary); box-shadow: 0 0 12px rgba(132,94,194,0.15); }
        .vs-search::placeholder { color: rgba(163,163,204,0.4); }
        .vs-accordion-btns { display: flex; gap: 0.5rem; }
        .vs-xbtn {
          font-size: 0.72rem; background: none; border: 1px solid rgba(132,94,194,0.3);
          border-radius: 5px; color: var(--color-primary-lighter); padding: 0.35rem 0.7rem;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .vs-xbtn:hover { border-color: var(--color-primary); color: var(--color-white); }
        .vs-sections { display: flex; flex-direction: column; gap: 0.6rem; }
        .vs-section { border: 1px solid rgba(132,94,194,0.2); border-radius: 8px; overflow: hidden; background: rgba(39,35,65,0.5); }
        .vs-section-head {
          display: flex; align-items: center; gap: 0.6rem; width: 100%;
          padding: 0.8rem 1rem; background: none; border: none;
          color: var(--color-white); font-family: 'Poppins',sans-serif;
          font-size: 0.85rem; font-weight: 500; text-align: left; cursor: pointer;
          transition: background 0.15s;
        }
        .vs-section-head:hover { background: rgba(132,94,194,0.1); }
        .vs-section-arrow { color: var(--color-primary); font-size: 0.9rem; flex-shrink: 0; }
        .vs-section-title { flex: 1; }
        .vs-section-count { font-size: 0.7rem; color: rgba(163,163,204,0.5); font-weight: 400; }
        .vs-section-body { padding: 0 1rem 1rem; }
        .vs-tip {
          font-size: 0.75rem; color: var(--color-primary-lighter);
          background: rgba(132,94,194,0.08); border-left: 2px solid var(--color-primary);
          padding: 0.5rem 0.75rem; border-radius: 0 4px 4px 0;
          margin-bottom: 0.85rem; line-height: 1.5;
        }
        .vs-site-grid { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .vs-site-pill {
          display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.3rem 0.7rem;
          background: rgba(132,94,194,0.1); border: 1px solid rgba(132,94,194,0.25);
          border-radius: 20px; font-size: 0.75rem; color: var(--color-light);
          text-decoration: none; transition: background 0.15s, border-color 0.15s, color 0.15s; line-height: 1.4;
        }
        .vs-site-pill:hover { background: rgba(132,94,194,0.25); border-color: var(--color-primary); color: var(--color-white); }
        .vs-site-pill.starred { border-color: rgba(255,200,60,0.45); background: rgba(255,200,60,0.07); }
        .vs-site-pill.starred:hover { border-color: rgba(255,200,60,0.8); background: rgba(255,200,60,0.15); color: var(--color-white); }
        .vs-star { font-size: 0.65rem; color: #ffc83c; line-height: 1; flex-shrink: 0; }
        .vs-empty { font-size: 0.85rem; color: rgba(163,163,204,0.5); padding: 2rem; text-align: center; }
        .vs-cat-view { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; gap: 1rem; }
        .vs-cat-icon { font-size: 4rem; line-height: 1; }
        .vs-cat-title { font-size: 2rem; font-weight: 600; color: var(--color-white); }
        .vs-cat-desc { font-size: 0.9rem; color: var(--color-primary-lighter); max-width: 420px; line-height: 1.65; }
        .vs-coming-soon {
          font-family: 'GeistMono', 'Courier New', monospace;
          font-size: 0.8rem; color: rgba(163,163,204,0.4);
          letter-spacing: 0.1em; margin-top: 0.5rem;
        }
        .vs-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 40; }
        @media (max-width: 768px) {
          .vs-hamburger { display: block; }
          .vs-section-name { display: none; }
          .vs-sidebar {
            position: fixed; top: 52px; left: 0; height: calc(100vh - 52px);
            z-index: 50; transform: translateX(-100%); transition: transform 0.25s ease; width: 260px;
          }
          .vs-sidebar.open { transform: translateX(0); }
          .vs-overlay { display: block; }
          .vs-main { padding: 1.25rem 1rem; }
          .vs-main-header { flex-direction: column; }
          .vs-search-row { flex-direction: column; align-items: flex-start; }
          .vs-search { max-width: 100%; }
        }
      `}</style>
    </div>
  )
}
