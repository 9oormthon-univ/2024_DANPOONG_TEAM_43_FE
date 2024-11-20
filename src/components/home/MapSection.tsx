import React, { useCallback, useEffect, useState } from 'react';
import { checkLocationAuthentication, verifyLocationAuthentication } from 'service/locationVerification';
import { useLocationStore } from 'stores/locationStore';
import { UserData } from 'type/user';
import mapImage from '../../assets/img/map/map-image1.svg';
import mapBlurImage from '../../assets/img/home/map-blur1.svg';
import { useUserStore } from 'stores/useUserStore';
import { useUserListQuery } from 'service/fetchUserList';
import caregiverProfile from '../../assets/img/map/marker1.svg';
import volunteerProfile from '../../assets/img/map/marker2.svg';
import careWorkerProfile from '../../assets/img/map/marker3.svg';

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

  const { data: userList = [], isLoading: isQueryLoading } = useUserListQuery(userInfo.city);

  console.log(userInfo);

  const handleAgreementModalOpen = () => {
    setShowAgreementModal(true);
  };
  const handleAgreementModalClose = () => {
    setShowAgreementModal(false);
  };

  const initializeMap = useCallback(() => {
    if (isMapInitialized) {
      console.log('Map already initialized. Skipping...');
      return;
    }

    const container = document.getElementById('map');
    if (!container || !window.kakao) return;

    const userLatitude = userInfo.latitude || 37.5665; 
    const userLongitude = userInfo.longitude || 126.978;

    console.log('유저 위도:', userLatitude);
    console.log('유저 경도:', userLongitude);

    const options = {
      center: new window.kakao.maps.LatLng(userLatitude, userLongitude),
      level: 3,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    setIsBlurred(false);
    setIsMapInitialized(true);
  }, [isMapInitialized, userInfo.latitude, userInfo.longitude]);

  const addMarkersToMap = useCallback(() => {
    if (!map) return;

    userList.forEach((user: any) => {
      const markerImage = getMarkerImage(user.userType); 
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(user.latitude, user.longitude),
        image: markerImage,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        alert(`유저 이름: ${user.username}`);
        map.panTo(marker.getPosition());
      });

      marker.setMap(map);
    });
  }, [map, userList]);

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
        initializeMap();
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

  const getMarkerImage = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return new window.kakao.maps.MarkerImage(caregiverProfile, new window.kakao.maps.Size(40, 40));
      case 'VOLUNTEER':
        return new window.kakao.maps.MarkerImage(volunteerProfile, new window.kakao.maps.Size(40, 40));
      case 'CARE_WORKER':
        return new window.kakao.maps.MarkerImage(careWorkerProfile, new window.kakao.maps.Size(40, 40));
      default:
        return new window.kakao.maps.MarkerImage(caregiverProfile, new window.kakao.maps.Size(40, 40));
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
        <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer">더보기</div>
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
    </div>
  );
};

export default MapSection;