import { currentStreak, nextStreak, rankFor, scoreSession, sumPoints } from '../points';

describe('scoreSession', () => {
  it('gives 10 points for a basic session', () => {
    expect(sumPoints(scoreSession({ completedTimer: false, sessionIndex: 1 }))).toBe(10);
  });

  it('adds the full-timer and important-task bonuses', () => {
    const breakdown = scoreSession({ completedTimer: true, quadrant: 'do', sessionIndex: 2 });
    expect(sumPoints(breakdown)).toBe(20);
    expect(breakdown.map((b) => b.label)).toEqual([
      'Focus session finished',
      'Stayed until the timer ended',
      'Worked on an important task',
    ]);
  });

  it('does not reward unimportant quadrants', () => {
    expect(sumPoints(scoreSession({ completedTimer: false, quadrant: 'delete', sessionIndex: 1 }))).toBe(10);
  });

  it('adds the daily bonus on the 5th session', () => {
    expect(sumPoints(scoreSession({ completedTimer: true, quadrant: 'schedule', sessionIndex: 5 }))).toBe(40);
  });
});

describe('streaks', () => {
  it('starts at 1 on the first active day', () => {
    expect(nextStreak(0, null, '2025-01-10')).toBe(1);
  });

  it('continues on consecutive days', () => {
    expect(nextStreak(3, '2025-01-09', '2025-01-10')).toBe(4);
  });

  it('does not double count the same day', () => {
    expect(nextStreak(3, '2025-01-10', '2025-01-10')).toBe(3);
  });

  it('restarts after a missed day', () => {
    expect(nextStreak(7, '2025-01-07', '2025-01-10')).toBe(1);
  });

  it('shows a lapsed streak as 0', () => {
    expect(currentStreak(4, '2025-01-09', '2025-01-10')).toBe(4);
    expect(currentStreak(4, '2025-01-07', '2025-01-10')).toBe(0);
    expect(currentStreak(0, null, '2025-01-10')).toBe(0);
  });
});

describe('rankFor', () => {
  it('maps points to ranks with the next threshold', () => {
    expect(rankFor(0)).toEqual({ name: 'Base Camp', nextAt: 50 });
    expect(rankFor(149)).toEqual({ name: 'Trailblazer', nextAt: 150 });
    expect(rankFor(1000)).toEqual({ name: 'Peak Master', nextAt: null });
  });
});
