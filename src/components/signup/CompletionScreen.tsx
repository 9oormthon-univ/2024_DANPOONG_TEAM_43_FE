import React from 'react';
import completeImage from '../../assets/img/sign/sign-complete.svg'; 
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';

const CompletionScreen = () => {
  return (
    <div className="w-full flex flex-col items-center h-[calc(100dvh)]">
      <div className="relative w-[90%] flex items-center justify-center my-6">
        <img src={leftButtonIcon} alt="Back" className="absolute left-0 w-6 h-6 cursor-pointer" />
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">회원가입</div>
      </div>
      <div className="text-center mb-6 w-[90%]">
        <div className="text-[#2a2e37] text-xl font-semibold mb-2 w-full text-left">회원가입이 완료되었어요!</div>
        <div className="text-left">
          <span className="text-[#2a2e37] text-sm font-semibold leading-tight font-['Pretendard']">Carely</span>
          <span className="text-[#575f70] text-sm font-medium leading-tight font-['Pretendard']">와 함께 행복한 간병 생활을 바랄게요!</span>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        <img src={completeImage} alt="Completion Background" className="w-full max-w-[440px] object-contain" />
      </div>
      <div className="w-[90%] mt-6 mb-6">
        <button
          onClick={() => window.location.href = '/login'} 
          className="w-full h-14 bg-[#ff6b6b] text-white font-semibold text-lg rounded-lg"
        >
          로그인 하러가기
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;