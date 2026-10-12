import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, radius, spacing } from '@/constants/theme';

export type Stat = {
  label: string;
  value: string | number;
  hint?: string;
};

export function StatTile({ label, value, hint }: Stat) {
  return (
    <View style={styles.tile}>
      <AppText variant="label">{label}</AppText>
      <AppText variant="title" color={colors.text} style={styles.value}>
        {value}
      </AppText>
      {hint ? <AppText variant="caption">{hint}</AppText> : null}
    </View>
  );
}

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tile: {
    flexGrow: 1,
    flexBasis: 140,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  value: { fontSize: 26, lineHeight: 32 },
});
