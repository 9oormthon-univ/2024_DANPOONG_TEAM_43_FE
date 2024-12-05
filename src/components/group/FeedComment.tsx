import React from 'react'
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';


interface FeedCommentProps {
    writerType: string;
    writer: string;
    createdAt: string;
    content: string;
    writerId:number;
  }

interface UserTypeConfig {
    CAREGIVER: { label: string };
    VOLUNTEER: { label: string };
    CARE_WORKER: { label: string };
  }

const FeedComment: React.FC<FeedCommentProps> = ({ writerType, writer, createdAt, content, writerId }) => {
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
      const config = userTypeConfig[writerType as keyof UserTypeConfig] || {};
    return (
        <div className='feed_comment'>
            <div className="top_div">
                <img src={getUserImage(writerId, writerType)} alt="" className='profile' />
                <div className="text">
                    <p className="name">{`${config.label} ${writer}`}</p>
                    <p className="when">{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>
            <p className="comment">{content}</p>
        </div>
    )
}

export default FeedComment