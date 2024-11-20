import React from 'react';

const MapLoadingSpinner: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-[99999] bg-[rgba(255,255,255,0.5)] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-[#ff6b6b] rounded-full animate-spin"></div>
    </div>
  );
};

export default MapLoadingSpinner;
