import React from 'react';
import { Button } from '@/components/ui/button';
import { VscGithub, VscMail } from 'react-icons/vsc';
import { FaLinkedin, FaTelegram } from 'react-icons/fa';
import Clock from '@/components/clock/Clock';
import TimeCounter from '@/components/time-counter';
import GradientText from '@/components/blocks/TextAnimations/GradientText';

// Data layer
const profileData = {
  initials: 'RA',
  name: 'Rami A.',
  title: 'Frontend Engineer',
  location: 'Bishkek, KG',
};

const techStackData = [
  {
    title: 'Frontend',
    technologies: 'React, Next.js, Tailwind',
    colors: ['#61DAFB', '#38B2AC'],
  },
  {
    title: 'Backend',
    technologies: 'Node.js, Express, Java',
    colors: ['#3C873A', '#68A063'],
  },
  {
    title: 'Cloud',
    technologies: 'AWS, Vercel, Docker',
    colors: ['#FF9900', '#FFC300'],
  },
  {
    title: 'DevOps',
    technologies: 'CI/CD, Kubernetes',
    colors: ['#2496ED', '#326CE5'],
  },
];

const socialLinks = [
  {
    icon: <FaLinkedin size={22} />,
    href: 'https://www.linkedin.com/in/rami-alshalabi-920873169',
    className: 'text-blue-400 hover:text-blue-300',
  },
  {
    icon: <FaTelegram size={22} />,
    href: 'https://t.me/u88s8',
    className: 'text-blue-400 hover:text-blue-300',
  },
  {
    icon: <VscGithub size={22} />,
    href: 'https://github.com/rami-0/',
    className: 'text-gray-400 hover:text-gray-300',
  },
  {
    icon: <VscMail size={22} />,
    href: 'mailto:ramipro.ac@gmail.com',
    className: 'text-red-400 hover:text-red-300',
  },
];

const footerData = {
  copyright: '© 2025 Rami Alshalabi',
  tagline: 'Available for exciting projects',
};

const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-primary overflow-y-auto pb-20">
      <div className="flex flex-col gap-4 p-4">
        {/* Mobile Warning Banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-200 text-xs text-center sticky top-0 z-50 backdrop-blur-sm">
          This is a mobile-optimized version. For the full interactive experience, please visit on desktop.
        </div>

        {/* Profile Section */}
        <div className="bg-zinc-800/50 rounded-xl p-4 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {profileData.initials}
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">{profileData.name}</h1>
            <p className="text-gray-400 text-sm">{profileData.title}</p>
            <p className="text-gray-500 text-xs">{profileData.location}</p>
          </div>
        </div>

        {/* Clock and Counter Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Clock Widget */}
          <div className="bg-zinc-800/50 rounded-xl p-3 flex justify-center items-center">
            <div className="transform scale-75 origin-center">
              <Clock />
            </div>
          </div>

          {/* Time Counter Widget */}
          <div className="bg-zinc-800/50 rounded-xl p-3">
            <div className="transform origin-center">
              <TimeCounter />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-zinc-800/50 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-3">Tech Stack</h2>
          <div className="grid grid-cols-2 gap-3">
            {techStackData.map((item, index) => (
              <div key={index} className="bg-black/20 p-2.5 rounded-lg">
                <GradientText colors={item.colors}>
                  <span className="text-sm">{item.title}</span>
                </GradientText>
                <div className="text-xs text-gray-400 mt-1.5 text-center">{item.technologies}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 py-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={link.className}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Resume Button */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm py-1.5 px-5 rounded-md"
            onClick={() => window.open('/assets/EN_CV.pdf', '_blank')}
          >
            Download Resume
          </Button>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center mt-2">
          <p>{footerData.copyright}</p>
          <p>{footerData.tagline}</p>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout; 