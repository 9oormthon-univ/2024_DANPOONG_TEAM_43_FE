import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import new_post from '../assets/img/group/new_post_icon.svg';
import back from '../assets/img/chat/chat-back.svg';
import FeedPreview from 'components/group/FeedPreview';
import { useFeedDataQuery } from 'service/useGroupQueries';

const GroupFeedList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupId } = location.state || {};

  const { data: feeds, isLoading, isError } = useFeedDataQuery(groupId);
  const [refreshKey, setRefreshKey] = useState(0); // 리렌더링 트리거

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey((prev) => prev + 1); // 강제 리렌더링
    }
  }, [location.state]);
  const handleBackClick = () => {
    navigate(-1);
  };

  const GoToAdd = () => {
    navigate('/group-feed-add', { state: { groupId } });
  };

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className='container' id='group_feed_list'>
      <div className="top">
        <img src={back} alt="" onClick={handleBackClick} className='back' />
        <p className='top_title'>이웃 소식</p>
        <img src={new_post} alt="" className='post' onClick={GoToAdd} />
      </div>
      <div className="feed_div">
        {feeds && feeds.length > 0 ? (
          feeds.map((feed) => (
            <React.Fragment key={feed.newsId}>
              <FeedPreview
                key={refreshKey}
                title={feed.title}
                content={feed.content}
                writerType={feed.writerType}
                createdAt={feed.createdAt}
                newsId={feed.newsId}
                writerId={feed.writerId}
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
  );
};

export default GroupFeedList;