
import { useEffect, useRef, useState } from 'react'

export function TimerRow({ label, defaultSeconds }:{label:string; defaultSeconds:number}){
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(defaultSeconds)
  const ref = useRef<number | null>(null)

  useEffect(()=>{
    if(!running) return
    ref.current = window.setInterval(()=> setSeconds(s=> s>0 ? s-1 : 0), 1000) as any
    return ()=> { if(ref.current) window.clearInterval(ref.current as any) }
  }, [running])

  const fmt = (n:number)=> `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`

  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex items-center gap-3">
        <span className="tabular-nums text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{fmt(seconds)}</span>
        <button onClick={()=> setRunning(r=>!r)} className="px-3 py-1 rounded-lg text-sm bg-blue-600 text-white">{running?'Pauze':'Start'}</button>
        <button onClick={()=> { setSeconds(defaultSeconds); setRunning(false) }} className="px-3 py-1 rounded-lg text-sm bg-gray-200 dark:bg-gray-700">Reset</button>
      </div>
    </div>
  )
}
