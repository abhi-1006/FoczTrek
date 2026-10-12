import type { QuadrantId } from './types';

export type QuadrantInfo = {
  id: QuadrantId;
  title: string;
  action: string;
  description: string;
  emoji: string;
  /** Page background on the planning form. */
  background: string;
  /** Card / button accent color. */
  accent: string;
  /** Text color that stays readable on `accent`. */
  onAccent: string;
};

export const QUADRANTS: QuadrantInfo[] = [
  {
    id: 'do',
    title: 'Urgent & Important',
    action: 'Do it now',
    description: 'Critical tasks that need immediate attention.',
    emoji: '🔥',
    background: '#E8F8EC',
    accent: '#2E9E4F',
    onAccent: '#FFFFFF',
  },
  {
    id: 'schedule',
    title: 'Not Urgent & Important',
    action: 'Schedule it',
    description: 'Tasks that build long-term well-being. Plan a time for them.',
    emoji: '🕒',
    background: '#E6F4FB',
    accent: '#1F7FB8',
    onAccent: '#FFFFFF',
  },
  {
    id: 'delegate',
    title: 'Urgent & Not Important',
    action: 'Delegate it',
    description: "Tasks that feel pressing but don't move your goals forward.",
    emoji: '⚡',
    background: '#FDF1E3',
    accent: '#C76A12',
    onAccent: '#FFFFFF',
  },
  {
    id: 'delete',
    title: 'Not Urgent & Not Important',
    action: 'Eliminate it',
    description: 'Low-value tasks. Be honest about what can go.',
    emoji: '⏳',
    background: '#F1F1F1',
    accent: '#6B6B6B',
    onAccent: '#FFFFFF',
  },
];

export const QUADRANT_ORDER: QuadrantId[] = QUADRANTS.map((q) => q.id);

export function getQuadrant(id: QuadrantId): QuadrantInfo {
  const quadrant = QUADRANTS.find((q) => q.id === id);
  if (!quadrant) throw new Error(`Unknown quadrant: ${id}`);
  return quadrant;
}

export function isQuadrantId(value: unknown): value is QuadrantId {
  return typeof value === 'string' && (QUADRANT_ORDER as string[]).includes(value);
}

/** The quadrant that follows `id` in the planning flow, or null after the last one. */
export function nextQuadrant(id: QuadrantId): QuadrantId | null {
  const i = QUADRANT_ORDER.indexOf(id);
  return QUADRANT_ORDER[i + 1] ?? null;
}

/** Important quadrants earn the focus bonus in the points system. */
export function isImportant(id: QuadrantId | undefined): boolean {
  return id === 'do' || id === 'schedule';
}
