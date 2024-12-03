import React from 'react';
import skeletonImage1 from '../../assets/img/home/user1.svg';
import skeletonImage2 from '../../assets/img/home/user2.svg';
import certificatedIcon from '../../assets/img/home/certificated-caregiver.svg';
import timeIcon from '../../assets/img/map/time.svg';

const SkeletonCard: React.FC<{ idx: number }> = ({ idx }) => (
  <div className="w-[125px] h-[163px] relative bg-white rounded-lg flex-col justify-start items-start inline-flex shrink-0 blur-sm">
    <div className="items-center w-full mx-auto text-center mt-[10px]">
      <div className="items-center bg-[#ebfef4] rounded-full justify-center items-center inline-flex">
        <img
          src={idx % 2 === 0 ? skeletonImage1 : skeletonImage2}
          alt={`skeletonImage${idx}`}
          className="w-[64px] h-[64px] rounded-full object-cover"
        />
      </div>
    </div>
    <div className="mx-auto text-center">
      <div className="text-[#2a2e37] text-base font-semibold font-['Pretendard'] leading-snug mb-[6px]">
        {idx % 2 === 0 ? '이규민님' : '이상덕님'}
      </div>
      <div className="text-[#a6acba] text-xs font-medium font-['Pretendard'] leading-none">
        {idx % 2 === 0 ? '3km' : '4km'}
      </div>
    </div>
    <div className="mx-auto bg-[#ebfef4] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex mt-[6px] px-2 py-1">
      <div className="justify-start items-center gap-1 inline-flex">
        <img
          src={idx % 2 === 0 ? certificatedIcon : timeIcon}
          alt={`icon${idx}`}
          className="w-[14px] h-[14px]"
        />
        <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
          {idx % 2 === 0 ? '인증 요양보호사' : '함께한 22시간'}
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;