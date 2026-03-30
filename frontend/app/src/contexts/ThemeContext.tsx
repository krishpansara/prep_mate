import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });

  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState(
    theme === 'system' ? getSystemTheme() : theme === 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let currentIsDark = false;
    if (theme === 'system') {
      const systemTheme = getSystemTheme() ? 'dark' : 'light';
      root.classList.add(systemTheme);
      root.style.colorScheme = systemTheme;
      currentIsDark = systemTheme === 'dark';
    } else {
      root.classList.add(theme);
      root.style.colorScheme = theme;
      currentIsDark = theme === 'dark';
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsDark(currentIsDark);
  }, [theme]);

  // Handle system theme change realtime
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        const systemTheme = e.matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        root.style.colorScheme = systemTheme;
        setIsDark(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
