import React from 'react';

interface NoCertificateModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const NoCertificateModal: React.FC<NoCertificateModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg text-center w-80">
        <div className="text-center text-[#2a2e37] text-base font-bold font-['Pretendard'] leading-snug">
          아직 자격증이 없으신가요?
        </div>
        <div className="text-center text-[#575f70] text-sm font-normal font-['Pretendard'] leading-tight my-[18px]">
          자격증이 없는 경우 <br />
          자원봉사자로 활동 할 수 있어요
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            className="w-full px-[14px] py-[12px] bg-[#fff1f1] text-[#ff6b6b] rounded-lg text-base font-semibold font-['Pretendard'] leading-snug"
            onClick={onCancel}
          >
            다음에 할래요
          </button>
          <button
            className="w-full px-[24px] py-[12px] bg-[#ff6b6b] text-white rounded-lg text-base font-semibold font-['Pretendard'] leading-snug"
            onClick={onConfirm}
          >
            네!
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoCertificateModal;