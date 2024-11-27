import type1_1 from '../assets/img/user/type1-1.svg';
import type1_2 from '../assets/img/user/type1-2.svg';
import type1_3 from '../assets/img/user/type1-3.svg';
import type1_4 from '../assets/img/user/type1-4.svg';
import type1_5 from '../assets/img/user/type1-5.svg';
import type1_6 from '../assets/img/user/type1-6.svg';
import type1_7 from '../assets/img/user/type1-7.svg';
import type1_8 from '../assets/img/user/type1-8.svg';
import type1_9 from '../assets/img/user/type1-9.svg';
import type1_10 from '../assets/img/user/type1-10.svg';
import type2_1 from '../assets/img/user/type2-1.svg';
import type2_2 from '../assets/img/user/type2-2.svg';
import type2_3 from '../assets/img/user/type2-3.svg';
import type2_4 from '../assets/img/user/type2-4.svg';
import type2_5 from '../assets/img/user/type2-5.svg';
import type2_6 from '../assets/img/user/type2-6.svg';
import type2_7 from '../assets/img/user/type2-7.svg';
import type2_8 from '../assets/img/user/type2-8.svg';
import type2_9 from '../assets/img/user/type2-9.svg';
import type2_10 from '../assets/img/user/type2-10.svg';
import type3_1 from '../assets/img/user/type3-1.svg';
import type3_2 from '../assets/img/user/type3-2.svg';
import type3_3 from '../assets/img/user/type3-3.svg';
import type3_4 from '../assets/img/user/type3-4.svg';
import type3_5 from '../assets/img/user/type3-5.svg';
import type3_6 from '../assets/img/user/type3-6.svg';
import type3_7 from '../assets/img/user/type3-7.svg';
import type3_8 from '../assets/img/user/type3-8.svg';
import type3_9 from '../assets/img/user/type3-9.svg';
import type3_10 from '../assets/img/user/type3-10.svg';
import timeIcon from '../assets/img/map/time.svg'; 
import { iconMapping } from './iconMapping';

// 이미지 매핑 데이터
export const imageMapping: { [key: string]: string[] } = {
  CAREGIVER: [
    type1_1,
    type1_2,
    type1_3,
    type1_4,
    type1_5,
    type1_6,
    type1_7,
    type1_8,
    type1_9,
    type1_10,
  ],
  CARE_WORKER: [
    type2_1,
    type2_2,
    type2_3,
    type2_4,
    type2_5,
    type2_6,
    type2_7,
    type2_8,
    type2_9,
    type2_10,
  ],
  VOLUNTEER: [
    type3_1,
    type3_2,
    type3_3,
    type3_4,
    type3_5,
    type3_6,
    type3_7,
    type3_8,
    type3_9,
    type3_10,
  ],
};

// 사용자 이미지 가져오기
export const getUserImage = (userId: number, userType: string): string => {
  const images = imageMapping[userType];
  return images ? images[userId % images.length] : '';
};

// 아이콘 경로 가져오기
export const getIconPath = (icon: string, userType: string): string => {
  const icons = iconMapping[userType];
  return icons?.[icon] || timeIcon; // 기본값으로 timeIcon 사용
};

// 배경색 결정
export const getBackgroundColor = (userType: string): string => {
  const colorMapping: { [key: string]: string } = {
    CAREGIVER: 'bg-[#fff1f1]',
    VOLUNTEER: 'bg-[#eff9ff]',
    CARE_WORKER: 'bg-[#ebfef4]',
  };
  return colorMapping[userType] || 'bg-gray-100';
};

// 사용자 유형 텍스트 가져오기
export const getUserTypeText = (userType: string): string => {
  const textMapping: { [key: string]: string } = {
    CAREGIVER: '간병인',
    VOLUNTEER: '자원봉사자',
    CARE_WORKER: '요양보호사',
  };
  return textMapping[userType] || '정보 없음';
};
