import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center h-full w-full m-auto px-2.5 max-w-[100dwh]">{children}</div>;
};

export default Container;
