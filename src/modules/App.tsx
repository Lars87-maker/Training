
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Phase from './Phase'
import PhaseDay from './PhaseDay'
import Test from './Test'
import Settings from './Settings'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">AT Trainer</h1>
            <p className="text-sm text-gray-500">Persoonlijke PWA – trainingen & testmodule</p>
          </div>
          <nav className="hidden md:flex gap-2">
            <TopLink to="/">Home</TopLink>
            <TopLink to="/fase/1">Fase 1</TopLink>
            <TopLink to="/fase/2">Fase 2</TopLink>
            <TopLink to="/fase/3">Fase 3</TopLink>
            <TopLink to="/test">Test</TopLink>
            <TopLink to="/settings">Instellingen</TopLink>
          </nav>
        </header>

        <main className="space-y-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fase/:num" element={<Phase />} />
            <Route path="/fase/:num/dag/:dayId" element={<PhaseDay />} />
            <Route path="/test" element={<Test />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} AT Trainer</div>
          <div className="md:hidden flex gap-2">
            <BottomLink to="/">🏠</BottomLink>
            <BottomLink to="/fase/1">1️⃣</BottomLink>
            <BottomLink to="/fase/2">2️⃣</BottomLink>
            <BottomLink to="/fase/3">3️⃣</BottomLink>
            <BottomLink to="/test">🧪</BottomLink>
            <BottomLink to="/settings">⚙️</BottomLink>
          </div>
        </footer>
      </div>
    </div>
  )
}

function TopLink({ to, children }: any) {
  return (
    <NavLink
      to={to}
      className={({isActive}) => `px-3 py-2 rounded-xl text-sm ${isActive ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'}`}
    >{children}</NavLink>
  )
}
function BottomLink({ to, children }: any) {
  return (
    <NavLink
      to={to}
      className={({isActive}) => `px-2 py-1 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'}`}
    >{children}</NavLink>
  )
}
