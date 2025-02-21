import React from 'react';
import Container from '@/components/ui/container';

const HeroSection: React.FC = () => {
  return (
    <section className={'w-full h-full bg-primary'}>
      <Container>
        <div className="w-full h-full pb-24 grid grid-cols-3 grid-rows-3 place-items-stretch relative items-end justify-end">
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">1</span>
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">2</span>
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">3</span>
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">4</span>
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">5</span>
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">6</span>
          <span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">7</span>
          <span className="grid place-content-center col-span-2 h-full text-6xl z-10 font-bold text-white">8</span>
          {/*<span className="grid place-content-center h-full text-6xl z-10 font-bold text-white">9</span>*/}
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
