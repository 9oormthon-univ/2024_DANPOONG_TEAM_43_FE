import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import NeighborTime from 'components/mypage/NeighborTime';
import ActivePerson from 'components/mypage/ActivePerson';


const CertificatePersonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { label } = location.state || {};
  const handleBackClick = () => {
    navigate(-1);
};
  return (
    <div className='container' id='certificate_person_page'>
      <div className="top">
        <img src={back} alt="" onClick={handleBackClick} />
        <p className='top_title'>{label}</p>
      </div>
      <NeighborTime/>
      <div className="person_tag">
        <ActivePerson label = {label}/>
      </div>
      
    </div>
  )
}

export default CertificatePersonPage