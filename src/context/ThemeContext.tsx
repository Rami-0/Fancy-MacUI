'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Utility functions for localStorage to improve testability
const storageUtils = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }
};

// Theme constants
const THEME_KEY = 'theme';
const ANIMATIONS_KEY = 'animationsEnabled';
const THEME_SYSTEM = 'system';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

interface ThemeContextProps {
  activeTheme: string;
  isDark: boolean;
  animationsEnabled: boolean;
  handleThemeChange: (newTheme: string) => void;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<string>(THEME_SYSTEM);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  // Check if system prefers dark mode
  const getSystemPreference = (): boolean => {
    return typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : false;
  };

  // Apply theme based on type
  const applyTheme = (theme: string) => {
    const isDarkTheme = theme === THEME_DARK || 
      (theme === THEME_SYSTEM && getSystemPreference());
    
    setIsDark(isDarkTheme);
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkTheme);
    }
  };

  // Apply system theme
  const applySystemTheme = () => {
    const systemPrefersDark = getSystemPreference();
    setIsDark(systemPrefersDark);
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    storageUtils.setItem(THEME_KEY, newTheme);

    if (newTheme === THEME_SYSTEM) {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  // Toggle animations
  const toggleAnimations = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    storageUtils.setItem(ANIMATIONS_KEY, String(newValue));
  };

  // Initialize theme and animations from localStorage
  useEffect(() => {
    const savedTheme = storageUtils.getItem(THEME_KEY);
    const savedAnimations = storageUtils.getItem(ANIMATIONS_KEY);

    // Set animations state based on saved preference
    setAnimationsEnabled(savedAnimations !== 'false');

    // Set and apply theme
    if (!savedTheme || savedTheme === THEME_SYSTEM) {
      setActiveTheme(THEME_SYSTEM);
      applySystemTheme();
    } else {
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = () => {
      if (!storageUtils.getItem(THEME_KEY) || storageUtils.getItem(THEME_KEY) === THEME_SYSTEM) {
        applySystemTheme();
      }
    };

    // Use the appropriate event listener based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
    // Clean up event listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      activeTheme, 
      isDark, 
      animationsEnabled, 
      handleThemeChange, 
      toggleAnimations 
    }}>
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
