import React, { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import people_icon from '../../assets/img/group/group_people_icon.svg'
import FeedPreview from './FeedPreview'
import WithMemory from './WithMemory'
 
const MyGroupMain = () => {
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState<any>(null); // 그룹 데이터 저장
  const [groupId, setGroupId] = useState<number | null>(null); // groupId 저장
  const [feedData, setFeedData] = useState<any[]>([]); // 이웃 소식 데이터 저장
  useEffect(() => {
    // API 호출
    const fetchGroupData = async () => {
      try {
        const response = await axiosInstance.get('/group');
        const data = response.data.data[0]; // 첫 번째 그룹 데이터 가져오기
        setGroupData(data);
        setGroupId(data.groupId); // groupId 저장
        // groupId가 있을 경우 feed 데이터를 가져옴
        if (data.groupId) {
            fetchFeedData(data.groupId);
          }
      } catch (error) {
        console.error('Failed to fetch group data', error);
      }
    };
    // 이웃 소식 데이터 가져오기
    const fetchFeedData = async (groupId: number) => {
        try {
          const response = await axiosInstance.get(`/news/group/${groupId}`);
          const feeds = response.data.data.slice(0, 2); // 첫 2개의 데이터만 가져오기
          setFeedData(feeds);
        } catch (error) {
          console.error('Failed to fetch feed data', error);
        }
      };

    fetchGroupData();
  }, []);
    const GoToFeedList=()=>{
        navigate('/group-feed-list', { state: { groupId }})
    }
    const GoToMemory=()=>{
        navigate('/group-memory')
    }
    const GoToNeighbor=()=>{
        navigate('/group-neighbor', { state: { groupId } })
    }
    return (
        <div className='mygroup_main'>
            {groupData ? (
        <>
          <div className="top_info_img">
            <p className="title">{groupData.groupName}</p>
            <div className="info">
              <p className="info_txt">{groupData.city}</p>
              <div className="people" onClick={GoToNeighbor}>
                <img src={people_icon} alt="" />
                <p className="num">{groupData.headCount}명</p>
              </div>
            </div>
          </div>
          <div className="middle_title_div">
            <p className="title">이웃소식</p>
            <p className="more" onClick={GoToFeedList}>더보기</p>
          </div>
          <div className="feed_div">
          {feedData.map((feed) => (
              <FeedPreview
                key={feed.newsId}
                title={feed.title}
                content={feed.content}
                writerType={feed.writerType}
                createdAt={feed.createdAt}
                newsId = {feed.newsId}
                commentCount={feed.commentCount}
              />
            ))}
          </div>
          <div className="middle_title_div">
            <p className="title">함께한 추억</p>
            <p className="more" onClick={GoToMemory}>더보기</p>
          </div>
          <div className="memory_div">
            <WithMemory />
            <WithMemory />
          </div>
        </>
      ) : (
        <p>모임 정보를 불러오는 중입니다...</p>
      )}
        </div>
    )
}

export default MyGroupMain