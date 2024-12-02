import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'
import comment from '../../assets/img/group/group_comment_icon.svg'

const FeedPreview = () => {
  return (
    <div className='feed_preview_div'>
        <img src={profile} alt="" className="feed_profile" />
        <div className="contents">
            <p className="title">안녕하세요, 새롭게 가입하게 되었습니다!</p>
            <p className="text">안녕하세요, 송연우입니다. 저는 요양보호 활동을 하고 있는 사람이에요</p>
            <div className="comment_div">
                <img src={comment} alt="" className="comment_icon" />
                <p className="num">댓글 3개</p>
            </div>
        </div>
    </div>
  )
}

export default FeedPreview