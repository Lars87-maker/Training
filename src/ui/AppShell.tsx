import { NavLink } from 'react-router-dom'

export default function AppShell({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))]">
      <header className="border-b border-gray-200/60 dark:border-white/10 sticky top-0 z-40 backdrop-blur bg-[hsl(var(--bg))]/70">
        <div className="container flex items-center justify-between py-3">
          <div>
            <div className="text-xl font-bold tracking-tight">AT Trainer</div>
            <div className="text-xs text-gray-500">Trainingsplanner & Testmodule</div>
          </div>
          <nav className="hidden md:flex gap-2">
            <Nav to="/">Home</Nav>
            <Nav to="/fase/1">Fase 1</Nav>
            <Nav to="/fase/2">Fase 2</Nav>
            <Nav to="/fase/3">Fase 3</Nav>
            <Nav to="/test">Test</Nav>
            <Nav to="/history">Historie</Nav>
            <Nav to="/settings">Instellingen</Nav>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="container py-8 text-xs text-gray-500">
        © {new Date().getFullYear()} AT Trainer
      </footer>
    </div>
  )
}

function Nav({ to, children }: {to:string; children:React.ReactNode}){
  return (
    <NavLink
      to={to}
      className={({isActive}) => `px-3 py-2 rounded-xl text-sm transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-white/70 dark:hover:bg-white/5 border border-transparent'}`}
    >{children}</NavLink>
  )
}
