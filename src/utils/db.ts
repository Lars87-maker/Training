
import { set, get, update } from 'idb-keyval'

export type TestResult = {
  id: string            // uuid
  ts: number            // timestamp
  itemId: string        // e.g. 'pull_front'
  label: string
  value: number         // reps, seconds, or meters depending on type
  unit: 'reps'|'sec'|'m'
}

const KEY = 'history:testResults'

export async function addResult(r: TestResult){
  const arr = (await get(KEY)) as TestResult[] || []
  arr.push(r)
  await set(KEY, arr)
}

export async function listResults(): Promise<TestResult[]> {
  return (await get(KEY)) as TestResult[] || []
}
