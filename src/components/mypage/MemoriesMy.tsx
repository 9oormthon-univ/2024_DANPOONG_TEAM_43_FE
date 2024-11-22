import React from 'react';
import { useGuestbookQuery } from 'service/guestbook';
import type1_1 from '../../assets/img/user/type1-1.svg';
import type1_2 from '../../assets/img/user/type1-2.svg';
import type1_3 from '../../assets/img/user/type1-3.svg';
import type1_4 from '../../assets/img/user/type1-4.svg';
import type1_5 from '../../assets/img/user/type1-5.svg';
import type1_6 from '../../assets/img/user/type1-6.svg';
import type1_7 from '../../assets/img/user/type1-7.svg';
import type1_8 from '../../assets/img/user/type1-8.svg';
import type1_9 from '../../assets/img/user/type1-9.svg';
import type1_10 from '../../assets/img/user/type1-10.svg';
import type2_1 from '../../assets/img/user/type2-1.svg';
import type2_2 from '../../assets/img/user/type2-2.svg';
import type2_3 from '../../assets/img/user/type2-3.svg';
import type2_4 from '../../assets/img/user/type2-4.svg';
import type2_5 from '../../assets/img/user/type2-5.svg';
import type2_6 from '../../assets/img/user/type2-6.svg';
import type2_7 from '../../assets/img/user/type2-7.svg';
import type2_8 from '../../assets/img/user/type2-8.svg';
import type2_9 from '../../assets/img/user/type2-9.svg';
import type2_10 from '../../assets/img/user/type2-10.svg';
import type3_1 from '../../assets/img/user/type3-1.svg';
import type3_2 from '../../assets/img/user/type3-2.svg';
import type3_3 from '../../assets/img/user/type3-3.svg';
import type3_4 from '../../assets/img/user/type3-4.svg';
import type3_5 from '../../assets/img/user/type3-5.svg';
import type3_6 from '../../assets/img/user/type3-6.svg';
import type3_7 from '../../assets/img/user/type3-7.svg';
import type3_8 from '../../assets/img/user/type3-8.svg';
import type3_9 from '../../assets/img/user/type3-9.svg';
import type3_10 from '../../assets/img/user/type3-10.svg';
import certificatedBackImage1 from '../../assets/img/mypage/certificatedBackImage1.svg';
import certificatedBackImage2 from '../../assets/img/mypage/certificatedBackImage2.svg';
import certificatedBackImage3 from '../../assets/img/sign/certificate-back.svg';
import certificatedBackImg1 from '../../assets/img/mypage/type1.svg';
import certificatedBackImg2 from '../../assets/img/mypage/type2.svg';
import certificatedBackImg3 from '../../assets/img/mypage/type3.svg';
import { GuestbookEntry } from 'type/guestbook';

const imageMapping: { [key: string]: string[] } = {
  CAREGIVER: [type1_1, type1_2, type1_3, type1_4, type1_5, type1_6, type1_7, type1_8, type1_9, type1_10],
  CARE_WORKER: [type2_1, type2_2, type2_3, type2_4, type2_5, type2_6, type2_7, type2_8, type2_9, type2_10],
  VOLUNTEER: [type3_1, type3_2, type3_3, type3_4, type3_5, type3_6, type3_7, type3_8, type3_9, type3_10],
};

interface MemoriesProps {
  entry: GuestbookEntry;
}

const MemoriesMy: React.FC<MemoriesProps> = ({ entry }) => {
    const getUserTypeText = (userType: string) => {
      switch (userType) {
        case 'CAREGIVER':
          return '간병인';
        case 'VOLUNTEER':
          return '자원봉사자';
        case 'CARE_WORKER':
          return '요양보호사';
        default:
          return '';
      }
    };
  
    const getCertificatedBackImage = (userType: string) => {
      switch (userType) {
        case 'CAREGIVER':
          return certificatedBackImg1;
        case 'VOLUNTEER':
          return certificatedBackImg2;
        case 'CARE_WORKER':
          return certificatedBackImg3;
        default:
          return certificatedBackImg1;
      }
    };
  
    const getBackgroundColor = (userType: string) => {
      switch (userType) {
        case 'CAREGIVER':
          return 'bg-[#fff1f1]';
        case 'VOLUNTEER':
          return 'bg-[#eff9ff]';
        case 'CARE_WORKER':
          return 'bg-[#ebfef4]';
        default:
          return 'bg-gray-100';
      }
    };
  
    const getBorderColor = (userType: string): string => {
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
  
    return (
        <div
        className={`relative flex p-4 rounded-lg shadow-md ${getBackgroundColor(entry.userType)} items-start`}
      >
        <img
                src={getCertificatedBackImage(entry.userType)}
                alt="backImage"
                className="absolute bottom-0 right-0 h-auto z-[50]"
                style={{
                  width: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'right',
                }}
              />
        <div
          className="flex-shrink-0 items-center rounded-full justify-center inline-flex mr-3"
          style={{
            border: `2px solid ${getBorderColor(entry.userType)}`,
            width: '60px',
            height: '60px',
          }}
        >
          <img
            src={imageMapping[entry.userType][entry.userId % 10 || entry.sectionId % 10]}
            alt="user"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      
        <div className="flex flex-col flex-1 space-y-2 text-left">
          <div className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug">
            {getUserTypeText(entry.userType)} {entry.profileName}님
          </div>
          <div className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-normal break-words z-[50]">
            {entry.content}
          </div>
        </div>
      </div>
    );
  };
  
  export default MemoriesMy;