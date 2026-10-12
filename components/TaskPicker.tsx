import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Chip } from '@/components/Chip';
import { TextField } from '@/components/TextField';
import { spacing } from '@/constants/theme';
import { getQuadrant } from '@/lib/quadrants';
import type { PlannedTask, QuadrantId } from '@/lib/types';

export type TaskSelection = {
  taskId?: string;
  quadrant?: QuadrantId;
  name: string;
  /** True when the user is typing a task that isn't in the plan. */
  custom: boolean;
};

type Props = {
  tasks: PlannedTask[];
  selection: TaskSelection;
  onChange: (selection: TaskSelection) => void;
  disabled?: boolean;
};

/** Pick the next focus task from the plan, or type a different one. */
export function TaskPicker({ tasks, selection, onChange, disabled }: Props) {
  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <View style={styles.options}>
          {tasks.map((task) => {
            const quadrant = getQuadrant(task.quadrant);
            return (
              <Chip
                key={task.id}
                label={`${quadrant.emoji} ${task.name}`}
                accent={quadrant.accent}
                selected={!selection.custom && selection.taskId === task.id}
                disabled={disabled}
                onPress={() => onChange({ taskId: task.id, quadrant: task.quadrant, name: task.name, custom: false })}
              />
            );
          })}
          <Chip
            label="✏️ Something else"
            selected={selection.custom}
            disabled={disabled}
            onPress={() => onChange({ name: '', custom: true })}
          />
        </View>
      ) : (
        <AppText variant="caption">No planned tasks left. Type what you will focus on.</AppText>
      )}
      {(selection.custom || tasks.length === 0) && (
        <TextField
          label="Focus task"
          value={selection.name}
          editable={!disabled}
          onChangeText={(name) => onChange({ name, custom: true })}
          placeholder="What will you focus on?"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
