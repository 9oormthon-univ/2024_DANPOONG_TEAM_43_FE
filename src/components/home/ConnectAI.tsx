import React, { useEffect, useState } from 'react';
import next from '../../assets/img/home/Ai_next.svg';
import AI_icon from '../../assets/img/home/AI_icon.svg';
import { useNavigate } from 'react-router-dom';
import { useVolunteerDataQuery } from 'service/memos';
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';
import { formatDate } from 'utils/dateUtils';
import MockData from './MockData';

interface ConnectAIProps {
  username: string;
  userType: string;
}

const ConnectAI: React.FC<ConnectAIProps> = ({ username, userType }) => {
  const navigate = useNavigate();
  const { data: volunteerData, isLoading: volunteerLoading } = useVolunteerDataQuery();
  const [forceLoading, setForceLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (volunteerLoading || !volunteerData || volunteerData.length === 0) {
    return (
      <div className="mt-[36px] mb-[24px]">
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 whitespace-pre-wrap">
          안녕하세요 {username}님,
          {userType === 'CAREGIVER' && '\n내 주변 도움을 받아보세요!'}
          {userType === 'VOLUNTEER' && '\n내 주변 도움이 필요하신 분을 찾아보세요!'}
          {userType === 'CARE_WORKER' && '\n내 주변 간병 이웃을 찾아보세요!'}
        </div>
      </div>
    );
  }

  const GoToAI = (caregiverId: string | number, id: string | number, caregiverName: string) => {
    if (volunteerData && volunteerData.length > 0) {
      navigate('/ai-contents', {
        state: {
          caregiverId: caregiverId,
          id: id,
          caregiverName: caregiverName,
        },
      });
    }
  };

  const renderRealData = () => {
    const firstVolunteer = volunteerData?.[0];
    return (
      <div className="Connect_AI">
        <div className="mt-[36px] mb-[24px]">
          <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
            안녕하세요 {username}님,<br />
            {firstVolunteer?.caregiverName}님과의 인연이 기다리고 있어요
          </div>
        </div>
        <div className="outbox">
          <div className="top">
            <div
              className="flex items-center justify-center rounded-full border-2"
              style={{
                border: `2px solid ${getBackgroundColor2('CAREGIVER')}`,
                minWidth: '64px',
                minHeight: '64px',
                maxWidth: '64px',
                maxHeight: '64px',
              }}
            >
              <img
                src={getUserImage(firstVolunteer.caregiverId, 'CAREGIVER')}
                alt="user"
                className="w-[60px] h-[60px] object-cover rounded-full"
              />
            </div>
            <div className="text">
              <p className="top_title">
                {firstVolunteer?.caregiverName}님과의 약속{' '}
                <img
                  src={next}
                  alt=""
                  className="next"
                  onClick={() =>
                    GoToAI(firstVolunteer.caregiverId, firstVolunteer.id, firstVolunteer.caregiverName)
                  }
                />
              </p>
              <p className="when">{formatDate(firstVolunteer?.startTime || '')}</p>
            </div>
          </div>
          <div className="middle">
            <img src={AI_icon} alt="AI Icon" className="AI_img" />
            <p className="AI_info">{firstVolunteer?.caregiverName}님의 간병 정보를 요약해 드려요</p>
          </div>
          <p className="AI_text line-clamp-2 min-h-[44px]">
            {firstVolunteer?.memo || '요약 내역이 없습니다.'}
          </p>
        </div>
      </div>
    );
  };

  return forceLoading || volunteerLoading ? (
    <MockData username={username} />
  ) : (
    renderRealData()
  );
};

export default ConnectAI;