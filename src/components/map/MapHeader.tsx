import React from 'react';

interface MapHeaderProps {
  onToggleList: () => void;
  isListVisible: boolean;
  city: string;
}

const MapHeader: React.FC<MapHeaderProps> = ({ onToggleList, isListVisible, city }) => {
  return (
    <div className="absolute h-[50px] top-0 left-0 w-full p-4 bg-white shadow-md z-[99999] flex flex-col">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="이곳을 검색해 보세요."
          className="p-2 border border-gray-300 rounded-md w-4/5"
        />
        <button onClick={onToggleList} className="p-2 bg-blue-500 text-white rounded-full">
          {isListVisible ? '📍 지도 보기' : '🔽 리스트 보기'}
        </button>
      </div>
    </div>
  );
};

export default MapHeader;