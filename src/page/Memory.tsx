import React, { useState } from 'react';
import { postGuestbookEntry, useGuestbookQuery } from 'service/guestbook';
import leftButtonIcon from '../assets/img/sign/sign-left-btn.svg';
import { useNavigate } from 'react-router-dom';
import {
  getBackgroundColor,
  getBackgroundColor2,
  getCertificatedBackImage,
  getCertificatedBackImage2,
  getUserTypeText,
  imageMapping,
} from 'utils/userUtils';

const Memory: React.FC = () => {
  const navigate = useNavigate();
  const [textInputs, setTextInputs] = useState<{ [key: number]: string }>({});
  const { data: guestbookData, isLoading, isError, refetch } = useGuestbookQuery();

  const handleInputChange = (id: number, value: string) => {
    setTextInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handlePostGuestbook = async (sessionId: number) => {
    const content = textInputs[sessionId];
    if (!content) return;
  
    try {
      const response = await postGuestbookEntry(sessionId, content);
      if (response?.status === 200) {
        const { code, message } = response?.data;
        if (code === "SUCCESS_CREATE_GUESTBOOK") {
          window.alert(message);
          await refetch();
          setTextInputs((prev) => ({ ...prev, [sessionId]: '' }));
        } else {
          throw new Error(message || 'Unknown error');
        }
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('방명록 작성 중 오류가 발생했습니다:', error);
      window.alert('방명록 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-[440px] min-w-[340px] w-full mx-auto text-center min-h-[calc(100dvh-140px)] h-screen flex flex-col bg-[#f7f8f9]">
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="relative w-[90%] mx-auto flex items-center justify-center my-6">
          <img
            src={leftButtonIcon}
            alt="Back"
            className="absolute left-0 w-6 h-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">
            함께 한 추억
          </div>
        </div>

        <div className="flex-1 space-y-4 w-full mx-auto">
          {isLoading ? (
            null
          ) : isError || !guestbookData || guestbookData.length === 0 ? (
            <div>함께 한 추억이 아직 없습니다!</div>
          ) : (
            guestbookData.map((entry) => (
              <div key={Number(entry.volunteerSessionId)} className="w-[90%] mx-auto mb-6 rounded-lg shadow-md overflow-hidden">
                <div
                  className={`relative flex items-center p-4 ${getBackgroundColor(entry.otherType.userType)}`}
                  style={{
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    minHeight: '100px', 
                  }}
                >
                  <div
                    className="flex-shrink-0 items-center rounded-full justify-center inline-flex mr-3"
                    style={{
                      border: `2px solid ${getBackgroundColor2(entry.otherType.userType)}`,
                      width: '60px',
                      height: '60px',
                    }}
                  >
                    <img
                      src={imageMapping[entry.otherType.userType][entry.otherType.userId % 10]}
                      alt="Other User"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 z-[9999] text-left">
                    <div className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug">
                      {getUserTypeText(entry.otherType.userType)} {entry.otherType.username}님
                    </div>
                    <div
                      className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-normal mt-[5px] overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2, 
                      }}
                    >
                      {entry.otherType.content || '아직 방명록을 작성하지 않았습니다.'}
                    </div>
                  </div>
                  <img
                    src={getCertificatedBackImage(entry.otherType.userType)}
                    alt="Background"
                    className="absolute bottom-0 right-[10px] h-[70px] z-[50]"
                    style={{ width: 'auto', objectFit: 'cover', objectPosition: 'right' }}
                  />
                </div>
                <div
                  className={`relative flex items-center p-4 ${getBackgroundColor(entry.caregiver.userType)}`}
                  style={{
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px',
                    minHeight: '100px', 
                  }}
                >
                  <img
                    src={getCertificatedBackImage2(entry.caregiver.userType)}
                    alt="Background"
                    className="absolute top-0 left-[10px] h-[70px] z-[50]"
                    style={{ width: 'auto', objectFit: 'cover', objectPosition: 'left' }}
                  />
                  {entry.caregiver.content ? (
                    <div className="flex flex-1 flex-col text-left relative z-[9999] pr-[80px]">
                      <div className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug">
                        내가 남긴 방명록
                      </div>
                      <div
                        className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-normal mt-[5px] overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {entry.caregiver.content}
                      </div>
                      <div
                        className="absolute top-[50%] right-[0px] transform -translate-y-1/2 flex-shrink-0 items-center rounded-full justify-center inline-flex"
                        style={{
                          border: `2px solid ${getBackgroundColor2(entry.caregiver.userType)}`,
                          width: '60px',
                          height: '60px',
                        }}
                      >
                        <img
                          src={imageMapping[entry.caregiver.userType][entry.caregiver.userId % 10]}
                          alt="User Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-between relative z-[9999]">
                      <textarea
                        className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm text-[#2a2e37] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] mr-4"
                        placeholder="아직 방명록을 작성하지 않았어요.\n소중한 후기를 남겨보세요!"
                        value={textInputs[Number(entry.volunteerSessionId)] || ''}
                        onChange={(e) =>
                          handleInputChange(Number(entry.volunteerSessionId), e.target.value)
                        }
                        style={{
                          whiteSpace: 'pre-wrap',
                        }}
                      />
                      <button
                        className={`w-16 px-4 py-2 rounded-lg text-sm font-medium ${
                          textInputs[Number(entry.volunteerSessionId)]
                            ? 'bg-[#ff6b6b] text-white cursor-pointer'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => handlePostGuestbook(Number(entry.volunteerSessionId))}
                        disabled={!textInputs[Number(entry.volunteerSessionId)]}
                      >
                        작성
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Memory;