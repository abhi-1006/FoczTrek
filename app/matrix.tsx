import { router } from 'expo-router';
import { useMemo } from 'react';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { QuadrantGrid } from '@/components/QuadrantGrid';
import { Screen } from '@/components/Screen';
import { useAppState } from '@/context/AppStateContext';
import { tasksIn } from '@/lib/appState';
import { QUADRANT_ORDER } from '@/lib/quadrants';
import type { QuadrantId } from '@/lib/types';

export default function MatrixScreen() {
  const { state } = useAppState();

  const counts = useMemo(
    () =>
      Object.fromEntries(QUADRANT_ORDER.map((id) => [id, tasksIn(state, id).length])) as Record<QuadrantId, number>,
    [state]
  );

  return (
    <Screen>
      <AppText variant="title" center>
        Sort your tasks
      </AppText>
      <AppText center>
        Every task is either urgent or not, and important or not. Tap a quadrant to fill it in, or go through all
        four in order.
      </AppText>
      <QuadrantGrid counts={counts} onSelect={(id) => router.push(`/plan/${id}`)} />
      <PrimaryButton title="Plan all four quadrants" onPress={() => router.push('/plan/do')} />
      {state.plan.length > 0 && (
        <PrimaryButton title="I'm done planning" variant="secondary" onPress={() => router.push('/brain')} />
      )}
    </Screen>
  );
}
