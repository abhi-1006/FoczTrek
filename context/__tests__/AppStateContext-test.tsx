import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, screen, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';

import { AppStateProvider, useAppState } from '../AppStateContext';
import { createInitialState } from '@/lib/appState';
import { dayKey } from '@/lib/time';

let api: ReturnType<typeof useAppState>;

function Probe() {
  api = useAppState();
  return <Text>{api.hydrated ? `points:${api.state.totalPoints}` : 'loading'}</Text>;
}

beforeEach(async () => {
  await AsyncStorage.clear();
});

it('restores saved points and saves new progress', async () => {
  await AsyncStorage.setItem(
    'focztrek:state:v1',
    JSON.stringify({ ...createInitialState(dayKey()), totalPoints: 40 })
  );

  render(
    <AppStateProvider>
      <Probe />
    </AppStateProvider>
  );
  await screen.findByText('points:40');

  act(() => {
    api.completeSession({ name: 'Essay', plannedSeconds: 1500, completedTimer: true });
  });
  expect(screen.getByText('points:55')).toBeTruthy();

  await waitFor(async () => {
    const saved = JSON.parse((await AsyncStorage.getItem('focztrek:state:v1')) ?? '{}');
    expect(saved.totalPoints).toBe(55);
    expect(saved.sessions).toHaveLength(1);
  });
});

it('throws a clear error outside the provider', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<Probe />)).toThrow('useAppState must be used inside <AppStateProvider>');
});
