import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { radius } from '@/constants/theme';

type Props = {
  source: ImageSourcePropType;
  /** Width divided by height of the source image. */
  aspectRatio: number;
  maxWidth?: number;
  accessibilityLabel?: string;
};

/**
 * Fills the available width (up to maxWidth) while keeping the image's proportions.
 * The ratio lives on a wrapper View because React Native Web otherwise sizes an
 * Image with no explicit height to the file's natural height.
 */
export function ResponsiveImage({ source, aspectRatio, maxWidth, accessibilityLabel }: Props) {
  return (
    <View style={[styles.frame, { aspectRatio, maxWidth }]}>
      <Image
        source={source}
        accessibilityLabel={accessibilityLabel}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
