import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import profile from '../assets/img/user/type1-1.svg'
import send from '../assets/img/chat/send.svg'
import FeedComment from 'components/group/FeedComment';


const GroupFeedDetail = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div className='container' id='group_feed_detail'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} className='back' />
                <p className='top_div'>
                    <div className="contents_div">
                        <img src={profile} alt="" className='profile' />
                        <div className="text">
                            <p className="name">간병인 이규민</p>
                            <p className="when">2024년 11월 27일 09:54</p>
                        </div>
                    </div>
                </p>
            </div>
            <div className="contents">
                <p className="contents_title">안녕하세요, 새롭게 가입하게 되었습니다!</p>
                <p className="contents_txt">
                안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요. 잘 부탁드립니다. 안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요. 잘 부탁드립니다. 안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요. 잘 부탁드립니다. 안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요. 잘 부탁드립니다. 안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요. 잘 부탁드립니다. 안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요. 잘 부탁드립니다. 안녕하세요, 송연우입니다.
                </p>
            </div>
            <div className="comment_div">
                <FeedComment/>
                <hr />
                <FeedComment/>
            </div>

            <div className="send_section">
                <div className="send_box">
                    <input
                        type="text"
                        className="text"
                        placeholder='댓글을 남겨주세요.'
                    />
                    <img src={send} alt="" className="send" />
                </div>
            </div>

        </div>
    )
}

export default GroupFeedDetail