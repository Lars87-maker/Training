
export type RestCategory = 'heavy_technical'|'light_highreps'|'core'|'interval_short'|'interval_long'|'circuit'|'rope_explosive'|'default'
export function classifyRest(label: string): RestCategory {
  const l = label.toLowerCase()
  if (/(pull[- ]?ups?|chin[- ]?ups?|deadlift|squat|press|shoulder|bench|hip thrust|row\b(?!\s*machine)|touw|rope|climb)/.test(l)) return 'heavy_technical'
  if (/(sit[- ]?ups?|push[- ]?ups?|lunges?|dips?|curls?|band|elastiek|dumbbell|kettlebell)/.test(l)) return 'light_highreps'
  if (/(core|plank|bridge|hollow|side plank|anti-rotation|bracing)/.test(l)) return 'core'
  if (/(\b30s\b|:30|\b40s\b|\b20s\b|spr(?!ea)int|interval kort|hiit)/.test(l)) return 'interval_short'
  if (/(\b3 ?min|\b4 ?min|\b5 ?min|tempo run|interval lang)/.test(l)) return 'interval_long'
  if (/(circuit|round|rondje)/.test(l)) return 'circuit'
  if (/(touwklim|rope climb|explos|sprint|jump)/.test(l)) return 'rope_explosive'
  return 'default'
}
export function restSecondsFor(label: string): number {
  switch (classifyRest(label)) {
    case 'heavy_technical': return 75
    case 'light_highreps':  return 50
    case 'core':            return 40
    case 'interval_short':  return 45
    case 'interval_long':   return 120
    case 'circuit':         return 50
    case 'rope_explosive':  return 100
    default:                return 60
  }
}
