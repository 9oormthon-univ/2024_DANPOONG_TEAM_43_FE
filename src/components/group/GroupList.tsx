import React from 'react'
import { useNavigate } from 'react-router-dom';
import post_icon from '../../assets/img/group/group_post_icon.svg'
import post_icon_gray from '../../assets/img/group/group_post_icon_gray.svg'
import people from '../../assets/img/group/group_people_icon.svg'
import { GroupListProps } from 'type/group';
import { calculateTimeDifference } from 'utils/dateUtils';

const GroupList: React.FC<GroupListProps> = ({ title, location, headCount, lastNews, groupImage,groupId }) => {
    const navigate = useNavigate();
    const hoursAgo = calculateTimeDifference(lastNews);
    const isStaleNews = hoursAgo > 24; 
    // 클릭 핸들러
    const handleNavigation = () => {
        navigate('/other-group-detail', { state: { groupId } });
    };
    return (
        <div className='group_list_div' onClick={handleNavigation} >
            <div className="left">
                <div className="img" style={{ backgroundImage: `url(${groupImage})` }}></div>
                <div className="info">
                    <p className="title">{title.replace(/^그룹\s*/, '')}</p>
                    <p className="where">{location}</p>
                    <div className="post_div">
                        <img src={isStaleNews ? post_icon_gray : post_icon} alt="" className="post_icon" />
                        <p
                            className="post_news"
                            style={{ color: isStaleNews ? '#C3C7D0' : 'inherit' }}
                        >{hoursAgo}시간 전 새로운 소식</p>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={people} alt="" className="people" />
                <p className="num">{headCount}명</p>
            </div>

        </div>
    )
}

export default GroupList