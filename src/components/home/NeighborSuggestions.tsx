import React, { useEffect, useState } from 'react';
import { useNeighborSuggestionsQuery } from 'service/userSuggestion';
import { useLocationStore } from 'stores/locationStore';
import { useNavigate } from 'react-router-dom';
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';
import SkeletonCard from './SkeletonCard';
import UserCardHome from './UserCardHome';
import certificatedIcon from '../../assets/img/home/certificated-caregiver.svg';
import timeIcon from '../../assets/img/map/time.svg';

const NeighborSuggestions: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const navigate = useNavigate();

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    document.body.style.overflow = selectedUser ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedUser]);

  const { isAuthenticated } = useLocationStore();
  const { data, isLoading, isError } = useNeighborSuggestionsQuery();

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
            border: `2px solid ${getBackgroundColor2(user.userType)}`,
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
          {user.userType === 'CARE_WORKER' ? (
            <>
              <img src={certificatedIcon} alt="certificateIcon" className="w-[14px] h-[14px]" />
              <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
                인증 요양보호사
              </div>
            </>
          ) : (
            <>
              <img src={timeIcon} alt="timeIcon" className="w-[14px] h-[14px]" />
              <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
                함께한 {user.timeTogether}시간
              </div>
            </>
          )}
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
          <div
            className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer"
            onClick={() => navigate('/Map')}
          >
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
      {selectedUser && <UserCardHome user={selectedUser} onClose={handleModalClose} />}
    </>
  );
};

export default NeighborSuggestions;