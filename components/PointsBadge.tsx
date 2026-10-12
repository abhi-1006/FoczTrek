import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';
import { useAppState } from '@/context/AppStateContext';
import { currentStreak } from '@/lib/points';
import { dayKey } from '@/lib/time';

/** Header badge with the running points total and the current daily streak. */
export function PointsBadge() {
  const { state } = useAppState();
  const streak = currentStreak(state.streak, state.lastActiveDay, dayKey());
  return (
    <View
      style={styles.badge}
      accessibilityLabel={`${state.totalPoints} points, ${streak} day streak`}>
      <AppText variant="caption" color={colors.brand} style={styles.text}>
        ⭐ {state.totalPoints}
      </AppText>
      {streak > 0 ? (
        <AppText variant="caption" color={colors.text} style={styles.text}>
          🔥 {streak}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
    marginRight: spacing.sm,
  },
  text: { fontWeight: '700' },
});
