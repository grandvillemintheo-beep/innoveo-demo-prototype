import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';

const theme = {
  colors: {
    primary: '#0f4c81',
    secondary: '#1b98e0',
    background: '#f5f7fb',
    text: '#0d1b2a'
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};
