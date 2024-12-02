import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import FeedPreview from 'components/group/FeedPreview';
import WithMemory from 'components/group/WithMemory';


const GroupMemory = () => {
    const navigate = useNavigate();
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
                <p className="contents_title">모임에서 만든 추억 5개</p>
                <div className="memory_div">
                    <WithMemory />
                    <WithMemory />
                </div>
            </div>

        </div>
    )
}

export default GroupMemory