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

// Define dialog types for better type safety
type DialogType = 'none' | 'projects' | 'profile' | 'settings';

export default function Home() {
  const { animationsEnabled } = useTheme();
  const [loading, setLoading] = useState(true);
  // Use a single state variable for active dialog
  const [activeDialog, setActiveDialog] = useState<DialogType>('none');

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
  const handleDialogChange = (dialog: DialogType) => {
    setActiveDialog(dialog);
  };

  // Create dock items with the new handler
  const items = [
    { 
      icon: <VscHome size={18} />, 
      label: 'Home', 
      onClick: () => handleDialogChange('none') 
    },
    { 
      icon: <VscFileCode size={18} />, 
      label: 'Projects', 
      onClick: () => handleDialogChange('projects') 
    },
    { 
      icon: <VscAccount size={18} />, 
      label: 'Profile', 
      onClick: () => handleDialogChange('profile') 
    },
    { 
      icon: <VscSettingsGear size={18} />, 
      label: 'Settings', 
      onClick: () => handleDialogChange('settings') 
    },
  ];

  // Helper functions to check dialog state and handle changes
  const isDialogOpen = (dialog: DialogType): boolean => activeDialog === dialog;
  const handleDialogClose = (dialog: DialogType) => {
    if (activeDialog === dialog) {
      setActiveDialog('none');
    }
  };

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <main className="rounded-lg overflow-hidden w-full h-full relative">
          {animationsEnabled && <SplashCursor />}
          <Header />
          <HeroSection />
          <Dock
            items={items}
            panelHeight={30}
            baseItemSize={50}
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
        </main>
      )}
    </>
  );
}
