import React from 'react';

const Container = ({ children, className = '', fluid = false }) => {
  return (
    <div className={`container${fluid ? '-fluid' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Container; 