'use client';
import React from 'react';
import Iridescence from '@/components/blocks/Backgrounds/Iridescence/Iridescence';

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black p-4 flex items-center justify-center">
      <div className="relative w-1/2 h-full rounded-[20px] overflow-hidden">
        <Iridescence color={[1, 1, 1]} speed={0.6} amplitude={0.05} />
        {/*<div*/}
        {/*  className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between p-6 text-white">*/}
        {/*  /!* Navigation Bar *!/*/}
        {/*  <nav className="flex items-center justify-between w-full">*/}
        {/*    /!* Logo with Rounded Square *!/*/}
        {/*    <div className="flex items-center gap-3">*/}
        {/*      <h1 className="text-xl font-medium bg-black p-8 rounded-3xl">Raji</h1>*/}
        {/*    </div>*/}

        {/*    /!* Navigation Links *!/*/}
        {/*    <div className="bg-[#66CCFF] rounded-full px-4 py-2 flex gap-4">*/}
        {/*      <a href="#">Projects</a>*/}
        {/*      <a href="#">About</a>*/}
        {/*      <a href="#">Blog</a>*/}
        {/*      <a href="#">Contact</a>*/}
        {/*      <span>🌙</span>*/}
        {/*    </div>*/}
        {/*  </nav>*/}

        {/*  /!* Hero Section *!/*/}
        {/*  <div className="p-6 bg-black rounded-lg">*/}
        {/*    <h2 className="text-3xl font-bold">Equal parts creative developer & designer</h2>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <aside className={'w-1/2'}>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold">About Me</h3>
          <p className="text-lg">I am a creative developer and designer based in the UK. I love creating
            beautiful and functional websites and applications.</p>
        </div>
      </aside>
    </div>
  );
}
