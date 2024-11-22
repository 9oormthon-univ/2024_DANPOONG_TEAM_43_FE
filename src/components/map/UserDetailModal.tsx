import React, { useEffect, useRef, useState } from 'react';

import caregiverProfile from '../../assets/img/mypage/profile-caregiver.svg';
import volunteerProfile from '../../assets/img/mypage/profile-volunteer.svg';
import careWorkerProfile from '../../assets/img/mypage/profile-careworker.svg';
import talkIcon1 from '../../assets/img/map/talk1.svg';
import eatIcon1 from '../../assets/img/map/eat1.svg';
import toiletIcon1 from '../../assets/img/map/toilet1.svg';
import bathIcon1 from '../../assets/img/map/bath1.svg';
import walkIcon1 from '../../assets/img/map/walk1.svg';
import talkIcon2 from '../../assets/img/map/talk2.svg';
import eatIcon2 from '../../assets/img/map/eat2.svg';
import toiletIcon2 from '../../assets/img/map/toilet2.svg';
import bathIcon2 from '../../assets/img/map/bath2.svg';
import walkIcon2 from '../../assets/img/map/walk2.svg';
import talkIcon3 from '../../assets/img/map/talk3.svg';
import eatIcon3 from '../../assets/img/map/eat3.svg';
import toiletIcon3 from '../../assets/img/map/toilet3.svg';
import bathIcon3 from '../../assets/img/map/bath3.svg';
import walkIcon3 from '../../assets/img/map/walk3.svg';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import friendIcon from '../../assets/img/map/friend.svg';
import basketIcon from '../../assets/img/map/basket.svg';
import { useUserDetailQuery } from 'service/user';
import type1_1 from '../../assets/img/user/type1_1.svg';
import type1_2 from '../../assets/img/user/type1_2.svg';
import type1_3 from '../../assets/img/user/type1_3.svg';
import type1_4 from '../../assets/img/user/type1_4.svg';
import type1_5 from '../../assets/img/user/type1_5.svg';
import type1_6 from '../../assets/img/user/type1_6.svg';
import type1_7 from '../../assets/img/user/type1_7.svg';
import type1_8 from '../../assets/img/user/type1_8.svg';
import type1_9 from '../../assets/img/user/type1_9.svg';
import type1_10 from '../../assets/img/user/type1_10.svg';
import type2_1 from '../../assets/img/user/type2_1.svg';
import type2_2 from '../../assets/img/user/type2_2.svg';
import type2_3 from '../../assets/img/user/type2_3.svg';
import type2_4 from '../../assets/img/user/type2_4.svg';
import type2_5 from '../../assets/img/user/type2_5.svg';
import type2_6 from '../../assets/img/user/type2_6.svg';
import type2_7 from '../../assets/img/user/type2_7.svg';
import type2_8 from '../../assets/img/user/type2_8.svg';
import type2_9 from '../../assets/img/user/type2_9.svg';
import type2_10 from '../../assets/img/user/type2_10.svg';
import type3_1 from '../../assets/img/user/type3_1.svg';
import type3_2 from '../../assets/img/user/type3_2.svg';
import type3_3 from '../../assets/img/user/type3_3.svg';
import type3_4 from '../../assets/img/user/type3_4.svg';
import type3_5 from '../../assets/img/user/type3_5.svg';
import type3_6 from '../../assets/img/user/type3_6.svg';
import type3_7 from '../../assets/img/user/type3_7.svg';
import type3_8 from '../../assets/img/user/type3_8.svg';
import type3_9 from '../../assets/img/user/type3_9.svg';
import type3_10 from '../../assets/img/user/type3_10.svg';


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

interface UserDetailModalProps {
  userId: number;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ userId, onClose }) => {
  const { data: user, isLoading, isError } = useUserDetailQuery(userId);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false); 
  const storyRef = useRef<HTMLParagraphElement>(null); 

  const getUserImage = (userId: number, userType: string): string => {
    const images = imageMapping[userType];
    if (!images) return ''; 

    const index = userId % 10;
    return images[index];
};

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (storyRef.current) {
      const { scrollHeight, offsetHeight } = storyRef.current;
      setIsClamped(scrollHeight > offsetHeight);
    }
  }, [user?.story]);

  const getIconPath = (icon: string): string => {
    if (!user) return talkIcon1;

    switch (user.userType) {
      case 'CAREGIVER':
        switch (icon) {
          case 'walk': return walkIcon1;
          case 'eat': return eatIcon1;
          case 'toilet': return toiletIcon1;
          case 'bath': return bathIcon1;
          default: return talkIcon1;
        }
      case 'VOLUNTEER':
        switch (icon) {
          case 'walk': return walkIcon2;
          case 'eat': return eatIcon2;
          case 'toilet': return toiletIcon2;
          case 'bath': return bathIcon2;
          default: return talkIcon2;
        }
      case 'CARE_WORKER':
        switch (icon) {
          case 'walk': return walkIcon3;
          case 'eat': return eatIcon3;
          case 'toilet': return toiletIcon3;
          case 'bath': return bathIcon3;
          default: return talkIcon3;
        }
      default:
        return talkIcon1;
    }
  };

  const getUserProfileImage = (): string => {
    if (!user) return caregiverProfile; 

    switch (user.userType) {
      case 'CAREGIVER': return caregiverProfile;
      case 'VOLUNTEER': return volunteerProfile;
      case 'CARE_WORKER': return careWorkerProfile;
      default: return caregiverProfile;
    }
  };

  const getUserTypeText = (userType: string | undefined): string => {
    switch (userType) {
      case 'CAREGIVER': return '간병인';
      case 'VOLUNTEER': return '자원봉사자';
      case 'CARE_WORKER': return '요양보호사';
      default: return '정보 없음';
    }
  };

  const getBackgroundColor = (userType: string | undefined): string => {
    switch (userType) {
      case 'CAREGIVER':
        return 'bg-[#fff1f1]';
      case 'VOLUNTEER':
        return 'bg-[#eff9ff]';
      case 'CARE_WORKER':
        return 'bg-[#ebfef4]';
      default:
        return 'bg-white';
    }
  };

  const getBtnColor = (userType: string | undefined): string => {
    switch (userType) {
      case 'CAREGIVER':
        return 'bg-[#ff6b6b]';
      case 'VOLUNTEER':
        return 'bg-[#00aeff]';
      case 'CARE_WORKER':
        return 'bg-[#20ce86]';
      default:
        return 'bg-white';
    }
  };

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white z-[99999] overflow-y-auto  mx-auto max-w-[440px] min-w-[320px]">
      <div className="flex items-center justify-center h-11 w-[90%] mx-auto my-[10px]">
        <img
          src={leftButtonIcon}
          alt="Back"
          className="absolute left-4 w-6 h-6 cursor-pointer"
          onClick={onClose}
        />
        <div className="text-center text-[#2a2e36] text-base font-medium">{getUserTypeText(user.userType)} {user.username}</div>
        <img
          src={friendIcon}
          alt="Add Friend"
          className="absolute right-4 w-6 h-6 cursor-pointer"
        />
      </div>

      <div className={`h-[calc(100dvh-140px)] w-full overflow-y-auto ${getBackgroundColor(user.userType)} `}>
        <div className='mx-auto max-w-[440px] min-w-[320px] w-[90%]'>
        <div className="flex items-center py-6">
          <img
            src={getUserImage(user.userId, user.userType)}
            alt="User Profile"
            className="w-[124px] h-[124px] mr-4"
          />
          <div className='flex flex-col justify-between h-full space-y-2'>
            <div className="text-lg font-semibold">
               {user.username}
            </div>
            <div className="text-[#2a2e36] text-base font-normal font-['Pretendard'] leading-snug">나이 {user.age}세</div>
            <div className="text-[#2a2e36] text-base font-normal font-['Pretendard'] leading-snug"> {user.city}</div>
            <div className="flex items-center mt-2 px-1.5 py-1 bg-white rounded-lg shadow  justify-start items-start gap-2.5 inline-flex">
              <img src={basketIcon} alt="basket" className="w-4 h-4" />
              <span className="text-[#ff4d6c] text-xs font-medium font-['Pretendard'] leading-[18px]">Carely와 함께한 시간 {user.togetherTime}시간</span>
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 mb-6">
            {user.userType === 'CAREGIVER' ? '제가 모시는 분은,' : '제가 할 수 있는 일은,'}
          </h3>
          <div className="flex justify-around">
          {['talk', 'eat', 'toilet', 'bath', 'walk'].map((icon) => (
                <div className="flex flex-col items-center" key={icon}>
                    <img src={getIconPath(icon)} alt={icon} className="w-[64px] h-[64px]" />
                    <span className="text-sm mt-2">{(user as unknown as Record<string, string>)[icon] || '정보 없음'}</span>
                </div>
                ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 mb-6">나의 이야기</h3>
          <p
              ref={storyRef}
              className={`text-sm text-gray-700 ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: !isExpanded ? 3 : 'unset',
                WebkitBoxOrient: 'vertical',
                overflow: !isExpanded ? 'hidden' : 'visible',
              }}
            >
              {user.story || '등록된 이야기가 없습니다.'}
            </p>
            {isClamped && (
              <div
                onClick={toggleExpanded}
                className="text-center text-[#a6acba] text-sm font-medium font-['Pretendard'] underline leading-tight mt-4 cursor-pointer"
              >
                {isExpanded ? '접기' : '펼치기'}
              </div>
            )}
        </div>

        <div className="mt-6">
          <h3 className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 mb-6">함께한 사람</h3>
          <p
              ref={storyRef} 
              className={`text-sm text-gray-700 ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: !isExpanded ? 3 : 'unset',
                WebkitBoxOrient: 'vertical',
                overflow: !isExpanded ? 'hidden' : 'visible',
              }}
            >
              {user.story || '등록된 이야기가 없습니다.'}
            </p>
            {isClamped && (
              <div
                onClick={toggleExpanded}
                className="text-center text-[#a6acba] text-sm font-medium font-['Pretendard'] underline leading-tight mt-4 cursor-pointer"
              >
                {isExpanded ? '접기' : '펼치기'}
              </div>
            )}
        </div>
      </div>
      </div>
      <div className='w-full'>
      <div className='mx-auto max-w-[440px] min-w-[320px] w-full h-[76px] px-5 py-3 bg-white justify-center items-center inline-flex'>
      <div className={`grow shrink basis-0 self-stretch px-6 py-[15px] rounded-lg justify-center items-center gap-2.5 inline-flex ${getBtnColor(user.userType)} `}>
        <div className="text-center text-white text-base font-semibold font-['Pretendard'] leading-snug">대화 시작하기</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetailModal;