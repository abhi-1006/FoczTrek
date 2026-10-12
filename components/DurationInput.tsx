import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { TextField } from '@/components/TextField';
import { spacing } from '@/constants/theme';
import { parseDuration } from '@/lib/time';

const PRESET_MINUTES = [15, 25, 45, 60];

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function DurationInput({ value, onChange, disabled }: Props) {
  const seconds = parseDuration(value);
  return (
    <View style={styles.container}>
      <View style={styles.presets}>
        {PRESET_MINUTES.map((minutes) => (
          <Chip
            key={minutes}
            label={`${minutes} min`}
            selected={seconds === minutes * 60}
            disabled={disabled}
            onPress={() => onChange(`${minutes}:00`)}
          />
        ))}
      </View>
      <TextField
        label="Custom length (MM:SS, HH:MM:SS or minutes)"
        value={value}
        onChangeText={onChange}
        editable={!disabled}
        placeholder="25:00"
        inputMode="text"
        error={seconds === null ? 'Enter a time like 25:00, 1:30:00 or 40 (up to 4 hours).' : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
