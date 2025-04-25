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
import MobileLayout from '@/components/ui/mobile-layout';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Define dialog types for better type safety
type DialogType = 'none' | 'projects' | 'profile' | 'settings';

export default function Home() {
  const { animationsEnabled } = useTheme();
  const [loading, setLoading] = useState(true);
  // Use a single state variable for active dialog
  const [activeDialog, setActiveDialog] = useState<DialogType>('none');
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Use a more efficient approach for initial loading
    // This could be replaced with actual content loading logic in a real app
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    // Clean up timer to prevent memory leaks
    return () => clearTimeout(loadTimer);
  }, []);

  // Single function to handle dialog state
  const handleDialogOpen = (dialog: DialogType) => {
    setActiveDialog(dialog);
  };

  // Helper functions to check dialog state and handle changes
  const isDialogOpen = (dialog: DialogType) => activeDialog === dialog;
  const handleDialogClose = (dialog: DialogType) => {
    if (activeDialog === dialog) {
      setActiveDialog('none');
    }
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <main className={`relative w-full ${isMobile ? 'h-full' : 'h-screen overflow-hidden'}`}>
          {isMobile ? (
            <MobileLayout />
          ) : (
            <>
              <Header />
              <HeroSection />
              {animationsEnabled && <SplashCursor />}
              <Dock
                items={[
                  {
                    label: 'Home',
                    icon: <VscHome size={18} />,
                  },
                  {
                    label: 'Projects',
                    icon: <VscFileCode size={18} />,
                    onClick: () => handleDialogOpen('projects'),
                  },
                  {
                    label: 'Profile',
                    icon: <VscAccount size={18} />,
                    onClick: () => handleDialogOpen('profile'),
                  },
                  {
                    label: 'Settings',
                    icon: <VscSettingsGear size={18} />,
                    onClick: () => handleDialogOpen('settings'),
                  },
                ]}
                magnification={70}
              />
              
              {/* Render dialogs based on active state */}
              {isDialogOpen('projects') && (
                <MacFinderDemo 
                  open={true} 
                  onOpenChange={() => handleDialogClose('projects')} 
                />
              )}
              
              {isDialogOpen('profile') && (
                <InfoComponent 
                  open={true} 
                  onOpenChange={() => handleDialogClose('profile')} 
                />
              )}
              
              {isDialogOpen('settings') && (
                <SettingsPopover 
                  open={true} 
                  onOpenChange={() => handleDialogClose('settings')} 
                />
              )}
            </>
          )}
        </main>
      )}
    </>
  );
}
