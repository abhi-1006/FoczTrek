import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { TextField } from '@/components/TextField';
import { colors, radius, spacing } from '@/constants/theme';
import type { TaskDraft } from '@/lib/types';

type Props = {
  index: number;
  task: TaskDraft;
  accent: string;
  onChange: (index: number, field: keyof TaskDraft, value: string) => void;
};

/**
 * One task's inputs. Memoized: typing in one row only re-renders that row,
 * because untouched rows keep the same `task` object and `onChange` is stable.
 */
export const TaskRow = memo(function TaskRow({ index, task, accent, onChange }: Props) {
  return (
    <View style={[styles.row, { borderLeftColor: accent }]}>
      <AppText variant="heading">Task {index + 1}</AppText>
      <TextField
        label="What needs doing?"
        value={task.name}
        onChangeText={(value) => onChange(index, 'name', value)}
        placeholder={`Task ${index + 1}`}
        returnKeyType="next"
      />
      <View style={styles.times}>
        <TextField
          flex={1}
          label="Start"
          value={task.start}
          onChangeText={(value) => onChange(index, 'start', value)}
          placeholder="e.g. 9:00"
        />
        <TextField
          flex={1}
          label="End"
          value={task.end}
          onChangeText={(value) => onChange(index, 'end', value)}
          placeholder="e.g. 10:30"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    padding: spacing.md,
    gap: spacing.sm,
  },
  times: { flexDirection: 'row', gap: spacing.sm },
});
