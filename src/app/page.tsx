'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/ui/header';
import HeroSection from '@/components/ui/hero-section';
import Container from '@/components/ui/container';
import SplashCursor from '@/components/blocks/Animations/SplashCursor/SplashCursor';
import Dock from '@/components/blocks/Components/Dock/Dock';
import { VscAccount, VscHome, VscFileCode, VscSettingsGear } from 'react-icons/vsc';
import { SettingsPopover } from '@/components/setting-popover/SettingsPopover';

export default function Home() {
  const { animationsEnabled } = useTheme();

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscFileCode size={18} />, label: 'Projects', onClick: () => alert('Projects!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <SettingsPopover />, label: 'Settings' },
  ];

  return (
    <main className={'rounded-lg overflow-hidden w-full h-full relative'}>
      {animationsEnabled && <SplashCursor />}
      <Header />
      <HeroSection />
      <Dock
        items={items}
        panelHeight={30}
        baseItemSize={50}
        magnification={70}
      />

    </main>
  );
}
