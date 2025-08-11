import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import rawPhases from '../data/phases.json'
import { useLocalState } from '../utils/storage'
import RestTimer from '../widgets/RestTimer'
import { restSecondsFor } from '../utils/restLogic'
import { Card } from '../ui/Card'

function normalizeDays(phase: any) {
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

  const [itemRest, setItemRest] = React.useState<Record<string, number>>({})
  const [itemKey, setItemKey] = React.useState<Record<string, number>>({})
  const [autoStartFor, setAutoStartFor] = React.useState<string>('')

  const toggle = (id: string, label?: string) => {
    setChecks(s => ({...s, [id]: !s[id]}))
    if(!checks[id] && label){
      const sec = restSecondsFor(label)
      setItemRest(s=> ({...s, [id]: sec}))
      setItemKey(k=> ({...k, [id]: (k[id]||0)+1}))
      setAutoStartFor(id)
    }
  }

  const checkItems = day.items.filter((i:any)=> i.type === 'check')
  const done = checkItems.filter((it:any)=> checks[`${day.id}:${it.id}`]).length
  const progress = checkItems.length ? Math.round(100*done/checkItems.length) : 0

  return (
    <div className="space-y-4">
      <button className="text-sm text-gray-500 underline" onClick={()=> navigate(`/fase/${num}`)}>← Terug naar {`Fase ${num}`}</button>

      <Card title={day.title} subtitle={`Voortgang: ${progress}%`}>
        <div className="space-y-3">
          {day.items.map((it:any)=>(
            <div key={it.id} className="flex items-start justify-between gap-3">
              <label className="flex items-start gap-2 text-sm leading-6">
                <input type="checkbox" className="mt-1.5 h-4 w-4"
                  checked={!!checks[`${day.id}:${it.id}`]}
                  onChange={()=> toggle(`${day.id}:${it.id}`, it.label)}
                />
                <span>{it.label}</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  className="btn-ghost text-xs"
                  onClick={()=>{
                    const id = `${day.id}:${it.id}`
                    const sec = itemRest[id] ?? restSecondsFor(it.label)
                    setItemRest(s=> ({...s, [id]: sec}))
                    setItemKey(k=> ({...k, [id]: (k[id]||0)+1}))
                    setAutoStartFor(id)
                  }}
                >Start rust</button>
                <div className="chip">{(itemRest[`${day.id}:${it.id}`] ?? restSecondsFor(it.label))}s</div>
                <RestTimer
                  key={`${day.id}:${it.id}:${itemKey[`${day.id}:${it.id}`]||0}`}
                  seconds={itemRest[`${day.id}:${it.id}`] ?? restSecondsFor(it.label)}
                  autostart={autoStartFor===`${day.id}:${it.id}`}
                  onDone={()=> setAutoStartFor('')}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            className="w-full rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 p-3 text-sm"
            rows={3}
            placeholder="Notities voor deze dag…"
            value={note}
            onChange={e=> setNote(e.target.value)}
          />
        </div>
      </Card>
    </div>
  )
}
