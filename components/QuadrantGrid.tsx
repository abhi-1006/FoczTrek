import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';
import { QUADRANTS } from '@/lib/quadrants';
import type { QuadrantId } from '@/lib/types';

type Props = {
  counts: Record<QuadrantId, number>;
  onSelect: (id: QuadrantId) => void;
};

/** The Eisenhower Matrix as a tappable 2×2 grid. Each cell opens that quadrant's form. */
export function QuadrantGrid({ counts, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.axisRow}>
        <AppText variant="label" style={styles.axisLabel} center>
          Urgent
        </AppText>
        <AppText variant="label" style={styles.axisLabel} center>
          Not urgent
        </AppText>
      </View>
      <View style={styles.grid}>
        {QUADRANTS.map((q) => (
          <Pressable
            key={q.id}
            accessibilityRole="button"
            accessibilityLabel={`${q.title}: ${q.action}. ${counts[q.id]} tasks`}
            onPress={() => onSelect(q.id)}
            style={({ pressed }) => [styles.cell, { backgroundColor: q.accent }, pressed && styles.pressed]}>
            <AppText variant="heading" color={q.onAccent} center>
              {q.emoji} {q.action}
            </AppText>
            <AppText variant="caption" color={q.onAccent} center>
              {q.title}
            </AppText>
            <View style={styles.count}>
              <AppText variant="caption" color={colors.text}>
                {counts[q.id] === 0 ? 'Tap to add' : `${counts[q.id]} task${counts[q.id] === 1 ? '' : 's'}`}
              </AppText>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.axisRow}>
        <AppText variant="caption" style={styles.axisLabel} center>
          ↑ Important (top row) · Not important (bottom row) ↓
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm },
  axisRow: { flexDirection: 'row', gap: spacing.sm },
  axisLabel: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  cell: {
    flexBasis: '48%',
    flexGrow: 1,
    minHeight: 140,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pressed: { opacity: 0.85 },
  count: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
