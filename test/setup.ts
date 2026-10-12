jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(async () => ({
        sound: { replayAsync: jest.fn(async () => {}), unloadAsync: jest.fn(async () => {}) },
      })),
    },
  },
}));
