import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';
import { getQuadrant } from '@/lib/quadrants';
import { formatTime } from '@/lib/time';
import type { FocusSession } from '@/lib/types';

export function CompletedList({ sessions }: { sessions: FocusSession[] }) {
  if (sessions.length === 0) {
    return <AppText variant="caption">No focus sessions yet.</AppText>;
  }
  return (
    <View style={styles.card}>
      {sessions.map((session) => (
        <View key={session.index} style={styles.row}>
          <View style={styles.info}>
            <AppText>
              ✓ {session.quadrant ? `${getQuadrant(session.quadrant).emoji} ` : ''}
              {session.name}
            </AppText>
            <AppText variant="caption">
              {formatTime(session.plannedSeconds)} planned
              {session.completedTimer ? ' · full session' : ''}
            </AppText>
          </View>
          <AppText color={colors.brand} style={styles.points}>
            +{session.points}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  info: { flex: 1, gap: 2 },
  points: { fontWeight: '700' },
});
