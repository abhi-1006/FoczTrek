import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors } from '@/constants/theme';

type Variant = 'title' | 'heading' | 'body' | 'caption' | 'label';

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  center?: boolean;
};

export function AppText({ variant = 'body', color, center, style, ...rest }: Props) {
  return (
    <Text
      style={[styles[variant], color ? { color } : null, center ? styles.center : null, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, lineHeight: 36, fontWeight: '800', color: colors.brand },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text },
  body: { fontSize: 16, lineHeight: 24, color: colors.text },
  caption: { fontSize: 14, lineHeight: 20, color: colors.textMuted },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  center: { textAlign: 'center' },
});
