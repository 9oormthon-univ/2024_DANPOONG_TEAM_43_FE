import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import new_post from '../assets/img/group/new_post_icon.svg'
import back from '../assets/img/chat/chat-back.svg'
import FeedPreview from 'components/group/FeedPreview';


const GroupFeedList = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div className='container' id='group_feed_list'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} className='back' />
                <p className='top_title'>이웃 소식</p>
                <img src={new_post} alt="" className='post' />
            </div>
            <div className="feed_div">
                <FeedPreview/>
                <hr />
                <FeedPreview/>
            </div>
        </div>
    )
}

export default GroupFeedList