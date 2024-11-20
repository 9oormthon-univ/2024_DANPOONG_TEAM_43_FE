import React from 'react';
import caregiverProfile from '../assets/img/mypage/profile-caregiver.svg';
import volunteerProfile from '../assets/img/mypage/profile-volunteer.svg';
import careWorkerProfile from '../assets/img/mypage/profile-careworker.svg';
import settingsIcon from '../assets/img/mypage/setting.svg';
import { useUserDataQuery } from 'service/user';
import { UserType } from 'type/user';
import ManageNeighbors from 'components/profile/ManageNeighbors';
import CareWorkerCertificate from 'components/profile/CareWorkerCertificate';
import CustomerService from 'components/profile/CustomerService';
import VolunteerCertificate from 'components/profile/VolunteerCertificate.tsx';
import MemoriesSetting from 'components/profile/MemoriesSetting';

const userTypeConfig: Record<UserType, { label: string; color: string; bgColor: string; profileImg: string }> = {
  CAREGIVER: { label: '간병인', color: '#ff6b6b', bgColor: '#ffe5e5', profileImg: caregiverProfile },
  VOLUNTEER: { label: '자원봉사자', color: '#067dfd', bgColor: '#eef7ff', profileImg: volunteerProfile },
  CARE_WORKER: { label: '예비요양보호사', color: '#0cd380', bgColor: '#d8fbed', profileImg: careWorkerProfile },
};

const MyPage: React.FC = () => {
  const { data: userData, isLoading, error } = useUserDataQuery();

  if (isLoading) {
    return null;
  }

  if (error || !userData) {
    return null;
  }

  const { username, userType } = userData;
  const config = userTypeConfig[userType as UserType];

  return (
    <div className="max-w-[440px] min-w-[340px] w-full mx-auto text-center min-h-[calc(100dvh-146px)]">
      <div className="flex items-center justify-center mb-[30px]">
        <div className="text-center text-[#2a2e37] text-base font-medium font-['Pretendard'] leading-snug">마이페이지</div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <img src={config.profileImg} alt="User Profile" className="w-24 h-24 mb-2" />
        
        <div className="flex items-center justify-center">
          <span className="text-lg font-semibold">{username}</span>
          <img src={settingsIcon} alt="Settings" className="w-5 h-5 ml-2" />
        </div>
      </div>

      <div className="w-full px-4">
        <ManageNeighbors />
        
        {userType === 'VOLUNTEER' && <VolunteerCertificate />}
        {userType === 'CARE_WORKER' && <CareWorkerCertificate />}
        
        <MemoriesSetting />
        <CustomerService />
      </div>
    </div>
  );
};

export default MyPage;