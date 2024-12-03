import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'

interface FeedCommentProps {
    writerType: string;
    writer: string;
    createdAt: string;
    content: string;
  }

interface UserTypeConfig {
    CAREGIVER: { label: string };
    VOLUNTEER: { label: string };
    CARE_WORKER: { label: string };
  }

const FeedComment: React.FC<FeedCommentProps> = ({ writerType, writer, createdAt, content }) => {
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
                <img src={profile} alt="" className='profile' />
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