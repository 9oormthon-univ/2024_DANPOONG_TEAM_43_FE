import React from 'react'
import post_icon from '../../assets/img/group/group_post_icon.svg'
import people from '../../assets/img/group/group_people_icon.svg'


const GroupList = () => {
    return (
        <div className='group_list_div'>
            <div className="left">
                <div className="img"></div>
                <div className="info">
                    <p className="title">도움의 손길</p>
                    <p className="where">경기도 용인시 수지구</p>
                    <div className="post_div">
                        <img src={post_icon} alt="" className="post_icon" />
                        <p className="post_news">12시간 전 새로운 소식</p>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={people} alt="" className="people" />
                <p className="num">10명</p>
            </div>

        </div>
    )
}

export default GroupList