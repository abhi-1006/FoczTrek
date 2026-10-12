import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';

import { appReducer, createInitialState } from '@/lib/appState';
import { loadState, saveState } from '@/lib/storage';
import { dayKey } from '@/lib/time';
import type { AppState, QuadrantId, TaskDraft } from '@/lib/types';

type CompleteSessionInput = {
  name: string;
  taskId?: string;
  quadrant?: QuadrantId;
  plannedSeconds: number;
  completedTimer: boolean;
};

type AppStateContextValue = {
  state: AppState;
  /** False until saved state has been read from storage. */
  hydrated: boolean;
  setQuadrantTasks: (quadrant: QuadrantId, drafts: TaskDraft[]) => void;
  completeSession: (input: CompleteSessionInput) => void;
  startNewDay: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, () => createInitialState(dayKey()));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadState().then((saved) => {
      if (cancelled) return;
      if (saved) dispatch({ type: 'hydrate', state: saved, today: dayKey() });
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Don't overwrite saved data with the empty initial state before it has loaded.
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  // Dispatch is stable, so the action functions are created once.
  const actions = useMemo(
    () => ({
      setQuadrantTasks: (quadrant: QuadrantId, drafts: TaskDraft[]) =>
        dispatch({ type: 'setQuadrantTasks', quadrant, drafts }),
      completeSession: (input: CompleteSessionInput) =>
        dispatch({ type: 'completeSession', today: dayKey(), ...input }),
      startNewDay: () => dispatch({ type: 'startNewDay', today: dayKey() }),
    }),
    []
  );

  const value = useMemo(() => ({ state, hydrated, ...actions }), [state, hydrated, actions]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used inside <AppStateProvider>');
  return context;
}
