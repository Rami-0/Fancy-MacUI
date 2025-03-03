import React from 'react';
import { Button } from '@/components/ui/button';
import {
  MacDialog,
  MacDialogTrigger,
  MacDialogContent,
} from '@/components/ui/dialog';
import { VscAccount, VscGithub, VscMail, VscTwitter } from 'react-icons/vsc';
import { FaLinkedin, FaTelegram } from 'react-icons/fa';

export default function InfoComponent() {
  const [open, setOpen] = React.useState(false);

  return (
    <MacDialog
      initialPosition={{ x: 600, y: 50 }}
      initialSize={{ width: 400, height: 700 }}
      title="About Me"
      className="z-[1000]"
      open={open}
      onOpenChange={setOpen}
    >
      <MacDialogTrigger asChild>
        <VscAccount size={18} />
      </MacDialogTrigger>

      {open && (
        <div
          className="flex flex-col h-full w-full select-none items-center justify-between p-6 bg-zinc-800 text-gray-300">
          {/* Device image */}
          <div className="py-4 flex justify-center">
            <div
              className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
              RA
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Rami A.</h1>
            <p className="text-gray-400 mb-2">FrontEnd Engineer</p>
            <p className="text-gray-500 text-sm mb-6">Bishkek, KG</p>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-2 text-left w-full max-w-xs">
            <div className="text-right text-gray-400">Experience</div>
            <div>2 years</div>

            <div className="text-right text-gray-400">Phone</div>
            <div>+996</div>

            <div className="text-right text-gray-400">Startup disk</div>
            <div>Macintosh HD</div>

            <div className="text-right text-gray-400">Serial number</div>
            <div>FXKL98TZ999</div>

            <div className="text-right text-gray-400">macOS</div>
            <div>Sequoia 15.3.1</div>
          </div>

          <div className="flex gap-4 mt-6">
            <a target={'_blank'} href="https://www.linkedin.com/in/rami-alshalabi-920873169" className="text-blue-400 hover:text-blue-300">
              <FaLinkedin size={24} />
            </a>
            <a target={'_blank'} href="https://t.me/u88s8" className="text-blue-400 hover:text-blue-300">
              <FaTelegram size={24} />
            </a>
            <a target={'_blank'} href="https://github.com/rami-0/" className="text-gray-400 hover:text-gray-300">
              <VscGithub size={24} />
            </a>
            <a target={'_blank'} href="mailto:ramipro.ac@gmail.com" className="text-red-400 hover:text-red-300">
              <VscMail size={24} />
            </a>
          </div>

          {/* Download Button */}
          <div className="mt-6">
            <Button
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-md"
            >
              Download Resume
            </Button>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-500 text-center mt-6">
            <p>© 2025 Rami Alshalabi</p>
            <p>Available for exciting projects</p>
          </div>
        </div>
      )}
    </MacDialog>
  );
}
