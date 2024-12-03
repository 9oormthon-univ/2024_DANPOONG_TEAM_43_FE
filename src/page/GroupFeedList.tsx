import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import new_post from '../assets/img/group/new_post_icon.svg'
import back from '../assets/img/chat/chat-back.svg'
import FeedPreview from 'components/group/FeedPreview';
import axiosInstance from 'utils/axiosInstance';


const GroupFeedList = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const { groupId } = location.state || {}; // 이전 페이지에서 전달받은 groupId
  const [feeds, setFeeds] = useState<any[]>([]); // 피드 데이터 상태 관리
    
  useEffect(() => {
    if (!groupId) {
      console.error('Group ID not provided');
      return;
    }

    // API 호출
    const fetchFeeds = async () => {
      try {
        const response = await axiosInstance.get(`/news/group/${groupId}`);
        setFeeds(response.data.data); // 피드 데이터 저장
      } catch (error) {
        console.error('Failed to fetch feeds', error);
      }
    };

    fetchFeeds();
  }, [groupId]);

  const handleBackClick = () => {
        navigate(-1);
    };
    const GoToAdd = () => {
        navigate('/group-feed-add', { state: { groupId }})
    }
    
    return (
        <div className='container' id='group_feed_list'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} className='back' />
                <p className='top_title'>이웃 소식</p>
                <img src={new_post} alt="" className='post' onClick={GoToAdd}/>
            </div>
            <div className="feed_div">
            {feeds.length > 0 ? (
          feeds.map((feed) => (
            <React.Fragment key={feed.newsId}>
              <FeedPreview
                title={feed.title}
                content={feed.content}
                writerType={feed.writerType}
                createdAt={feed.createdAt}
                newsId = {feed.newsId}
                commentCount={feed.commentCount}
              />
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p className='none'>이웃 소식이 없습니다.</p>
        )}
            </div>
        </div>
    )
}

export default GroupFeedList