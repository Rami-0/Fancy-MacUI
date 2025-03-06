import React from 'react';
import { VscSettingsGear } from 'react-icons/vsc';
import {
  MacDialog,
  MacDialogTrigger,
  MacDialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/ThemeContext';
import { Label } from '@/components/ui/label';

interface ComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsPopover({ open, onOpenChange }: ComponentProps) {
  const { handleThemeChange, activeTheme, animationsEnabled, toggleAnimations } = useTheme();

  return (
    <MacDialog
      initialPosition={{ x: 800, y: 50 }}
      initialSize={{ width: 350, height: 300 }}
      title="Settings"
      className="z-[1000]"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MacDialogTrigger asChild>
        <div className="p-3 rounded-lg cursor-pointer">
          <VscSettingsGear size={18} />
        </div>
      </MacDialogTrigger>
      <MacDialogContent className="w-80 p-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Adjust your preferences below.
            </p>
          </div>

          {/* Theme Selection */}
          <div className="grid gap-2">
            <div className="flex flex-col items-start justify-between">
              <label className="text-sm font-medium">Choose preferred theme</label>
              <div className="w-full">
                <Button
                  variant="ghost"
                  className={`m-2 p-2 border ${activeTheme === 'light' ? 'bg-gray-400' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </Button>
                <Button
                  variant="ghost"
                  className={`m-2 p-2 border ${activeTheme === 'dark' ? 'bg-gray-400' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant="ghost"
                  className={`m-2 p-2 border ${activeTheme === 'system' ? 'bg-gray-400' : ''}`}
                  onClick={() => handleThemeChange('system')}
                >
                  System
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Switch id={'animation-switcher'} checked={animationsEnabled} onCheckedChange={toggleAnimations} />
            <Label htmlFor="animation-switcher">Enable Animations</Label>
          </div>
        </div>
      </MacDialogContent>
    </MacDialog>
  );
}
