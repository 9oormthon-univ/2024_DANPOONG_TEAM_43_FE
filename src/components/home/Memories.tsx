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

const imageMapping: { [key: string]: string[] } = {
  CAREGIVER: [type1_1, type1_2, type1_3, type1_4, type1_5, type1_6, type1_7, type1_8, type1_9, type1_10],
  CARE_WORKER: [type2_1, type2_2, type2_3, type2_4, type2_5, type2_6, type2_7, type2_8, type2_9, type2_10],
  VOLUNTEER: [type3_1, type3_2, type3_3, type3_4, type3_5, type3_6, type3_7, type3_8, type3_9, type3_10],
};

const Memories: React.FC = () => {
  const { data, isLoading, isError } = useGuestbookQuery();

  const topTwoEntries = data?.slice(0, 2);

  const getCertificatedBackImage = (userType: string) => {
    switch (userType) {
      case 'CAREGIVER':
        return certificatedBackImage1;
      case 'VOLUNTEER':
        return certificatedBackImage2;
      case 'CARE_WORKER':
        return certificatedBackImage3;
      default:
        return certificatedBackImage1;
    }
  };

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

    const getBackgroundColor2 = (userType: string): string => {
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
      <div className="mt-6">
        <div className="flex justify-between items-center mb-[16px]">
          <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
            함께 한 추억
          </div>
          <div className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer">
            더보기
          </div>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div>null</div>
          ) : isError || !topTwoEntries ? (
            <div>방명록 데이터를 불러오는 중 오류가 발생했습니다.</div>
          ) : (
            topTwoEntries.map((entry) => (
              <div
                key={entry.sectionId}
                className={`flex p-4 rounded-lg shadow-md ${getBackgroundColor(
                  entry.caregiverAge ? 'CARE_WORKER' : 'VOLUNTEER'
                )}`}
              >
                <div
                  className="items-center rounded-full justify-center items-center inline-flex mr-3"
                  style={{
                    border: `2px solid ${getBackgroundColor2(
                      entry.caregiverAge ? 'CARE_WORKER' : 'VOLUNTEER'
                    )}`,
                  }}
                >
                  <img
                    src={
                      imageMapping[
                        entry.caregiverAge ? 'CARE_WORKER' : 'VOLUNTEER'
                      ][entry.sectionId % 10]
                    }
                    alt="user"
                    className="w-[60px] h-[60px] rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <div
                    className="text-lg font-semibold text-[#2a2e37] line-clamp-2 overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {getUserTypeText(
                      entry.caregiverAge ? 'CARE_WORKER' : 'VOLUNTEER'
                    )}{' '}
                    {entry.caregiverAge
                      ? `${entry.caregiverName}님`
                      : `${entry.volunteerName}님`}
                  </div>
                  <div
                    className="text-sm text-[#575f70] mt-1 line-clamp-2 overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {entry.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

export default Memories;