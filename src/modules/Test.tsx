
import spec from '../data/testSpec.json'
import { useEffect, useRef, useState } from 'react'

import { addResult } from '../utils/db'

  export default function Test(){
  const [mode, setMode] = useState<'list'|'runner'>('list')
  const [index, setIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(()=>{
    if(!running) return
    const start = Date.now() - elapsed*1000
    timerRef.current = window.setInterval(()=> setElapsed(Math.floor((Date.now()-start)/1000)), 250) as any
    return ()=> { if(timerRef.current) window.clearInterval(timerRef.current) }
  }, [running])

  const current = (spec as any).sequence[index]
  const limit = current.limitSeconds ?? 0
  const remaining = Math.max(0, limit - elapsed)
  const fmt = (n:number)=> `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`

  if(mode==='list'){
    return (
      <div className="space-y-4">
        <Card title="Testonderdelen" subtitle="Start volledige test of oefen losse onderdelen">
          <div className="flex flex-wrap gap-2 mb-3">
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={()=>{ setMode('runner'); setIndex(0); setElapsed(0); }}>Start volledige test</button>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {(spec as any).sequence.map((t:any, i:number)=>(
              <li key={t.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">Doel: {t.target} • Limiet: {t.limitSeconds}s</div>
                </div>
                <button className="px-3 py-1 rounded-lg text-sm bg-gray-100 dark:bg-gray-800" onClick={()=>{ setMode('runner'); setIndex(i); setElapsed(0); }}>Oefen</button>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Info testdag" subtitle="Opbouw en instructies">
          <ol className="list-decimal pl-4 text-sm space-y-1">
            <li>Voorbereiding: warming-up 10 min, materiaal klaar.</li>
            <li>Volgorde zoals boven, rust 60–90 s tussen onderdelen.</li>
            <li>Registreer resultaten en noteer bijzonderheden.</li>
          </ol>
        </Card>
      </div>
    )
  }

  const next = ()=> { setRunning(false); setElapsed(0); setIndex(i=> Math.min(i+1, (spec as any).sequence.length-1)) }
  const prev = ()=> { setRunning(false); setElapsed(0); setIndex(i=> Math.max(i-1, 0)) }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">Onderdeel {index+1} / {(spec as any).sequence.length}</div>
        <div className="flex gap-2">
          <button onClick={prev} className="px-3 py-1 rounded-lg text-sm bg-gray-200 dark:bg-gray-700">Vorige</button>
          <button onClick={()=> setMode('list')} className="px-3 py-1 rounded-lg text-sm bg-gray-200 dark:bg-gray-700">Stop</button>
          <button onClick={next} className="px-3 py-1 rounded-lg text-sm bg-gray-200 dark:bg-gray-700">Volgende</button>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-1">{current.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Doel: {current.target} • Limiet: {limit}s</p>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-mono tabular-nums">{fmt(elapsed)}</div>
        <div className="text-sm text-gray-500">Resterend: {fmt(remaining)}</div>
      </div>

      <div className="flex gap-2">
        <button onClick={()=> setRunning(r=>!r)} className="px-4 py-2 rounded-xl bg-blue-600 text-white">{running ? 'Pauze' : 'Start'}</button>
        <button onClick={()=>{ setRunning(false); setElapsed(0); }} className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700">Reset</button>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold mb-1">Resultaat registreren</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">(Hier kun je straks reps/tijd/afstand opslaan in je historie.)</p>
      </div>
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
