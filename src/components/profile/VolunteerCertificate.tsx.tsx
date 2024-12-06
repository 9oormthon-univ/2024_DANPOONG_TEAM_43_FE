import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';

const VolunteerCertificate: React.FC = () => {
  const navigate = useNavigate(); 
  const label = '봉사 활동 확인증';

  const handleNavigation = ({}) => {
    navigate('/certificate-person-page',{state:{label}}); 
  };
  return(
  <div className='cursor-pointer'  onClick={handleNavigation}> 
     <MenuItem label="봉사 활동 확인증" />
  </div>
  )
};

export default VolunteerCertificate;