import React from 'react';
import { useNavigate } from 'react-router-dom';

import MenuItem from './MenuItem';

const CareWorkerCertificate: React.FC = () => {
  const navigate = useNavigate(); 
  const label = '요양 보호 확인증';

  const handleNavigation = ({}) => {
    navigate('/certificate-person-page',{state:{label}}); 
  };
  return(
  <div className='cursor-pointer'  onClick={handleNavigation}> 
     <MenuItem label="요양 보호 확인증" />
  </div>
  )
};

export default CareWorkerCertificate;