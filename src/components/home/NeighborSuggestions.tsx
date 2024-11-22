import React, { useEffect, useState } from 'react';
import { useNeighborSuggestionsQuery } from 'service/userSuggestion';
import { useLocationStore } from 'stores/locationStore';
import skeletonImage1 from '../../assets/img/home/user1.svg';
import skeletonImage2 from '../../assets/img/home/user2.svg';
import certificatedIcon from '../../assets/img/home/certificated-caregiver.svg';
import timeIcon from '../../assets/img/map/time.svg';
import UserCardHome from './UserCardHome';
import type1_1 from '../../assets/img/user/type1-1.svg';
import type1_2 from '../../assets/img/user/type1-2.svg';
import type1_3 from '../../assets/img/user/type1-3.svg';
import type1_4 from '../../assets/img/user/type1-4.svg';
import type1_5 from '../../assets/img/user/type1-5.svg';
import type1_6 from '../../assets/img/user/type1-6.svg';
import type1_7 from '../../assets/img/user/type1-7.svg';
import type1_8 from '../../assets/img/user/type1-8.svg';
import type1_9 from '../../assets/img/user/type1-9.svg';
import type1_10 from '../../assets/img/user/type1-10.svg';
import type2_1 from '../../assets/img/user/type2-1.svg';
import type2_2 from '../../assets/img/user/type2-2.svg';
import type2_3 from '../../assets/img/user/type2-3.svg';
import type2_4 from '../../assets/img/user/type2-4.svg';
import type2_5 from '../../assets/img/user/type2-5.svg';
import type2_6 from '../../assets/img/user/type2-6.svg';
import type2_7 from '../../assets/img/user/type2-7.svg';
import type2_8 from '../../assets/img/user/type2-8.svg';
import type2_9 from '../../assets/img/user/type2-9.svg';
import type2_10 from '../../assets/img/user/type2-10.svg';
import type3_1 from '../../assets/img/user/type3-1.svg';
import type3_2 from '../../assets/img/user/type3-2.svg';
import type3_3 from '../../assets/img/user/type3-3.svg';
import type3_4 from '../../assets/img/user/type3-4.svg';
import type3_5 from '../../assets/img/user/type3-5.svg';
import type3_6 from '../../assets/img/user/type3-6.svg';
import type3_7 from '../../assets/img/user/type3-7.svg';
import type3_8 from '../../assets/img/user/type3-8.svg';
import type3_9 from '../../assets/img/user/type3-9.svg';
import type3_10 from '../../assets/img/user/type3-10.svg';

const imageMapping: { [key: string]: string[] } = {
  CAREGIVER: [
    type1_1,
    type1_2,
    type1_3,
    type1_4,
    type1_5,
    type1_6,
    type1_7,
    type1_8,
    type1_9,
    type1_10,
  ],
  CARE_WORKER: [
    type2_1,
    type2_2,
    type2_3,
    type2_4,
    type2_5,
    type2_6,
    type2_7,
    type2_8,
    type2_9,
    type2_10,
  ],
  VOLUNTEER: [
    type3_1,
    type3_2,
    type3_3,
    type3_4,
    type3_5,
    type3_6,
    type3_7,
    type3_8,
    type3_9,
    type3_10,
  ],
};

const NeighborSuggestions: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false); 

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const getUserImage = (userId: number, userType: string): string => {
    const images = imageMapping[userType];
    if (!images) return ''; 
  
    const index = userId % 10;
    return images[index];
  };

  const getBackgroundColor = (userType: string): string => {
    switch (userType) {
      case 'CAREGIVER':
        return '#ff6b6b';
      case 'VOLUNTEER':
        return '#00AEFF';
      case 'CARE_WORKER':
        return '#20CE86';
      default:
        return '#ffffff';
    }
  };
  
  useEffect(() => {
    if (selectedUser) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; 
    };
  }, [selectedUser]);

  const { isAuthenticated } = useLocationStore();
  const { data, isLoading, isError } = useNeighborSuggestionsQuery();

  const SkeletonCard = ({ idx }: { idx: number }) => (
    <div className="w-[125px] h-[163px] relative bg-white rounded-lg flex-col justify-start items-start inline-flex shrink-0 blur-sm">
      <div className="items-center w-full mx-auto text-center mt-[10px]">
        <div className="items-center bg-[#ebfef4] rounded-full justify-center items-center inline-flex">
          <img
            src={idx % 2 === 0 ? skeletonImage1 : skeletonImage2}
            alt={`skeletonImage${idx}`}
            className="w-[64px] h-[64px] rounded-full object-cover"
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
    <div
      className={`w-[125px] h-[163px] relative bg-white rounded-lg flex-col justify-start items-start inline-flex shrink-0 ${
        hasAnimated ? '' : 'animate-fade-in'
      }`} 
      onClick={() => {
        setSelectedUser(user);
        setHasAnimated(true); 
      }}
    >
      <div className="items-center w-full mx-auto text-center mt-[10px]">
      <div
          className="items-center rounded-full justify-center items-center inline-flex"
          style={{
            border: `2px solid ${getBackgroundColor(user.userType)}`,
          }}
        >
          <img
            src={getUserImage(user.userId, user.userType)}
            alt="user"
            className="w-[64px] h-[64px] rounded-full object-cover"
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
          {(() => {
            if (user.userType === 'CARE_WORKER') {
              return (
                <>
                  <img
                    src={certificatedIcon} 
                    alt="certificateIcon"
                    className="w-[14px] h-[14px]"
                  />
                  <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
                    인증 요양보호사
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <img
                    src={timeIcon} 
                    alt="timeIcon"
                    className="w-[14px] h-[14px]"
                  />
                  <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
                    함께한 {user.timeTogether}시간
                  </div>
                </>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );

  return (
    <>
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
          className={`flex space-x-2 cursor-pointer ${
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
      {selectedUser && (
        <UserCardHome user={selectedUser} onClose={handleModalClose} />
      )}
    </>
  );
};

export default NeighborSuggestions;