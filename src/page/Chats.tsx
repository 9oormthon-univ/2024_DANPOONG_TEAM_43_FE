import React from 'react'
import profile_careworker from '../assets/img/mypage/profile-careworker.svg'
import profile_caregiver from '../assets/img/mypage/profile-caregiver.svg'
import profile_volunteer from '../assets/img/mypage/profile-volunteer.svg'
import profile_group from '../assets/img/chat/profile-group.svg'
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();

  const GoToRoom = () => {
    navigate("/chat-room");
  }
  return (
    <div className='container' id='chat'>
      <div className="page_title">채팅</div>
      <div className="person_chat">
        <div className="title">이웃 대화</div>
        <div className="chat_room_div" onClick={GoToRoom}>
          <img src={profile_caregiver} alt="" className="profile" />
          <div className="text">
            <div className="top">
              <p className="name">간병인 이상덕님</p>
              <p className="when">오전 8:48</p>
            </div>
            <p className="contents">안녕하세요안녕하세요안녕하세요안녕하세요</p>
          </div>
        </div>
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