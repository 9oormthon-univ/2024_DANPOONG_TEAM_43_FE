import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg';
import axiosInstance from 'utils/axiosInstance';
import MyGroupMain from 'components/group/MyGroupMain';

const OtherGroupDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = location.state || {}; // 이전 페이지에서 전달받은 groupId
    const [isJoining, setIsJoining] = useState(false); // 버튼 로딩 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleJoinGroup = async () => {
        if (!groupId) {
            console.error('groupId가 없습니다.');
            return;
        }

        setIsJoining(true); // 로딩 상태 시작
        try {
            const response = await axiosInstance.post(`/group/join/${groupId}`);
            console.log('모임 가입 성공:', response.data);
            alert('모임에 성공적으로 가입했습니다!');

            // 세션 스토리지에 탭 값을 'mygroup'으로 변경
            sessionStorage.setItem('activeTab', 'mygroup');

            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error('모임 가입 실패:', error);
            alert('모임 가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsJoining(false); // 로딩 상태 종료
        }
    };

    return (
        <div className='container' id='other_group_detail'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} className='back' />
                <p className='top_title'>모임 둘러보기</p>
            </div>
            <div className="contents">
                <MyGroupMain pagegroupId={groupId} />
            </div>
            <div className="bottom">
                <div className="button" onClick={() => setIsModalOpen(true)}>모임 가입하기</div>
            </div>
            {isModalOpen && (
                <div className="chat_modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup_request_final">
                            <div className="popup_content">
                                <p className="popup_title">모임 가입하기</p>
                                <div className="details">
                                    <p className="detail_text">해당 모임을 가입할까요?</p>
                                </div>
                                <div className="actions">
                                    <div className="bottom_actions">
                                        <button className="cancel" onClick={() => setIsModalOpen(false)}>
                                            아니요
                                        </button>
                                        <button className="submit" onClick={handleJoinGroup}>
                                            네, 가입할래요
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OtherGroupDetail;
