import React, { useState } from 'react';
import back from '../assets/img/chat/chat-back.svg'
import down from '../assets/img/chat/down.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import StartTime from '../components/chat/StartTime'
import StopTime from '../components/chat/StopTime';
import RequestWorkFinal from '../components/chat/RequestWorkFinal';
import ChatCalendar from '../components/chat/ChatCalendar';
import { useUserDataQuery } from 'service/user';
import axiosInstance from 'utils/axiosInstance';
import { calculateDurationHours, convertTo24HourTime } from 'utils/dateUtils';


const ChatCareWorker: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bgColor, mainColor, caregiverId, roomId } = location.state || {};
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [stopTime, setStopTime] = useState<string | null>(null);
    const [workDetails, setWorkDetails] = useState('');
    const [payment, setPayment] = useState('');
    const { data: userData, isLoading, error } = useUserDataQuery();

    if (error || !userData) {
        return null;
    }

    const { username, age, address, phoneNum, userId } = userData;
    const isComplete = !!startTime && !!stopTime && !!workDetails && !!payment && !!selectedDate;

    const openStartModal = () => setIsStartModalOpen(true);
    const closeStartModal = () => setIsStartModalOpen(false);

    const openStopModal = () => setIsStopModalOpen(true);
    const closeStopModal = () => setIsStopModalOpen(false);

    const openRequestModal = () => setIsRequestModalOpen(true);
    const closeRequestModal = () => setIsRequestModalOpen(false);

    const openDateModal = () => setIsDateModalOpen(true);
    const closeDateModal = () => setIsDateModalOpen(false);

    const handleBackClick = () => {
        navigate(-1);
    };
    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        closeDateModal();
    };

    const handleNextClick = () => {
        if (!isComplete) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        openRequestModal(); 
    };

    const handleRequestSubmit = async () => {
        if (!isComplete) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (!startTime || !stopTime || !selectedDate) {
            alert('날짜와 시간이 설정되지 않았습니다.');
            return;
        }

        const start = convertTo24HourTime(startTime, selectedDate);
        const end = convertTo24HourTime(stopTime, selectedDate);

        if (!start || !end) {
            alert('시간 형식이 올바르지 않습니다.');
            return;
        }

        try {
            const requestData = {
                volunteerId: userId, 
                caregiverId,
                location: address,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                durationHours: calculateDurationHours(start, end),
                salary: parseInt(payment.replace(/,/g, '')) || 0,
                mainTask: workDetails,
                volunteerType: 'CARE_WORKER_REQUEST', 
                roomId,
            };

            const response = await axiosInstance.post('/volunteer', requestData);
            if (response.status === 200 || response.status === 201) {
                alert('요청이 성공적으로 전송되었습니다.');
                navigate(-1);
                closeRequestModal();
            }
        } catch (error) {
            console.error('요청 실패:', error);
            alert('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='container' id='chat_volunteer' style={{ background: bgColor, '--Chat_Main': mainColor } as React.CSSProperties}>
            <div className="between">
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} />
                    <p className='top_title'>요양 보호 요청하기</p>
                </div>
                <div className="info">
                    <p className="volunteer_title">기본 정보</p>
                    <div className="contents">
                        <p className="type">이름</p>
                        <p className="text">{username}</p>
                    </div>
                    <div className="contents">
                        <p className="type">나이</p>
                        <p className="text">{age}세</p>
                    </div>
                    <div className="contents">
                        <p className="type">전화번호</p>
                        <p className="text">{phoneNum}</p>
                    </div>
                    <div className="contents">
                        <p className="type">주소</p>
                        <p className="text">{address}</p>
                    </div>
                </div>

                <p className="volunteer_title">요청할 일</p>
                <div className="work_div">
                    <p className="title">날짜</p>
                    <div className="drop_down">
                        <p className="text" style={{
                            color: selectedDate ? 'var(--gray-800-txtp, #2A2E37)' : 'color: var(--Gray-300, #A6ACBA);',
                        }}>{selectedDate
                            ? `${selectedDate.toLocaleDateString()}`
                            : '봉사 날짜를 알려주세요'}</p>
                        <img src={down} alt="" className="down" onClick={openDateModal} />
                    </div>
                </div>
                <div className="work_div">
                    <p className="title">시간</p>
                    <div className="drop_down">
                        <p className="text"
                            style={{
                                color: startTime && stopTime ? 'var(--gray-800-txtp, #2A2E37)' : 'color: var(--Gray-300, #A6ACBA);',
                            }}>{startTime && stopTime
                                ? `${startTime} ~ ${stopTime}`
                                : '시작 및 종료 시간을 알려주세요'}</p>
                        <img src={down} alt="" className="down" onClick={openStartModal} />
                    </div>
                </div>
                <div className="work_div">
                    <p className="title">주된 일</p>
                    <div className="drop_down">
                        <input type="text" placeholder='주된 일을 적어주세요' value={workDetails}
                            onChange={(e) => setWorkDetails(e.target.value)} />
                    </div>
                </div>
                <div className="work_div">
                    <p className="title">급료</p>
                    <div className="drop_down">
                        <input type="text" placeholder='총 급료를 숫자만 적어주세요 ex.50,000' value={payment}
                            onChange={(e) => setPayment(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="bottom" style={{ background: bgColor, '--Chat_Main': mainColor } as React.CSSProperties} >
                <div
                    className="volunteer_button"
                    onClick={handleNextClick}
                    style={{
                        background: isComplete ? 'var(--Chat_Main)' : 'var(--Gray-100, #D4D7DE)', // 모든 필드가 입력되었으면 --Chat_Main, 아니면 회색
                        cursor: isComplete ? 'pointer' : 'not-allowed', // 비활성화 시 클릭 금지
                    }}
                >
                    다음
                </div>
            </div>

            {/* 시작 시간 모달 */}
            {isStartModalOpen && (
                <div className="chat_modal-overlay" onClick={closeStartModal}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <StartTime
                            closeModal={closeStartModal}
                            onTimeSelect={(time) => {
                                setStartTime(time); // 시작 시간 저장
                                openStopModal(); // 종료 시간 모달 열기
                            }}
                        />
                    </div>
                </div>
            )}

            {/* 종료 시간 모달 */}
            {isStopModalOpen && (
                <div className="chat_modal-overlay" onClick={closeStopModal}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <StopTime
                            closeModal={closeStopModal}
                            onTimeSelect={(time) => {
                                setStopTime(time);
                            }}
                        />
                    </div>
                </div>
            )}

            {isDateModalOpen && (
                <div className="chat_modal-overlay" onClick={closeDateModal}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <ChatCalendar onClose={closeDateModal} onSelectDate={handleSelectDate} />
                    </div>
                </div>

            )}

            {/* 요청 팝업 */}
            {isRequestModalOpen && (
                <div className="chat_modal-overlay" id='sure' onClick={closeRequestModal}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <RequestWorkFinal
                            location={address}
                            time={`${startTime} ~ ${stopTime}`}
                            work={workDetails}
                            payment={`${payment}원`}
                            onClose={closeRequestModal}
                            onSubmit={handleRequestSubmit}
                            onEdit={closeRequestModal}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatCareWorker