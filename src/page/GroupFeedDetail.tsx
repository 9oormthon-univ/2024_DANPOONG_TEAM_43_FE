import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import profile from '../assets/img/user/type1-1.svg'
import send from '../assets/img/chat/send.svg'
import FeedComment from 'components/group/FeedComment';
import axiosInstance from 'utils/axiosInstance';
import { UserType } from 'type/user';
import { useUserDataQuery } from 'service/user';


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

    const { username, userType } = userData;

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
            setIsPosting(true); // 요청 중 상태 활성화
            const payload = { content: newComment.trim() };
            const response = await axiosInstance.post(`/news/create/news/${newsId}/comment`, payload);

            // 새로운 댓글을 기존 댓글 리스트에 추가
            setFeedData((prevFeedData: any) => ({
                ...prevFeedData,
                newsComments: [
                    ...prevFeedData.newsComments,
                    {
                        newsCommentId: response.data.data.commentId, // 새로운 댓글 ID
                        content: newComment.trim(),
                        writerType: userType, // 작성자 유형 (적절히 변경 가능)
                        writer: username, // 현재 사용자 이름 (적절히 설정 가능)
                        createdAt: new Date().toISOString(),
                    },
                ],
            }));

            setNewComment(''); // 댓글 입력 필드 초기화
        } catch (error) {
            console.error('Failed to post comment:', error);
            alert('댓글 작성에 실패했습니다.');
        } finally {
            setIsPosting(false); // 요청 중 상태 비활성화
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
                                <img src={profile} alt="" className='profile' />
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
                        {feedData.newsComments.length > 0 ? (
                            feedData.newsComments.map((comment: any) => (
                                <FeedComment
                                    key={comment.newsCommentId}
                                    writerType={comment.writerType}
                                    writer={comment.writer}
                                    createdAt={comment.createdAt}
                                    content={comment.content}
                                />
                            ))
                        ) : (
                            <p className='none'>댓글이 없습니다.</p>
                        )}
                    </div>
                    <div className="send_section">
                        <div className="send_box">
                            <input
                                type="text"
                                className="text"

                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="댓글을 남겨주세요."
                                disabled={isPosting}
                            />
                            <img src={send} alt="send" className="send" onClick={handleSendComment} />
                        </div>
                    </div>
                </>
            ) : (
                <p>로딩 중...</p>
            )}

        </div>
    )
}

export default GroupFeedDetail