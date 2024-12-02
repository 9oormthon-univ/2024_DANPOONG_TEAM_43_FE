import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'
import bg_img_giver from '../../assets/img/group/neighbor_list_giver_bg.svg'

const NeighborList = () => {
  return (
    <div className='neighbor_list'>
        <img src={bg_img_giver} alt="" className='bg_img'/>
        <img src={profile} alt="" className='profile'/>
        <p className="name">간병인 이상덕님</p>
    </div>
  )
}

export default NeighborList