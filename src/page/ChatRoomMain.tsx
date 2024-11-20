import React from 'react'
import { useLocation } from 'react-router-dom';
import caregiverProfile from '../assets/img/mypage/profile-caregiver.svg';
import volunteerProfile from '../assets/img/mypage/profile-volunteer.svg';
import careWorkerProfile from '../assets/img/mypage/profile-careworker.svg';
import send from '../assets/img/chat/send.svg'
import back from '../assets/img/chat/chat-back.svg'
import calendar_check from '../assets/img/chat/calendar-check.svg'
import profile_caregiver from '../assets/img/mypage/profile-caregiver.svg'
import { useNavigate } from "react-router-dom";
import { useUserDataQuery } from 'service/user';
import { UserType } from 'type/user';

const userTypeConfig = {
    CAREGIVER: { label: '간병인', color: '#ff6b6b', bgColor: '#FFF1F1', profileImg: caregiverProfile },
    VOLUNTEER: { label: '자원봉사자', color: '#00AEFF', bgColor: '#EFF9FF', profileImg: volunteerProfile },
    CARE_WORKER: { label: '예비요양보호사', color: '#20CE86', bgColor: '#EBFEF4', profileImg: careWorkerProfile },
};

const ChatRoomMain: React.FC = () => {
    const location = useLocation();
    const { roomId, receiverUserType = 'CAREWORKER', receiverName = '기본 이름' } = location.state || {};
    const navigate = useNavigate();
    const { data: userData, isLoading, error } = useUserDataQuery();

    if (isLoading) {
        return null;
      }
    
      if (error || !userData) {
        return null;
      }
    
    const { userId } = userData;
    const config = userTypeConfig[receiverUserType as UserType];



    const handleBackClick = () => {
        navigate(-1);
    };
    const GoToRequest = () => {
        navigate("/chat-volunteer");
    }
    return (
        <div className='container' id='chat_room'
        style={{ background: config.bgColor, '--Chat_Main': config.color } as React.CSSProperties}
        >
            <div className="top">
                <img src={back} alt="" className="back" onClick={handleBackClick} />
                <p className="title">{receiverName}</p>
                <img src={calendar_check} alt="" className="booking" onClick={GoToRequest} />
            </div>
            <div className="when">2024년 07월 08일</div>
            <div className="contents">
                <div className="me">
                    <p className="time">18:57</p>
                    <div className="text">안녕하세요!</div>
                </div>
                <div className="you">
                    <img src={profile_caregiver} alt="" className="profile" />
                    <div className="txt">
                        <div className="text">안녕하세요! 무엇을 도와드릴까요?</div>
                        <p className="time">18:57</p>
                    </div>

                </div>
            </div>
            <div className="send_section">
                <div className="send_box">
                    <input type="text" className="text" placeholder='메시지를 입력해 주세요.' />
                    <img src={send} alt="" className="send" />
                </div>
            </div>
        </div>
    )
}

export default ChatRoomMain