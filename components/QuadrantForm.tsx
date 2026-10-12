import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TaskRow } from '@/components/TaskRow';
import { radius, spacing } from '@/constants/theme';
import type { QuadrantInfo } from '@/lib/quadrants';
import type { TaskDraft } from '@/lib/types';

export const TASKS_PER_QUADRANT = 5;

const emptyDraft = (): TaskDraft => ({ name: '', start: '', end: '' });

/** Pads saved tasks with empty rows so the form always shows five. */
function toDrafts(initial: TaskDraft[]): TaskDraft[] {
  const drafts = initial.slice(0, TASKS_PER_QUADRANT).map(({ name, start, end }) => ({ name, start, end }));
  while (drafts.length < TASKS_PER_QUADRANT) drafts.push(emptyDraft());
  return drafts;
}

type Props = {
  quadrant: QuadrantInfo;
  initialTasks: TaskDraft[];
  submitLabel: string;
  onSubmit: (drafts: TaskDraft[]) => void;
};

/** The planning form shared by all four Eisenhower quadrants. */
export function QuadrantForm({ quadrant, initialTasks, submitLabel, onSubmit }: Props) {
  const [drafts, setDrafts] = useState(() => toDrafts(initialTasks));

  const updateDraft = useCallback((index: number, field: keyof TaskDraft, value: string) => {
    setDrafts((prev) => prev.map((draft, i) => (i === index ? { ...draft, [field]: value } : draft)));
  }, []);

  const filled = drafts.filter((d) => d.name.trim()).length;

  return (
    <View style={styles.form}>
      <View style={[styles.header, { backgroundColor: quadrant.accent }]}>
        <AppText variant="label" color={quadrant.onAccent}>
          {quadrant.emoji} {quadrant.action}
        </AppText>
        <AppText variant="title" color={quadrant.onAccent}>
          {quadrant.title}
        </AppText>
        <AppText color={quadrant.onAccent}>{quadrant.description}</AppText>
      </View>

      {drafts.map((draft, index) => (
        <TaskRow key={index} index={index} task={draft} accent={quadrant.accent} onChange={updateDraft} />
      ))}

      <AppText variant="caption" center>
        {filled === 0
          ? 'Nothing here? That is fine. Leave it empty and continue.'
          : `${filled} of ${TASKS_PER_QUADRANT} tasks filled in`}
      </AppText>
      <PrimaryButton title={submitLabel} onPress={() => onSubmit(drafts)} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md },
  header: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
