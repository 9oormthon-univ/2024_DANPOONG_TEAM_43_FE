import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetailQuery } from 'service/user';
import { getIconPath, getUserImage, getUserTypeText, getBackgroundColor, getBtnColor } from 'utils/userUtils';

import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import friendIcon from '../../assets/img/map/friend.svg';
import basketIcon from '../../assets/img/map/basket.svg';
import axiosInstance from 'utils/axiosInstance';

interface UserDetailModalProps {
  userId: number;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ userId, onClose }) => {
  const { data: user, isLoading, isError } = useUserDetailQuery(userId);
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const handleStartChat = async () => {
    try {
      setIsCreatingChat(true);
      const response = await axiosInstance.post('/chat', { toUser: userId });
      alert('채팅방이 생성되었습니다.');
      navigate('/Chats');
    } catch (error) {
      alert('채팅방 생성에 실패했습니다.');
    } finally {
      setIsCreatingChat(false);
    }
  };

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (storyRef.current) {
      const { scrollHeight, offsetHeight } = storyRef.current;
      setIsClamped(scrollHeight > offsetHeight);
    }
  }, [user?.story]);

  if (isLoading) return null;

  if (isError || !user) return null;

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
                  <img src={getIconPath(icon, user.userType)} alt={icon} className="w-[64px] h-[64px]" />
                  <span className="text-sm mt-2">{user[icon as keyof typeof user] || '정보 없음'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 mb-6">나의 이야기</h3>
            <p
              ref={storyRef}
              className={`text-sm text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''
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
              className={`text-sm text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''
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
          {user.userType === 'CARE_WORKER' && user.certificateImage && (
            <div className="mt-6 mb-4">
              <h3 className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 mb-4">
                자격증
              </h3>
              <img
                src={user.certificateImage}
                alt="Certificate"
                className="mx-auto w-[300px] h-[500px] shadow-md object-cover"
              />
            </div>
          )}
        </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='mx-auto max-w-[440px] min-w-[320px] w-full h-[76px] px-5 py-3 bg-white justify-center items-center inline-flex'>
          <div className={`grow shrink basis-0 self-stretch px-6 py-[15px] rounded-lg justify-center items-center gap-2.5 inline-flex ${getBtnColor(user.userType)} `}
          onClick={handleStartChat}>
            <div className="text-center text-white text-base font-semibold font-['Pretendard'] leading-snug">{isLoading ? '생성 중...' : '대화 시작하기'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;