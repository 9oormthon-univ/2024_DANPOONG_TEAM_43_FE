import React from 'react';
import { useNeighborSuggestionsQuery } from 'service/userSuggestion';
import { useLocationStore } from 'stores/locationStore';
import skeletonImage1 from '../../assets/img/home/user1.svg';
import skeletonImage2 from '../../assets/img/home/user2.svg';
import certificatedIcon from '../../assets/img/home/certificated-caregiver.svg';
import timeIcon from '../../assets/img/map/time.svg';

const NeighborSuggestions: React.FC = () => {
  const { isAuthenticated } = useLocationStore();
  const { data, isLoading, isError } = useNeighborSuggestionsQuery();

  const SkeletonCard = ({ idx }: { idx: number }) => (
    <div className="w-[125px] h-[163px] relative bg-white rounded-lg flex-col justify-start items-start inline-flex shrink-0 blur-sm">
      <div className="items-center w-full mx-auto text-center mt-[10px]">
        <div className="items-center bg-[#ebfef4] rounded-full justify-center items-center inline-flex">
          <img
            src={idx % 2 === 0 ? skeletonImage1 : skeletonImage2}
            alt={`skeletonImage${idx}`}
            className="w-[65.62px] h-[65.62px] rounded-full object-cover"
          />
        </div>
      </div>
      <div className="mx-auto text-center">
        <div className="text-[#2a2e37] text-base font-semibold font-['Pretendard'] leading-snug mb-[6px]">
          {idx % 2 === 0 ? '이규민님' : '이상덕님'}
        </div>
        <div className="text-[#a6acba] text-xs font-medium font-['Pretendard'] leading-none">
          {idx % 2 === 0 ? '3km' : '4km'}
        </div>
      </div>
      <div className="mx-auto bg-[#ebfef4] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex mt-[6px] px-2 py-1">
        <div className="justify-start items-center gap-1 inline-flex">
          <img
            src={idx % 2 === 0 ? certificatedIcon : timeIcon}
            alt={`icon${idx}`}
            className="w-[14px] h-[14px]"
          />
          <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
            {idx % 2 === 0 ? '인증 요양보호사' : '함께한 22시간'}
          </div>
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user }: { user: any }) => (
    <div className="w-[125px] h-[163px] relative bg-white rounded-lg flex-col justify-start items-start inline-flex shrink-0 animate-fade-in">
      <div className="items-center w-full mx-auto text-center mt-[10px]">
        <div className="items-center bg-[#ebfef4] rounded-full justify-center items-center inline-flex">
          <img
            src={user.profileImage || skeletonImage1} 
            alt="user"
            className="w-[65.62px] h-[65.62px] rounded-full object-cover"
          />
        </div>
      </div>
      <div className="mx-auto text-center">
        <div className="text-[#2a2e37] text-base font-semibold font-['Pretendard'] leading-snug mb-[6px]">
          {user.username || '이름 없음'}
        </div>
        <div className="text-[#a6acba] text-xs font-medium font-['Pretendard'] leading-none">
          {user.km ? `${user.km.toFixed(2)}km` : '거리 정보 없음'}
        </div>
      </div>
      <div className="mx-auto bg-[#ebfef4] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex mt-[6px] px-2 py-1">
        <div className="justify-start items-center gap-1 inline-flex">
          <img
            src={timeIcon}
            alt="timeIcon"
            className="w-[14px] h-[14px]"
          />
          <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
            {(() => {
              const userTypeMap: { [key: string]: string } = {
                CAREGIVER: '간병인',
                VOLUNTEER: '자원봉사자',
                CARE_WORKER: '예비요양보호사',
              };
              return userTypeMap[user.userType] || '유형 없음';
            })()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-6">
      <div className="w-[90%] mx-auto flex justify-between items-center mb-[16px]">
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
          나랑 잘 맞는 이웃
        </div>
        <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer">
          더보기
        </div>
      </div>
      <div
        className={`flex space-x-2 ${
          isAuthenticated ? 'overflow-x-auto' : 'overflow-x-hidden'
        }`}
      >
        {isLoading || isError ? (
          [...Array(4)].map((_, idx) => <SkeletonCard key={idx} idx={idx} />)
        ) : isAuthenticated ? (
          data?.data?.map((user: any) => <UserCard key={user.userId} user={user} />)
        ) : (
          [...Array(4)].map((_, idx) => <SkeletonCard key={idx} idx={idx} />)
        )}
      </div>
    </div>
  );
};

export default NeighborSuggestions;