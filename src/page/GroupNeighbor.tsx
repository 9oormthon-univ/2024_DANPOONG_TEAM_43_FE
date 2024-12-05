import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import back from '../assets/img/chat/chat-back.svg'
import NeighborList from 'components/group/NeighborList';


const GroupNeighbor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = location.state || {}; // 전달받은 groupId
    const [neighbors, setNeighbors] = useState<any[]>([]); // 이웃 리스트 저장
    useEffect(() => {
        if (!groupId) return; // groupId가 없으면 API 호출 안 함

        // API 호출
        const fetchNeighborData = async () => {
            try {
                const response = await axiosInstance.get(`/group/user/${groupId}`);
                setNeighbors(response.data.data); // 이웃 데이터 저장
            } catch (error) {
                console.error('Failed to fetch neighbor data', error);
            }
        };

        fetchNeighborData();
    }, [groupId]);
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
                <p className="contents_num">이웃 {neighbors.length}명</p>
                <div className="neighbor_div">
                    {neighbors.map((neighbor) => (
                        <NeighborList
                            key={neighbor.userId}
                            userId={neighbor.userId}
                            username={neighbor.username}
                            userType={neighbor.userType}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default GroupNeighbor