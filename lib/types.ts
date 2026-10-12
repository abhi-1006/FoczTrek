export type QuadrantId = 'do' | 'schedule' | 'delegate' | 'delete';

export type TaskDraft = {
  name: string;
  start: string;
  end: string;
};

export type PlannedTask = TaskDraft & {
  id: string;
  quadrant: QuadrantId;
};

export type FocusSession = {
  /** 1-based position in the day's sessions. */
  index: number;
  name: string;
  /** Id of the planned task this session worked on, if it was picked from the plan. */
  taskId?: string;
  quadrant?: QuadrantId;
  plannedSeconds: number;
  /** True when the countdown reached zero before the user pressed Done. */
  completedTimer: boolean;
  points: number;
};

export type AppState = {
  /** Local calendar day (YYYY-MM-DD) that `plan` and `sessions` belong to. */
  day: string;
  plan: PlannedTask[];
  sessions: FocusSession[];
  totalPoints: number;
  streak: number;
  /** Last day on which at least one focus session was completed. */
  lastActiveDay: string | null;
};
