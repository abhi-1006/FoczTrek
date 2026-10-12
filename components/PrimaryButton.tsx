import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'danger';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  /** Overrides the background of the primary variant (e.g. a quadrant color). */
  color?: string;
  textColor?: string;
};

export function PrimaryButton({ title, onPress, variant = 'primary', disabled, color, textColor }: Props) {
  const background =
    variant === 'secondary' ? 'transparent' : variant === 'danger' ? colors.danger : color ?? colors.brand;
  const foreground =
    textColor ?? (variant === 'primary' && !color ? colors.onBrand : variant === 'secondary' ? colors.text : '#FFFFFF');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: background },
        variant === 'secondary' && styles.secondary,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text style={[styles.text, { color: foreground }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.4 },
  text: { fontSize: 16, fontWeight: '700' },
});
