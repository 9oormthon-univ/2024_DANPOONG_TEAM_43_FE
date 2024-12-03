import React from 'react';
import { useUserStore } from 'stores/useUserStore';
import { useLocationStore } from 'stores/locationStore';
import { getUserTypeText, getBackgroundColor2, getBtnColor } from 'utils/userUtils';

interface UserInfoCardProps {
  userType: string;
  city: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userType, city }) => {
  const { isAuthenticated, setOpenModal } = useLocationStore();
  const userInfo = useUserStore((state) => state.userInfo);

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
          <span
            style={{ color: getBackgroundColor2(userType) }}
            className="text-base font-bold font-['Pretendard'] leading-snug"
          >
            {getUserTypeText(userType)}
          </span>
          <span className="text-[#2a2e36] text-base font-semibold font-['Pretendard'] leading-snug">
            {userType === 'CAREGIVER' ? '이에요' : '에요'}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1 text-left">{city || userInfo.city}</p>
      </div>
      <div
        className={`h-[33px] px-3 py-2.5 rounded-lg inline-flex justify-start items-center cursor-pointer`}
        style={{ backgroundColor: getBtnColor(userType) }}
        onClick={handleButtonClick}
      >
        <div
          style={{ color: getBackgroundColor2(userType) }}
          className="text-sm font-semibold font-['Pretendard'] leading-[21px]"
        >
          {isAuthenticated ? '이웃 인증 완료' : '이웃 인증하기'}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;