import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center w-full m-auto px-2.5 max-w-[99dwh]">{children}</div>;
};

export default Container;
