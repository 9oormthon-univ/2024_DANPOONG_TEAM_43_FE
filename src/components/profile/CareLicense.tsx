import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import axiosInstance from 'utils/axiosInstance';

const CareLicense: React.FC = () => {
  const navigate = useNavigate();
  const [no, setno] = useState(false);

  const handleNavigation = async () => {
    try {
      const response = await axiosInstance.post('/api/certificates/issue');
      if (response.status === 200 || response.data.message === '이미 자격증이 존재하여 발급할 수 없습니다.') {
        // 성공 응답이거나 이미 자격증이 존재하는 경우 페이지 이동
        navigate('/care-certificate-page');
      }
    } catch (error: any) {
      // 에러가 발생했지만, 메시지가 "이미 자격증이 존재하여 발급할 수 없습니다."라면 이동
      if (error.response?.data?.message === '이미 자격증이 존재하여 발급할 수 없습니다.') {
        navigate('/care-certificate-page');
      } else {
        console.error('Failed to issue care license:', error);
        setno(true);
        alert('이수 시간이 부족해 아직 자격증을 발급할 수 없습니다.');
      }
    }
  };

  return (
    <div className='cursor-pointer' onClick={handleNavigation}>
      <MenuItem label="요양 보호 자격증 발급" />
      {no && <p className="no">아직 발급이 어려워요!</p>}
    </div>
  );
};

export default CareLicense;