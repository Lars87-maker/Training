import * as React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppShell({ children }: { children: React.ReactNode }) {
  // Dark mode (bewaart keuze)
  const [dark, setDark] = React.useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))]">
      {/* Top header (desktop nav zichtbaar vanaf md) */}
      <header className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-white/10 backdrop-blur">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container flex items-center justify-between py-3">
            <div>
              <div className="text-xl font-semibold tracking-tight">AT Trainer</div>
              <div className="text-xs/5 opacity-90">Trainingsplanner &amp; Testmodule</div>
            </div>
            <div className="flex items-center gap-2">
              <nav className="hidden md:flex gap-1">
                <TopNav to="/">Home</TopNav>
                <TopNav to="/fase/1">Fase 1</TopNav>
                <TopNav to="/fase/2">Fase 2</TopNav>
                <TopNav to="/fase/3">Fase 3</TopNav>
                <TopNav to="/test">Test</TopNav>
                <TopNav to="/settings">Instellingen</TopNav>
              </nav>
              <button
                onClick={() => setDark(v => !v)}
                className="ml-2 rounded-lg bg-white/15 px-2 py-1 text-xs hover:bg-white/25 transition"
                aria-label="Toggle theme"
              >
                {dark ? '☀︎' : '☾'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Let op: extra bottom padding voor de mobiele tabbar */}
      <main className="container py-6 md:pb-6 pb-24">{children}</main>

      {/* Mobiele bottom navigation (alleen < md) */}
      <MobileTabs />

      <footer className="container py-8 text-xs text-gray-500 md:pb-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        © {new Date().getFullYear()} AT Trainer
      </footer>
    </div>
  )
}

function TopNav({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-lg text-sm transition-colors ${
          isActive ? 'bg-white/20' : 'hover:bg-white/10'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

/* ====== Mobiele tabbar (inline, geen extra files nodig) ====== */
function MobileTabs() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50
                 bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                 shadow-[0_-4px_16px_rgba(0,0,0,.25)] rounded-t-2xl
                 pb-[env(safe-area-inset-bottom)]"
      aria-label="Hoofdnavigatie"
    >
      <div className="grid grid-cols-5 text-xs">
        <Tab to="/" label="Home" icon={HomeIcon} />
        <Tab to="/fase/1" label="Fase 1" icon={LayersIcon} />
        <Tab to="/fase/2" label="Fase 2" icon={LayersIcon} />
        <Tab to="/fase/3" label="Fase 3" icon={LayersIcon} />
        <Tab to="/settings" label="Instel." icon={CogIcon} />
      </div>
    </nav>
  )
}

function Tab({
  to,
  label,
  icon: Icon,
}: {
  to: string
  label: string
  icon: (p: { active: boolean }) => JSX.Element
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 ${
          isActive ? 'text-white' : 'text-white/80'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="sr-only">{label}</span>
          <Icon active={isActive} />
          <span className="text-[11px] leading-none mt-1">{label}</span>
        </>
      )}
    </NavLink>
  )
}

/* ====== Heel lichte inline iconen (SVG) ====== */
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 
