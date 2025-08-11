
import { useParams, Link } from "react-router-dom";
import phases from "../data/phases.json";
import info from "../data/phaseInfo.json";
import { useLocalState } from "../utils/storage";

function normalizeDays(phase: any) {
  const out: any[] = [];
  for (const d of phase.days) {
    const groups: Record<string, any> = {};
    let current = d.id;
    groups[current] = { id: d.id, title: d.title, items: [] as any[] };
    for (const it of d.items) {
      const m = /^Dag\s*(\d+)\b(.*)$/i.exec(it.label || "");
      if (m) {
        current = `d${m[1]}`;
        groups[current] = { id: current, title: `Dag ${m[1]}${m[2] || ""}`, items: [] };
        continue;
      }
      groups[current].items.push(it);
    }
    const arr = Object.values(groups) as any[];
    if (arr.length === 1) out.push(arr[0]);
    else out.push(...arr);
  }
  return out.map((d, i) => ({ ...d, id: d.id || `d${i + 1}` }));
}

export default function Phase() {
  const { num } = useParams();
  const phase = (phases as any)[`fase${num}`];
  useLocalState<Record<string, boolean>>(`checks:fase${num}`, {}); // keep slot

  const days = normalizeDays(phase);
  const totalCheckIds = days.flatMap((d: any) =>
    d.items.filter((i: any) => i.type === "check").map((i: any) => `${d.id}:${i.id}`)
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="mb-3">
          <h2 className="text-xl font-semibold">{`Fase ${num} – Trainingsdagen`}</h2>
          <p className="text-sm text-gray-500">
            {days.length} dagen • {totalCheckIds.length} afvinkbare oefeningen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {days.map((day: any) => {
            const checkCount = day.items.filter((i: any) => i.type === "check").length;
            const timerCount = day.items.filter((i: any) => i.type === "timer").length;
            return (
              <div
                key={day.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 flex flex-col"
              >
                <div className="mb-1 font-medium">{day.title}</div>
                <div className="text-xs text-gray-500 mb-3">
                  {checkCount} afvinkbaar • {timerCount} timers
                </div>
                <div className="mt-auto">
                  <Link
                    to={`/fase/${num}/dag/${day.id}`}
                    className="px-3 py-1 rounded-lg text-sm bg-blue-600 text-white"
                  >
                    Open dag
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="mb-3">
          <h2 className="text-xl font-semibold">Fase-info</h2>
          <p className="text-sm text-gray-500">Uitleg/inhoud uit je document</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {(info as any)[`fase${num}`] || "Nog geen tekst gevonden."}
        </p>
      </div>
    </div>
  );
}
