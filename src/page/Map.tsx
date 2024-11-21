import React, { useEffect, useState, useRef } from 'react';
import { useUserStore } from 'stores/useUserStore';
import { useUserListQuery } from 'service/fetchUserList';
import caregiverProfile from '../assets/img/map/marker1.svg';
import volunteerProfile from '../assets/img/map/marker2.svg';
import careWorkerProfile from '../assets/img/map/marker3.svg';
import MapList from 'components/map/MapList';
import UserCard from 'components/map/UserCard';
import mapIcon from '../assets/img/map/map-ic.svg';
import userIcon from '../assets/img/map/user-list.svg';
import searchIcon from '../assets/img/map/search-ic.svg';
import MapLoadingSpinner from 'components/map/MapLoadingSpinner';
import resetAllIcon from '../assets/img/map/reset.svg';

const MapPage: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(5);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null); 
  const [markerSize, setMarkerSize] = useState<any>(new window.kakao.maps.Size(40, 40)); 
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const markersRef = useRef<any[]>([]);
  const clustererRefs = useRef<{ [key: string]: any }>({});
  const userInfo = useUserStore((state) => state.userInfo);
  const userCardRef = useRef<any>(null); 
  const [selectedUserType, setSelectedUserType] = useState<string>('ALL'); 

  const { data: userList = [], isLoading: isQueryLoading } = useUserListQuery(userInfo?.city || '', selectedUserType);


  useEffect(() => {
    if (userList.length > 0) {
      setIsDataLoaded(true); 
      setInitialLoading(false); 
    } else {
      setTimeout(() => {
        setInitialLoading(false); 
      }, 1000);
    }
  }, [userList]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API is not loaded');
      return;
    }

    const container = document.getElementById('map-container');
    if (!container) {
      console.error('Map container is not found');
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(userInfo?.latitude || 37.5665, userInfo?.longitude || 126.978),
      level: 5, 
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    const geocoder = new window.kakao.maps.services.Geocoder();
  
    geocoder.addressSearch(
      userInfo.address,
      (result: Array<{ x: string; y: string }>, status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const centerLatLng = new window.kakao.maps.LatLng(result[0].y, result[0].x);
  
          // 지도 중심 설정
          kakaoMap.setCenter(centerLatLng);
  
          // 외부 네모 (화면 전체를 덮는 큰 사각형)
          const bounds = new window.kakao.maps.LatLngBounds(
            new window.kakao.maps.LatLng(centerLatLng.getLat() - 10, centerLatLng.getLng() - 10), // 좌측 하단
            new window.kakao.maps.LatLng(centerLatLng.getLat() + 10, centerLatLng.getLng() + 10) // 우측 상단
          );
  
          const outerCoords = [
            bounds.getSouthWest(), // 좌측 하단
            new window.kakao.maps.LatLng(bounds.getSouthWest().getLat(), bounds.getNorthEast().getLng()), // 우측 하단
            bounds.getNorthEast(), // 우측 상단
            new window.kakao.maps.LatLng(bounds.getNorthEast().getLat(), bounds.getSouthWest().getLng()), // 좌측 상단
            bounds.getSouthWest(), // 다시 좌측 하단으로 닫음
          ];
  
          // 내부 원 (구멍 부분)
          const holeCoords = [];
          const circleRadius = 2000; // 반경 2km
          const circleCenter = centerLatLng;
  
          const circlePoints = 360; // 원을 구성할 점의 개수
          for (let i = 0; i < circlePoints; i++) {
            const angle = (i * Math.PI) / 180; // 각도를 라디안 단위로 변환
            const dx = circleRadius * Math.cos(angle); // x 좌표
            const dy = circleRadius * Math.sin(angle); // y 좌표
            const lat = circleCenter.getLat() + (dy / 111000); // 위도
            const lng = circleCenter.getLng() + (dx / (111000 * Math.cos(circleCenter.getLat() * (Math.PI / 180)))); // 경도
            holeCoords.push(new window.kakao.maps.LatLng(lat, lng));
          }
  
          // 다각형 생성
          const polygon = new window.kakao.maps.Polygon({
            path: [outerCoords, holeCoords], // 외부 경로와 내부 구멍 경로를 추가
            strokeWeight: 2,
            strokeColor: "#000000",
            strokeOpacity: 0.0,
            fillColor: "#808080",
            fillOpacity: 0.8,
          });
  
          polygon.setMap(kakaoMap);
        } else {
          console.error("Failed to convert address to coordinates.");
        }
      }
    )

    window.kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
      const newZoomLevel = kakaoMap.getLevel();
      setCurrentZoomLevel(newZoomLevel);
      handleZoomChange(kakaoMap, newZoomLevel);
    });
  }, [userInfo]);

  useEffect(() => {
    if (map && userList.length > 0) {
      clearMarkersAndClusterers();
      if (currentZoomLevel >= 4) {
        showTypeClustering(map);
      } else {
        showIndividualMarkers(map);
      }
    }
  }, [map, userList, currentZoomLevel]);

  const handleZoomChange = (mapInstance: any, zoomLevel: number) => {
    clearMarkersAndClusterers();
    if (zoomLevel >= 4) {
      showTypeClustering(mapInstance);
    } else if (zoomLevel <= 3) {
      showIndividualMarkers(mapInstance);
    }
  };

  const handleFilterChange = (type: string) => {
    setSelectedUserType(type);
  };

  const clearMarkersAndClusterers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    Object.values(clustererRefs.current).forEach((clusterer) => {
      clusterer.clear();
    });
    clustererRefs.current = {};
  };

  const showTypeClustering = (mapInstance: any) => {
    const typeClusters = userList.reduce((acc: any, user) => {
      if (!acc[user.userType]) acc[user.userType] = [];
      acc[user.userType].push(user);
      return acc;
    }, {});

    clearMarkersAndClusterers();

    Object.keys(typeClusters).forEach((type) => {
      if (!clustererRefs.current[type]) {
        clustererRefs.current[type] = new window.kakao.maps.MarkerClusterer({
          map: mapInstance,
          averageCenter: true,
          gridSize: 100,
          minLevel: 4,
          minClusterSize: 1,
          styles: [
            {
              width: '40px',
              height: '40px',
              background: getClusterColor(type),
              color: '#fff',
              textAlign: 'center',
              lineHeight: '40px',
              borderRadius: '50%',
            },
          ],
        });
      }

      const markers = typeClusters[type].map((user: any) => {
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(user.latitude, user.longitude),
          image: getMarkerImage(user.userType),
        });
      });

      clustererRefs.current[type].addMarkers(markers);
    });
  };

  const showIndividualMarkers = (mapInstance: any) => {
    const markers = userList.map((user) => {
      const markerImage = getMarkerImage(user.userType);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(user.latitude, user.longitude),
        image: markerImage, 
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedUser(user); 
        mapInstance.panTo(marker.getPosition());
        setMarkerSize(new window.kakao.maps.Size(60, 60));
      });

      marker.setMap(mapInstance);
      return marker;
    });

    markersRef.current = markers;
  };

  const getMarkerImage = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return new window.kakao.maps.MarkerImage(caregiverProfile, markerSize);
      case 'VOLUNTEER':
        return new window.kakao.maps.MarkerImage(volunteerProfile, markerSize);
      case 'CARE_WORKER':
        return new window.kakao.maps.MarkerImage(careWorkerProfile, markerSize);
      default:
        return new window.kakao.maps.MarkerImage(caregiverProfile, markerSize);
    }
  };

  const getClusterColor = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return 'rgba(255, 160, 160, 0.3)';
      case 'VOLUNTEER':
        return 'rgba(0, 174, 255, 0.3)';
      case 'CARE_WORKER':
        return 'rgba(32, 206, 134, 0.3)';
      default:
        return 'rgba(128, 128, 128, 0.3)';
    }
  };

  useEffect(() => {
    if (map) {
      handleZoomChange(map, currentZoomLevel);
    }
  }, [map, currentZoomLevel, userList]);


  const handleCityClick = () => {
    setIsListExpanded(!isListExpanded);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userCardRef.current && !userCardRef.current.contains(e.target)) {
        setSelectedUser(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 반환 (km)
  };
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim().length >= 2) {
      setLoading(true);
  
      try {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        const mapCenter = map?.getCenter();
  
        if (!mapCenter) {
          console.error("Map center is not available");
          setLoading(false);
          return;
        }
  
        // 검색 필터링 및 거리 계산
        const filteredUsers = userList
          .filter(
            (user) =>
              user.username.toLowerCase().includes(normalizedSearchTerm) ||
              user.userType.toLowerCase().includes(normalizedSearchTerm)
          )
          .map((user) => ({
            ...user,
            distance: calculateDistance(
              mapCenter.getLat(),
              mapCenter.getLng(),
              user.latitude,
              user.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance);
  
        if (filteredUsers.length === 0) {
          console.log("No users found matching the search term");
        } else {
          const nearestUser = filteredUsers[0];
          console.log("Nearest User:", nearestUser);
  
          const userPosition = new window.kakao.maps.LatLng(
            nearestUser.latitude,
            nearestUser.longitude
          );
  
          // 중심 이동
          map?.panTo(userPosition);
  
          // 줌 레벨을 단계적으로 변경
          const smoothZoom = (startLevel: number, endLevel: number, duration: number) => {
            const steps = Math.abs(startLevel - endLevel); // 줌 변경 단계 수
            const stepDuration = duration / steps; // 단계별 지속 시간
  
            for (let i = 1; i <= steps; i++) {
              setTimeout(() => {
                const zoomLevel = startLevel > endLevel ? startLevel - i : startLevel + i;
                map?.setLevel(zoomLevel, { animate: true }); // 부드러운 애니메이션
              }, i * stepDuration);
            }
          };
  
          // 현재 줌 레벨에서 2단계까지 천천히 확대
          if (currentZoomLevel >= 4) {
            smoothZoom(currentZoomLevel, 3, 1000); // 1초 동안 줌 단계 변경
          }
  
          // 유저 선택 후 모달 표시
          setSelectedUser(nearestUser);
        }
      } catch (error) {
        console.error("Error in search:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  useEffect(() => {
    const storedZoomLevel = sessionStorage.getItem('mapZoomLevel');
    const storedCenter = sessionStorage.getItem('mapCenter');
    if (map && storedZoomLevel && storedCenter) {
      const center = JSON.parse(storedCenter);
      map.setLevel(Number(storedZoomLevel));
      map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
    }
  }, [map]);
  
  useEffect(() => {
    if (map) {
      const zoomLevel = map.getLevel();
      const center = map.getCenter();
      sessionStorage.setItem('mapZoomLevel', zoomLevel.toString());
      sessionStorage.setItem('mapCenter', JSON.stringify({ lat: center.getLat(), lng: center.getLng() }));
    }
  }, [currentZoomLevel, map]);

  return (
    <div className="relative mx-auto max-w-[440px] min-w-[320px]">
      {(loading || (initialLoading && !isDataLoaded)) && (
        <MapLoadingSpinner/>
    )}
      <div className="absolute h-[56px] top-0 left-0 w-full px-4 py-2 bg-white shadow-md z-[9999] flex justify-between">
        <div className="flex items-center rounded-md w-4/5">
          <img
            src={searchIcon}
            alt="Search Icon"
            className="w-[16px] h-[16px] ml-1"
          />
          <input
            type="text"
            placeholder="이웃을 검색해 보세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} 
            className="p-2 w-full outline-none"
          />
        </div>
        <button
          className="p-2 text-white rounded-full"
          onClick={handleCityClick} 
        >
          {isListExpanded ? (
            <img src={mapIcon} alt="Map Icon" className="w-[24px] h-[24px]" />
          ) : (
            <img src={userIcon} alt="User List Icon" className="w-[24px] h-[24px]" />
          )}
        </button>
        <div className="absolute top-[64px] left-0 w-full flex justify-around p-2  z-[99999]">
        {['ALL', 'CAREGIVER', 'VOLUNTEER', 'CARE_WORKER'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={
              type === 'ALL'
                ? 'h-8 flex items-center justify-center rounded-[30px]'
                : type === 'CAREGIVER'
                ? `h-8 px-3 py-[7px] ${
                    selectedUserType === 'CAREGIVER' ? 'bg-[#ff6b6b]' : 'bg-[#ffe1e1]'
                  } rounded-[30px] justify-start items-center gap-1 inline-flex`
                : type === 'VOLUNTEER'
                ? `h-8 px-3 py-[7px] ${
                    selectedUserType === 'VOLUNTEER' ? 'bg-[#00aeff] border border-[#00aeff]' : 'bg-[#eff9ff]'
                  } rounded-[30px] justify-start items-center gap-1 inline-flex`
                : `h-8 px-3 py-[7px] ${
                    selectedUserType === 'CARE_WORKER' ? 'bg-[#20ce86] border border-[#20ce86]' : 'bg-[#ebfef4]'
                  } rounded-[30px] justify-start items-center gap-1 inline-flex`
            }
          >
            {type === 'ALL' ? (
              <img src={resetAllIcon} alt="Reset All" className="w-[32px] h-[32px]" />
            ) : (
              <div
                className={
                  type === 'CAREGIVER'
                    ? `text-center ${
                        selectedUserType === 'CAREGIVER' ? 'text-white' : 'text-[#ff6b6b]'
                      } text-[13px] font-semibold font-['Pretendard'] leading-[18.20px]`
                    : type === 'VOLUNTEER'
                    ? `text-center ${
                        selectedUserType === 'VOLUNTEER' ? 'text-white' : 'text-[#00aeff]'
                      } text-[13px] font-semibold font-['Pretendard'] leading-[18.20px]`
                    : `text-center ${
                        selectedUserType === 'CARE_WORKER' ? 'text-white' : 'text-[#20ce86]'
                      } text-[13px] font-semibold font-['Pretendard'] leading-[18.20px]`
                }
              >
                {type === 'CAREGIVER'
                  ? '간병인'
                  : type === 'VOLUNTEER'
                  ? '자원봉사자'
                  : '요양보호사'}
              </div>
            )}
          </button>
        ))}
      </div>
      </div>
      <div
        className="cursor-pointer absolute bottom-0 z-[9999] left-0 w-full p-4 bg-gray-200 text-gray-800 text-lg font-semibold transition-all duration-300 ease-in-out"
        onClick={handleCityClick}
      >
        {userInfo.city}
      </div>
      <div id="map-container" className="w-full h-[calc(100vh-140px)] z-[999]"></div>
      {isListExpanded && (
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isListExpanded ? 'max-h-[60%]' : 'max-h-0'
          }`}
        >
          <MapList userList={userList} />
        </div>
      )}
      {selectedUser && (
        <div
          className="transition-all duration-300 ease-in-out absolute bottom-0 left-0 w-full"
          ref={userCardRef}
        >
          <UserCard user={selectedUser} />
        </div>
      )}
    </div>
  );
}

export default MapPage;