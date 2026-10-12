import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';

type Props = TextInputProps & {
  label: string;
  error?: string | null;
  /** Flex weight when placed in a row with other fields. */
  flex?: number;
};

export function TextField({ label, error, flex, style, ...inputProps }: Props) {
  return (
    <View style={[styles.field, flex !== undefined && { flex }]}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...inputProps}
      />
      {error ? (
        <AppText variant="caption" color={colors.danger}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs, minWidth: 0 },
  input: {
    minHeight: 44,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 16,
  },
  inputError: { borderColor: colors.danger },
});
