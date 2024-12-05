import React, { useState, useEffect } from 'react';
import giver_bg from '../../assets/img/mypage/neighbor_time_giver_bg.svg';
import volunteer_bg from '../../assets/img/mypage/neighbor_time_volunteer_bg.svg';
import worker from '../../assets/img/mypage/neighbor_time_worker_bg.svg';
import { UserType } from 'type/user';
import { useUserDataQuery } from 'service/user';
import axiosInstance from 'utils/axiosInstance';

const userTypeConfig: Record<UserType, { label: string; color: string; bgColor: string; bgImg: string }> = {
  CAREGIVER: { label: '간병인', color: '#FF6B6B', bgColor: '#FFF1F1', bgImg: giver_bg },
  VOLUNTEER: { label: '자원봉사자', color: '#00AEFF', bgColor: '#EFF9FF', bgImg: volunteer_bg },
  CARE_WORKER: { label: '요양보호사', color: '#20CE86', bgColor: '#EBFEF4', bgImg: worker },
};

const NeighborTime: React.FC = () => {
  const { data: userData, isLoading, error } = useUserDataQuery();
  const [volunteerHours, setVolunteerHours] = useState<number | null>(null);

  useEffect(() => {
    if (userId) {
      // API 호출
      axiosInstance
        .get('/api/certificates/total-volunteer-hours', {
          params: { userId },
        })
        .then((response) => {
          setVolunteerHours(response.data);
        })
        .catch((err) => {
          console.error('Error fetching volunteer hours:', err);
        });
    }
  }, [userData]);

  if (error || !userData) {
    return null;
  }
  

  const { userType, userId } = userData;
  const config = userTypeConfig[userType as UserType];

  return (
    <div
      className="neighbor_time"
      style={{
        '--main_color': config.color,
        '--bg_color': config.bgColor,
      } as React.CSSProperties}
    >
      <img src={config.bgImg} alt="" className="background_img" />
      <div className="text">
        <p className="txt">이웃과 함께한 시간</p>
        <p className="time">{volunteerHours}시간</p>
      </div>
      {volunteerHours !== null && volunteerHours >= 80 && (
        <div className="option">요양보호사 자격을 위한 80시간을 모두 이수했어요</div>
      )}
    </div>
  );
};

export default NeighborTime;