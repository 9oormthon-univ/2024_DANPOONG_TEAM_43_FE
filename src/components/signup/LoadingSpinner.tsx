import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen z-[99999]">
      <div className="w-12 h-12 border-4 border-t-transparent border-[#ff6b6b] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;