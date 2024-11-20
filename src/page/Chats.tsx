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
      <div className="group_chat">
        <div className="title">모임 대화</div>
        <div className="chat_room_div">
          <img src={profile_group} alt="" className="profile" />
          <div className="text">
            <div className="top">
              <p className="name">동행 간병</p>
              <p className="when">오전 8:48</p>
            </div>
            <p className="contents">안녕하세요안녕하세요안녕하세요안녕하세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chats