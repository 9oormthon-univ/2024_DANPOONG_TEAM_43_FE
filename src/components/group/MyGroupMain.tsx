import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import people_icon from '../../assets/img/group/group_people_icon.svg';
import empty_back_img from '../../assets/img/group/empty_back_img.svg';
import FeedPreview from './FeedPreview';
import WithMemory from './WithMemory';
import { useFeedDataQuery, useGroupDataQuery, useMemoriesQuery } from 'service/useGroupQueries';
import { leaveGroup } from 'service/group';

interface MyGroupMainProps {
  pagegroupId?: number;
}

const MyGroupMain: React.FC<MyGroupMainProps> = ({ pagegroupId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: groupData } = useGroupDataQuery(pagegroupId);
  const { data: feedData = [] } = useFeedDataQuery(groupData?.groupId || 0);
  const { data: memories = [] } = useMemoriesQuery(groupData?.groupId || 0);

  const handleLeaveGroup = async () => {
    if (groupData?.groupId) {
      try {
        await leaveGroup(groupData.groupId);
        window.location.reload();
      } catch (error) {
        console.error('Failed to leave group', error);
      }
    }
  };

  const GoToFeedList = () => navigate('/group-feed-list', { state: { groupId: groupData?.groupId } });
  const GoToMemory = () => navigate('/group-memory', { state: { groupId: groupData?.groupId } });
  const GoToNeighbor = () => navigate('/group-neighbor', { state: { groupId: groupData?.groupId } });

  return (
    <div className='mygroup_main'>
      {groupData ? (
        <>
          <div className="top_info_img" style={{ backgroundImage: `url(${groupData.groupImage})` }}>
            <div className="background">
              <p className="title">{groupData.groupName.replace(/^그룹\s*/, '')}</p>
              <div className="info">
                <p className="info_txt">{groupData.city}</p>
                <div className="people" onClick={GoToNeighbor}>
                  <img src={people_icon} alt="people icon" />
                  <p className="num">{groupData.headCount}명</p>
                </div>
              </div>
            </div>
          </div>
          <div className="middle_title_div">
            <p className="title">이웃소식</p>
            <p className="more" onClick={GoToFeedList}>더보기</p>
          </div>
          <div className="feed_div">
            {feedData.map((feed, index) => (
              <React.Fragment key={feed.newsId}>
                <FeedPreview {...feed} />
                {index < feedData.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
          <div className="middle_title_div">
            <p className="title">함께한 추억</p>
            <p className="more" onClick={GoToMemory}>더보기</p>
          </div>
          <div className="memory_div" style={{ marginBottom: !groupData.isJoined ? '105px' : '0px' }}>
            {memories.map((memory, index) => (
              <WithMemory key={index} memory={memory} />
            ))}
          </div>
          {groupData.isJoined && (
            <div className="out_div">
              <div className="out_button" onClick={() => setIsModalOpen(true)}>모임 탈퇴</div>
            </div>
          )}
          {isModalOpen && (
            <div className="chat_modal-overlay" onClick={() => setIsModalOpen(false)}>
              <div className="chat_modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup_request_final">
                  <div className="popup_content">
                    <p className="popup_title">모임 탈퇴하기</p>
                    <div className="details">
                      <p className="detail_text">정말 모임을 탈퇴할까요?</p>
                    </div>
                    <div className="actions">
                      <div className="bottom_actions">
                        <button className="cancel" onClick={() => setIsModalOpen(false)}>아니요</button>
                        <button className="submit" onClick={handleLeaveGroup}>네, 탈퇴할래요</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="empty_chat">
          <img src={empty_back_img} alt="No chats available" />
          <p className="empty_text">아직 내 모임이 없어요!<br />이웃 모임을 둘러보세요</p>
        </div>
      )}
    </div>
  );
};

export default MyGroupMain;
