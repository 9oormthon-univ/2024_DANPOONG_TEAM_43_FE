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

  const { data: userList = [], isLoading: isQueryLoading } = useUserListQuery(userInfo?.city || '', undefined);


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

    window.kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
      const newZoomLevel = kakaoMap.getLevel();
      setCurrentZoomLevel(newZoomLevel);
      handleZoomChange(kakaoMap, newZoomLevel);
    });
  }, [userInfo]);

  const handleZoomChange = (mapInstance: any, zoomLevel: number) => {
    clearMarkersAndClusterers();
    if (zoomLevel >= 4) {
      showTypeClustering(mapInstance);
    } else if (zoomLevel <= 3) {
      showIndividualMarkers(mapInstance);
    }
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

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.length >= 2) { 
      setLoading(true);
      setTimeout(() => {
        const searchResult = userList.find(
          (user) =>
            user.username.includes(searchTerm) || user.userType.includes(searchTerm)
        );
  
        if (searchResult) {
          const marker = markersRef.current.find(
            (marker: any) => marker.getPosition().equals(new window.kakao.maps.LatLng(searchResult.latitude, searchResult.longitude))
          );
  
          if (marker) {
            map?.panTo(marker.getPosition()); 
            setSelectedUser(searchResult); 
          }
        }
        setLoading(false); 
      }, 1000);
    }
  };

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