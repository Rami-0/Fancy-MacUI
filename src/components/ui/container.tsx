import React from 'react';

const Container: React.FC<{ children: React.ReactNode, className: string }> = ({ children, className }) => {
  return <div className={`h-full w-full m-auto px-2.5 max-w-[100dwh] ${className}`}>{children}</div>;
};

export default Container;
