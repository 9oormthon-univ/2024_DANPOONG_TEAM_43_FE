import React from 'react';

interface ExitConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
      <div className="bg-white p-6 rounded-lg text-center w-80">
        <div className="text-center text-[#2a2e37] text-base font-bold font-['Pretendard'] leading-snug">
          회원가입 취소
        </div>
        <div className="text-center text-[#575f70] text-sm font-normal font-['Pretendard'] leading-tight my-[18px]">
          지금 나가시면 입력 정보가 사라집니다. <br /> 그래도 계속하시겠습니까?
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            className="w-full px-[24px] py-[12px] bg-[#fff1f1] text-[#ff6b6b] rounded-lg text-base font-semibold font-['Pretendard'] leading-snug"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="w-full px-[24px] py-[12px] bg-[#ff6b6b] text-white rounded-lg text-base font-semibold font-['Pretendard'] leading-snug"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;