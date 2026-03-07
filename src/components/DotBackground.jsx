import React from 'react';

const DotBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(at center top, rgba(30, 30, 35, 0.3) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default DotBackground;
