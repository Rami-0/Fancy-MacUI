import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      container: '1280px',
      xl: { max: '1279px' },
      lg: { max: '900px' },
      br800: { max: '800px' },
      md: { max: '768px' },
      sm: { max: '640px' },
      xs: { max: '400px' },
      lg2: { max: '1040px' },
      'min-xl': { min: '1279px' },
      'min-lg': { min: '900px' },
      'min-md': { min: '768px' },
      'min-sm': { min: '640px' },
      'min-xs': { min: '440px' },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        mainOrange: 'var(--main-orange)',
      },
      fontFamily: {
        kings: ['var(--font-kings)'],
        raleway: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
};
export default config;
