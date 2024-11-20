import React from 'react';
import { useNeighborSuggestionsQuery } from 'service/userSuggestion';
import { NeighborUser } from 'type/neighborSuggestions';


const NeighborSuggestions: React.FC = () => {
  const { data, isLoading, isError } = useNeighborSuggestionsQuery();

  if (isLoading) return null;
  if (isError) return null;

  const userList = data?.data || [];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
          나랑 잘 맞는 이웃
        </div>
        <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer">
          더보기
        </div>
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {userList.map((item: NeighborUser) => (
          <div key={item.userId} className="w-40 h-60 border rounded-md shadow-md p-2">
            <p className="font-bold">{item.username || '이름 없음'}</p>
            <p className="text-sm">{item.address || '주소 없음'}</p>
            <p className="text-sm">{item.km ? `${item.km.toFixed(2)}km` : '거리 정보 없음'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeighborSuggestions;