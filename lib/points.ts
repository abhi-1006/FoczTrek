import { isImportant } from './quadrants';
import { daysBetween } from './time';
import type { QuadrantId } from './types';

export const MAX_SESSIONS_PER_DAY = 5;

export const POINTS = {
  session: 10,
  fullTimer: 5,
  importantTask: 5,
  allSessionsBonus: 20,
} as const;

export type PointsBreakdown = {
  label: string;
  points: number;
}[];

/**
 * Points for one finished focus session:
 * - 10 for finishing the session
 * - +5 if the countdown ran all the way to zero
 * - +5 if the task came from an important quadrant (Do / Schedule)
 * - +20 bonus for the day's final (5th) session
 */
export function scoreSession(input: {
  completedTimer: boolean;
  quadrant?: QuadrantId;
  sessionIndex: number;
}): PointsBreakdown {
  const breakdown: PointsBreakdown = [{ label: 'Focus session finished', points: POINTS.session }];
  if (input.completedTimer) {
    breakdown.push({ label: 'Stayed until the timer ended', points: POINTS.fullTimer });
  }
  if (isImportant(input.quadrant)) {
    breakdown.push({ label: 'Worked on an important task', points: POINTS.importantTask });
  }
  if (input.sessionIndex === MAX_SESSIONS_PER_DAY) {
    breakdown.push({ label: 'All 5 sessions done today', points: POINTS.allSessionsBonus });
  }
  return breakdown;
}

export function sumPoints(breakdown: PointsBreakdown): number {
  return breakdown.reduce((total, item) => total + item.points, 0);
}

/**
 * Streak after completing a session on `today`: continues if the last active
 * day was yesterday, unchanged if already active today, otherwise restarts at 1.
 */
export function nextStreak(streak: number, lastActiveDay: string | null, today: string): number {
  if (lastActiveDay === null) return 1;
  const gap = daysBetween(lastActiveDay, today);
  if (gap === 0) return Math.max(streak, 1);
  if (gap === 1) return streak + 1;
  return 1;
}

/** Streak to display on `today`: a streak whose last active day is older than yesterday has lapsed. */
export function currentStreak(streak: number, lastActiveDay: string | null, today: string): number {
  if (lastActiveDay === null) return 0;
  return daysBetween(lastActiveDay, today) <= 1 ? streak : 0;
}

const RANKS = [
  { min: 0, name: 'Base Camp' },
  { min: 50, name: 'Trailblazer' },
  { min: 150, name: 'Ridge Walker' },
  { min: 300, name: 'Summiteer' },
  { min: 600, name: 'Peak Master' },
];

export function rankFor(totalPoints: number): { name: string; nextAt: number | null } {
  let index = 0;
  RANKS.forEach((rank, i) => {
    if (totalPoints >= rank.min) index = i;
  });
  return { name: RANKS[index].name, nextAt: RANKS[index + 1]?.min ?? null };
}
