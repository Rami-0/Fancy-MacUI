'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/ui/header';
import HeroSection from '@/components/ui/hero-section';
import SplashCursor from '@/components/blocks/Animations/SplashCursor/SplashCursor';
import Dock from '@/components/blocks/Components/Dock/Dock';
import { VscHome, VscFileCode, VscSettingsGear, VscAccount } from 'react-icons/vsc';
import { SettingsPopover } from '@/components/setting-popover/SettingsPopover';
import { MacFinderDemo } from '@/components/mac-dialog-demo/MacDialogDemo';
import InfoComponent from '@/components/info-component';
import Preloader from '@/components/preloader/Preloader';
import Container from '@/components/ui/container';

export default function Home() {
  const { animationsEnabled } = useTheme();
  const [loading, setLoading] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay - replace with actual loading check if needed
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust delay as needed
  }, []);

  const closeAll = () => {
    setIsProjectsOpen(false);
    setIsProfileOpen(false);
    setIsSettingsOpen(false);
  }

  const openProjects = () => {
    setIsProjectsOpen(true);
    setIsProfileOpen(false);
    setIsSettingsOpen(false);
  };

  const openProfile = () => {
    setIsProjectsOpen(false);
    setIsProfileOpen(true);
    setIsSettingsOpen(false);
  };

  const openSettings = () => {
    setIsProjectsOpen(false);
    setIsProfileOpen(false);
    setIsSettingsOpen(true);
  };


  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: closeAll },
    { icon: <VscFileCode size={18} />, label: 'Projects', onClick: openProjects },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: openProfile },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: openSettings },
  ];

  return (
    <>
      {loading && <Preloader />}
      {
        !loading &&
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
          {isProjectsOpen && <MacFinderDemo open={isProjectsOpen} onOpenChange={setIsProjectsOpen} />}
          {isProfileOpen && <InfoComponent open={isProfileOpen} onOpenChange={setIsProfileOpen} />}
          {isSettingsOpen && <SettingsPopover open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />}
        </main>
      }
    </>
  );
}
