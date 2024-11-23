import React from 'react'
import profile_careworker from '../../assets/img/mypage/profile-careworker.svg'
import profile_caregiver from '../../assets/img/mypage/profile-caregiver.svg'
import profile_volunteer from '../../assets/img/mypage/profile-volunteer.svg'
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';

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


interface PersonChatProps {
  roomId: string;
  receiverName: string;
  lastMessage: string;
  lastUpdated: string;
  receiverUserType: string;
  receiverId:number;
}
const imageMapping: { [key: string]: string[] } = {
  CAREGIVER: [type1_1, type1_2, type1_3, type1_4, type1_5, type1_6, type1_7, type1_8, type1_9, type1_10],
  CARE_WORKER: [type2_1, type2_2, type2_3, type2_4, type2_5, type2_6, type2_7, type2_8, type2_9, type2_10],
  VOLUNTEER: [type3_1, type3_2, type3_3, type3_4, type3_5, type3_6, type3_7, type3_8, type3_9, type3_10],
};

const getProfileImage = (userId: number, userType: string): string => {
  const images = imageMapping[userType];
  if (!images) return '';
  const index = userId % images.length;
  return images[index];
};

const PersonChat: React.FC<PersonChatProps> = ({ roomId, receiverName, lastMessage, lastUpdated, receiverUserType,receiverId }) => {
  const navigate = useNavigate();

  // 매핑된 프로필 이미지를 가져옵니다.
  const profileImage = getProfileImage(receiverId, receiverUserType);

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
          receiverId,
          profileImage,
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

  return (
    <div className="chat_room_div" onClick={GoToRoom}>
      <img src={profileImage} alt="" className="profile" />
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