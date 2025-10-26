export const colors = {
  brand: {
    primary: '#0f4c81',
    secondary: '#1b98e0'
  },
  background: '#f5f7fb',
  surface: '#ffffff',
  border: 'rgba(15, 76, 129, 0.12)',
  text: {
    primary: '#0d1b2a',
    secondary: '#4f5d75',
    muted: '#7a869a',
    inverse: '#ffffff'
  },
  roles: {
    security: '#0f4c81',
    business: '#2a9d8f',
    maintenance: '#f4a259'
  },
  severity: {
    critical: '#e63946',
    high: '#f3722c',
    medium: '#f8961e',
    low: '#2a9d8f'
  },
  status: {
    open: '#e63946',
    acknowledged: '#f4a259',
    resolved: '#2a9d8f'
  },
  overlays: {
    shadowStrong: '0 16px 40px rgba(15, 76, 129, 0.12)',
    shadowSoft: '0 8px 20px rgba(15, 76, 129, 0.1)'
  }
} as const;

export type SeverityToken = keyof typeof colors.severity;
export type StatusToken = keyof typeof colors.status;
