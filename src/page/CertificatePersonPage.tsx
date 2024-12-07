import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg'
import NeighborTime from 'components/mypage/NeighborTime';
import ActivePerson from 'components/mypage/ActivePerson';
import axiosInstance from 'utils/axiosInstance';
import { useUserDataQuery } from 'service/user';



const CertificatePersonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData, isLoading, error } = useUserDataQuery();
  const { label } = location.state || {};
  const [data, setData] = useState<any[]>([]); // API 데이터 저장
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/document/volunteer/userId`); // API 호출
        setData(response.data.data); // 응답 데이터 저장
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [userData?.userId]);

  if (error || !userData) {
    return null;
  }
  const { userType, userId } = userData;

  
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
      {data.map((item) => (
          <ActivePerson
            key={item.myIdentity} // 고유 키로 myIdentity 사용
            label={label} // 이름 정보
            certificateData={item} // 전체 데이터를 ActivePerson에 전달
          />
        ))}
      </div>
      
    </div>
  )
}

export default CertificatePersonPage