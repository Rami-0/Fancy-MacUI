'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/ui/header';
import HeroSection from '@/components/ui/hero-section';
import Container from '@/components/ui/container';
import SplashCursor from '@/components/blocks/Animations/SplashCursor/SplashCursor';
import Dock from '@/components/blocks/Components/Dock/Dock';
import { VscAccount, VscHome, VscFileCode, VscSettingsGear } from 'react-icons/vsc';

export default function Home() {
  const { handleThemeChange } = useTheme();

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscFileCode size={18} />, label: 'Projects', onClick: () => alert('Projects!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <main className={'h-screen w-screen'}>
      <SplashCursor />
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


      <Dock
        items={items}
        panelHeight={30}
        baseItemSize={50}
        magnification={70}
      />
    </main>
  );
}
