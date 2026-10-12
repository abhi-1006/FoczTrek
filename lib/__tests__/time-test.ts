import { dayKey, daysBetween, formatTime, parseDuration } from '../time';

describe('parseDuration', () => {
  it('parses HH:MM:SS', () => {
    expect(parseDuration('00:25:00')).toBe(1500);
    expect(parseDuration('01:00:30')).toBe(3630);
  });

  it('parses MM:SS', () => {
    expect(parseDuration('25:00')).toBe(1500);
    expect(parseDuration('0:45')).toBe(45);
  });

  it('treats a bare number as minutes', () => {
    expect(parseDuration('25')).toBe(1500);
    expect(parseDuration(' 5 ')).toBe(300);
  });

  it('rejects malformed or out-of-range input', () => {
    expect(parseDuration('')).toBeNull();
    expect(parseDuration('abc')).toBeNull();
    expect(parseDuration('10:75')).toBeNull();
    expect(parseDuration('1:61:00')).toBeNull();
    expect(parseDuration('0')).toBeNull();
    expect(parseDuration('05:00:01')).toBeNull();
    expect(parseDuration('1::2')).toBeNull();
  });
});

describe('formatTime', () => {
  it('formats under an hour as MM:SS', () => {
    expect(formatTime(1500)).toBe('25:00');
    expect(formatTime(9)).toBe('00:09');
    expect(formatTime(0)).toBe('00:00');
  });

  it('includes hours when needed', () => {
    expect(formatTime(3630)).toBe('1:00:30');
  });

  it('never shows negative time', () => {
    expect(formatTime(-5)).toBe('00:00');
  });
});

describe('day helpers', () => {
  it('builds a local YYYY-MM-DD key', () => {
    expect(dayKey(new Date(2025, 0, 7))).toBe('2025-01-07');
  });

  it('counts calendar days between keys, across month boundaries', () => {
    expect(daysBetween('2025-01-31', '2025-02-01')).toBe(1);
    expect(daysBetween('2025-03-01', '2025-03-01')).toBe(0);
    expect(daysBetween('2024-12-30', '2025-01-02')).toBe(3);
  });
});
