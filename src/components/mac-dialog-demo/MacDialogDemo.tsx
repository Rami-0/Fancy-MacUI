'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MacDialog,
  MacDialogTrigger,
  MacDialogContent,
  MacDialogHeader,
  MacDialogFooter,
  MacDialogTitle,
} from '@/components/ui/dialog';
import React from 'react';

export function MacDialogDemo() {
  // Use state to control the dialog
  const [open, setOpen] = React.useState(false);

  return (
    <MacDialog
      initialPosition={{ x: 100, y: 100 }}
      initialSize={{ width: 600, height: 400 }}
      title="My Portfolio App"
      className={'z-[1000]'}
      open={open}
      onOpenChange={setOpen}
    >
      <MacDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 items-center"
          onClick={() => setOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M12 2v20M2 12h20" />
          </svg>
          Launch Portfolio App
        </Button>
      </MacDialogTrigger>

      {/* The content is now rendered conditionally inside the MacDialog component */}
      {open && (
        <>
          <MacDialogHeader>
            <MacDialogTitle>Portfolio Projects</MacDialogTitle>
          </MacDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Project Name
              </Label>
              <Input id="name" defaultValue="Personal Website" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tech" className="text-right">
                Technologies
              </Label>
              <Input id="tech" defaultValue="React, Next.js, Tailwind" className="col-span-3" />
            </div>
            <div className="col-span-4 space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full min-h-24 p-2 border rounded-md"
                defaultValue="A desktop-like interface portfolio showcasing my projects and skills in an interactive way."
              />
            </div>
          </div>
          <MacDialogFooter>
            <Button type="submit">Save Project</Button>
          </MacDialogFooter>
        </>
      )}
    </MacDialog>
  );
}
