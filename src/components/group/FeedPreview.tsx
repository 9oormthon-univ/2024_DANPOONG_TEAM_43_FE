import React from 'react'
import { useNavigate } from 'react-router-dom';
import comment from '../../assets/img/group/group_comment_icon.svg'
import { getUserImage } from 'utils/userUtils';
import { FeedPreviewProps } from 'type/group';

const FeedPreview: React.FC<FeedPreviewProps> = ({ title, content, writerType, createdAt,newsId,commentCount,writerId }) => {
  const navigate = useNavigate();
  const GoToDetail = () => {
    navigate('/group-feed-detail', { state: { newsId }});
}
  return (
    <div className='feed_preview_div' onClick={GoToDetail}>
        <img src={getUserImage(writerId, writerType)} alt="" className="feed_profile" />
        <div className="contents">
            <p className="title">{title}</p>
            <p className="text">{content}</p>
            <div className="comment_div">
                <img src={comment} alt="" className="comment_icon" />
                <p className="num">댓글 {commentCount}개</p>
            </div>
        </div>
    </div>
  )
}

export default FeedPreview