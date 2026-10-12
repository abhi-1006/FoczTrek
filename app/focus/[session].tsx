import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { DurationInput } from '@/components/DurationInput';
import { FocusTimer, type TimerStatus } from '@/components/FocusTimer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressMountain } from '@/components/ProgressMountain';
import { Screen } from '@/components/Screen';
import { TaskPicker, type TaskSelection } from '@/components/TaskPicker';
import { colors, radius, spacing } from '@/constants/theme';
import { useAppState } from '@/context/AppStateContext';
import { remainingTasks } from '@/lib/appState';
import { MAX_SESSIONS_PER_DAY } from '@/lib/points';
import { DEFAULT_FOCUS_SECONDS, formatTime, parseDuration } from '@/lib/time';

export function generateStaticParams() {
  return Array.from({ length: MAX_SESSIONS_PER_DAY }, (_, i) => ({ session: String(i + 1) }));
}

export default function FocusScreen() {
  const { session } = useLocalSearchParams<{ session: string }>();
  const { state, completeSession } = useAppState();
  const sessionNumber = Number(session);

  // Which session is allowed is decided once, on mount. Re-checking after
  // completeSession() would redirect away while we navigate to the complete screen.
  const [expected] = useState(state.sessions.length + 1);
  const tasks = useMemo(() => remainingTasks(state), [state]);
  const [selection, setSelection] = useState<TaskSelection>(() =>
    tasks[0]
      ? { taskId: tasks[0].id, quadrant: tasks[0].quadrant, name: tasks[0].name, custom: false }
      : { name: '', custom: true }
  );
  const [durationText, setDurationText] = useState(formatTime(DEFAULT_FOCUS_SECONDS));
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');

  if (expected > MAX_SESSIONS_PER_DAY) return <Redirect href="/summit" />;
  if (sessionNumber !== expected) return <Redirect href={`/focus/${expected}`} />;

  const seconds = parseDuration(durationText);
  const locked = timerStatus === 'running' || timerStatus === 'paused';
  const hasTask = selection.name.trim().length > 0;

  const finish = () => {
    completeSession({
      name: selection.name,
      taskId: selection.custom ? undefined : selection.taskId,
      quadrant: selection.custom ? undefined : selection.quadrant,
      plannedSeconds: seconds ?? DEFAULT_FOCUS_SECONDS,
      completedTimer: timerStatus === 'done',
    });
    router.replace(`/complete/${sessionNumber}`);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: `Focus ${sessionNumber} of ${MAX_SESSIONS_PER_DAY}` }} />
      <ProgressMountain completed={state.sessions.length} />

      <View style={styles.section}>
        <AppText variant="heading">1. Pick your task</AppText>
        <TaskPicker tasks={tasks} selection={selection} onChange={setSelection} disabled={locked} />
      </View>

      <View style={styles.section}>
        <AppText variant="heading">2. Set the timer</AppText>
        <DurationInput value={durationText} onChange={setDurationText} disabled={timerStatus !== 'idle'} />
      </View>

      <View style={styles.section}>
        <AppText variant="heading">3. Focus</AppText>
        {hasTask ? (
          <AppText>
            Working on: <AppText color={colors.brand}>{selection.name}</AppText>
          </AppText>
        ) : null}
        <FocusTimer
          seconds={seconds ?? DEFAULT_FOCUS_SECONDS}
          disabled={seconds === null || !hasTask}
          onStatusChange={setTimerStatus}
        />
      </View>

      <PrimaryButton
        title={timerStatus === 'done' ? 'Finish session' : "I'm done with this task"}
        variant={timerStatus === 'done' ? 'primary' : 'secondary'}
        disabled={!hasTask}
        onPress={finish}
      />
      <AppText variant="caption" center>
        Stay until the timer ends for +5 bonus points.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
});
