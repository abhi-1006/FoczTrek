import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { PointsBadge } from '@/components/PointsBadge';
import { colors } from '@/constants/theme';
import { AppStateProvider, useAppState } from '@/context/AppStateContext';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, primary: colors.brand },
};

export default function RootLayout() {
  return (
    <AppStateProvider>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="light" />
        <AppStack />
      </ThemeProvider>
    </AppStateProvider>
  );
}

function AppStack() {
  const { hydrated } = useAppState();

  // Keep the splash screen up until saved progress has loaded, so screens never flash empty data.
  useEffect(() => {
    if (hydrated) SplashScreen.hideAsync();
  }, [hydrated]);

  if (!hydrated) return null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => <PointsBadge />,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="index" options={{ title: 'FoczTrek' }} />
      <Stack.Screen name="jar" options={{ title: 'The Jar of Life' }} />
      <Stack.Screen name="matrix" options={{ title: 'Eisenhower Matrix' }} />
      <Stack.Screen name="plan/[quadrant]" options={{ title: 'Plan' }} />
      <Stack.Screen name="brain" options={{ title: 'How Your Brain Works' }} />
      <Stack.Screen name="summary" options={{ title: "Today's Plan" }} />
      <Stack.Screen name="focus/[session]" options={{ title: 'Focus' }} />
      <Stack.Screen name="complete/[session]" options={{ title: 'Session Complete', headerBackVisible: false }} />
      <Stack.Screen name="summit" options={{ title: 'Summit', headerBackVisible: false }} />
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}
