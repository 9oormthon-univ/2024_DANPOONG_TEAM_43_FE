import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import caregiverProfile from '../assets/img/mypage/profile-caregiver.svg';
import volunteerProfile from '../assets/img/mypage/profile-volunteer.svg';
import careWorkerProfile from '../assets/img/mypage/profile-careworker.svg';
import send from '../assets/img/chat/send.svg'
import back from '../assets/img/chat/chat-back.svg'
import calendar_check from '../assets/img/chat/calendar-check.svg'
import background_img_giver from '../assets/img/chat/chat_background_giver.svg'
import background_img_volunteer from '../assets/img/chat/chat_background_volunteer.svg'
import background_img_worker from '../assets/img/chat/chat_background_worker.svg'
import calendar_check_fill_giver from '../assets/img/chat/calendar-check-fill-giver.svg'
import calendar_check_fill_volunteer from '../assets/img/chat/calendar-check-fill-volunteer.svg'
import calendar_check_fill_worker from '../assets/img/chat/calendar-check-fill-worker.svg'
import { useUserDataQuery } from 'service/user';
import { UserType } from 'type/user';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { Message as StompMessage } from '@stomp/stompjs';

const userTypeConfig = {
    CAREGIVER: { label: '간병인', color: '#ff6b6b', bgColor: '#FFF1F1', profileImg: caregiverProfile, chalendar_fill: calendar_check_fill_giver, bgImg: background_img_giver },
    VOLUNTEER: { label: '자원봉사자', color: '#00AEFF', bgColor: '#EFF9FF', profileImg: volunteerProfile, chalendar_fill: calendar_check_fill_volunteer, bgImg: background_img_volunteer },
    CARE_WORKER: { label: '예비요양보호사', color: '#20CE86', bgColor: '#EBFEF4', profileImg: careWorkerProfile, chalendar_fill: calendar_check_fill_worker, bgImg: background_img_worker },
};

interface Message {
    id: number;
    senderId: number;
    message: string;
    timestamp: string;
    type: string;
    fileName: string;
    fileUrl: string;
    isApproved: boolean;
    roomId: string;
}

const ChatRoomMain: React.FC = () => {
    const location = useLocation();
    const { roomId, receiverUserType = 'CAREWORKER', receiverName = '기본 이름', receiverId } = location.state || {};
    const navigate = useNavigate();
    const { data: userData, isLoading, error } = useUserDataQuery();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [stompClient, setStompClient] = useState<any>(null); // 실제로 stompClient 초기화 필요

    const openChatRoomMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/chat/rooms/${roomId}/close`);
            return response.data;
        },
        onSuccess: () => {
            // 성공적으로 채팅방을 열었을 때 페이지 이동
            navigate(-1);
        },
        onError: (error) => {
            console.error('Error opening chat room:', error);
        }
    });
    const chatEndRef = useRef<HTMLDivElement>(null); // 스크롤 제어용 ref 추가

    const userType = userData?.userType;

    // 요청 메시지가 있는지 확인
    const hasReservation = messages.find(
        (msg) => msg.type === 'RESERVATION'
    );

    // Fetch initial messages
    const fetchMessages = useQuery({
        queryKey: ['chatMessages', roomId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/chat/rooms/messages/${roomId}`);
            return setMessages(response.data.data);
        },
        enabled: !!roomId, // roomId가 존재할 때만 실행
    });

    useEffect(() => {
        if (fetchMessages.data) {
            scrollToBottom(); // 메시지가 로드되었을 때 맨 아래로 이동
        }
    }, [fetchMessages.data]);

    // 새로운 메시지가 추가될 때마다 맨 아래로 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Connect to WebSocket and set up STOMP client
    useEffect(() => {
        const connectToChatRoom = async () => {
            if (roomId) {
                setMessages([]); // Clear previous messages
                try {
                    const socket = new SockJS('http://54.180.171.247:8080/chat'); // Replace with your actual URL
                    const client = Stomp.over(socket);

                    client.onConnect = () => {
                        client.subscribe(`/topic/${roomId}`, (message: StompMessage) => {
                            setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
                            console.log(receiverUserType)
                            console.error(message.body)
                        });
                    };

                    client.activate();
                    setStompClient(client);
                } catch (error) {
                    console.error('Error connecting to chat room:', error);
                }
            }
            else console.log("not have roomid")
        };

        connectToChatRoom();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
                console.log('Disconnected from STOMP');
            }
        };
    }, [roomId]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sendMessage = () => {
        if (stompClient && roomId && newMessage.trim()) {
            const messagePayload = {
                senderId: userData?.userId.toString(),
                roomId: roomId,
                message: newMessage,
                type: "TALK",
            };
            stompClient.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(messagePayload),
            });
            setNewMessage(''); // Clear message input
        } else {
            console.log('Message not sent: WebSocket not connected or empty message');
        }
    };

    if (isLoading) {
        return null;
    }

    if (error || !userData) {
        return null;
    }

    const { userId } = userData;
    const config = userTypeConfig[receiverUserType as UserType];

    const handleBackClick = () => {
        if (roomId) {
            openChatRoomMutation.mutate(); // 채팅방 열기 API 호출
        }
    };


    const GoToRequest = () => {
        const nextPageState = {
            bgColor: config.bgColor,
            color: config.color,
            mainColor: config.color,
            caregiverId: receiverId, // 현재 사용자의 ID
            roomId: roomId,
            receiverUserType: receiverUserType,
            receiverName: receiverName // 현재 채팅방 ID
        };

        if (userType === 'VOLUNTEER') {
            navigate("/chat-volunteer", { state: nextPageState });
        } else if (userType === 'CARE_WORKER') {
            navigate("/chat-worker", { state: nextPageState });
        } else if (userType === 'CAREGIVER') {
            if (receiverUserType === 'VOLUNTEER') {
                navigate("/chat-volunteer", { state: nextPageState });
            } else if (receiverUserType === 'CARE_WORKER') {
                navigate("/chat-worker", { state: nextPageState });
            } else {
                console.warn("Unrecognized receiver user type:", receiverUserType);
            }
        } else {
            console.warn("Unrecognized user type:", userType);
        }
    };

    const handleDetailsClick = (isApproved: boolean, id: number, messageId: number, senderId: number) => {
        const nextPageState = {
            messageId: messageId,
            roomId,
            requestId: id,
            senderId: senderId, // 요청 보낸 사람의 ID 추가
            bgColor: config.bgColor, // 배경 색상 추가
            mainColor: config.color, // 메인 색상 추가
            receiverUserType,
            receiverName,
            receiverId
        };

        if (isApproved) {
            navigate('/request-detail', { state: nextPageState }); // 상태값 전달
        } else {
            navigate('/request-sure', { state: nextPageState }); // 상태값 전달
        }
    };

    const handleCalendarClick = () => {
        // 먼저 적절한 메시지를 찾습니다.
        const reservationMessage = messages.find(
            (msg) => msg.type === 'RESERVATION' && msg.message.startsWith('{')
        );

        if (reservationMessage) {
            // 메시지가 JSON 형식이면 파싱합니다.
            const parsedMessage = JSON.parse(reservationMessage.message);

            if (parsedMessage) {
                // 메시지 파싱이 성공적일 때 처리합니다.
                const nextPageState = {
                    messageId: reservationMessage.id,
                    roomId: reservationMessage.roomId,
                    requestId: parsedMessage.id,
                    senderId: reservationMessage.senderId,
                    bgColor: config.bgColor,
                    mainColor: config.color,
                    receiverUserType,
                    receiverName,
                    receiverId
                };

                if (reservationMessage.isApproved) {
                    // 수락된 요청 상세로 이동
                    navigate('/request-detail', { state: nextPageState });
                } else {
                    // 요청 확인 페이지로 이동
                    navigate('/request-sure', { state: nextPageState });
                }
            }
        } else {
            // 요청 메시지가 없을 경우 기존 동작 유지
            GoToRequest();
        }
    };

    return (
        <div className='container' id='chat_room'
            style={{ background: config.bgColor, '--Chat_Main': config.color, '--Chat_Sub': config.bgColor } as React.CSSProperties}
        >
            <img src={config.bgImg} alt="" className='background_img' />
            <div className="top" style={{ background: config.bgColor, '--Chat_Main': config.color } as React.CSSProperties} >
                <img src={back} alt="" className="back" onClick={handleBackClick} />
                <p
                    className={`title ${!(
                        (userType !== 'CAREGIVER' && receiverUserType === 'CAREGIVER') ||
                        (hasReservation && (receiverUserType !== 'CAREGIVER' || userType === 'CAREGIVER'))
                    )
                        ? 'no-icon'
                        : ''
                        }`}
                >
                    {receiverName}
                </p>

                {
                    (userType !== 'CAREGIVER' && receiverUserType === 'CAREGIVER') ||
                        (hasReservation && (receiverUserType !== 'CAREGIVER' || userType === 'CAREGIVER')) ? (
                        <img
                            src={hasReservation ? config.chalendar_fill : calendar_check} // 요청이 있으면 채운 아이콘 사용
                            alt=""
                            className="booking"
                            onClick={handleCalendarClick}
                        />
                    ) : null
                }
            </div>
            <div className="chat">
                {messages.length > 0 &&
                    messages.map((msg, index) => {
                        const isTalk = msg.type === "TALK";
                        const isReservation = msg.type === "RESERVATION";
                        const isJsonMessage = msg.message.startsWith("{"); // 메시지가 JSON 형식인지 확인
                        const parsedMessage = isJsonMessage ? JSON.parse(msg.message) : null

                        console.log(parsedMessage)
                        return (
                            <React.Fragment key={msg.id}>
                                {/* 날짜가 바뀌면 날짜를 표시 */}
                                {index === 0 ||
                                    new Date(messages[index - 1].timestamp).toDateString() !==
                                    new Date(msg.timestamp).toDateString() ? (
                                    <div className="when">{new Date(msg.timestamp).toLocaleDateString()}</div>
                                ) : null}

                                <div className="contents">
                                    {msg.senderId === userId ? (
                                        isTalk ? (
                                            <div className="me">
                                                <p className="time">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                                <div className="text">{msg.message}</div>
                                            </div>
                                        ) : isReservation && isJsonMessage && parsedMessage ? (
                                            // 약속 요청을 보낸 경우
                                            <div className="me">
                                                <p className="time">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                                <div className="request_div">
                                                    <p className="request_title">약속 요청을 보냈어요!</p>
                                                    <p className="request_text">장소 : {parsedMessage.location}</p>
                                                    <p className="request_text">
                                                        시간 :{' '}
                                                        {new Date(parsedMessage.startTime).toLocaleString([], {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'short',
                                                        })}{' '}
                                                        -{' '}
                                                        {new Date(parsedMessage.endTime).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </p>
                                                    <div
                                                        className="more"
                                                        onClick={() =>
                                                            handleDetailsClick(msg.isApproved, parsedMessage.id, msg.id, msg.senderId) // 항상 `true`로 처리
                                                        }
                                                    >
                                                        자세히 보기
                                                    </div>
                                                </div>
                                            </div>
                                        ) : isReservation && !isJsonMessage ? (
                                            // 약속을 수락한 경우
                                            <div className="me">
                                                <p className="time">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                                <div className="request_div" style={{background:'#fff',color:'#2A2E37'}}>
                                                    <p className="request_title">약속을 수락했어요!</p>
                                                    <p className="request_text">간병인의 상세 정보를 확인하세요</p>
                                                    <div
                                                        className="more"
                                                        onClick={handleCalendarClick}
                                                        style={{background:'var(--Chat_Sub)', color:'var(--Chat_Main)'}}
                                                    >
                                                        자세히 보기
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    ) : isTalk ? (
                                        <div className="you">
                                            <img src={config.profileImg} alt="" className="profile" />
                                            <div className="txt">
                                                <div className="text">{msg.message}</div>
                                                <p className="time">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ) : isReservation && isJsonMessage && parsedMessage ? (
                                        // 약속 요청을 받은 경우
                                        <div className="you">
                                            <img src={config.profileImg} alt="" className="profile" />
                                            <div className="txt">
                                                <div className="request_div" style={{background:'#fff', color:'#2A2E37'}}>
                                                    <p className="request_title">약속 요청을 받았어요!</p>
                                                    <p className="request_text">장소 : {parsedMessage.location}</p>
                                                    <p className="request_text">
                                                        시간 :{' '}
                                                        {new Date(parsedMessage.startTime).toLocaleString([], {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'short',
                                                        })}{' '}
                                                        -{' '}
                                                        {new Date(parsedMessage.endTime).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </p>
                                                    <div
                                                    style={{
                                                        background: msg.isApproved ? 'var(--Chat_Main)' : 'var(--Chat_Sub)',
                                                    }}
                                                        className="more"
                                                        onClick={() =>
                                                            handleDetailsClick(parsedMessage.isApproved, parsedMessage.id, msg.id, msg.senderId)
                                                        }
                                                    >
                                                        자세히 보기
                                                    </div>
                                                </div>
                                                <p className="time">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ) : isReservation && !isJsonMessage ? (
                                        // 약속을 수락받은 경우
                                        <div className="you">
                                            <img src={config.profileImg} alt="" className="profile" />
                                            <div className="txt">
                                                <div className="request_div">
                                                    <p className="request_title">약속을 수락했어요!</p>
                                                    <p className="request_text">간병인의 상세 정보를 확인하세요</p>
                                                    <div
                                                        className="more"
                                                        onClick={handleCalendarClick}
                                                    >
                                                        자세히 보기
                                                    </div>
                                                </div>
                                                <p className="time">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </React.Fragment>
                        );
                    })}
                <div ref={chatEndRef}></div>
            </div>
            <div className="send_section">
                <div className="send_box">
                    <input
                        type="text"
                        className="text"
                        placeholder='메시지를 입력해 주세요.'
                        value={newMessage} // newMessage 상태와 연결
                        onChange={(e) => setNewMessage(e.target.value)} // 입력 시 상태 업데이트
                    />
                    <img src={send} alt="" className="send" onClick={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default ChatRoomMain