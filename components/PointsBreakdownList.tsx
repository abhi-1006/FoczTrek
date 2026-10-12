import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';
import { sumPoints, type PointsBreakdown } from '@/lib/points';

export function PointsBreakdownList({ breakdown }: { breakdown: PointsBreakdown }) {
  return (
    <View style={styles.card}>
      {breakdown.map((item) => (
        <View key={item.label} style={styles.row}>
          <AppText>{item.label}</AppText>
          <AppText color={colors.success} style={styles.points}>
            +{item.points}
          </AppText>
        </View>
      ))}
      <View style={[styles.row, styles.total]}>
        <AppText variant="heading">Points earned</AppText>
        <AppText variant="heading" color={colors.brand}>
          +{sumPoints(breakdown)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  points: { fontWeight: '700' },
  total: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
});
