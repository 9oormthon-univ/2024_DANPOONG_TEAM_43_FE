import React from 'react';
import headerLogo from '../../assets/img/header/header-logo.svg';
import alertIcon from '../../assets/img/header/alert.svg';

const Header: React.FC = () => {
  return (
    <div className='w-full max-w-[440px] min-w-[340px] mx-auto'>
    <header className="flex items-center justify-between h-11 w-[90%] mx-auto py-[10px]">
      <img src={headerLogo} alt="Logo" className="w-14 h-6" />
      <img src={alertIcon} alt="Alert" className="w-6 h-6" />
    </header>
    </div>
  );
};

export default Header;