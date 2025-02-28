import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="z-[99] text-center text-primary-foreground font-bold select-none">
      <div className="mb-2 text-xl opacity-80">{formatDate(time)}</div>
      <div className="text-8xl font-black">{formatTime(time)}</div>
    </div>
  );
};

export default Clock;
