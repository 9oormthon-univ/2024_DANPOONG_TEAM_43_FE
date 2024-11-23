import React, { useEffect, useState } from 'react';
import next from '../../assets/img/home/Ai_next.svg';
import AI_icon from '../../assets/img/home/AI_icon.svg';
import { useNavigate } from 'react-router-dom';
import { useVolunteerDataQuery } from 'service/memos';
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
import { useMemoDetailQuery } from 'service/aiMemos';
import { useUserStore } from 'stores/useUserStore';

const imageMapping: { [key: string]: string[] } = {
    CAREGIVER: [type1_1, type1_2, type1_3, type1_4, type1_5, type1_6, type1_7, type1_8, type1_9, type1_10],
    CARE_WORKER: [type2_1, type2_2, type2_3, type2_4, type2_5, type2_6, type2_7, type2_8, type2_9, type2_10],
    VOLUNTEER: [type3_1, type3_2, type3_3, type3_4, type3_5, type3_6, type3_7, type3_8, type3_9, type3_10],
  };

  
  const ConnectAI = () => {
    const navigate = useNavigate();
    const { data: volunteerData, isLoading: volunteerLoading } = useVolunteerDataQuery();
    const userInfo = useUserStore((state) => state.userInfo);

    const [forceLoading, setForceLoading] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
        setForceLoading(false);
        }, 500); 
        return () => clearTimeout(timer);
    }, []);

  
    if (volunteerLoading || !volunteerData || volunteerData.length === 0) {
      return <p></p>;
    }
  
    const firstVolunteer = volunteerData[0];
  
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      return new Date(dateString).toLocaleString('ko-KR', options);
    };
  
    const getUserImage = (userId: number, userType: string): string => {
      const images = imageMapping[userType];
      if (!images) return '';
  
      const index = userId % images.length;
      return images[index];
    };
  
    const GoToAI = (caregiverId: string | number, id: string | number,caregiverName:string) => {
      if (volunteerData && volunteerData.length > 0) {
        navigate('/ai-contents', {
          state: {
            caregiverId: caregiverId, // 전달받은 caregiverId
            id: id,
            caregiverName: caregiverName // 전달받은 id
          },
        });
      }
    };
  
    const getBackgroundColor2 = (userType: string): string => {
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
  
    const renderMockData = () => (
        <div className="Connect_AI blur-sm">
          <div className="mt-[36px] mb-[24px]">
            <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
              안녕하세요 {userInfo.username}님,<br />
              {userInfo.username}님과의 인연이 기다리고 있어요
            </div>
          </div>
          <div className="outbox">
            <div className="top">
              <div
                className="flex items-center justify-center rounded-full border-2"
                style={{
                  border: `2px solid #ff6b6b`,
                  minWidth: '64px',
                  minHeight: '64px',
                  maxWidth: '64px',
                  maxHeight: '64px',
                }}
              >
                <img
                  src={type1_1}
                  alt="default user"
                  className="w-[60px] h-[60px] object-cover rounded-full"
                />
              </div>
              <div className="text">
                <p className="top_title">정지오님과의 약속</p>
                <p className="when">2024년 11월 25일 08:20</p>
              </div>
            </div>
            <div className="middle">
              <img src={AI_icon} alt="AI Icon" className="AI_img" />
              <p className="AI_info">정지오님의 간병 정보를 요약해 드려요</p>
            </div>
            <p className="AI_text line-clamp-2 min-h-[44px]">
     
            </p>
          </div>
        </div>
      );
    
      const renderRealData = () => {
        const firstVolunteer = volunteerData?.[0];
        return (
          <div className="Connect_AI">
            <div className="mt-[36px] mb-[24px]">
              <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
                안녕하세요 {firstVolunteer?.volunteerName}님,<br />
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
                    <img src={next} alt="" className="next" onClick={()=>GoToAI(firstVolunteer.caregiverId,firstVolunteer.id,firstVolunteer.caregiverName)} />
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
    
      return forceLoading || volunteerLoading  ? renderMockData() : renderRealData();
    };
    
    export default ConnectAI;