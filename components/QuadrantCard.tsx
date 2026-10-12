import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';
import type { QuadrantInfo } from '@/lib/quadrants';
import type { PlannedTask } from '@/lib/types';

type Props = {
  quadrant: QuadrantInfo;
  tasks: PlannedTask[];
  /** Ids of tasks already worked on in a focus session; shown struck through. */
  doneIds?: ReadonlySet<string>;
};

export const QuadrantCard = memo(function QuadrantCard({ quadrant, tasks, doneIds }: Props) {
  return (
    <View style={[styles.card, { borderTopColor: quadrant.accent }]}>
      <AppText variant="heading">
        {quadrant.emoji} {quadrant.title}
      </AppText>
      {tasks.length === 0 ? (
        <AppText variant="caption">No tasks</AppText>
      ) : (
        tasks.map((task) => {
          const done = doneIds?.has(task.id) ?? false;
          const time = [task.start, task.end].filter(Boolean).join(' – ');
          return (
            <View key={task.id} style={styles.task}>
              <AppText style={done && styles.done}>
                {done ? '✓ ' : '• '}
                {task.name}
              </AppText>
              {time ? <AppText variant="caption">{time}</AppText> : null}
            </View>
          );
        })
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderTopWidth: 4,
    padding: spacing.md,
    gap: spacing.sm,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  done: { textDecorationLine: 'line-through', color: colors.textMuted },
});
