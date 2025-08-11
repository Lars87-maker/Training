
import { useParams } from 'react-router-dom'
import phases from '../data/phases.json'
  import info from '../data/phaseInfo.json'
import { useLocalState } from '../utils/storage'
import { TimerRow } from '../widgets/TimerRow'

export default function Phase(){
  const { num } = useParams()
  const phase = (phases as any)[`fase${num}`]
  const [checks, setChecks] = useLocalState<Record<string, boolean>>(`checks:fase${num}`, {})
  const [notes, setNotes] = useLocalState<Record<string, string>>(`notes:fase${num}`, {})

  const toggle = (id: string) => setChecks(s => ({...s, [id]: !s[id]}))

  const allIds = phase.days.flatMap((d:any)=> d.items.filter((i:any)=>i.type==='check').map((i:any)=> `${d.id}:${i.id}`))
  const done = allIds.filter((k:string)=> checks[k]).length
  const progress = allIds.length ? Math.round((done / allIds.length) * 100) : 0

  return (
    <div className="space-y-6">
      <Card title={`${phase.name} – Trainingsdagen`} subtitle={`Voortgang (afvinkbare oefeningen): ${progress}%`}>
        <div className="grid md:grid-cols-2 gap-4">
          {phase.days.map((day:any)=>(
            <div key={day.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
              <div className="mb-2 font-medium">{day.title}</div>
              <div className="space-y-2">
                {day.items.map((it:any)=>(
                  <div key={it.id} className="flex items-center justify-between">
                    {it.type === 'check' ? (
                      <>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="h-4 w-4"
                            checked={!!checks[`${day.id}:${it.id}`]}
                            onChange={()=> toggle(`${day.id}:${it.id}`)} />
                          {it.label}
                        </label>
                        <span className="text-xs text-gray-500">afvinken</span>
                      </>
                    ) : (
                      <TimerRow label={it.label} defaultSeconds={it.seconds} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <textarea
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 p-2 text-sm"
                  rows={3}
                  placeholder="Notities voor deze dag…"
                  value={notes[day.id] ?? ''}
                  onChange={e => setNotes(s => ({...s, [day.id]: e.target.value}))}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Fase-info" subtitle="Zet hier de uitleg/inhoud uit je document.">
        <p className="text-sm text-gray-600 dark:text-gray-300">{(info as any)[`fase${num}`] || 'Nog geen tekst gevonden.'}</p>
      </Card>
    </div>
  )
}

function Card({title, subtitle, children}: any){
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
