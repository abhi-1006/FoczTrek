import type { ImageSourcePropType } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { colors, radius, spacing } from '@/constants/theme';

type Props = {
  image: ImageSourcePropType;
  caption: string;
  aspectRatio?: number;
};

export function IllustratedStep({ image, caption, aspectRatio = 16 / 9 }: Props) {
  return (
    <View style={styles.card}>
      <ResponsiveImage source={image} aspectRatio={aspectRatio} accessibilityLabel={caption} />
      <AppText center>{caption}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
});
