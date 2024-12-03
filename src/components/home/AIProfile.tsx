import React, { useEffect, useRef, useState } from 'react';
import { useUserDetailQuery } from 'service/user';
import basketIcon from '../../assets/img/map/basket.svg';
import { getIconPath, getUserImage } from 'utils/userUtils';

interface UserDetailModalProps {
  userId: number;
  onClose: () => void;
}

const AIProfile: React.FC<UserDetailModalProps> = ({ userId, onClose }) => {
  const { data: user, isLoading, isError } = useUserDetailQuery(userId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const storyRef = useRef<HTMLParagraphElement>(null);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (storyRef.current) {
      const { scrollHeight, offsetHeight } = storyRef.current;
      setIsClamped(scrollHeight > offsetHeight);
    }
  }, [user?.story]);

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return <div>유저 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="open" onClick={onClose}>
          <div className="bar"></div>
        </div>
        <div className="mx-auto max-w-[440px] w-[90%]">
          <div className="profile-header">
            <img
              src={getUserImage(user.userId, user.userType)}
              alt="User Profile"
              className="profile-image"
            />
            <div className="profile-info">
              <div className="profile-name">{user.username}</div>
              <div className="profile-age">나이 {user.age}세</div>
              <div className="profile-city">{user.city}</div>
              <div className="profile-time">
                <img src={basketIcon} alt="Basket" className="w-4 h-4" />
                <span className="text-[#ff4d6c] text-xs font-medium">
                  Carely와 함께한 시간 {user.togetherTime}시간
                </span>
              </div>
            </div>
          </div>
          <div className="profile-activities">
            <h3 className="text-[#2a2e36] text-xl font-semibold leading-7 mb-6">
              {user.userType === 'CAREGIVER' ? '제가 모시는 분은,' : '제가 할 수 있는 일은,'}
            </h3>
            <div className="activity-icons">
              {['talk', 'eat', 'toilet', 'bath', 'walk'].map((icon) => (
                <div className="activity-item" key={icon}>
                  <img
                    src={getIconPath(icon, user.userType)}
                    alt={icon}
                    className="w-[64px] h-[64px]"
                  />
                  <span className="text-sm mt-2">
                    {(user as unknown as Record<string, string>)[icon] || '정보 없음'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="profile-story">
            <h3 className="text-[#2a2e36] text-xl font-semibold leading-7 mb-6">나의 이야기</h3>
            <p
              ref={storyRef}
              className={`text-sm text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}
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
                className="text-center text-[#a6acba] text-sm font-medium underline leading-tight mt-4 cursor-pointer"
              >
                {isExpanded ? '접기' : '펼치기'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProfile;