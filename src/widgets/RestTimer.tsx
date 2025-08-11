
import { useEffect, useRef, useState } from 'react'

function beep(freq = 880, duration = 200){
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = freq
    gain.gain.value = 0.05
    osc.connect(gain); gain.connect(ctx.destination)
    osc.start()
    setTimeout(()=>{ osc.stop(); ctx.close() }, duration)
  } catch {}
  if (navigator.vibrate) navigator.vibrate(100)
}

export default function RestTimer({ seconds, autostart=false, onDone }:{ seconds: number; autostart?: boolean; onDone?: ()=>void }){
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(()=>{
    setRemaining(seconds)
    if(autostart){ setRunning(true) }
  }, [seconds, autostart])

  useEffect(()=>{
    if(!running) return
    const start = Date.now()
    const startRem = remaining
    intervalRef.current = window.setInterval(()=>{
      const elapsed = Math.floor((Date.now() - start)/1000)
      const next = Math.max(0, startRem - elapsed)
      setRemaining(next)
      if(next === 0){
        clearInterval(intervalRef.current!)
        setRunning(false)
        beep(660, 120); setTimeout(()=> beep(880, 180), 180)
        onDone && onDone()
      }
    }, 250) as any
    return ()=> { if(intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const fmt = (n:number)=> `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`

  return (
    <div className="flex items-center gap-2">
      <span className="tabular-nums text-sm font-mono">{fmt(remaining)}</span>
      <button onClick={()=> setRunning(r=>!r)} className="px-2 py-0.5 rounded bg-blue-600 text-white text-xs">{running?'Pause':'Start'}</button>
      <button onClick={()=> { setRunning(false); setRemaining(seconds) }} className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs">Reset</button>
    </div>
  )
}
