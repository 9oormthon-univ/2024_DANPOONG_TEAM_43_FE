import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import back from '../assets/img/chat/chat-back.svg'

interface RequestDetails {
    volunteerName: string;
    volunteerAge: number;
    phoneNum: string;
    address: string;
    location: string;
    date:string;
    startTime: string;
    endTime: string;
    durationHours: number;
    mainTask: string;
    salary?: number; // 급여는 선택적으로 있을 수 있음
}

const RequestPay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bgColor, color, mainColor, roomId, requestId, messageId,receiverUserType,receiverName,receiverId } = location.state || {};
    const [details, setDetails] = useState<RequestDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleBackClick = () => {
        navigate(-1);
    };
    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axiosInstance.get(`/volunteer/${requestId}`);
                const data = response.data.data;
                console.log(messageId)

                // Parse response data to match the interface
                setDetails({
                    volunteerName: data.volunteerName,
                    volunteerAge: data.volunteerAge,
                    phoneNum: data.phoneNum,
                    address: data.address,
                    location: data.location,
                    date: new Date(data.startTime).toLocaleDateString(), // 날짜만 표시
                    startTime: new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    endTime: new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    durationHours: data.durationHours,
                    mainTask: data.mainTask,
                    salary: data.salary !== 0 ? data.salary : null, // 급여가 0이면 null로 처리
                });
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch request details:', err);
                setError('요청 정보를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        if (requestId) {
            fetchRequestDetails();
        }
    }, [requestId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleAccept = async () => {
        try {
            // JSON 객체 생성
            const requestData = {
                roomId: roomId,
                messageId: messageId,
            };
    
            // 서버로 PATCH 요청 보내기
            const response = await axiosInstance.patch(`/volunteer/approval/${requestId}`, requestData);
    
            console.log(requestData)
            if (response.status === 200) {
                alert('요청을 성공적으로 수락했습니다.');
                navigate(-1); // 이전 페이지로 이동
            }
        } catch (err) {
            console.error('Failed to accept request:', err);
            alert('요청 수락 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='container' id='chat_request_detail' style={{ background: '#fff' } as React.CSSProperties}>
            <div className="between">
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} />
                    <p className='top_title'>결제</p>
                </div>
                {details && (
                    <>
                        <div className="info">
                            <p className="volunteer_title">요양보호사 정보</p>
                            <div className="contents">
                                <p className="type">이름</p>
                                <p className="text">{details.volunteerName}</p>
                            </div>
                            <div className="contents">
                                <p className="type">나이</p>
                                <p className="text">{details.volunteerAge}세</p>
                            </div>
                            <div className="contents">
                                <p className="type">전화번호</p>
                                <p className="text">{details.phoneNum}</p>
                            </div>
                            <div className="contents">
                                <p className="type">주소</p>
                                <p className="text">{details.address}</p>
                            </div>
                        </div>

                        <div className="info">
                            <p className="volunteer_title">요청한 일</p>
                            <div className="contents">
                                <p className="type">장소</p>
                                <p className="text">{details.location}</p>
                            </div>
                            <div className="contents">
                                <p className="type">날짜</p>
                                <p className="text">{details.date}</p>
                            </div>
                            <div className="contents">
                                <p className="type">시간</p>
                                <p className="text">{details.durationHours}시간 동안 / {details.startTime} ~ {details.endTime}</p>
                            </div>
                            <div className="contents">
                                <p className="type">주된 일</p>
                                <p className="text">{details.mainTask}</p>
                            </div>
                            {details.salary !== null && (
                                <div className="contents">
                                    <p className="type">급료</p>
                                    <p className="text">{details.salary?.toLocaleString()}원</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="bottom" style={{ background: '#fff', borderTop:'1px solid #EEEFF2' } as React.CSSProperties}>
                <div className="pay_price_div">
                    <p className="how">카카오페이</p>
                    <div className="price">
                        <p className="num">{details?.salary?.toLocaleString()}</p>
                        원
                    </div>
                </div>
                <div className="volunteer_button" onClick={handleAccept} style={{ background: '#FF6B6B', color: '#fff' } as React.CSSProperties}>
                    <div className="payment_icon"></div>결제하기</div>
            </div>
        </div>
    )
}

export default RequestPay