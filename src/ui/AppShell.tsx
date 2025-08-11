import * as React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppShell({ children }: { children: React.ReactNode }){
  const [dark, setDark] = React.useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  React.useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-white/10 backdrop-blur">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container flex items-center justify-between py-3">
            <div>
              <div className="text-xl font-semibold tracking-tight">AT Trainer</div>
              <div className="text-xs/5 opacity-90">Trainingsplanner & Testmodule</div>
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
              <button onClick={()=> setDark(v=>!v)} className="ml-2 rounded-lg bg-white/15 px-2 py-1 text-xs hover:bg-white/25 transition">
                {dark ? '☀︎' : '☾'}
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="container py-8 text-xs text-gray-500">
        © {new Date().getFullYear()} AT Trainer
      </footer>
    </div>
  )
}

function TopNav({ to, children }: {to:string; children:React.ReactNode}){
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`
      }
    >{children}</NavLink>
  )
}
