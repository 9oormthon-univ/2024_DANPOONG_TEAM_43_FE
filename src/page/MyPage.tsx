import React from 'react';
import settingsIcon from '../assets/img/mypage/setting.svg';
import { useUserDataQuery } from 'service/user';
import ManageNeighbors from 'components/profile/ManageNeighbors';
import CareWorkerCertificate from 'components/profile/CareWorkerCertificate';
import CustomerService from 'components/profile/CustomerService';
import VolunteerCertificate from 'components/profile/VolunteerCertificate.tsx';
import MemoriesSetting from 'components/profile/MemoriesSetting';
import NeighborTime from 'components/mypage/NeighborTime';
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';
import CareLicense from 'components/profile/CareLicense';

const MyPage: React.FC = () => {
  const { data: userData, isLoading, error } = useUserDataQuery();

  if (isLoading) {
    return null;
  }

  if (error || !userData) {
    return null;
  }

  const { username, userType, userId } = userData;

  return (
    <div className="max-w-[440px] min-w-[340px] w-full mx-auto text-center min-h-[calc(100dvh-166px)]">
      <div className="flex items-center justify-center mb-[30px]">
        <div className="text-center text-[#2a2e37] text-base font-medium font-['Pretendard'] leading-snug">
          마이페이지
        </div>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div
          className="items-center rounded-full justify-center inline-flex mb-4"
          style={{ border: `2px solid ${getBackgroundColor2(userType)}` }}
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
      <NeighborTime />
      <div className="w-full px-4">
        <ManageNeighbors />
        {userType === 'VOLUNTEER' && <VolunteerCertificate />}
        {userType === 'CARE_WORKER' && <CareWorkerCertificate />}
        <CareLicense/>
        <MemoriesSetting />
        <CustomerService />
      </div>
    </div>
  );
};

export default MyPage;