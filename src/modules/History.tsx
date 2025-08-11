
import { useEffect, useState } from 'react'
import { listResults, TestResult } from '../utils/db'
  import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function History(){
  const [results, setResults] = useState<TestResult[]>([])
  useEffect(()=>{ listResults().then(setResults) }, [])

  const byItem = results.reduce((acc:any, r)=>{
    acc[r.itemId] = acc[r.itemId] || []
    acc[r.itemId].push(r)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <Card title="Historie – testresultaten" subtitle={`${results.length} metingen opgeslagen`}>
        {Object.keys(byItem).length === 0 && <p className="text-sm text-gray-500">Nog geen resultaten.</p>}
        <div className="space-y-4">
          {Object.entries(byItem).map(([itemId, arr]: any)=>(
            <div key={itemId} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
              <div className="font-medium mb-2">{(arr[0] as TestResult).label}</div>
              <table className="w-full text-sm">
                <thead className="text-left text-gray-500">
                  <tr><th className="py-1">Datum</th><th>Waarde</th></tr>
                </thead>
                <tbody>
                  {arr.sort((a:TestResult,b:TestResult)=> b.ts-a.ts).map((r:TestResult)=>(
                    <tr key={r.id} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-1">{new Date(r.ts).toLocaleString()}</td>
                      <td>{r.value} {r.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <div className="h-40 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={arr.sort((a: any,b: any)=> a.ts-b.ts).map((r: any)=>({ x: new Date(r.ts).toLocaleDateString(), y: r.value }))}>
                      <XAxis dataKey="x" hide={false} />
                      <YAxis dataKey="y" />
                      <Tooltip />
                      <Line type="monotone" dataKey="y" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
            </div>
          ))}
        </div>
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
