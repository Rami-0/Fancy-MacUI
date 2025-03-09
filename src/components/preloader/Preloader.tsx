'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import GlitchText from '@/components/blocks/TextAnimations/GlitchText';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationSpeed] = useState(1);
  const [textOpacity] = useState(1);
  const [showGlitch, setShowGlitch] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Hide the glitch text initially to prevent premature flickering
    const timer = setTimeout(() => {
      setShowGlitch(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showGlitch) return;

    // Create audio element for voice effect
    audioRef.current = new Audio('/whoosh-sound.mp3'); // Replace with your actual sound file

    const container = containerRef.current;
    const text = textRef.current;
    const glitchElement = glitchRef.current;

    if (container && text && glitchElement) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      // Set the total duration to 2 seconds regardless of animation speed
      const totalDuration = 2;

      // Initial setup - ensure the element is hidden at first
      gsap.set(glitchElement, {
        opacity: 0,
        perspective: 800,
        transformStyle: 'preserve-3d',
        scale: 0.5,
        z: 500,
        rotationX: 15,
      });

      // Adjust animation based on speed slider
      tl.timeScale(animationSpeed);

      // Small delay before starting to ensure DOM is ready
      tl.to({}, { duration: 0.1 });

      // Text comes from inside (z perspective animation)
      tl.to(glitchElement,
        {
          opacity: 1,
          scale: 1,
          z: 0,
          rotationX: 0,
          duration: totalDuration * 0.4,
          ease: 'power3.out',
        },
      );

      // Hold for a moment
      tl.to(glitchElement, {
        duration: totalDuration * 0.1,
      });

      // Text goes outside animation with audio trigger
      tl.to(glitchElement, {
        opacity: 0,
        scale: 2,
        z: -400, // Move "outside" the screen (away from viewer)
        rotationX: -15,
        duration: totalDuration * 0.4,
        ease: 'power2.in',
        onStart: () => {
          // Play sound effect when text starts moving out
          if (audioRef.current) {
            audioRef.current.play().catch(err => console.error('Audio play failed:', err));
          }
        },
      });

      // Fade out the entire container
      tl.to(container, {
        opacity: 0,
        scale: 1.1,
        duration: totalDuration * 0.2,
        ease: 'power2.inOut',
      }, '-=0.3');

      // Cleanup function
      return () => {
        tl.kill();
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [animationSpeed, textOpacity, showGlitch]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary bg-opacity-90"
          initial={{ opacity: 1 }}
        >
          {/* Text container with 3D perspective */}
          <div
            ref={textRef}
            className="relative"
            style={{ visibility: showGlitch ? 'visible' : 'hidden' }}
          >
            <div
              ref={glitchRef}
              className="transform-gpu"
              style={{
                transformStyle: 'preserve-3d',
                opacity: 0, // Start hidden and let GSAP control visibility
              }}
            >
              <GlitchText
                speed={1}
                className={'text-primary-foreground'}
              >
                Rami
              </GlitchText>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
