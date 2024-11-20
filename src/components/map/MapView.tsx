import React, { useEffect } from 'react';
import { groupUsersByProximity } from '../../utils/mapUtils';

interface MapViewProps {
  userData: any[];
  city: string;
  onFilterChange: (type: string) => void;
  onViewChange: () => void;
}

const MapView: React.FC<MapViewProps> = ({ userData, city, onFilterChange, onViewChange }) => {
  useEffect(() => {
    if (!city) return;

    const initializeMap = () => {
      const container = document.getElementById('map');
      if (!container || !window.kakao) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), 
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(city, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
        }
      });
      const groupedUsers = groupUsersByProximity(userData, 500); 
      groupedUsers.forEach((group: any) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(group.lat, group.lng),
          map,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${group.count}명</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });
      });
    };

    initializeMap();
  }, [city, userData]);

  return (
    <div className="w-full h-full relative">
      <div id="map" className="w-full h-full" />
      <div className="absolute top-4 right-4">
        <button onClick={onViewChange} className="bg-white px-4 py-2 shadow-lg rounded-lg">
          리스트 보기
        </button>
      </div>
      <div className="absolute top-4 left-4 flex gap-2">
        <button onClick={() => onFilterChange('')} className="filter-button">전체</button>
        <button onClick={() => onFilterChange('VOLUNTEER')} className="filter-button">자원봉사자</button>
        <button onClick={() => onFilterChange('CAREGIVER')} className="filter-button">간병인</button>
        <button onClick={() => onFilterChange('NURSE')} className="filter-button">요양보호사</button>
      </div>
    </div>
  );
};

export default MapView;