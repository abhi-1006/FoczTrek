import { MAX_SESSIONS_PER_DAY, nextStreak, scoreSession, sumPoints } from './points';
import { QUADRANT_ORDER } from './quadrants';
import type { AppState, FocusSession, PlannedTask, QuadrantId, TaskDraft } from './types';

export function createInitialState(today: string): AppState {
  return { day: today, plan: [], sessions: [], totalPoints: 0, streak: 0, lastActiveDay: null };
}

export type Action =
  | { type: 'hydrate'; state: AppState; today: string }
  | { type: 'setQuadrantTasks'; quadrant: QuadrantId; drafts: TaskDraft[] }
  | {
      type: 'completeSession';
      today: string;
      name: string;
      taskId?: string;
      quadrant?: QuadrantId;
      plannedSeconds: number;
      completedTimer: boolean;
    }
  | { type: 'startNewDay'; today: string };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'hydrate':
      // A saved plan from an earlier day is cleared; points and streak carry over.
      return action.state.day === action.today
        ? action.state
        : { ...action.state, day: action.today, plan: [], sessions: [] };

    case 'setQuadrantTasks': {
      const tasks: PlannedTask[] = action.drafts
        .map((draft) => ({
          name: draft.name.trim(),
          start: draft.start.trim(),
          end: draft.end.trim(),
        }))
        .filter((draft) => draft.name.length > 0)
        .map((draft, i) => ({ ...draft, id: `${action.quadrant}-${i}`, quadrant: action.quadrant }));
      const others = state.plan.filter((task) => task.quadrant !== action.quadrant);
      const plan = [...others, ...tasks].sort(
        (a, b) => QUADRANT_ORDER.indexOf(a.quadrant) - QUADRANT_ORDER.indexOf(b.quadrant)
      );
      return { ...state, plan };
    }

    case 'completeSession': {
      if (state.sessions.length >= MAX_SESSIONS_PER_DAY) return state;
      const index = state.sessions.length + 1;
      const points = sumPoints(
        scoreSession({ completedTimer: action.completedTimer, quadrant: action.quadrant, sessionIndex: index })
      );
      const session: FocusSession = {
        index,
        name: action.name.trim(),
        taskId: action.taskId,
        quadrant: action.quadrant,
        plannedSeconds: action.plannedSeconds,
        completedTimer: action.completedTimer,
        points,
      };
      return {
        ...state,
        sessions: [...state.sessions, session],
        totalPoints: state.totalPoints + points,
        streak: nextStreak(state.streak, state.lastActiveDay, action.today),
        lastActiveDay: action.today,
      };
    }

    case 'startNewDay':
      return { ...state, day: action.today, plan: [], sessions: [] };
  }
}

/** Planned tasks that no focus session has worked on yet, in quadrant order. */
export function remainingTasks(state: AppState): PlannedTask[] {
  const done = new Set(state.sessions.map((s) => s.taskId).filter(Boolean));
  return state.plan.filter((task) => !done.has(task.id));
}

export function tasksIn(state: AppState, quadrant: QuadrantId): PlannedTask[] {
  return state.plan.filter((task) => task.quadrant === quadrant);
}

/** Loose shape check for state read back from storage. */
export function isAppState(value: unknown): value is AppState {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.day === 'string' &&
    Array.isArray(v.plan) &&
    Array.isArray(v.sessions) &&
    typeof v.totalPoints === 'number' &&
    typeof v.streak === 'number' &&
    (v.lastActiveDay === null || typeof v.lastActiveDay === 'string')
  );
}
