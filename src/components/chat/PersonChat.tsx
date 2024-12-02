import React from 'react'
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { imageMapping } from 'utils/userUtils';


interface PersonChatProps {
  roomId: string;
  receiverName: string;
  lastMessage: string;
  lastUpdated: string;
  receiverUserType: string;
  receiverId:number;
}


const getProfileImage = (userId: number, userType: string): string => {
  const images = imageMapping[userType];
  if (!images) return '';
  const index = userId % images.length;
  return images[index];
};

const PersonChat: React.FC<PersonChatProps> = ({ roomId, receiverName, lastMessage, lastUpdated, receiverUserType,receiverId }) => {
  const navigate = useNavigate();

  const profileImage = getProfileImage(receiverId, receiverUserType);

  const openChatRoomMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/chat/rooms/${roomId}/open`);
      return response.data;
    },
    onSuccess: () => {
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
      openChatRoomMutation.mutate();
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