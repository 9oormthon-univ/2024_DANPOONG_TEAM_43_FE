import React, { useState } from 'react';
import caregiverProfile from '../../assets/img/mypage/profile-caregiver.svg';
import volunteerProfile from '../../assets/img/mypage/profile-volunteer.svg';
import careWorkerProfile from '../../assets/img/mypage/profile-careworker.svg';
import talkIcon1 from '../../assets/img/map/talk1.svg';
import eatIcon1 from '../../assets/img/map/eat1.svg';
import toiletIcon1 from '../../assets/img/map/toilet1.svg';
import bathIcon1 from '../../assets/img/map/bath1.svg';
import walkIcon1 from '../../assets/img/map/walk1.svg';
import talkIcon2 from '../../assets/img/map/talk2.svg';
import eatIcon2 from '../../assets/img/map/eat2.svg';
import toiletIcon2 from '../../assets/img/map/toilet2.svg';
import bathIcon2 from '../../assets/img/map/bath2.svg';
import walkIcon2 from '../../assets/img/map/walk2.svg';
import talkIcon3 from '../../assets/img/map/talk3.svg';
import eatIcon3 from '../../assets/img/map/eat3.svg';
import toiletIcon3 from '../../assets/img/map/toilet3.svg';
import bathIcon3 from '../../assets/img/map/bath3.svg';
import walkIcon3 from '../../assets/img/map/walk3.svg';
import timeIcon from '../../assets/img/map/time.svg'; 
import UserDetailModal from './UserDetailModal';
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
import certificatedBackImage1 from '../../assets/img/mypage/certificatedBackImage1.svg';
import certificatedBackImage2 from '../../assets/img/mypage/certificatedBackImage2.svg';
import certificatedBackImage3 from '../../assets/img/sign/certificate-back.svg';

const imageMapping: { [key: string]: string[] } = {
  CAREGIVER: [type1_1, type1_2, type1_3, type1_4, type1_5, type1_6, type1_7, type1_8, type1_9, type1_10],
  CARE_WORKER: [type2_1, type2_2, type2_3, type2_4, type2_5, type2_6, type2_7, type2_8, type2_9, type2_10],
  VOLUNTEER: [type3_1, type3_2, type3_3, type3_4, type3_5, type3_6, type3_7, type3_8, type3_9, type3_10],
};

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

      const getUserImage = (userId: number, userType: string): string => {
        const images = imageMapping[userType];
        if (!images) return ''; 

        const index = userId % 10;
        return images[index];
    };


  const getIconPath = (icon: string) => {
    if (user.userType === 'CAREGIVER') {
      switch (icon) {
        case 'walk':
          return walkIcon1;
        case 'eat':
          return eatIcon1;
        case 'toilet':
          return toiletIcon1;
        case 'bath':
          return bathIcon1;
        default:
          return talkIcon1;
      }
    }
    if (user.userType === 'VOLUNTEER') {
      switch (icon) {
        case 'walk':
          return walkIcon2;
        case 'eat':
          return eatIcon2;
        case 'toilet':
          return toiletIcon2;
        case 'bath':
          return bathIcon2;
        default:
          return talkIcon2;
      }
    }
    if (user.userType === 'CARE_WORKER') {
      switch (icon) {
        case 'walk':
          return walkIcon3;
        case 'eat':
          return eatIcon3;
        case 'toilet':
          return toiletIcon3;
        case 'bath':
          return bathIcon3;
        default:
          return talkIcon3;
      }
    }
    return talkIcon1; 
  };

  const getBackgroundColor = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return 'bg-[#fff1f1]'; 
      case 'VOLUNTEER':
        return 'bg-[#eff9ff]'; 
      case 'CARE_WORKER':
        return 'bg-[#ebfef4]'; 
      default:
        return 'bg-gray-100'; 
    }
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

    const getUserTypeText = (userType: string) => {
      switch (userType) {
        case 'CAREGIVER':
          return '간병인';
        case 'VOLUNTEER':
          return '자원봉사자';
        case 'CARE_WORKER':
          return '요양보호사';
        default:
          return '';
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
        <div className="flex flex-col items-center w-1/5 justify-center">
          <img src={getIconPath('talk')} alt="Talk" className="w-[52px] h-[52px]" />
          <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">{user.talk}</div>
        </div>
        <div className="flex flex-col items-center w-1/5 justify-center">
          <img src={getIconPath('eat')} alt="Eat" className="w-[52px] h-[52px]" />
          <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">{user.eat}</div>
        </div>
        <div className="flex flex-col items-center w-1/5 justify-center">
          <img src={getIconPath('toilet')} alt="Toilet" className="w-[52px] h-[52px]" />
          <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">{user.toilet}</div>
        </div>
        <div className="flex flex-col items-center w-1/5 justify-center">
          <img src={getIconPath('bath')} alt="Bath" className="w-[52px] h-[52px]" />
          <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">{user.bath}</div>
        </div>
        <div className="flex flex-col items-center w-1/5 justify-center">
          <img src={getIconPath('walk')} alt="Walk" className="w-[52px] h-[52px]" />
          <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">{user.walk}</div>
        </div>
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