import React from 'react';
import { useGuestbookQuery } from 'service/guestbook';
import { useNavigate } from 'react-router-dom';
import { getUserTypeText, getCertificatedBackImage, getBackgroundColor, getBackgroundColor2, imageMapping } from 'utils/userUtils';

const Memories: React.FC = () => {
  const { data, isLoading, isError } = useGuestbookQuery();
  const navigate = useNavigate();

  const validEntries = data?.filter((entry) => entry.content !== null).slice(0, 2);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
          함께 한 추억
        </div>
        <div
          className="text-[#575f70] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer"
          onClick={() => navigate('/Memory')}
        >
          더보기
        </div>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div></div>
        ) : isError || !validEntries || validEntries.length === 0 ? (
          <div>함께 한 추억이 아직 없습니다!</div>
        ) : (
          validEntries.map((entry) => (
            <div
              key={entry.userId || entry.sectionId}
              className={`relative flex p-4 rounded-lg shadow-md ${getBackgroundColor(entry.userType)}`}
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
                className="items-center rounded-full justify-center inline-flex mr-3 flex-shrink-0"
                style={{
                  border: `2px solid ${getBackgroundColor2(entry.userType)}`,
                  width: '60px',
                  height: '60px',
                }}
              >
                <img
                  src={imageMapping[entry.userType][entry.userId % 10 || entry.sectionId]}
                  alt="user"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col space-y-2 text-left ml-3">
                <div
                  className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug"
                >
                  {getUserTypeText(entry.userType)} {entry.profileName}님
                </div>
                <div
                  className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-none line-clamp-2 overflow-hidden z-[100]"
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
};

export default Memories;