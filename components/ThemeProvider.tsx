import { createContext, useContext, ReactNode } from 'react';

export const theme = {
  colors: {
    // Base
    background: '#F5F5F7',
    surface: '#FFFFFF',
    
    // Text
    textPrimary: '#2D3047',
    textSecondary: '#6E6E73',
    textInverse: '#FFFFFF',
    
    // Accent Colors
    primary: '#4ECDC4',
    secondary: '#FF6B6B',
    tertiary: '#FFD93D',
    success: '#95D5B2',
    
    // States
    error: '#DC2626',
    warning: '#F59E0B',
    info: '#0EA5E9',
    
    // Gradients
    gradientStart: 'rgba(78, 205, 196, 0.1)',
    gradientEnd: 'rgba(78, 205, 196, 0)',
  },
  
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  typography: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700',
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
    },
  },
};

type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}