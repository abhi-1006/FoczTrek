import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing } from '@/constants/theme';
import { useAlarm } from '@/hooks/useAlarm';
import { formatTime } from '@/lib/time';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done';

type Props = {
  seconds: number;
  /** Prevents starting, e.g. while the duration input is invalid. */
  disabled?: boolean;
  onStatusChange?: (status: TimerStatus) => void;
};

/**
 * Circular countdown with start / pause / reset and an alarm at zero.
 * The per-second updates happen inside CountdownCircleTimer's render prop, so
 * only the time label re-renders each tick, not this component or its screen.
 */
export function FocusTimer({ seconds, disabled, onStatusChange }: Props) {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [resetCount, setResetCount] = useState(0);
  const playAlarm = useAlarm();
  const { width } = useWindowDimensions();
  const size = Math.min(260, width - 64);

  const update = (next: TimerStatus) => {
    setStatus(next);
    onStatusChange?.(next);
  };

  const reset = () => {
    // A new key remounts the timer, which restarts it at the full duration.
    setResetCount((n) => n + 1);
    update('idle');
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        key={`${seconds}-${resetCount}`}
        isPlaying={status === 'running'}
        duration={seconds}
        size={size}
        strokeWidth={14}
        trailColor={colors.timerTrail}
        colors={['#3FA7F5', '#FFC83D', '#E5484D', '#E5484D']}
        colorsTime={[seconds, seconds * 0.25, seconds * 0.05, 0]}
        onComplete={() => {
          update('done');
          playAlarm();
          return { shouldRepeat: false };
        }}>
        {({ remainingTime }) => (
          <View style={styles.center}>
            <AppText style={styles.time} accessibilityRole="timer">
              {formatTime(remainingTime)}
            </AppText>
            <AppText variant="caption">
              {status === 'done' ? "Time's up!" : status === 'paused' ? 'Paused' : 'Focus'}
            </AppText>
          </View>
        )}
      </CountdownCircleTimer>

      <View style={styles.controls}>
        {status === 'idle' && <PrimaryButton title="Start" onPress={() => update('running')} disabled={disabled} />}
        {status === 'running' && <PrimaryButton title="Pause" variant="secondary" onPress={() => update('paused')} />}
        {status === 'paused' && <PrimaryButton title="Resume" onPress={() => update('running')} />}
        {status !== 'idle' && <PrimaryButton title="Reset" variant="secondary" onPress={reset} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.md },
  center: { alignItems: 'center' },
  time: { fontSize: 44, lineHeight: 52, fontWeight: '800' },
  controls: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'center' },
});
