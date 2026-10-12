import { router } from 'expo-router';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { Screen } from '@/components/Screen';
import { StatsRow } from '@/components/StatsRow';
import { useAppState } from '@/context/AppStateContext';
import { currentStreak, MAX_SESSIONS_PER_DAY, rankFor } from '@/lib/points';
import { dayKey } from '@/lib/time';

export default function WelcomeScreen() {
  const { state } = useAppState();
  const streak = currentStreak(state.streak, state.lastActiveDay, dayKey());
  const rank = rankFor(state.totalPoints);
  const returning = state.totalPoints > 0;
  const hasPlan = state.plan.length > 0;
  const dayFinished = state.sessions.length >= MAX_SESSIONS_PER_DAY;

  return (
    <Screen>
      <ResponsiveImage
        source={require('@/assets/images/focztreklogo.webp')}
        aspectRatio={788 / 654}
        maxWidth={360}
        accessibilityLabel="FoczTrek logo"
      />
      <AppText variant="title" center>
        Welcome to FoczTrek!
      </AppText>
      <AppText center>Plan what matters, beat the procrastination monkey, and climb one focus session at a time.</AppText>

      {returning && (
        <StatsRow
          stats={[
            { label: 'Points', value: state.totalPoints },
            { label: 'Streak', value: `${streak} 🔥`, hint: streak === 1 ? 'day' : 'days' },
            { label: 'Rank', value: rank.name, hint: rank.nextAt ? `Next at ${rank.nextAt} pts` : 'Top rank' },
          ]}
        />
      )}

      {hasPlan && !dayFinished && (
        <PrimaryButton title="Continue today's plan" onPress={() => router.push('/summary')} />
      )}
      {dayFinished && <PrimaryButton title="See today's summit" onPress={() => router.push('/summit')} />}
      <PrimaryButton
        title={hasPlan ? 'Start over from the intro' : 'Get Started'}
        variant={hasPlan || dayFinished ? 'secondary' : 'primary'}
        onPress={() => router.push('/jar')}
      />
      {returning && !hasPlan && (
        <PrimaryButton title="Skip intro, plan my day" variant="secondary" onPress={() => router.push('/matrix')} />
      )}
    </Screen>
  );
}
