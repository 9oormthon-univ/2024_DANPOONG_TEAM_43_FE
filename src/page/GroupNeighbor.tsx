import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import NeighborList from 'components/group/NeighborList';


const GroupNeighbor = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='container' id='group_neighbor'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} className='back' />
                <p className='top_title'>같이 하는 이웃</p>
            </div>
            <div className="mid_info">
                <div className="info_text">
                이웃과 새로운 대화를 나눠보세요!
                </div>
            </div>
            <div className="contents">
                <p className="contents_num">이웃 13명</p>
                <div className="neighbor_div">
                    <NeighborList/>
                </div>
            </div>

        </div>
    )
}

export default GroupNeighbor