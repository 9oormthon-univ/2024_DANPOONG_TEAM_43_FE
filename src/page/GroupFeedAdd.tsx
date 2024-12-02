import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import back from '../assets/img/chat/chat-back.svg'


const GroupFeedAdd = () => {
    const navigate = useNavigate();
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
                <div className="button"
                    style={{
                        backgroundColor: isButtonActive ? '#FF6B6B' : '', // 조건에 따라 배경색 변경
                        cursor: isButtonActive ? 'pointer' : 'not-allowed' // 비활성화 상태에서는 클릭 불가 스타일 추가
                    }}
                >새 글 올리기</div>
            </div>

        </div>
    )
}

export default GroupFeedAdd