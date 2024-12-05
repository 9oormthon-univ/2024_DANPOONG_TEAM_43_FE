import React from 'react'
import post_icon from '../../assets/img/group/group_post_icon.svg'
import post_icon_gray from '../../assets/img/group/group_post_icon_gray.svg'
import people from '../../assets/img/group/group_people_icon.svg'
import { GroupListProps } from 'type/group';
import { calculateTimeDifference } from 'utils/dateUtils';

const GroupList: React.FC<GroupListProps> = ({ title, location, headCount, lastNews }) => {
    const hoursAgo = calculateTimeDifference(lastNews);
    const isStaleNews = hoursAgo > 24; 
    return (
        <div className='group_list_div'>
            <div className="left">
                <div className="img"></div>
                <div className="info">
                    <p className="title">{title}</p>
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