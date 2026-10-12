import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { colors, MAX_CONTENT_WIDTH, spacing } from '@/constants/theme';

type Props = {
  children: ReactNode;
  background?: string;
};

/** Scrollable page with a centered, width-capped content column. */
export function Screen({ children, background = colors.background }: Props) {
  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled">
      <View style={styles.column}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  column: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    gap: spacing.md,
  },
});
