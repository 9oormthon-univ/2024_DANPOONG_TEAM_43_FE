import React from 'react'
import { useNavigate } from 'react-router-dom';

import group_icon from '../assets/img/group/group_popup_icon.svg'

const Group = () => {
  const navigate = useNavigate();

  return (
    <div className='container' id='group'>
      <div className="page_title">이웃 모임</div>
      <div className="contents">
        <div className="popup">
          <img src={group_icon} alt="" />
          <p className="title">이웃 모임은 열심히 개발하고 있어요!</p>
          <p className="text">이웃과 함께 모임을 통해 소통할 수 있어요 <br />하루 빨리 만들어 드릴게요!</p>
        </div>
        <div className="bottom">
          <div className="button" onClick={()=>{navigate('/Map')}}>내 주변 이웃 보러가기</div>
        </div>
      </div>
    </div>
  )
}

export default Group