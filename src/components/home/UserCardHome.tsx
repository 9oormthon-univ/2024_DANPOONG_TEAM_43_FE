import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import timeIcon from '../../assets/img/map/time.svg';
import { getUserImage, getUserTypeText, getBackgroundColor, getBackgroundColor2, getBtnColor, getCertificatedBackImage, getIconPath } from 'utils/userUtils';
import axiosInstance from 'utils/axiosInstance';

interface UserCardProps {
  user: any;
  onClose: () => void;
}

const UserCardHome: React.FC<UserCardProps> = ({ user, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setSelectedUserId(user.userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleStartChat = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/chat', { toUser: user.userId });
      alert('채팅방이 생성되었습니다.');
      navigate('/Chats');
    } catch (error) {
      console.error('Error creating chat room:', error);
      alert('채팅방 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[99998]"
        onClick={onClose}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-[99999] max-w-[410px] min-w-[310px] w-[90%] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-4 shadow-md rounded-lg overflow-y-auto max-w-lg w-full">
          <div
            key={user.userId}
            className={`relative flex flex-col justify-between border-b p-4 ${getBackgroundColor(
              user.userType
            )} rounded-lg`}
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
                  className="items-center rounded-full justify-center inline-flex mr-3"
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
                  <div className="font-semibold text-lg">
                    {getUserTypeText(user.userType)} {user.username}
                  </div>
                  <div className="max-w-[110px] flex items-center mt-1 bg-white rounded-lg p-1">
                    <img src={timeIcon} alt="Time" className="w-[16px] h-[16px]" />
                    <div className="text-[#ff6b6b] text-xs ml-2 font-semibold">
                      함께한 {user.timeTogether} 시간
                    </div>
                  </div>
                </div>
              </div>
              {user.km && (
                <div className="text-right text-[#a6acba] items-center my-auto text-xs font-medium font-['Pretendard'] leading-none">
                  {user.km.toFixed(2)} km
                </div>
              )}
            </div>

            <div className="flex space-x-0 mt-6 z-[100]">
              {['talk', 'eat', 'toilet', 'bath', 'walk'].map((action) => (
                <div
                  className="flex flex-col items-center w-1/5 justify-center"
                  key={action}
                >
                  <img
                    src={getIconPath(action, user.userType)}
                    alt={action}
                    className="w-[52px] h-[52px]"
                  />
                  <div className="text-center text-[#2a2e37] text-xs font-normal leading-none mt-2">
                    {user[action] || '정보 없음'}
                  </div>
                </div>
              ))}
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
                <div
                  className="text-center text-white text-base font-semibold font-['Pretendard'] leading-snug"
                  onClick={handleStartChat}
                >
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