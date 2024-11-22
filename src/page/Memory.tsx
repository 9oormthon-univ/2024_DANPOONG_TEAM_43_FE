import Memories from 'components/home/Memories';
import MemoriesMy from 'components/mypage/MemoriesMy';
import React, { useState } from 'react';
import { useGuestbookByTabQuery } from 'service/guestbook';

const Memory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('전체'); // 기본 탭 설정
  const { data: guestbookData, isLoading, isError } = useGuestbookByTabQuery(activeTab);

  // 날짜 형식 변환 함수
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
  };

  // 유저 타입 변환 함수
  const getUserTypeText = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return '간병인';
      case 'VOLUNTEER':
        return '자원봉사자';
      case 'CARE_WORKER':
        return '요양보호사';
      default:
        return '';
    }
  };

  return (
    <div className="px-4">
      {/* 탭 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {['전체', '내 집', '이웃의 집'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 데이터 영역 */}
      <div className="space-y-4">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
        ) : guestbookData?.length === 0 ? (
          <div>현재 표시할 데이터가 없습니다.</div>
        ) : (
          guestbookData?.map((entry) => (
            <div key={entry.sectionId} className="p-4 rounded-lg shadow-md bg-white space-y-2">
              {/* 상단: home과 careDate */}
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">{entry.home}</div>
                <div className="text-sm text-gray-500">{formatDate(entry.careDate)}</div>
              </div>

              {/* 중단: writer와 userType */}
              <div className="text-sm text-gray-700">
                {entry.writer} ({getUserTypeText(entry.userType)})
              </div>

              {/* 하단: content */}
              {entry.content === '방명록을 작성해보세요!' ? (
                <div>
                  <textarea
                    className="w-full border rounded-lg p-2"
                    placeholder="방명록을 작성해보세요"
                  />
                  <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg">
                    작성하기
                  </button>
                </div>
              ) : (
                <MemoriesMy entry={entry} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Memory;