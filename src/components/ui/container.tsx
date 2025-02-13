import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center w-full m-auto px-10 max-w-[1400px]">{children}</div>;
};

export default Container;
