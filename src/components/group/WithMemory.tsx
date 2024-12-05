import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'
import worker_bg from '../../assets/img/group/memory_worker_bg_img.svg'
import volunteer_bg from '../../assets/img/group/memory_volunteer_bg_img.svg'
import giver_bg from '../../assets/img/group/memory_giver_bg_img.svg'

const WithMemory = () => {
  return (
    <div className="with_memory_div">
      <div className="other_type">
        <img src={profile} alt="" className="profile" />
        <div className="memory_text">
          <p className="name">요양보호사 이규민님</p>
          <p className="text">
            전문적이세요! 너무 너무 감사합니다. 다음에 또 뵐 수 있으면
            좋겠습니다. 다음에 또 뵈면 제가 맛있는 밥 만들어드릴게요! 꼭 요리
            연습 해가도록 하겠습니다!
          </p>
        </div>
      </div>
      <div className="giver_type">
        <div className="memory_text">
          <p className="name">요양보호사 이규민님</p>
          <p className="text">
            전문적이세요! 너무 너무 감사합니다. 다음에 또 뵐 수 있으면
            좋겠습니다. 다음에 또 뵈면 제가 맛있는
          </p>
        </div>
        <img src={profile} alt="" className="profile" />
      </div>
    </div>
  )
}

export default WithMemory
