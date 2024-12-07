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
    salary?: number | null; // 급여는 선택적으로 있을 수 있음
}

const RequestSure = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bgColor, color, mainColor, roomId, requestId, messageId,receiverUserType,receiverName,receiverId } = location.state || {};

    const [details, setDetails] = useState<RequestDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // 첫 번째 팝업 제어
    const [showPaymentPopup, setShowPaymentPopup] = useState(false); // 결제 팝업 제어

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
                console.log(details?.endTime)
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

    const handleAccept = async () => {
        try {
            // JSON 객체 생성
            const requestData = {
                messageId: messageId,
                roomId: roomId,
            };
    
            console.log(requestData)
            // 서버로 PATCH 요청 보내기
            const response = await axiosInstance.patch(`/volunteer/approval/${requestId}`, requestData, {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식임을 명시
                },
            });
    
            if (response.status === 200) {
                alert('요청을 성공적으로 수락했습니다.');
                navigate(-1); // 이전 페이지로 이동
            }
        } catch (err) {
            console.error('Failed to accept request:', err);
            alert('요청 수락 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleOpenConfirmationPopup = () => {
        setShowConfirmationPopup(true); // 첫 번째 팝업 열기
    };

    const handleCloseConfirmationPopup = () => {
        setShowConfirmationPopup(false); // 첫 번째 팝업 닫기
    };

    const handleConfirmAccept = () => {
        if (details?.salary) {
            setShowConfirmationPopup(false); // 첫 번째 팝업 닫기
            setShowPaymentPopup(true); // 결제 팝업 열기
        } else {
            handleAccept(); // 급료가 없으면 바로 수락 API 호출
        }
    };

    const handleConfirmPayment = () => {
        setShowPaymentPopup(false); // 결제 팝업 닫기
        navigate('/request-pay', { 
        state: { 
            bgColor, 
            color, 
            mainColor, 
            roomId, 
            requestId, 
            messageId ,
            receiverUserType,
            receiverName,
            receiverId
        } 
    }); // RequestPay 페이지로 이동
    };

    if (loading) {
        return  null;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container' id='chat_request_detail' style={{ background: bgColor, '--Chat_Main': mainColor } as React.CSSProperties}>
            <div className="between">
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} />
                    <p className='top_title'>{details?.salary === null ? '자원 봉사 요청하기' : '요양 보호 요청하기'}</p>
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
                                <p className="text">{details.date}</p>
                            </div>
                            <div className="contents">
                                <p className="type">시간</p>
                                <p className="text">약 {details.durationHours}시간 동안 / {details.startTime} ~ {details.endTime}</p>
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

            {/* 첫 번째 팝업: 수락 확인 */}
            {showConfirmationPopup && (
                <div className="chat_modal-overlay" onClick={handleCloseConfirmationPopup}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup_request_final">
                            <div className="popup_content">
                                <p className="popup_title">정말로 수락할까요?</p>
                                <div className="details">
                                    <p className="detail_text">수락하면 내 전화번호와 주소가 전달돼요!</p>
                                </div>
                                <div className="actions">
                                    <div className="bottom_actions">
                                        <button className="cancel" onClick={handleCloseConfirmationPopup}>
                                            아니요
                                        </button>
                                        <button className="submit" onClick={handleConfirmAccept}>
                                            수락하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 두 번째 팝업: 결제 안내 */}
            {showPaymentPopup && (
                <div className="chat_modal-overlay" onClick={() => setShowPaymentPopup(false)}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup_request_final">
                            <div className="popup_content">
                                <p className="popup_title">결제를 진행할게요!</p>
                                <div className="details">
                                    <p className="detail_text">
                                        지금 결제되지만, 대금 정산은 나중에 되어요. <br /> 문제가 생긴 경우, 환불 받을 수 있어요.
                                    </p>
                                </div>
                                <div className="actions">
                                    <div className="bottom_actions">
                                        <button className="cancel" onClick={() => setShowPaymentPopup(false)}>
                                            취소
                                        </button>
                                        <button className="submit" onClick={handleConfirmPayment}>
                                            확인
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}

            <div className="bottom" style={{ background: bgColor, '--Chat_Main': mainColor } as React.CSSProperties}>
                <div className="volunteer_button" onClick={handleOpenConfirmationPopup}>
                    수락하기
                </div>
            </div>
        </div>
    )
}

export default RequestSure