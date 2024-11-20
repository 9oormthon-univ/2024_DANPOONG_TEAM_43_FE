import React from 'react';

const Memories: React.FC = () => {
  return (
    <div className="mt-6">
       <div className='flex justify-between items-center mb-[16px]'>
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">함께 한 추억</div>
        <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer">더보기</div>
      </div>
      {/* 추억 리스트가 들어갈 자리 */}
      <div className="space-y-2">
        {/* 각 추억 카드 컴포넌트들이 들어갈 예정 */}
      </div>
    </div>
  );
};

export default Memories;