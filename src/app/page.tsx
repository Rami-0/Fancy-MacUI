'use client';
import React from 'react';
import Iridescence from '@/components/blocks/Backgrounds/Iridescence/Iridescence';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className={'h-screen w-screen'}>
        <Header />
        <HeroSection />
      </main>
    </>
  );
}

const Header: React.FC = () => {
  let logo = './logo.svg';
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="w-screen bg-primary h-2.5"></div>
      <Container>
        <div
          datatype={'logobox'}
          className={'relative w-fit bg-primary flex items-center justify-between pr-4 mr-3 h-20 rounded-br-[30px]'}
        >
          <span className="dark:bg-primary-foreground">
            <Image src={logo} alt={'logo'} width={100} height={100} />
          </span>
          <CornerDecorations />
        </div>
        <nav className="bg-[#66CCFF] rounded-full px-4 py-2 flex gap-4">
          <a href="#">Projects</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
          <span>🌙</span>
        </nav>
      </Container>
    </header>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className={'w-full h-full mt-2.5'}>
      <Container>
        <div className="h-[95dvh] w-full flex relative items-end justify-end">
          <span className={'overflow-hidden rounded-[30px] absolute h-full w-full'}>
            <Iridescence color={[1.2, 0.4, 0.314]} speed={0.6} amplitude={0.05} mouseReact={false} />
          </span>
          <h1 className="text-6xl z-10 font-bold text-white">Hello, I'm Raji</h1>
        </div>
      </Container>
    </section>
  );
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center w-full m-auto px-10 max-w-7xl">{children}</div>;
};

const CornerDecorations: React.FC = () => {
  return (
    <>
      <svg className="absolute bottom-[-30px] left-0" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="var(--color-primary)"></path>
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
      <svg className="absolute right-[-30px] top-0" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
