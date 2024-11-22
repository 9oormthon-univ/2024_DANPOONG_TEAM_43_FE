import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import back from '../assets/img/chat/chat-back.svg'
import pay_background from '../assets/img/chat/pay_background.svg'

const PayDone = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bgColor, color, mainColor, roomId, requestId, messageId, receiverUserType, receiverName, receiverId } = location.state || {}; const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='container' id='request_done'>
            <div className="between">
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} />
                    <p className='top_title'>결제</p>
                </div>
                <div className="text">
                    <p className="title">결제가 완료되었어요!</p>
                    <p className="txt">
                        대금 정산은 약속일 이후 7일이 소요되어요. <br />
                        사고가 일어났다면, 즉시 고객센터로 문의주세요!
                    </p>
                </div>
                <img src={pay_background} alt="" className='bgimg' />
            </div>

            <div className="bottom" >
                <div className="chat_room"
                    onClick={() => navigate(-3)}>
                    돌아가기
                </div>
                <div className="detail" onClick={() => {
                    setTimeout(() => navigate('/request-detail', { state: { bgColor, color, mainColor, roomId, requestId, messageId, receiverUserType, receiverName, receiverId } }),2); // 이후 request-detail로 이동
                    navigate(-3); // 먼저 -3으로 이동
                }}>
                    약속 확인하기
                </div>
            </div>
        </div>
    )
}

export default PayDone