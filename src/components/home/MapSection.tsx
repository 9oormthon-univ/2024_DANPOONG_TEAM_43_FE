import React, { useCallback, useEffect, useRef, useState } from 'react';
import { checkLocationAuthentication, verifyLocationAuthentication } from 'service/locationVerification';
import { useLocationStore } from 'stores/locationStore';
import { useNavigate } from 'react-router-dom';
import { UserData } from 'type/user';
import mapImage from '../../assets/img/map/map-image1.svg';
import mapBlurImage from '../../assets/img/home/map-blur1.svg';
import { useUserStore } from 'stores/useUserStore';
import { useUserListQuery } from 'service/fetchUserList';
import caregiverProfile from '../../assets/img/map/marker1.svg';
import volunteerProfile from '../../assets/img/map/marker2.svg';
import careWorkerProfile from '../../assets/img/map/marker3.svg';
import marker1Default from '../../assets/img/map/marker1-1.svg';
import marker2Default from '../../assets/img/map/marker2-1.svg';
import marker3Default from '../../assets/img/map/marker3-1.svg';
import marker1Active from '../../assets/img/map/marker1.svg';
import marker2Active from '../../assets/img/map/marker2.svg';
import marker3Active from '../../assets/img/map/marker3.svg';
import UserCard from 'components/map/UserCard';
import UserCardHome from './UserCardHome';

interface MapSectionProps {
  userData: UserData;
}

const MapSection: React.FC<MapSectionProps> = ({ userData }) => {
  const { isAuthenticated, setAuthenticated, openModal, setOpenModal } = useLocationStore(); 
  const [isBlurred, setIsBlurred] = useState(true);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const userInfo = useUserStore((state) => state.userInfo);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const markersRef = useRef<any[]>([]);

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (selectedUser) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.body.style.overflow = ''; 
    };
  }, [selectedUser]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/map');
  };
  
  const { data: userList = [] } = useUserListQuery(userInfo.city);

  const handleAgreementModalOpen = () => {
    setShowAgreementModal(true);
  };
  const handleAgreementModalClose = () => {
    setShowAgreementModal(false);
  };

  const initializeMap = useCallback(() => {
    if (isMapInitialized) {
      return;
    }

    const container = document.getElementById('map');
    if (!container || !window.kakao) return;

    const userLatitude = userInfo.latitude || 37.5665; 
    const userLongitude = userInfo.longitude || 126.978;

    const options = {
      center: new window.kakao.maps.LatLng(userLatitude, userLongitude),
      level: 3,
      maxLevel: 4,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    setIsBlurred(false);
    setIsMapInitialized(true);
  }, [isMapInitialized, userInfo.latitude, userInfo.longitude]);

  const addMarkersToMap = useCallback(() => {
    if (!map) return;

    // 기존 마커 초기화
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    userList.forEach((user: any) => {
      const isActive = user.userId === activeMarkerId; // 현재 마커 활성화 여부
      const markerImage = getMarkerImage(user.userType, isActive);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(user.latitude, user.longitude),
        image: markerImage,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedUser(user); // 선택된 유저 설정
        setActiveMarkerId(user.userId); // 클릭된 마커 ID 설정
        map.panTo(marker.getPosition()); // 지도 중심 이동
      });

      marker.setMap(map); // 지도에 마커 표시
      markersRef.current.push(marker); // 마커 참조 저장
    });
  }, [map, userList, activeMarkerId]);

  useEffect(() => {
    if (map) {
      addMarkersToMap();
    }
  }, [map, addMarkersToMap]);

  useEffect(() => {
    if (!isMapInitialized) {
      initializeMap();
    }
  }, [isMapInitialized, initializeMap]);

  useEffect(() => {
    if (!map) return;

    const handleMapClick = () => {
      setActiveMarkerId(null); // 활성화된 마커 ID 초기화
      setSelectedUser(null);   // 선택된 유저 정보 초기화
    };
    // 지도 클릭 이벤트 등록
    window.kakao.maps.event.addListener(map, 'click', handleMapClick);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 제거
      window.kakao.maps.event.removeListener(map, 'click', handleMapClick);
    };
  }, [map]);

  

  useEffect(() => {
    if (openModal || showAgreementModal || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openModal, showAgreementModal, loading]);


  useEffect(() => {
    const storedLocation = sessionStorage.getItem('userLocation');
    const isSessionAuthenticated = sessionStorage.getItem('locationAuthenticated') === 'true';

    if (isAuthenticated || isSessionAuthenticated) {
      initializeMap();
      setAuthenticated(true); 
    } else {
      const fetchLocationStatus = async () => {
        setLoading(true);
        try {
          const response = await checkLocationAuthentication();
          const isLocationVerified = response?.data?.locationAuthentication;

          if (isLocationVerified) {
            setAuthenticated(true);
            initializeMap();
          } else {
            setOpenModal(true);
          }
        } catch (error) {
          console.error('위치 인증 상태 확인 실패:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchLocationStatus();
    }
  }, [isAuthenticated, initializeMap, setAuthenticated, setOpenModal]);

  const getLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position.coords),
          error => reject(error),
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const convertCoordinatesToAddress = async (
    latitude: number,
    longitude: number,
  ): Promise<{ address: string; detailAddress: string }> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const latlng = new window.kakao.maps.LatLng(latitude, longitude);

      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const fullAddress = result[0].road_address?.address_name || '주소 변환 실패';

          const addressParts = fullAddress.split(' ');
          const address = addressParts.slice(0, 3).join(' ');
          const detailAddress = addressParts.slice(3).join(' '); 

          resolve({ address, detailAddress });
        } else {
          reject('주소 변환 실패');
        }
      });
    });
  };

  const handleConfirmLocation = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = await getLocation();
      const { address, detailAddress } = await convertCoordinatesToAddress(latitude, longitude);
      const response = await verifyLocationAuthentication(address, detailAddress);
  
      if (response.status === 200) {
        localStorage.setItem(
          'currentLocation',
          JSON.stringify({ latitude, longitude })
        );
  
        setAuthenticated(true);
        // initializeMap();
        setTimeout(() => {
          window.alert('위치 정보에 동의했습니다.');
          setShowAgreementModal(false); 
        }, 2000);
        setOpenModal(false);
      }
    } catch (error) {
      console.error('위치 인증 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerImage = (userType: string, isActive: boolean = false) => {
    const size = isActive
      ? new window.kakao.maps.Size(50, 50) 
      : new window.kakao.maps.Size(40, 40); 
  
    switch (userType) {
      case 'CAREGIVER':
        return new window.kakao.maps.MarkerImage(
          isActive ? marker1Active : marker1Default,
          size
        );
      case 'VOLUNTEER':
        return new window.kakao.maps.MarkerImage(
          isActive ? marker2Active : marker2Default,
          size
        );
      case 'CARE_WORKER':
        return new window.kakao.maps.MarkerImage(
          isActive ? marker3Active : marker3Default,
          size
        );
      default:
        return new window.kakao.maps.MarkerImage(
          isActive ? marker1Active : marker1Default,
          size
        );
    }
  };

  return (
    <div className="mt-6 relative">
      <div className='z-[99999]'>
      {loading && (
        <div className="max-w-[440px] min-w-[340px] mx-auto fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
          <div className="w-12 h-12 border-4 border-t-transparent border-[#ff6b6b] rounded-full animate-spin"></div>
        </div>
      )}
      </div>
      <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">내 주변 이웃 찾아보기</div>
        <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer" onClick={handleClick}>더보기</div>
      </div>
      <div className="w-full h-64 rounded-lg relative">
        {!isAuthenticated &&  (
          <img
            src={mapBlurImage}
            alt="Map Placeholder"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        {isAuthenticated &&  (
          <div
            id="map"
            className="w-full h-full rounded-lg"
            style={{ pointerEvents: isBlurred ? 'none' : 'auto' }}
          ></div>
        )}
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mx-auto max-w-[440px] min-w-[320px]">
          <div className="bg-white p-6 rounded-lg text-center w-80">
            <div className="text-center text-[#2a2e37] text-base font-bold font-['Pretendard'] leading-snug">
              이웃 인증을 해주세요!
            </div>
            <div className="text-center text-[#575f70] text-sm font-normal font-['Pretendard'] leading-tight my-[18px]">
              이웃의 정보를 보호하기 위해<br />살고 계신 지역의 인증이 필요해요
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button
                className="w-full px-[24px] py-[12px] bg-[#fff1f1] text-[#ff6b6b] rounded-lg text-base font-semibold font-['Pretendard'] leading-snug"
                onClick={() => setOpenModal(false)}
              >
                나중에
              </button>
              <button
                className="w-full px-[24px] py-[12px] bg-[#ff6b6b] text-white rounded-lg text-base font-semibold font-['Pretendard'] leading-snug"
                onClick={handleAgreementModalOpen}
              >
                인증할래요
              </button>
            </div>
          </div>
        </div>
      )}
      { showAgreementModal &&
          <div className="fixed inset-0 bg-white z-[9999] flex flex-col justify-between items-center h-[100dvh] max-w-[440px] w-full mx-auto">
          <div className="flex justify-between items-center w-[90%] mx-auto pt-6">
            <button onClick={handleAgreementModalClose} className="text-lg text-gray-500">
              &larr;
            </button>
            <h1 className="text-xl font-semibold text-[#2a2e36]">이웃 인증</h1>
            <div className="w-6"></div>
          </div>
          <div className='mt-[50px] flex flex-col text-left w-[90%] mx-auto'>
          <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 text-left mb-2">먼저 위치 정보 수집에 동의해주세요</div>
          <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight text-left">이웃의 정보를 보호하기 위해 꼭 필요해요</div>
          </div>
          <div className="w-full flex-1 flex flex-col items-center justify-center px-4">
            <img
              src={mapImage} 
              alt="Map Placeholder"
              className="w-full max-w-md h-64 rounded-lg mb-6"
            />
          </div>
          <div className="w-full px-4 pb-6">
            <button
              onClick={handleConfirmLocation}
              className="w-full py-3 bg-[#ff6b6b] text-white text-lg font-semibold rounded-lg z-[99999] mb-[90px]"
            >
              위치 정보 수집 동의하기
            </button>
          </div>
        </div>
      }
       {selectedUser && (
        <UserCardHome user={selectedUser} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default MapSection;