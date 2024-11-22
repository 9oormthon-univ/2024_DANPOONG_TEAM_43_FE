import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';

const MemoriesSetting: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/Memory');
  };

  return (
    <div onClick={handleNavigation}>
      <MenuItem label="함께 한 추억" />
    </div>
  );
};

export default MemoriesSetting;