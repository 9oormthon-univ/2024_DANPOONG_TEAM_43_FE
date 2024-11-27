import React, { useState } from 'react';
import timeIcon from '../../assets/img/map/time.svg'; 
import UserDetailModal from './UserDetailModal';
import certificatedBackImage1 from '../../assets/img/mypage/certificatedBackImage1.svg';
import certificatedBackImage2 from '../../assets/img/mypage/certificatedBackImage2.svg';
import certificatedBackImage3 from '../../assets/img/sign/certificate-back.svg';
import { getBackgroundColor, getIconPath, getUserImage, getUserTypeText } from 'utils/userUtils';


interface UserCardProps {
  user: any;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleCardClick = () => {
        setSelectedUserId(user.userId); 
        setIsModalOpen(true); 
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
      };

  

  const getCertificatedBackImage = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return certificatedBackImage1;
      case 'VOLUNTEER':
        return certificatedBackImage2;
      case 'CARE_WORKER':
        return certificatedBackImage3;
      default:
        return certificatedBackImage1;
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
    
  return (
    <>
    <div className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-md z-[99998] rounded-t-lg overflow-y-auto cursor-pointer" onClick={handleCardClick} >
        <div
          key={user.userId}
          className={`relative flex flex-col justify-between border-b p-4 ${getBackgroundColor(user.userType)} rounded-lg z-[100]`}
        >
        <img
          src={getCertificatedBackImage(user.userType)}
          alt="backImage"
          className="absolute bottom-0 right-0 h-auto z-[50]"
          style={{
            width: 'auto',
            objectFit: 'cover',
            objectPosition: 'right',
          }}
        />
      <div className="flex justify-between mb-4">
        <div className="flex flex-row">
        <div
          className="items-center rounded-full justify-center items-center inline-flex mr-3"
                    style={{
                        border: `2px solid ${getBackgroundColor2(user.userType)}`,
                    }}
                    >
                    <img
                        src={getUserImage(user.userId, user.userType)}
                        alt="user"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                    </div>
          <div className="flex flex-col">
            <div className="font-semibold text-lg">{getUserTypeText(user.userType)} {user.username}</div>
            <div className="max-w-[110px] flex items-center mt-1 bg-white rounded-lg p-1">
              <img src={timeIcon} alt="Time" className="w-[16px] h-[16px]" />
              <div className="text-[#ff6b6b] text-xs ml-2 font-semibold">함께한 {user.togetherTime} 시간</div>
            </div>
          </div>
        </div>
        <div className="text-right text-[#a6acba] items-center my-auto text-xs font-medium font-['Pretendard'] leading-none">{user.km.toFixed(2)} km</div>
      </div>

      <div className="flex space-x-0 mt-6 z-[100]">
            {['talk', 'eat', 'toilet', 'bath', 'walk'].map((icon) => (
              <div key={icon} className="flex flex-col items-center w-1/5 justify-center">
                <img src={getIconPath(icon, user.userType)} alt={icon} className="w-[52px] h-[52px]" />
                <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                  {user[icon as keyof typeof user]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    {isModalOpen && selectedUserId && (
        <UserDetailModal userId={selectedUserId} onClose={handleCloseModal} />
      )}
  </>
  );
};

export default UserCard;