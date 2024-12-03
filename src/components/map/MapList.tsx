import React, { useState } from 'react';
import { getBackgroundColor, getCertificatedBackImage, getUserImage, getUserTypeText, getIconPathBySwitch } from 'utils/userUtils';
import UserDetailModal from './UserDetailModal';
import timeIcon from '../../assets/img/map/time.svg';

interface MapListProps {
  userList: any[];
}

const MapList: React.FC<MapListProps> = ({ userList }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg z-[99999] overflow-y-auto max-h-[93%]">
        {userList.map((user) => (
          <div
            key={user.userId}
            onClick={() => handleUserClick(user)}
            className={`relative flex flex-col justify-between border-b p-4 ${getBackgroundColor(user.userType)} rounded-lg mb-4 cursor-pointer`}
          >
            <img
              src={getCertificatedBackImage(user.userType)}
              alt="Back"
              className="absolute bottom-0 right-0 h-auto z-[50]"
              style={{
                width: 'auto',
                objectFit: 'cover',
                objectPosition: 'right',
              }}
            />
            <div className="flex justify-between">
              <div className="flex flex-row">
                <div
                  className="items-center rounded-full justify-center items-center inline-flex mr-3"
                  style={{
                    border: `2px solid ${getBackgroundColor(user.userType)}`,
                  }}
                >
                  <img
                    src={getUserImage(user.userId, user.userType)}
                    alt="User"
                    className="w-[60px] h-[60px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold text-lg">
                    {getUserTypeText(user.userType)} {user.username}
                  </div>
                  <div className="max-w-[110px] flex items-center mt-1 bg-white rounded-lg p-1">
                    <img src={timeIcon} alt="Time" className="w-[16px] h-[16px]" />
                    <div className="text-[#ff6b6b] text-xs ml-2 font-semibold font-['Pretendard']">
                      함께한 {user.togetherTime} 시간
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right text-[#a6acba] items-center my-auto text-xs font-medium font-['Pretendard'] leading-none">
                {user.km.toFixed(2)} km
              </div>
            </div>
            <div className="flex space-x-0 mt-6 z-[100]">
              {['walk', 'eat', 'toilet', 'bath', 'talk'].map((icon) => (
                <div key={icon} className="flex flex-col items-center w-1/5 justify-center">
                  <img src={getIconPathBySwitch(user.userType, icon)} alt={icon} className="w-[52px] h-[52px]" />
                  <div className="text-center text-[#2a2e37] text-xs font-normal font-['Pretendard'] leading-none mt-2">
                    {user[icon]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedUser && <UserDetailModal userId={selectedUser.userId} onClose={handleModalClose} />}
    </>
  );
};

export default MapList;