'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/ui/header';
import HeroSection from '@/components/ui/hero-section';
import Container from '@/components/ui/container';

export default function Home() {
  const { handleThemeChange } = useTheme();

  return (
    <main className={'h-screen w-screen'}>
      <Header />
      <HeroSection />

      <Container>
        <div>
          <button className="m-2 p-2 border" onClick={() => handleThemeChange('light')}>
            Light
          </button>
          <button className="m-2 p-2 border" onClick={() => handleThemeChange('dark')}>
            Dark
          </button>
          <button className="m-2 p-2 border" onClick={() => handleThemeChange('system')}>
            System
          </button>
        </div>
      </Container>
    </main>
  );
}
