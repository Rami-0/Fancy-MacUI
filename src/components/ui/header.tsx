import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import logo_dark from '@/assets/Dark.png';
import logo_light from '@/assets/Light.png';
import Image from 'next/image';

const Header: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <header className={'relative'}>
      {/*<div className="w-screen bg-primary h-2.5"></div>*/}
      <main className="w-full absolute top-0 left-0 z-50">
        <div
          datatype={'logobox'}
          className={'relative bg-secondary w-fit h-fit flex items-center justify-between px-2.5 mr-2.5 rounded-br-[30px]'}
        >
          <span className={'pb-0.5'}>
            <Image src={isDark ? logo_dark : logo_light} alt={'logo'} className={'m-2'} width={50} />
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
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="var(--secondary)"></path>
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
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="var(--secondary)"></path>
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
