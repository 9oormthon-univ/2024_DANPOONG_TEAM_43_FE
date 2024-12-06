import React, { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import people_icon from '../../assets/img/group/group_people_icon.svg'
import FeedPreview from './FeedPreview'
import WithMemory from './WithMemory'
import { GroupDetailId } from 'type/group';
import empty_back_img from '../../assets/img/group/empty_back_img.svg'
import { url } from 'inspector';

const MyGroupMain: React.FC<GroupDetailId> = ({ pagegroupId }) => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState<any>(null); // 그룹 데이터 저장
  const [groupId, setGroupId] = useState<number | null>(pagegroupId); // groupId 저장
  const [feedData, setFeedData] = useState<any[]>([]); // 이웃 소식 데이터 저장
  const [memories, setMemories] = useState<any[]>([]); // 방명록 데이터 저장
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    // API 호출
    const fetchGroupData = async () => {
      try {
        if (groupId == 0) {
          const response = await axiosInstance.get('/group');
          const data = response.data.data[0]; // 첫 번째 그룹 데이터 가져오기
          setGroupData(data);
          setGroupId(data.groupId); // groupId 저장
          // groupId가 있을 경우 feed 데이터를 가져옴
          if (data.groupId) {
            fetchFeedData(data.groupId);
            fetchMemories(data.groupId);
          }
        }
        else {
          setGroupId(pagegroupId);
          const response = await axiosInstance.get(`/group/detail/${groupId}`);
          const data = response.data.data; // 첫 번째 그룹 데이터 가져오기
          setGroupData(data);
          // groupId가 있을 경우 feed 데이터를 가져옴
          if (data.groupId) {
            fetchFeedData(data.groupId);
            fetchMemories(data.groupId);
          }
        }
        
      } catch (error) {
        console.error('Failed to fetch group data', error);
      }
    };
    // 이웃 소식 데이터 가져오기
    const fetchFeedData = async (groupId: number) => {
      try {
        const response = await axiosInstance.get(`/news/group/${groupId}`);
        const feeds = response.data.data.slice(0, 3); // 첫 2개의 데이터만 가져오기
        setFeedData(feeds);
      } catch (error) {
        console.error('Failed to fetch feed data', error);
      }
    };
    const fetchMemories = async (groupId: number) => {
      try {
        const response = await axiosInstance.get(`/guestbook/group/${groupId}`); // groupId를 동적으로 설정 가능
        const data = response.data.data.slice(0, 2); // 방명록 데이터
        setMemories(data); // 첫 2개의 데이터만 저장
      } catch (error) {
        console.error('Failed to fetch memories', error);
      }
    };

    fetchGroupData();
  }, []);

  // 그룹 탈퇴 API 호출
  const fetchGroupOut = async () => {
    if (groupId) {
      try {
        await axiosInstance.post(`/group/leave/${groupId}`);
        window.location.reload(); // 페이지 새로고침
      } catch (error) {
        console.error('Failed to leave group', error);
      }
    }
  };

  const GoToFeedList = () => {
    navigate('/group-feed-list', { state: { groupId } })
  }
  const GoToMemory = () => {
    navigate('/group-memory', { state: { groupId } })
  }
  const GoToNeighbor = () => {
    navigate('/group-neighbor', { state: { groupId } })
  }
  
  return (
    <div className='mygroup_main'>
      {groupData ? (
        <>
          <div className="top_info_img" style={{backgroundImage:`url(${groupData.groupImage})`}}>
            <div className="background">
              <p className="title">{groupData.groupName}</p>
              <div className="info">
                <p className="info_txt">{groupData.city}</p>
                <div className="people" onClick={GoToNeighbor}>
                  <img src={people_icon} alt="" />
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
                <FeedPreview
                  title={feed.title}
                  content={feed.content}
                  writerType={feed.writerType}
                  createdAt={feed.createdAt}
                  newsId={feed.newsId}
                  writerId={feed.writerId}
                  commentCount={feed.commentCount}
                />
                {/* 마지막 요소가 아닌 경우에만 <hr> 추가 */}
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
              <WithMemory
                key={index}
                memory={memory}
              />
            ))}
          </div>
          {groupData.isJoined && (
            <div className="out_div">
              <div className="out_button" onClick={() => setIsModalOpen(true)}>
                모임 탈퇴
              </div>
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
                        <button className="cancel" onClick={() => setIsModalOpen(false)}>
                          아니요
                        </button>
                        <button className="submit" onClick={fetchGroupOut}>
                          네, 탈퇴할래요
                        </button>
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
          <p className="empty_text">아직 내 모임이 없어요!<br/>이웃 모임을 둘러보세요</p>
        </div>
      )}
    </div>
  )
}

export default MyGroupMain