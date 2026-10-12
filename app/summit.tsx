import { router } from 'expo-router';

import { AppText } from '@/components/AppText';
import { CompletedList } from '@/components/CompletedList';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressMountain } from '@/components/ProgressMountain';
import { Screen } from '@/components/Screen';
import { StatsRow } from '@/components/StatsRow';
import { colors } from '@/constants/theme';
import { useAppState } from '@/context/AppStateContext';
import { currentStreak, rankFor } from '@/lib/points';
import { dayKey } from '@/lib/time';

export default function SummitScreen() {
  const { state } = useAppState();
  const pointsToday = state.sessions.reduce((total, s) => total + s.points, 0);
  const streak = currentStreak(state.streak, state.lastActiveDay, dayKey());
  const rank = rankFor(state.totalPoints);

  return (
    <Screen>
      <ProgressMountain completed={state.sessions.length} />
      <AppText variant="title" center>
        {state.sessions.length > 0 ? 'Great that you completed these tasks!' : 'No sessions yet today'}
      </AppText>
      <CompletedList sessions={state.sessions} />
      <StatsRow
        stats={[
          { label: 'Today', value: `+${pointsToday}` },
          { label: 'Total points', value: state.totalPoints },
          { label: 'Streak', value: `${streak} 🔥`, hint: streak === 1 ? 'day' : 'days' },
          { label: 'Rank', value: rank.name, hint: rank.nextAt ? `Next at ${rank.nextAt} pts` : 'Top rank' },
        ]}
      />
      <AppText variant="heading" center>
        Come back tomorrow and maintain <AppText variant="heading" color={colors.brand}>CONSISTENCY</AppText>!
      </AppText>
      <AppText variant="caption" center>
        Your points and streak are saved on this device. A fresh plan starts each day.
      </AppText>
      <PrimaryButton title="Back to home" variant="secondary" onPress={() => router.replace('/')} />
    </Screen>
  );
}
