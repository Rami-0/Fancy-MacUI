import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Header: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="w-screen bg-primary h-2.5"></div>
      <main>
        <div
          datatype={'logobox'}
          className={'relative w-fit bg-primary flex items-center justify-between px-2.5 mr-3 h-20 rounded-br-[30px]'}
        >
          <span>
            <h1 className="font-kings text-4xl font-bold text-white">Rami</h1>
          </span>
          <CornerDecorations />
        </div>
      </main>
    </header>
  );
};

export default Header;

const CornerDecorations: React.FC = () => {
  return (
    <>
      <svg className="absolute bottom-[-30px] left-0" width="30" height="30" viewBox="0 0 30 30" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="var(--color-primary)"></path>
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
      <svg className="absolute right-[-30px] top-0" width="30" height="30" viewBox="0 0 30 30" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="var(--color-primary)"></path>
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
