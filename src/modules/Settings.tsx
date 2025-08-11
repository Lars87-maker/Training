
import { useLocalState } from '../utils/storage'

export default function Settings(){
  const [theme, setTheme] = useLocalState<string>('settings:theme','system')
  const [rest, setRest] = useLocalState<number>('settings:rest', 60)

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Instellingen</h2>
      </div>
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <label>Rust tussen onderdelen (seconden)</label>
          <input type="number" className="w-24 border rounded-lg px-2 py-1 bg-white dark:bg-gray-900" value={rest} onChange={(e)=>setRest(parseInt(e.target.value||'0',10))} />
        </div>
        <div className="flex items-center justify-between">
          <label>Thema</label>
          <select className="w-40 border rounded-lg px-2 py-1 bg-white dark:bg-gray-900" value={theme} onChange={(e)=>setTheme(e.target.value)}>
            <option value="system">Systeem</option>
            <option value="light">Licht</option>
            <option value="dark">Donker</option>
          </select>
        </div>
        <p className="text-xs text-gray-500">* Wireframe: thema wordt nog niet toegepast, alleen opgeslagen.</p>
      </div>
    </div>
  )
}
