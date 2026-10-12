import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { colors, radius, spacing } from '@/constants/theme';
import { MAX_SESSIONS_PER_DAY } from '@/lib/points';

// The hiker climbs one stage per completed session and reaches the summit after five.
const STAGES = [
  require('@/assets/images/1.1.webp'),
  require('@/assets/images/2.2.webp'),
  require('@/assets/images/3.3.webp'),
  require('@/assets/images/4.4.webp'),
  require('@/assets/images/5.5.webp'),
  require('@/assets/images/summit.1.webp'),
];

type Props = {
  completed: number;
};

export function ProgressMountain({ completed }: Props) {
  const stage = Math.max(0, Math.min(completed, MAX_SESSIONS_PER_DAY));
  return (
    <View style={styles.container}>
      <ResponsiveImage
        source={STAGES[stage]}
        aspectRatio={679 / 396}
        maxWidth={520}
        accessibilityLabel={`Hiker at stage ${stage} of ${MAX_SESSIONS_PER_DAY} on the mountain`}
      />
      <View style={styles.bar} accessibilityRole="progressbar">
        {Array.from({ length: MAX_SESSIONS_PER_DAY }, (_, i) => (
          <View key={i} style={[styles.segment, i < stage && styles.segmentDone]} />
        ))}
      </View>
      <AppText variant="caption" center>
        {stage} of {MAX_SESSIONS_PER_DAY} focus sessions done today
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  bar: { flexDirection: 'row', gap: spacing.xs, maxWidth: 520, width: '100%', alignSelf: 'center' },
  segment: { flex: 1, height: 8, borderRadius: radius.pill, backgroundColor: colors.surfaceRaised },
  segmentDone: { backgroundColor: colors.brand },
});
