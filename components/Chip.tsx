import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  disabled?: boolean;
  accent?: string;
};

export const Chip = memo(function Chip({ label, selected, onPress, disabled, accent = colors.brand }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && { backgroundColor: accent, borderColor: accent },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text style={[styles.text, selected && styles.selectedText]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    maxWidth: '100%',
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.4 },
  text: { color: colors.text, fontSize: 14, fontWeight: '600' },
  selectedText: { color: colors.onBrand },
});
