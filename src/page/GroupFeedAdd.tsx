import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import back from '../assets/img/chat/chat-back.svg'


const GroupFeedAdd = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = location.state || {}; // 이전 페이지에서 전달받은 groupId
    const [isLoading, setIsLoading] = useState(false); // 요청 상태 관리  
    const handleBackClick = () => {
        navigate(-1);
    };
    const [textLength, setTextLength] = useState(0);
    const [title, setTitle] = useState(''); // input 내용 관리
    const [text, setText] = useState(''); // textarea 내용 관리

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value); // 제목 업데이트
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText); // 내용 저장
        setTextLength(newText.length); // 글자 수 업데이트
    };
    const handlePost = async () => {
        if (!groupId) {
            alert('Group ID가 존재하지 않습니다.');
            return;
        }

        const payload = {
            title: title.trim(),
            content: text.trim(),
        };

        try {
            setIsLoading(true); // 로딩 상태 활성화
            const response = await axiosInstance.post(`/news/create/news/${groupId}`, payload);
            alert('소식이 성공적으로 등록되었습니다!');
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error('Failed to post news:', error);
            alert('소식 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false); // 로딩 상태 비활성화
        }
    };
    const isButtonActive = title.trim() !== '' && text.trim() !== ''; // 버튼 활성화 조건
    return (
        <div className='container' id='group_feed_add'>
            <div>
                <div className="top">
                    <img src={back} alt="" onClick={handleBackClick} className='back' />
                    <p className='top_title'>새 글 쓰기</p>
                </div>
                <div className="contents_div">
                    <p className="title">제목</p>
                    <input type="text" className="contents_title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder='제목을 입력해주세요' />
                    <p className="title">소식</p>
                    <textarea className='contents_text'
                        maxLength={1000}
                        value={text}
                        onChange={handleTextChange}
                        placeholder='새로운 소식을 작성해주세요'></textarea>
                    <p className="text_count">{textLength}/1000</p>
                </div>
            </div>
            <div className='bottom'>
                <div
                    className="button"
                    style={{
                        backgroundColor: isButtonActive ? '#FF6B6B' : '',
                        cursor: isButtonActive && !isLoading ? 'pointer' : 'not-allowed',
                    }}
                    onClick={isButtonActive && !isLoading ? handlePost : undefined} // 버튼 활성화 상태에서만 클릭 가능
                >
                    {isLoading ? '올리는 중...' : '새 글 올리기'}</div>
            </div>

        </div>
    )
}

export default GroupFeedAdd