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
    startTime: string;
    endTime: string;
    durationHours: number;
    mainTask: string;
    salary?: number | null; // 급여는 선택적으로 있을 수 있음
}

const RequestDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bgColor, color, mainColor, roomId, requestId, messageId } = location.state || {};
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
                    startTime: new Date(data.startTime).toLocaleDateString(), // 날짜만 표시
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

    return (
        <div className='container' id='chat_request_detail' style={{ background: bgColor, '--Chat_Main': mainColor } as React.CSSProperties}>
            <div className="between">
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} />
                    <p className='top_title'>{details?.salary === null ? '자원 봉사 약속 확인' : '요양 보호 약속 확인'}</p>
                </div>
                {details && (
                    <>
                        <div className="info">
                            <p className="volunteer_title">{details?.salary === null ? '자원봉사자 정보' : '요양보호사 정보'}</p>
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
                                <p className="text">{details.startTime}</p>
                            </div>
                            <div className="contents">
                                <p className="type">시간</p>
                                <p className="text">{details.durationHours}시간 동안</p>
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

            <div className="bottom" style={{ background: bgColor, '--Chat_Main': mainColor } as React.CSSProperties}>
                <div className="volunteer_button" >약속 취소하기</div>
            </div>
        </div>
    )
}

export default RequestDetail