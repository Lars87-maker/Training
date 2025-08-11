import * as React from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import rawPhases from '../data/phases.json'
import { useLocalState } from '../utils/storage'
import { TimerRow } from '../widgets/TimerRow'

function normalizeDays(phase: any){
  const out: any[] = []
  for(const d of phase.days){
    const groups: Record<string, any> = {}
    let current = d.id
    groups[current] = { id: d.id, title: d.title, items: [] as any[] }
    for(const it of d.items){
      const m = /^Dag\s*(\d+)\b(.*)$/i.exec(it.label || '')
      if(m){
        current = `d${m[1]}`
        groups[current] = { id: current, title: `Dag ${m[1]}${m[2]||''}`, items: [] }
        continue
      }
      groups[current].items.push(it)
    }
    const arr = Object.values(groups) as any[]
    if(arr.length === 1) out.push(arr[0])
    else out.push(...arr)
  }
  return out.map((d,i)=> ({ ...d, id: d.id || `d${i+1}` }))
}

export default function PhaseDay(){
  const { num, dayId } = useParams()
  const navigate = useNavigate()
  const phase = (rawPhases as any)[`fase${num}`]
  const days = normalizeDays(phase)
  const dayIndex = Math.max(0, days.findIndex((d:any)=> String(d.id) === String(dayId) || String(d.title).toLowerCase().includes(String(dayId).toLowerCase())))
  const day = days[dayIndex] || days[0]

  const [checks, setChecks] = useLocalState<Record<string, boolean>>(`checks:fase${num}:day:${day.id}`, {})
  const [note, setNote] = useLocalState<string>(`notes:fase${num}:day:${day.id}`, '')

  const toggle = (id: string) => setChecks(s => ({...s, [id]: !s[id]}))

  const checkItems = day.items.filter((i:any)=> i.type==='check')
  const done = checkItems.filter((it:any)=> checks[`${day.id}:${it.id}`]).length
  const progress = checkItems.length ? Math.round(100*done/checkItems.length) : 0

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        <button className="underline" onClick={()=> navigate(`/fase/${num}`)}>← Terug naar {`Fase ${num}`}</button>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold">{day.title}</h2>
          <p className="text-sm text-gray-500">Voortgang: {progress}%</p>
        </div>

        <div className="space-y-2">
          {day.items.map((it:any)=>(
            <div key={it.id} className="flex items-center justify-between">
              {it.type === 'check' ? (
                <>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="h-4 w-4"
                      checked={!!checks[`${day.id}:${it.id}`]}
                      onChange={()=> toggle(`${day.id}:${it.id}`, it.label)} />
                    {it.label}
                  </label>
                  <span className="text-xs text-gray-500">afvinken</span>
                </>
              ) : (
                <TimerRow label={it.label} defaultSeconds={it.seconds || 60} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-3">
          <textarea
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 p-2 text-sm"
            rows={3}
            placeholder="Notities voor deze dag…"
            value={note}
            onChange={e=> setNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
