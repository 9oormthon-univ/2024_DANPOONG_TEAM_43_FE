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
import talkIcon1 from '../assets/img/map/talk1.svg';
import eatIcon1 from '../assets/img/map/eat1.svg';
import toiletIcon1 from '../assets/img/map/toilet1.svg';
import bathIcon1 from '../assets/img/map/bath1.svg';
import walkIcon1 from '../assets/img/map/walk1.svg';
import talkIcon2 from '../assets/img/map/talk2.svg';
import eatIcon2 from '../assets/img/map/eat2.svg';
import toiletIcon2 from '../assets/img/map/toilet2.svg';
import bathIcon2 from '../assets/img/map/bath2.svg';
import walkIcon2 from '../assets/img/map/walk2.svg';
import talkIcon3 from '../assets/img/map/talk3.svg';
import eatIcon3 from '../assets/img/map/eat3.svg';
import toiletIcon3 from '../assets/img/map/toilet3.svg';
import bathIcon3 from '../assets/img/map/bath3.svg';
import walkIcon3 from '../assets/img/map/walk3.svg';
import backImage1 from '../assets/img/home/back_type1.svg';
import backImage2 from '../assets/img/home/back_type2.svg';
import backImage3 from '../assets/img/home/back_type3.svg';
import backImage1_1 from '../assets/img/mypage/back_type1_1.svg';
import backImage2_1 from '../assets/img/mypage/back_type2_1.svg';
import backImage3_1 from '../assets/img/mypage/back_type3_1.svg';
import bg_img_giver from '../assets/img/group/neighbor_list_giver_bg.svg'
import bg_img_volunteer from '../assets/img/group/neighbor_list_volunteer_bg.svg'
import bg_img_worker from '../assets/img/group/neighbor_list_worker_bg.svg'
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

// 배경 테두리 색상 결정
export const getBackgroundColor2 = (userType: string): string => {
  switch (userType) {
    case 'CAREGIVER':
      return '#ff6b6b';
    case 'VOLUNTEER':
      return '#00AEFF';
    case 'CARE_WORKER':
      return '#20CE86';
    default:
      return '#ffffff';
  }
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

export const getCertificatedBackImage = (userType: string) => {
  switch (userType) {
    case 'CAREGIVER':
      return backImage1;
    case 'VOLUNTEER':
      return backImage2;
    case 'CARE_WORKER':
      return backImage3;
    default:
      return backImage1;
  }
};

export const getBtnColor = (userType: string | undefined): string => {
  switch (userType) {
    case 'CAREGIVER':
      return 'bg-[#ff6b6b]';
    case 'VOLUNTEER':
      return 'bg-[#00aeff]';
    case 'CARE_WORKER':
      return 'bg-[#20ce86]';
    default:
      return 'bg-white';
  }
};

// 아이콘 경로 가져오기 (switch 문 기반)
export const getIconPathBySwitch = (userType: string, icon: string): string => {
  switch (userType) {
    case 'CAREGIVER':
      switch (icon) {
        case 'walk':
          return walkIcon1;
        case 'eat':
          return eatIcon1;
        case 'toilet':
          return toiletIcon1;
        case 'bath':
          return bathIcon1;
        default:
          return talkIcon1;
      }
    case 'VOLUNTEER':
      switch (icon) {
        case 'walk':
          return walkIcon2;
        case 'eat':
          return eatIcon2;
        case 'toilet':
          return toiletIcon2;
        case 'bath':
          return bathIcon2;
        default:
          return talkIcon2;
      }
    case 'CARE_WORKER':
      switch (icon) {
        case 'walk':
          return walkIcon3;
        case 'eat':
          return eatIcon3;
        case 'toilet':
          return toiletIcon3;
        case 'bath':
          return bathIcon3;
        default:
          return talkIcon3;
      }
    default:
      return timeIcon; 
  }
};

export const userTypeConfig = {
  CAREGIVER: {
    label: '간병인',
    color: '#FF6B6B', 
    bgColor: '#FFF1F1', 
    bgImg: bg_img_giver 
  },
  VOLUNTEER: {
    label: '자원봉사자',
    color: '#00AEFF', 
    bgColor: '#EFF9FF', 
    bgImg: bg_img_volunteer 
  },
  CARE_WORKER: {
    label: '요양보호사',
    color: '#20CE86', 
    bgColor: '#EBFEF4',
    bgImg: bg_img_worker 
  }
};

export const getBirthInfoAndAge = (identity: string, age:number) => {
  if (identity.length < 6) return { month: '', day: '', age: '' };

  const month = identity.slice(2, 4);
  const day = identity.slice(4, 6);

  const currentYear = new Date().getFullYear(); 
  const year = currentYear - age + 1;

  return { year, month, day };
};

// 내 방명록 배경 디자인
export const getCertificatedBackImage2 = (userType: string) => {
  switch (userType) {
    case 'CAREGIVER':
      return backImage1_1;
    case 'VOLUNTEER':
      return backImage2_1;
    case 'CARE_WORKER':
      return backImage3_1;
    default:
      return backImage1_1;
  }
};