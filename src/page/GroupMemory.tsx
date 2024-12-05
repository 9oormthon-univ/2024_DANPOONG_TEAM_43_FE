import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import FeedPreview from 'components/group/FeedPreview';
import WithMemory from 'components/group/WithMemory';
import axiosInstance from 'utils/axiosInstance';


const GroupMemory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [memories, setMemories] = useState<any[]>([]); // 방명록 데이터 저장
    const { groupId } = location.state || {}; // 이전 페이지에서 전달받은 groupId

    useEffect(() => {
        // 방명록 데이터 가져오기
        const fetchMemories = async (groupId: number) => {
            try {
                const response = await axiosInstance.get(`/guestbook/group/${groupId}`); // groupId를 동적으로 설정 가능
                setMemories(response.data.data); 
            } catch (error) {
                console.error('Failed to fetch memories', error);
            }
        };

        fetchMemories(groupId);
    }, []);
    const handleBackClick = () => {
        navigate(-1);
    };
    
    return (
        <div className='container' id='group_memory'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} className='back' />
                <p className='top_title'>함께한 추억</p>
            </div>
            <div className="contents">
                <p className="contents_title">모임에서 만든 추억 {memories.length}개</p>
                <div className="memory_div">
                {memories.map((memory, index) => (
                        <WithMemory
                            key={index}
                            memory={memory}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default GroupMemory