import React from 'react'
import profile_group from '../assets/img/chat/profile-group.svg'
import { useNavigate } from "react-router-dom";
import PersonChat from 'components/chat/PersonChat';
import axiosInstance from 'utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const fetchChatRooms = async () => {
  const response = await axiosInstance.get('/chat/rooms');
  return response.data.data; // 명세서에 따르면 "data" 필드를 반환
};

const Chats: React.FC = () => {
  const navigate = useNavigate();
  // react-query로 API 호출
  const { data: chatRooms, isLoading, error } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: fetchChatRooms,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch chat rooms.</div>;


  return (
    <div className='container' id='chat'>
      <div className="page_title">채팅</div>
      <div className="person_chat">
        <div className="title">이웃 대화</div>
        {chatRooms && chatRooms.map((room: any) => (
          <PersonChat
            key={room.roomId}
            roomId={room.roomId}
            receiverName={room.receiverName}
            lastMessage={room.lastMessage}
            lastUpdated={room.lastUpdated}
            receiverUserType={room.receiverUserType}
          />
        ))}
      </div>
    </div>
  )
}

export default Chats