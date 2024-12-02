import React from 'react'
import heart from '../../assets/img/group/group_heart_icon.svg'
import GroupList from './GroupList'

const OtherGroup = () => {
  return (
    <div className='other_group'>
      <div className="group_list">
        <GroupList/>
        <hr />
        <GroupList/>
      </div>
      <div className="no_group_div">
        <div className="no_group">
          <p className="text">원한는 모임이 없나요?</p>
          <div className="new_group">
            <img src={heart} alt="" className="heart" />
            <p className="txt">모임 만들기</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherGroup