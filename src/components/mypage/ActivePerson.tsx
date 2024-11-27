import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import giver_bg from '../../assets/img/mypage/neighbor_time_giver_bg.svg'
import profile from '../../assets/img/mypage/profile-caregiver.svg'

interface MenuItemProps {
  label: string;
}
const ActivePerson: React.FC<MenuItemProps> = ({ label }) => {
  const navigate = useNavigate();
  const GoToCertificate = () =>{
    navigate('/certificate-page', {state:{label}})
  }
  return (
    <div className='active_person' onClick={GoToCertificate}>
        <img src={giver_bg} alt="" className="background_img" />
        <img src={profile} alt="" className="profile_img" />
        <div className="text">
            <p className="name">간병인 이상덕님</p>
            <p className="when">2024년 10월 24일</p>
        </div>
    </div>
  )
}

export default ActivePerson