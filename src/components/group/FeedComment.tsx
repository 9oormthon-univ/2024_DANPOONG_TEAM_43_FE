import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'


const FeedComment = () => {
    return (
        <div className='feed_comment'>
            <div className="top_div">
                <img src={profile} alt="" className='profile' />
                <div className="text">
                    <p className="name">간병인 이규민</p>
                    <p className="when">2024년 11월 27일 09:54</p>
                </div>
            </div>
            <p className="comment">완전 멋져요! 앞으로의 날도 기대할께요 완전 멋져요! 앞으로의 날도 기대할께요 완전 멋져요! 앞으로의 날도 기대할께요</p>
        </div>
    )
}

export default FeedComment