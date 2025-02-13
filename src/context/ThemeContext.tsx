'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextProps {
  activeTheme: string;
  isDark: boolean;
  handleThemeChange: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<string>('system');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (!savedTheme || savedTheme === 'system') {
      setActiveTheme('system');
      applySystemTheme();
    } else {
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'system') {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const applyTheme = (theme: string) => {
    const isDarkTheme = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkTheme);
    document.documentElement.classList.toggle('dark', isDarkTheme);
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'system') {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(systemPrefersDark);
    document.documentElement.classList.toggle('dark', systemPrefersDark);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, isDark, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
