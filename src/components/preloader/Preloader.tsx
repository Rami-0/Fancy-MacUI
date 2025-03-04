'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [spinnerSize, setSpinnerSize] = useState(80);
  const [textOpacity, setTextOpacity] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spinner = spinnerRef.current;
    const text = textRef.current;

    if (container && spinner && text) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        }
      });

      // Adjust animation based on speed slider
      tl.timeScale(animationSpeed);

      // Dynamic animations
      tl.fromTo(spinner, 
        { 
          rotation: 0, 
          scale: 0.6, 
          opacity: 0 
        },
        {
          rotation: 360,
          scale: spinnerSize / 100,
          opacity: 1,
          duration: 1.2 / animationSpeed,
          ease: "power2.out",
          repeat: -1
        })
        .fromTo(text, 
          { 
            opacity: 0, 
            y: 20, 
            scale: 0.8 
          }, 
          {
            opacity: textOpacity, 
            y: 0, 
            scale: 1,
            duration: 0.8 / animationSpeed,
            ease: "back.out(1.7)"
          }, 
          "-=0.6"
        )
        .to(container, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8 / animationSpeed,
          ease: "power2.inOut",
          delay: 0.3
        });

      // Cleanup function
      return () => {
        tl.kill();
      };
    }
  }, [animationSpeed, spinnerSize, textOpacity]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed top-0 left-0 w-full h-full bg-primary z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.2,
            transition: { 
              duration: 0.6, 
              ease: "easeInOut" 
            }
          }}
        >
          {/* Centered Spinner */}
          <motion.div
            ref={spinnerRef}
            className="rounded-full border-4 border-dashed border-primary-foreground animate-spin"
            style={{
              width: `${spinnerSize}px`,
              height: `${spinnerSize}px`
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.6 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: 360
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Centered Text */}
          <motion.div
            ref={textRef}
            className="text-4xl font-bold text-primary-foreground mt-4"
            initial={{ 
              opacity: 0, 
              y: 20, 
              scale: 0.8 
            }}
            animate={{ 
              opacity: textOpacity, 
              y: 0, 
              scale: 1 
            }}
            transition={{
              duration: 0.8,
              ease: "backOut"
            }}
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)' 
            }}
          >
            RAMI
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;