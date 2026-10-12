import { router } from 'expo-router';
import { useMemo } from 'react';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { QuadrantCard } from '@/components/QuadrantCard';
import { Screen } from '@/components/Screen';
import { useAppState } from '@/context/AppStateContext';
import { tasksIn } from '@/lib/appState';
import { MAX_SESSIONS_PER_DAY } from '@/lib/points';
import { QUADRANTS } from '@/lib/quadrants';

export default function SummaryScreen() {
  const { state } = useAppState();
  const doneIds = useMemo(
    () => new Set(state.sessions.map((s) => s.taskId).filter((id): id is string => !!id)),
    [state.sessions]
  );
  const nextSession = state.sessions.length + 1;
  const dayFinished = state.sessions.length >= MAX_SESSIONS_PER_DAY;

  return (
    <Screen>
      <AppText variant="title" center>
        Today&apos;s plan
      </AppText>
      {state.plan.length === 0 ? (
        <AppText center>You haven&apos;t added any tasks yet. You can still run a focus session.</AppText>
      ) : (
        <AppText center>Start with 🔥 and 🕒. Those are the big rocks.</AppText>
      )}
      {QUADRANTS.map((q) => (
        <QuadrantCard key={q.id} quadrant={q} tasks={tasksIn(state, q.id)} doneIds={doneIds} />
      ))}
      {dayFinished ? (
        <PrimaryButton title="See today's summit" onPress={() => router.push('/summit')} />
      ) : (
        <PrimaryButton
          title={nextSession === 1 ? 'Start my first focus session' : `Start focus session ${nextSession}`}
          onPress={() => router.push(`/focus/${nextSession}`)}
        />
      )}
      <PrimaryButton title="Edit plan" variant="secondary" onPress={() => router.push('/matrix')} />
    </Screen>
  );
}
