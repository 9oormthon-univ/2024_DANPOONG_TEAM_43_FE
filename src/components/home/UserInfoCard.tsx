import React from 'react';
import { UserData } from 'type/user';
import { useUserStore } from 'stores/useUserStore';
import { useLocationStore } from 'stores/locationStore';

interface UserInfoCardProps {
  userType: UserData['userType'];
  city: UserData['city'];
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userType, city }) => {
  const { isAuthenticated, setOpenModal } = useLocationStore();
  const userInfo = useUserStore((state) => state.userInfo);

  const userTypeMap: { [key: string]: { label: string; color: string; bgColor: string } } = {
    CAREGIVER: { label: '간병인', color: '#ff6b6b', bgColor: '#ffe5e5' },
    VOLUNTEER: { label: '자원봉사자', color: '#067dfd', bgColor: '#eef7ff' },
    CARE_WORKER: { label: '요양보호사', color: '#0cd380', bgColor: '#d8fbed' },
  };

  const { label, color, bgColor } = userTypeMap[userType] || userTypeMap['CAREGIVER'];

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      setOpenModal(true);
    }
  };

  return (
    <div className="bg-white px-[20px] py-[16px] rounded-lg shadow-md text-center flex justify-between items-center">
      <div className="flex flex-col">
        <div>
          <span className="text-[#2a2e36] text-base font-semibold font-['Pretendard'] leading-snug">나는 </span>
          <span style={{ color }} className="text-base font-bold font-['Pretendard'] leading-snug">
            {label}
          </span>
          <span className="text-[#2a2e36] text-base font-semibold font-['Pretendard'] leading-snug">
            {userType === 'CAREGIVER' ? '이에요' : '에요'}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1 text-left">{userInfo.city}</p>
      </div>
      <div
        className={`h-[33px] px-3 py-2.5 rounded-lg inline-flex justify-start items-center cursor-pointer`}
        style={{ backgroundColor: bgColor }}
        onClick={handleButtonClick}
      >
        <div style={{ color }} className="text-sm font-semibold font-['Pretendard'] leading-[21px]">
          {isAuthenticated ? '이웃 인증 완료' : '이웃 인증하기'}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;