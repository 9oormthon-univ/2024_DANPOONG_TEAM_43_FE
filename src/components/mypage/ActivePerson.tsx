import React from 'react'
import { useNavigate } from 'react-router-dom';
import giver_bg from '../../assets/img/mypage/neighbor_time_giver_bg.svg'
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';
import { MenuItemProps } from 'type/mypage';

const ActivePerson: React.FC<MenuItemProps> = ({ label, certificateData }) => {
  const navigate = useNavigate();
  const GoToCertificate = () =>{
    navigate('/certificate-page', {state:{label, certificateData}})
  }
  return (
    <div className='active_person' onClick={GoToCertificate}>
        <img src={giver_bg} alt="" className="background_img" />
        <img src={getUserImage(certificateData.partnerId, certificateData.partnerType)} alt="" className="profile_img" style={{
            border: `2px solid ${getBackgroundColor2(certificateData.partnerType)}`,
          }}/>
        <div className="text">
            <p className="name">간병인 {certificateData.partnerName}님</p>
            <p className="when">{certificateData.volunteerDate}</p>
        </div>
    </div>
  )
}

export default ActivePerson