import { appReducer, createInitialState, isAppState, remainingTasks, tasksIn } from '../appState';
import type { AppState } from '../types';

const TODAY = '2025-01-10';

function withPlan(): AppState {
  let state = createInitialState(TODAY);
  state = appReducer(state, {
    type: 'setQuadrantTasks',
    quadrant: 'schedule',
    drafts: [{ name: 'Read chapter 4', start: '', end: '' }],
  });
  state = appReducer(state, {
    type: 'setQuadrantTasks',
    quadrant: 'do',
    drafts: [
      { name: '  Finish lab report ', start: '9am', end: '11am' },
      { name: '', start: '', end: '' },
      { name: 'Email TA', start: '', end: '' },
    ],
  });
  return state;
}

describe('setQuadrantTasks', () => {
  it('keeps non-empty, trimmed tasks sorted by quadrant', () => {
    const state = withPlan();
    expect(state.plan.map((t) => [t.quadrant, t.name])).toEqual([
      ['do', 'Finish lab report'],
      ['do', 'Email TA'],
      ['schedule', 'Read chapter 4'],
    ]);
    expect(tasksIn(state, 'do')).toHaveLength(2);
  });

  it('replaces only the edited quadrant', () => {
    const state = appReducer(withPlan(), { type: 'setQuadrantTasks', quadrant: 'do', drafts: [] });
    expect(state.plan.map((t) => t.name)).toEqual(['Read chapter 4']);
  });
});

describe('completeSession', () => {
  it('records the session, awards points and starts a streak', () => {
    const plan = withPlan();
    const task = plan.plan[0];
    const state = appReducer(plan, {
      type: 'completeSession',
      today: TODAY,
      name: task.name,
      taskId: task.id,
      quadrant: task.quadrant,
      plannedSeconds: 1500,
      completedTimer: true,
    });
    expect(state.sessions).toHaveLength(1);
    expect(state.sessions[0]).toMatchObject({ index: 1, points: 20, taskId: task.id });
    expect(state.totalPoints).toBe(20);
    expect(state.streak).toBe(1);
    expect(state.lastActiveDay).toBe(TODAY);
    expect(remainingTasks(state).map((t) => t.name)).toEqual(['Email TA', 'Read chapter 4']);
  });

  it('stops at five sessions per day', () => {
    let state = createInitialState(TODAY);
    for (let i = 0; i < 6; i++) {
      state = appReducer(state, {
        type: 'completeSession',
        today: TODAY,
        name: `Task ${i}`,
        plannedSeconds: 60,
        completedTimer: false,
      });
    }
    expect(state.sessions).toHaveLength(5);
    // 5 × 10 points + 20 bonus on the fifth session.
    expect(state.totalPoints).toBe(70);
  });
});

describe('hydrate and new day', () => {
  it('keeps a saved plan from today', () => {
    const saved = withPlan();
    const state = appReducer(createInitialState(TODAY), { type: 'hydrate', state: saved, today: TODAY });
    expect(state).toBe(saved);
  });

  it('clears an old plan but keeps points and streak', () => {
    const saved: AppState = { ...withPlan(), day: '2025-01-09', totalPoints: 90, streak: 3 };
    const state = appReducer(createInitialState(TODAY), { type: 'hydrate', state: saved, today: TODAY });
    expect(state.plan).toEqual([]);
    expect(state.sessions).toEqual([]);
    expect(state.day).toBe(TODAY);
    expect(state.totalPoints).toBe(90);
    expect(state.streak).toBe(3);
  });

  it('startNewDay resets plan and sessions only', () => {
    const state = appReducer({ ...withPlan(), totalPoints: 10 }, { type: 'startNewDay', today: '2025-01-11' });
    expect(state).toMatchObject({ day: '2025-01-11', plan: [], sessions: [], totalPoints: 10 });
  });
});

describe('isAppState', () => {
  it('accepts valid state and rejects junk', () => {
    expect(isAppState(createInitialState(TODAY))).toBe(true);
    expect(isAppState(null)).toBe(false);
    expect(isAppState({ day: TODAY })).toBe(false);
  });
});
