import React from 'react';

const NeighborSuggestions: React.FC = () => {
  return (
    <div className="mt-6">
      <div className='flex justify-between items-center mb-[16px]'>
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">나랑 잘 맞는 이웃</div>
        <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer">더보기</div>
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {/* 이웃 카드 컴포넌트들이 들어갈 예정 */}
      </div>
    </div>
  );
};

export default NeighborSuggestions;