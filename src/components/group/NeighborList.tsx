import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'
import bg_img_giver from '../../assets/img/group/neighbor_list_giver_bg.svg'
import bg_img_volunteer from '../../assets/img/group/neighbor_list_volunteer_bg.svg'
import bg_img_worker from '../../assets/img/group/neighbor_list_worker_bg.svg'
import { UserType } from 'type/user';

interface NeighborListProps {
  username: string;
  userType: UserType;
}

const NeighborList: React.FC<NeighborListProps> = ({ username, userType }) => {
  const userTypeConfig = {
    CAREGIVER: {
      label: '간병인',
      color: '#FF6B6B', // 텍스트 색상
      bgColor: '#FFF1F1', // 배경 색상
      bgImg: bg_img_giver // 배경 이미지
    },
    VOLUNTEER: {
      label: '자원봉사자',
      color: '#00AEFF', // 텍스트 색상
      bgColor: '#EFF9FF', // 배경 색상
      bgImg: bg_img_volunteer // 배경 이미지
    },
    CARE_WORKER: {
      label: '요양보호사',
      color: '#20CE86', // 텍스트 색상
      bgColor: '#EBFEF4', // 배경 색상
      bgImg: bg_img_worker // 배경 이미지
    }
  };
  const config = userTypeConfig[userType] || {};
  return (
    <div className='neighbor_list' style={{ backgroundColor: config.bgColor }}>
        <img src={config.bgImg} alt="" className='bg_img'/>
        <img src={profile} alt="" className='profile'/>
        <p className="name">{config.label} {username}</p>
    </div>
  )
}

export default NeighborList