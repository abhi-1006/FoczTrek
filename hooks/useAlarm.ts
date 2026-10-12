import { Audio } from 'expo-av';
import { useCallback, useEffect, useRef } from 'react';

/** Returns a function that plays the end-of-session alarm. The sound is loaded on first use. */
export function useAlarm() {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return useCallback(async () => {
    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/alarm.mp3'));
        soundRef.current = sound;
      }
      await soundRef.current.replayAsync();
    } catch {
      // Audio can be blocked (silent mode, browser autoplay rules); the visual cue still shows.
    }
  }, []);
}
