import { Route, Routes } from 'react-router-dom'
import AppShell from '../ui/AppShell'
import Home from './Home'
import Phase from './Phase'
import PhaseDay from './PhaseDay'
import Test from './Test'
import Settings from './Settings'
import History from './History'

export default function App(){
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fase/:num" element={<Phase />} />
        <Route path="/fase/:num/dag/:dayId" element={<PhaseDay />} />
        <Route path="/test" element={<Test />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppShell>
  )
}
