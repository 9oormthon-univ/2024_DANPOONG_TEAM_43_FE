import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import people_icon from '../../assets/img/group/group_people_icon.svg'
import FeedPreview from './FeedPreview'
import WithMemory from './WithMemory'
 
const MyGroupMain = () => {
    const navigate = useNavigate();
    const GoToFeedList=()=>{
        navigate('/group-feed-list')
    }
    const GoToMemory=()=>{
        navigate('/group-memory')
    }
    return (
        <div className='mygroup_main'>
            <div className="top_info_img">
                <p className="title">도움의 손길</p>
                <div className="info">
                    <p className="info_txt">경기도 용인시 수지구</p>
                    <div className="people">
                        <img src={people_icon} alt="" />
                        <p className="num">10명</p>
                    </div>
                </div>
            </div>
            <div className="middle_title_div">
                <p className="title">이웃소식</p>
                <p className="more" onClick={GoToFeedList}>더보기</p>
            </div>
            <div className="feed_div">
                <FeedPreview/>
                <hr />
                <FeedPreview/>
            </div>
            <div className="middle_title_div">
                <p className="title">함께한 추억</p>
                <p className="more" onClick={GoToMemory}>더보기</p>
            </div>
            <div className="memory_div">
                <WithMemory/>
                <WithMemory/>
            </div>
        </div>
    )
}

export default MyGroupMain