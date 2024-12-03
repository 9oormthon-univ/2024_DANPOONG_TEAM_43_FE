import React from 'react';
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';
import AI_icon from '../../assets/img/home/AI_icon.svg';

interface MockDataProps {
  username: string;
}

const MockData: React.FC<MockDataProps> = ({ username }) => (
  <div className="Connect_AI blur-sm">
    <div className="mt-[36px] mb-[24px]">
      <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
        안녕하세요 {username}님,<br />
        {username}님과의 인연이 기다리고 있어요
      </div>
    </div>
    <div className="outbox">
      <div className="top">
        <div
          className="flex items-center justify-center rounded-full border-2"
          style={{
            border: `2px solid ${getBackgroundColor2('CAREGIVER')}`,
            minWidth: '64px',
            minHeight: '64px',
            maxWidth: '64px',
            maxHeight: '64px',
          }}
        >
          <img
            src={getUserImage(1, 'CAREGIVER')}
            alt="default user"
            className="w-[60px] h-[60px] object-cover rounded-full"
          />
        </div>
        <div className="text">
          <p className="top_title">정지오님과의 약속</p>
          <p className="when">2024년 11월 25일 08:20</p>
        </div>
      </div>
      <div className="middle">
        <img src={AI_icon} alt="AI Icon" className="AI_img" />
        <p className="AI_info">정지오님의 간병 정보를 요약해 드려요</p>
      </div>
      <p className="AI_text line-clamp-2 min-h-[44px]"></p>
    </div>
  </div>
);

export default MockData;