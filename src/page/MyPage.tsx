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
import type1_1 from '../assets/img/user/type1-1.svg';
import type1_2 from '../assets/img/user/type1-2.svg';
import type1_3 from '../assets/img/user/type1-3.svg';
import type1_4 from '../assets/img/user/type1-4.svg';
import type1_5 from '../assets/img/user/type1-5.svg';
import type1_6 from '../assets/img/user/type1-6.svg';
import type1_7 from '../assets/img/user/type1-7.svg';
import type1_8 from '../assets/img/user/type1-8.svg';
import type1_9 from '../assets/img/user/type1-9.svg';
import type1_10 from '../assets/img/user/type1-10.svg';
import type2_1 from '../assets/img/user/type2-1.svg';
import type2_2 from '../assets/img/user/type2-2.svg';
import type2_3 from '../assets/img/user/type2-3.svg';
import type2_4 from '../assets/img/user/type2-4.svg';
import type2_5 from '../assets/img/user/type2-5.svg';
import type2_6 from '../assets/img/user/type2-6.svg';
import type2_7 from '../assets/img/user/type2-7.svg';
import type2_8 from '../assets/img/user/type2-8.svg';
import type2_9 from '../assets/img/user/type2-9.svg';
import type2_10 from '../assets/img/user/type2-10.svg';
import type3_1 from '../assets/img/user/type3-1.svg';
import type3_2 from '../assets/img/user/type3-2.svg';
import type3_3 from '../assets/img/user/type3-3.svg';
import type3_4 from '../assets/img/user/type3-4.svg';
import type3_5 from '../assets/img/user/type3-5.svg';
import type3_6 from '../assets/img/user/type3-6.svg';
import type3_7 from '../assets/img/user/type3-7.svg';
import type3_8 from '../assets/img/user/type3-8.svg';
import type3_9 from '../assets/img/user/type3-9.svg';
import type3_10 from '../assets/img/user/type3-10.svg';
import NeighborTime from 'components/mypage/NeighborTime';

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
  
  const getUserImage = (userId: number, userType: string): string => {
    const images = imageMapping[userType];
    if (!images) return ''; 

    const index = userId % 10;
    return images[index];
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

  const { username, userType, userId } = userData;
  const config = userTypeConfig[userType as UserType];

  return (
    <div className="max-w-[440px] min-w-[340px] w-full mx-auto text-center min-h-[calc(100dvh-166px)]">
      <div className="flex items-center justify-center mb-[30px]">
        <div className="text-center text-[#2a2e37] text-base font-medium font-['Pretendard'] leading-snug">마이페이지</div>
      </div>

      <div className="flex flex-col items-center mb-6">
      <div
          className="items-center rounded-full justify-center items-center inline-flex mb-4"
                    style={{
                        border: `2px solid ${getBackgroundColor2(userType)}`,
                    }}
                    >
                    <img
                        src={getUserImage(userId, userType)}
                        alt="user"
                        className="w-[100px] h-[100px] rounded-full object-cover"
                    />
                    </div>
        
        <div className="flex items-center justify-center">
          <span className="text-lg font-semibold">{username}</span>
          <img src={settingsIcon} alt="Settings" className="w-5 h-5 ml-2" />
        </div>
      </div>
      <NeighborTime/>

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