import React from 'react'
import post_icon from '../../assets/img/group/group_post_icon.svg'
import people from '../../assets/img/group/group_people_icon.svg'

interface GroupListProps {
    title: string;
    location: string;
    headCount: number;
    lastNews: string;
  }
  // 시간 차이를 계산하는 함수
const calculateTimeDifference = (lastNews: string) => {
    const now = new Date(); // 현재 시간
    const newsTime = new Date(lastNews); // 전달받은 소식 시간
    const diffInMs = now.getTime() - newsTime.getTime(); // 밀리초 차이 계산
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // 밀리초를 시간으로 변환
    return diffInHours;
  };

const GroupList: React.FC<GroupListProps> = ({ title, location, headCount, lastNews }) => {
    const hoursAgo = calculateTimeDifference(lastNews);
    return (
        <div className='group_list_div'>
            <div className="left">
                <div className="img"></div>
                <div className="info">
                    <p className="title">{title}</p>
                    <p className="where">{location}</p>
                    <div className="post_div">
                        <img src={post_icon} alt="" className="post_icon" />
                        <p className="post_news">{hoursAgo}시간 전 새로운 소식</p>
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