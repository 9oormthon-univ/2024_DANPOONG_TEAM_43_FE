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
import UserDetailModal from 'components/map/UserDetailModal';

interface UserCardProps {
    user: any;
    onClose: () => void;
  }
  
  const UserCardHome: React.FC<UserCardProps> = ({ user, onClose }) => {
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

  const getUserProfileImage = () => {
    switch (user.userType) {
      case 'CAREGIVER':
        return caregiverProfile;
      case 'VOLUNTEER':
        return volunteerProfile;
      case 'CARE_WORKER':
        return careWorkerProfile;
      default:
        return caregiverProfile; 
    }
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

    const getBtnColor = (userType: string | undefined): string => {
        switch (userType) {
          case 'CAREGIVER':
            return 'bg-[#ff6b6b]';
          case 'VOLUNTEER':
            return 'bg-[#00aeff]';
          case 'CARE_WORKER':
            return 'bg-[#20ce86]';
          default:
            return 'bg-white';
        }
      };
    

  return (
    <>
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[99998]"
        onClick={onClose} 
        ></div>
        <div
        className="fixed inset-0 flex items-center justify-center z-[99999] max-w-[410px] min-w-[310px] w-[90%] mx-auto "
        onClick={(e) => e.stopPropagation()} 
        >
        <div className="bg-white p-4 shadow-md rounded-lg overflow-y-auto max-w-lg w-full">
            <div
            key={user.userId}
            className={`flex flex-col justify-between border-b p-4 ${getBackgroundColor(
                user.userType
            )} rounded-lg`}
            >
            <div className="flex justify-between  mb-4">
                <div className="flex flex-row">
                <img
                    src={getUserProfileImage()}
                    alt="user"
                    className="w-[60px] h-[60px] rounded-full mr-3"
                />
                <div className="flex flex-col">
                    <div className="font-semibold text-lg">
                    {getUserTypeText(user.userType)} {user.username}
                    </div>
                    <div className="max-w-[100px] flex items-center mt-1 bg-white rounded-lg p-1">
                    <img src={timeIcon} alt="Time" className="w-[16px] h-[16px]" />
                    <div className="text-[#ff6b6b] text-xs ml-2 font-semibold">
                        함께한 {user.togetherTime} 시간
                    </div>
                    </div>
                </div>
                </div>
                <div className="text-right text-[#a6acba] items-center my-auto text-xs font-medium font-['Pretendard'] leading-none">
                {user.km.toFixed(2)} km
                </div>
            </div>

            <div className="flex space-x-0 mt-6">
                <div className="flex flex-col items-center w-1/5 justify-center">
                <img src={getIconPath('talk')} alt="Talk" className="w-[52px] h-[52px]" />
                <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                    {user.talk}
                </div>
                </div>
                <div className="flex flex-col items-center w-1/5 justify-center">
                <img src={getIconPath('eat')} alt="Eat" className="w-[52px] h-[52px]" />
                <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                    {user.eat}
                </div>
                </div>
                <div className="flex flex-col items-center w-1/5 justify-center">
                <img src={getIconPath('toilet')} alt="Toilet" className="w-[52px] h-[52px]" />
                <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                    {user.toilet}
                </div>
                </div>
                <div className="flex flex-col items-center w-1/5 justify-center">
                <img src={getIconPath('bath')} alt="Bath" className="w-[52px] h-[52px]" />
                <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                    {user.bath}
                </div>
                </div>
                <div className="flex flex-col items-center w-1/5 justify-center">
                <img src={getIconPath('walk')} alt="Walk" className="w-[52px] h-[52px]" />
                <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                    {user.walk}
                </div>
                </div>
            </div>
            </div>
            <div className="w-full">
            <div className="mx-auto max-w-[440px] w-full flex gap-4 mt-4 box-border">
                <div
                className={`flex-1 px-2 py-3 rounded-lg flex justify-center items-center bg-gray-300 cursor-pointer`}
                onClick={onClose} 
                >
                <div className="text-center text-white text-base font-semibold font-['Pretendard'] leading-snug">
                    닫기
                </div>
                </div>
                <div
                className={`flex-1 px-2 py-3 rounded-lg flex justify-center items-center cursor-pointer ${getBtnColor(
                    user.userType
                )}`}
                >
                <div className="text-center text-white text-base font-semibold font-['Pretendard'] leading-snug">
                    대화 시작하기
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    );
};

export default UserCardHome;