import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import profile from '../assets/img/user/type1-1.svg'
import send from '../assets/img/chat/send.svg'
import send_fill from '../assets/img/chat/send_fill.svg'
import FeedComment from 'components/group/FeedComment';
import axiosInstance from 'utils/axiosInstance';
import { UserType } from 'type/user';
import { useUserDataQuery } from 'service/user';
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';


interface UserTypeConfig {
    CAREGIVER: { label: string };
    VOLUNTEER: { label: string };
    CARE_WORKER: { label: string };
}

const GroupFeedDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: userData, isLoading, error } = useUserDataQuery();

    const { newsId } = location.state || {};
    const [feedData, setFeedData] = useState<any>(null); // 피드 데이터 저장
    const [newComment, setNewComment] = useState(''); // 작성 중인 댓글
    const [newComments, setNewComments] = useState<any[]>([]); // 새로 추가된 댓글
    const [isPosting, setIsPosting] = useState(false); // 댓글 작성 중 상태

    useEffect(() => {
        const fetchFeedDetail = async () => {
            try {
                const response = await axiosInstance.get(`/news/detail/${newsId}`);
                setFeedData(response.data.data); // API 데이터 저장
            } catch (error) {
                console.error('Failed to fetch feed details', error);
            }
        };

        fetchFeedDetail();
    }, [newsId]);

    if (error || !userData) {
        return null;
    }

    const { username, userType, userId } = userData;

    const userTypeConfig: UserTypeConfig = {
        CAREGIVER: {
            label: '간병인',
        },
        VOLUNTEER: {
            label: '자원봉사자',
        },
        CARE_WORKER: {
            label: '요양보호사',
        },
    };



    const handleBackClick = () => {
        navigate(-1);
        
    };
    const handleSendComment = async () => {
        if (!newComment.trim() || isPosting) return;

        try {
            setIsPosting(true);
            const payload = { content: newComment.trim() };
            const response = await axiosInstance.post(`/news/create/news/${newsId}/comment`, payload);

            const newCommentData = {
                newsCommentId: response.data.data.commentId, // 새 댓글 ID
                content: newComment.trim(),
                writerType: userType,
                writer: username,
                createdAt: new Date().toISOString(),
                writerId: userId,
            };

            // 새 댓글은 별도의 상태로 추가
            setNewComments((prev) => [...prev, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Failed to post comment:', error);
            alert('댓글 작성에 실패했습니다.');
        } finally {
            setIsPosting(false);
        }
    };

    const config = userTypeConfig[feedData?.writerType as keyof UserTypeConfig] || {};

    return (
        <div className='container' id='group_feed_detail'>

            {feedData ? (
                <>
                    <div className="top">
                        <img src={back} alt="back" onClick={handleBackClick} className="back" />
                        <p className='top_div'>
                            <div className="contents_div">
                                <img src={getUserImage(feedData.writerId, feedData.writerType)} alt="" className='profile' />
                                <div className="text">
                                    <p className="name">{`${config.label} ${feedData.writer}`}</p>
                                    <p className="when">{new Date(feedData.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </p>
                    </div>
                    <div className="contents">
                        <p className="contents_title">{feedData.title}</p>
                        <p className="contents_txt">{feedData.content}</p>
                    </div>
                    <div className="comment_div">
                        {/* 기존 댓글은 역순으로 렌더링 */}
                        {feedData.newsComments.length > 0 &&
                            [...feedData.newsComments].reverse().map((comment: any) => (
                                <FeedComment
                                    key={comment.newsCommentId}
                                    writerType={comment.writerType}
                                    writer={comment.writer}
                                    createdAt={comment.createdAt}
                                    content={comment.content}
                                    writerId={comment.writerId}
                                />
                            ))}

                        {/* 새로 작성된 댓글은 마지막에 렌더링 */}
                        {newComments.map((comment: any) => (
                            <FeedComment
                                key={comment.newsCommentId}
                                writerType={comment.writerType}
                                writer={comment.writer}
                                createdAt={comment.createdAt}
                                content={comment.content}
                                writerId={comment.writerId}
                            />
                        ))}
                    </div>
                    <div className="send_section">
                        <div className="send_box">
                            <input
                                type="text"
                                className="text"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && newComment.trim()) {
                                        e.preventDefault(); // Enter 기본 동작 방지 (필요한 경우)
                                        handleSendComment(); // Enter 키 누를 때 sendMessage 호출
                                    }
                                }}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="댓글을 남겨주세요."
                                disabled={isPosting}
                            />
                            <img src={newComment.trim() ? send_fill : send} alt="send" className="send" onClick={newComment.trim() ? handleSendComment : undefined} />
                        </div>
                    </div>
                </>
            ) : (
                null
            )}

        </div>
    )
}

export default GroupFeedDetail