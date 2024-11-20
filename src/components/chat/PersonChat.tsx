import React from 'react'
import profile_careworker from '../../assets/img/mypage/profile-careworker.svg'
import profile_caregiver from '../../assets/img/mypage/profile-caregiver.svg'
import profile_volunteer from '../../assets/img/mypage/profile-volunteer.svg'
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';


interface PersonChatProps {
  roomId: string;
  receiverName: string;
  lastMessage: string;
  lastUpdated: string;
  receiverUserType: string;
}

const PersonChat: React.FC<PersonChatProps> = ({ roomId, receiverName, lastMessage, lastUpdated, receiverUserType }) => {
  const navigate = useNavigate();

  const openChatRoomMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/chat/rooms/${roomId}/open`);
      return response.data;
    },
    onSuccess: () => {
      // 성공적으로 채팅방을 열었을 때 페이지 이동
      navigate("/chat-room", {
        state: {
          roomId,
          receiverUserType,
          receiverName,
        },
      });
    },
    onError: (error) => {
      console.error('Error opening chat room:', error);
    }
  });
  const GoToRoom = () => {
    if (roomId) {
      openChatRoomMutation.mutate(); // 채팅방 열기 API 호출
    }
  }

  // 사용자 타입에 따라 프로필 이미지 선택
  const getProfileImage = () => {
    switch (receiverUserType) {
      case 'CARE_WORKER':
        return profile_careworker;
      case 'CAREGIVER':
        return profile_caregiver;
      case 'VOLUNTEER':
        return profile_volunteer;
      default:
        return profile_caregiver; // 기본 이미지
    }
  };
  return (
    <div className="chat_room_div" onClick={GoToRoom}>
      <img src={getProfileImage()} alt="" className="profile" />
      <div className="text">
        <div className="top">
          <p className="name">{receiverName}</p>
          <p className="when">{new Date(lastUpdated).toLocaleTimeString()}</p>
        </div>
        <p className="contents">{lastMessage}</p>
      </div>
    </div>
  )
}

export default PersonChat