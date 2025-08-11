
import spec from '../data/testSpec.json'
export default function Home() {
  return (
    <div className="space-y-4">
      <Card title="Welkom" subtitle="Snel overzicht">
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Volgende training: Fase 1 – Dag 1</li>
          <li>Laatste test: —</li>
          <li>Tip: blijf hydrateren 💧</li>
        </ul>
      </Card>
      <Card title="Sporteisen (samenvatting)">
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          {spec.sequence.slice(0,6).map((t:any)=> (
            <div key={t.id} className="flex justify-between border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800/50">
              <span>{t.name}</span>
              <span className="text-gray-600 dark:text-gray-300">{t.target}</span>
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
