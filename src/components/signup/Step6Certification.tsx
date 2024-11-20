import React, { useState } from 'react';
import defaultImage from '../../assets/img/sign/sign-default-img.svg';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar3.svg';
import ExitConfirmationModal from './ExitConfirmationModal';
import NoCertificateModal from './NoCertificateModal';

interface Step6Props {
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onNext: () => void;
}

const Step6Certification: React.FC<Step6Props> = ({ formData, setFormData, onNext, onBackClick }) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNoCertificateModal, setShowNoCertificateModal] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, certificationImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isNextEnabled = formData.certificationImage;

  return (
    <div className="w-full flex flex-col items-center justify-between h-[calc(100dvh)]">
      <div className="relative w-full flex items-center justify-center my-6">
        <img
          src={leftButtonIcon}
          alt="Back"
          className="absolute left-0 w-6 h-6 cursor-pointer"
          onClick={() => setShowExitModal(true)}
        />
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">회원가입</div>
      </div>
      <img src={progressBar} alt="Progress Bar" className="w-full mb-8" />
      <div className="w-full">
        <h2 className="text-xl font-semibold text-[#333] mb-2">요양보호사 자격증 인증</h2>
        <p className="text-sm text-gray-500 mb-6">가지고 계신 요양보호사 자격증을 사진찍어 첨부해 주세요</p>
        <label className="block w-full h-40 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview ? (
            <img src={preview as string} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <img src={defaultImage} alt="Default" className="w-full h-full object-cover" />
          )}
        </label>
        <p className="text-[#575f70] text-xs font-semibold font-['Pretendard'] leading-[18px] mt-4">*유의사항</p>
        <p className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-[18px] mt-1">서류 이외의 다른 것들이 나오지 않게 조심해 주세요.</p>
        <p className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-[18px] mt-1">글자가 희미하게 보일 경우, 사업자 등록이 어려울 수 있어요.</p>
      </div>
      <div className="w-full mt-auto mb-6">
        <button className="text-center w-full text-sm font-medium text-[#565e70] underline mb-4" onClick={() => setShowNoCertificateModal(true)}>
          아직 자격증이 없어요
        </button>
        <button
          onClick={onNext}
          disabled={!isNextEnabled}
          className={`w-full h-14 rounded-lg ${isNextEnabled ? 'bg-[#ff6b6b]' : 'bg-gray-200'} text-white font-semibold text-lg`}
        >
          인증하기
        </button>
      </div>
      {showExitModal && (
        <ExitConfirmationModal
          onConfirm={onBackClick} 
          onCancel={() => setShowExitModal(false)}
        />
      )}
      {showNoCertificateModal && (
        <NoCertificateModal
          onConfirm={onNext} 
          onCancel={() => setShowNoCertificateModal(false)} 
        />
      )}
    </div>
  );
};

export default Step6Certification;