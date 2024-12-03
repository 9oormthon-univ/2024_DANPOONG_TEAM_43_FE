import React, { useState } from 'react';
import { useGuestbookByTabQuery } from 'service/guestbook';
import { postGuestbookEntry } from 'service/guestbook';
import MemoriesMy from 'components/mypage/MemoriesMy';
import leftButtonIcon from '../assets/img/sign/sign-left-btn.svg';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'utils/dateUtils';

const Memory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');
  const [textInputs, setTextInputs] = useState<{ [key: number]: string }>({}); 
  const { data: guestbookData, isLoading, isError, refetch } = useGuestbookByTabQuery(activeTab);

  const handlePostGuestbook = async (id: number) => {
    const content = textInputs[id];
    if (!content) return;

    try {
      await postGuestbookEntry(id, content);
      window.alert('방명록을 작성했습니다!');
      refetch();
      setTextInputs((prev) => ({ ...prev, [id]: '' })); 
    } catch (error) {
      console.error('방명록 작성 중 오류가 발생했습니다:', error);
      window.alert('방명록 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-[440px] min-w-[340px] w-full mx-auto text-center min-h-[calc(100dvh-140px)] h-screen flex flex-col bg-[#f7f8f9]">
      <div className="flex flex-col h-full overflow-y-auto ">
      <div className="relative w-[90%] mx-auto flex items-center justify-center my-6">
        <img
          src={leftButtonIcon}
          alt="Back"
          className="absolute left-0 w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">함께 한 추억</div>
      </div>
        <div className="flex w-[90%] mx-auto justify-start items-center space-x-3 mb-4">
        {['전체', '내 집', '이웃의 집'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab
                ? 'bg-[#ff6b6b] text-white border-transparent'
                : 'bg-[#fff1f1] text-[#ff6b6b] border border-[#ff6b6b]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

        <div className="flex-1 space-y-4 w-full mx-auto ">
          {isLoading ? (
            <div></div>
          ) : isError ? (
            <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
          ) : guestbookData?.length === 0 ? (
            <div>함께 한 추억이 아직 없습니다!</div>
          ) : (
            guestbookData?.map((entry) => {
              if (entry.content === null) {
                return (
                  <div key={entry.sectionId} className="space-y-2 bg-white w-full">
                    <div className="w-[90%] mx-auto py-6">
                      <div className="flex justify-between items-center">
                        <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">{entry.home}</div>
                        <div className="px-2 py-1.5 bg-[#f7f8f9] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
                          <div className="justify-start items-center gap-1 inline-flex">
                            <div className="text-right text-[#ff6b6b] text-sm font-medium font-['Pretendard'] leading-[21px]">{formatDate(entry.careDate)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug text-left mt-[20px] mb-[12px]">{entry.writer}</div>
                      <div className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-md">
                        <textarea
                          className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm text-[#2a2e37] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] mr-4 min-w-0"
                          placeholder={`아직 방명록을 작성하지 않았어요\n소중한 후기를 남겨보세요`}
                          value={textInputs[entry.sectionId] || ''}
                          onChange={(e) =>
                            setTextInputs((prev) => ({ ...prev, [entry.sectionId]: e.target.value }))
                          }
                        />
                        <button
                          className={`w-24 px-4 py-2 rounded-lg text-sm font-medium shrink-0 ${
                            textInputs[entry.sectionId]
                              ? 'bg-[#ff6b6b] text-white cursor-pointer'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={() => handlePostGuestbook(entry.sectionId)}
                          disabled={!textInputs[entry.sectionId]}
                        >
                          작성하기
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={entry.sectionId} className="w-full space-y-2 bg-white">
                  <div className="w-[90%] mx-auto py-6">
                    <div className="flex justify-between items-center">
                      <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">{entry.home}</div>
                      <div className="px-2 py-1.5 bg-[#f7f8f9] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-start items-center gap-1 inline-flex">
                          <div className="text-right text-[#ff6b6b] text-sm font-medium font-['Pretendard'] leading-[21px]">{formatDate(entry.careDate)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#575f70] text-base font-semibold font-['Pretendard'] leading-snug text-left mt-[20px] mb-[12px]">{entry.writer}</div>
  
                    <MemoriesMy entry={entry} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
    );
  };

export default Memory;