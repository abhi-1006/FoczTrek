import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { AppText } from '@/components/AppText';
import { CompletedList } from '@/components/CompletedList';
import { PointsBreakdownList } from '@/components/PointsBreakdownList';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressMountain } from '@/components/ProgressMountain';
import { QuadrantCard } from '@/components/QuadrantCard';
import { Screen } from '@/components/Screen';
import { useAppState } from '@/context/AppStateContext';
import { remainingTasks } from '@/lib/appState';
import { MAX_SESSIONS_PER_DAY, scoreSession } from '@/lib/points';
import { QUADRANTS } from '@/lib/quadrants';

export function generateStaticParams() {
  return Array.from({ length: MAX_SESSIONS_PER_DAY }, (_, i) => ({ session: String(i + 1) }));
}

export default function CompleteScreen() {
  const { session } = useLocalSearchParams<{ session: string }>();
  const { state } = useAppState();
  const sessionNumber = Number(session);
  const record = state.sessions[sessionNumber - 1];
  const remaining = useMemo(() => remainingTasks(state), [state]);

  if (!record) return <Redirect href="/summary" />;

  const breakdown = scoreSession({
    completedTimer: record.completedTimer,
    quadrant: record.quadrant,
    sessionIndex: record.index,
  });
  const isLast = sessionNumber >= MAX_SESSIONS_PER_DAY;

  return (
    <Screen>
      <AppText variant="title" center>
        Great work!
      </AppText>
      <AppText center>You completed: {record.name}</AppText>
      <ProgressMountain completed={state.sessions.length} />
      <PointsBreakdownList breakdown={breakdown} />

      {isLast ? (
        <PrimaryButton title="Reach the summit 🏔️" onPress={() => router.replace('/summit')} />
      ) : (
        <>
          <PrimaryButton
            title={`Next focus session (${sessionNumber + 1} of ${MAX_SESSIONS_PER_DAY})`}
            onPress={() => router.replace(`/focus/${sessionNumber + 1}`)}
          />
          <PrimaryButton title="Done for today" variant="secondary" onPress={() => router.replace('/summit')} />
        </>
      )}

      <AppText variant="heading">Completed today</AppText>
      <CompletedList sessions={state.sessions} />

      {remaining.length > 0 && (
        <>
          <AppText variant="heading">Still on your list</AppText>
          {QUADRANTS.map((q) => {
            const tasks = remaining.filter((t) => t.quadrant === q.id);
            return tasks.length > 0 ? <QuadrantCard key={q.id} quadrant={q} tasks={tasks} /> : null;
          })}
        </>
      )}
    </Screen>
  );
}
