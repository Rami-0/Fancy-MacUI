'use client';

import React, { useEffect, useState } from 'react';
import CountUp from '@/components/blocks/TextAnimations/CountUp';
import GradientText from '@/components/blocks/TextAnimations/GradientText';
import FuzzyText from '@/components/blocks/TextAnimations/FuzzyText';

const TimeCounter = () => {
  const [timeSpent, setTimeSpent] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeSpent = async () => {
      try {
        const response = await fetch('/api/wakatime');

        if (!response.ok) {
          throw new Error('Failed to fetch time spent');
        }

        const data = await response.json();
        setTimeSpent(data.hours);
      } catch (err) {
        setError('Failed to fetch time spent');
        console.error('Error fetching time spent:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSpent();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-t-2 border-b-2 border-blue-500 mr-2 sm:mr-3"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <FuzzyText enableHover={false} baseIntensity={0.1}>
        <span className="text-sm sm:text-base">Opps!</span>
      </FuzzyText>
    </div>
  );

  return (
    <div className="p-2 sm:p-4 rounded-lg shadow-sm">
      {timeSpent !== null ? (
        <div className="flex items-center flex-col gap-1 sm:gap-2">
          <GradientText className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
            +
            <CountUp
              from={0}
              to={timeSpent}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
            hrs
          </GradientText>
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl text-primary-foreground opacity-70 text-center">
            in the last couple months.
          </span>
        </div>
      ) : (
        <div className="text-sm sm:text-base text-gray-500 text-center">No time tracking data available.</div>
      )}
    </div>
  );
};

export default TimeCounter;
