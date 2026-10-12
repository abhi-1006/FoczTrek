export const colors = {
  background: '#14161A',
  surface: '#1F2329',
  surfaceRaised: '#2A2F37',
  border: '#3A404A',
  text: '#F4F4F5',
  textMuted: '#A7ADB7',
  brand: '#FFC83D',
  onBrand: '#1B1B1B',
  success: '#2ECC71',
  danger: '#E5484D',
  timerTrail: '#2A2F37' as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
};

/** Content never stretches wider than this, so the layout reads well from phones to desktops. */
export const MAX_CONTENT_WIDTH = 720;
