export const DEFAULT_FOCUS_SECONDS = 25 * 60;
export const MAX_FOCUS_SECONDS = 4 * 60 * 60;

/**
 * Parses a focus duration typed by the user. Accepts "HH:MM:SS", "MM:SS" or a
 * plain number of minutes ("25"). Returns the duration in seconds, or null if
 * the text is not a valid duration between 1 second and 4 hours.
 */
export function parseDuration(text: string): number | null {
  const trimmed = text.trim();
  if (!/^\d+(:\d{1,2}){0,2}$/.test(trimmed)) return null;

  const parts = trimmed.split(':').map(Number);
  let seconds: number;
  if (parts.length === 1) {
    seconds = parts[0] * 60;
  } else {
    const [s, m = 0, h = 0] = [...parts].reverse();
    if (s > 59 || (parts.length === 3 && m > 59)) return null;
    seconds = h * 3600 + m * 60 + s;
  }

  if (seconds < 1 || seconds > MAX_FOCUS_SECONDS) return null;
  return seconds;
}

/** Formats seconds as "MM:SS", or "H:MM:SS" when an hour or longer. */
export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  const mmss = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return h > 0 ? `${h}:${mmss}` : mmss;
}

/** Local calendar day as YYYY-MM-DD. */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Whole calendar days from day key `a` to day key `b`. */
export function daysBetween(a: string, b: string): number {
  const toUtc = (key: string) => {
    const [y, m, d] = key.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}
