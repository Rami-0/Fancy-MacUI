import React from 'react';
import Iridescence from '@/components/blocks/Backgrounds/Iridescence/Iridescence';
import Container from '@/components/ui/container';
import Aurora from '@/components/blocks/Backgrounds/Aurora/Aurora';

const HeroSection: React.FC = () => {
  return (
    <section className={'w-full h-full pt-2.5'}>
      <Container>
        <div className="h-[95dvh] w-full flex relative items-end justify-end">
          <span className={'overflow-hidden rounded-[30px] absolute h-full w-full'}>
            <Aurora speed={1} colorStops={['#3A29FF', '#FF94B4', '#FF3232']} />
          </span>
          <h1 className="text-6xl z-10 font-bold text-white">Hello, I'm Raji</h1>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
