'use client';
import React from 'react';
import Iridescence from '@/components/blocks/Backgrounds/Iridescence/Iridescence';

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-black p-4 flex gap-6 items-center justify-center">
        <header className="w-full fixed z-99">
          <div datatype={'headercontainer'} className={'flex items-center w-full m-auto px-10 max-w-7xl'}>

            <div datatype={'logobox'}
                 className={'relative w-fit flex items-center justify-between pr-4 mr-3 h-20 rounded-br-[30px] bg-black'}>
              <h1
                className="text-white text-4xl font-bold">
                Raji
              </h1>
              <svg className="absolute bottom-[-30px] left-0" width="30" height="30" viewBox="0 0 30 30" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_310_2)">
                  <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#F9F8F6"></path>
                </g>
                <defs>
                  <clipPath id="clip0_310_2">
                    <rect width="30" height="30" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              <svg className="absolute right-[-30px] top-0" width="30" height="30" viewBox="0 0 30 30" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_310_2)">
                  <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#F9F8F6"></path>
                </g>
                <defs>
                  <clipPath id="clip0_310_2">
                    <rect width="30" height="30" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div>
              {/* Navigation Links */}
              <nav className="bg-[#66CCFF] rounded-full px-4 py-2 flex gap-4">
                <a href="#">Projects</a>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Contact</a>
                <span>🌙</span>
              </nav>
            </div>
          </div>

        </header>
        {/*<div*/
        }
        {/*  className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between p-6 text-white">*/
        }
        {/*  /!* Navigation Bar *!/*/
        }
        {/*  <nav className="flex items-center justify-between w-full">*/
        }
        {/*    /!* Logo with Rounded Square *!/*/
        }
        {/*    <div className="flex items-center gap-3">*/
        }
        {/*      <h1 className="text-xl font-medium bg-black p-8 rounded-3xl">Raji</h1>*/
        }
        {/*    </div>*/
        }

        {/*    /!* Navigation Links *!/*/
        }
        {/*    <div className="bg-[#66CCFF] rounded-full px-4 py-2 flex gap-4">*/
        }
        {/*      <a href="#">Projects</a>*/
        }
        {/*      <a href="#">About</a>*/
        }
        {/*      <a href="#">Blog</a>*/
        }
        {/*      <a href="#">Contact</a>*/
        }
        {/*      <span>🌙</span>*/
        }
        {/*    </div>*/
        }
        {/*  </nav>*/
        }

        {/*  /!* Hero Section *!/*/
        }
        {/*  <div className="p-6 bg-black rounded-lg">*/
        }
        {/*    <h2 className="text-3xl font-bold">Equal parts creative developer & designer</h2>*/
        }
        {/*  </div>*/
        }
        {/*</div>*/
        }
        {/*<Iridescence color={[1, 1, 1]} speed={0.6} amplitude={0.05} />*/}
        {/*<aside className={'w-1/2'}>*/}
        {/*  <div className="bg-white rounded-lg p-6">*/}
        {/*    <h3 className="text-2xl font-bold">About Me</h3>*/}
        {/*    <p className="text-lg">I am a creative developer and designer based in the UK. I love creating*/}
        {/*      beautiful and functional websites and applications.</p>*/}
        {/*  </div>*/}
        {/*</aside>*/}
      </div>
    </>
  )
    ;
}
