import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg';
import FeedPreview from 'components/group/FeedPreview';
import WithMemory from 'components/group/WithMemory';
import { useMemoriesGroupQuery } from 'service/useGroupQueries';

const GroupMemory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupId } = location.state || {}; 

  const { data: memories, isLoading, isError } = useMemoriesGroupQuery(groupId);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <div className='container' id='group_memory'>
      <div className="top">
        <img src={back} alt="" onClick={handleBackClick} className='back' />
        <p className='top_title'>함께한 추억</p>
      </div>
      <div className="contents">
        <p className="contents_title">모임에서 만든 추억 {memories?.length || 0}개</p>
        <div className="memory_div">
          {memories && memories.length > 0 ? (
            memories.map((memory, index) => (
              <WithMemory key={index} memory={memory} />
            ))
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupMemory;