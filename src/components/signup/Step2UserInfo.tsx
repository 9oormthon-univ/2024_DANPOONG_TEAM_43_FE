import React, { useState } from 'react';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar1.svg';
import ExitConfirmationModal from './ExitConfirmationModal';

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onNext: () => void;
}

const Step2BasicInfo: React.FC<Step2Props> = ({ formData, setFormData, onNext, onBackClick}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const handleNext = () => {
    if (formData.username && formData.age) onNext();
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, age: value });
  };

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
      <h2 className="text-[#2a2e37] text-xl font-semibold mb-6 w-full text-left">내 정보를 적어주세요!</h2>
      <div className="flex flex-col gap-6 w-full">
        <div>
          <label className="block text-gray-700 mb-2">이름</label>
          <input
            type="text"
            placeholder="성함을 적어주세요"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full focus:outline-none placeholder-gray-400 pb-2"
            style={{
              borderBottom: '1px solid #d1d5db',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
            onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">나이</label>
          <input
            type="text" 
            placeholder="나이를 입력하세요"
            value={formData.age}
            onChange={handleAgeChange}
            className="w-full focus:outline-none placeholder-gray-400 pb-2"
            style={{
              borderBottom: '1px solid #d1d5db',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
            onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
          />
        </div>
      </div>
      <div className="w-full mt-auto mb-6">
        <button
          onClick={handleNext}
          disabled={!formData.username || !formData.age}
          className={`w-full h-[52px] rounded-lg ${formData.username && formData.age ? 'bg-[#ff6b6b]' : 'bg-[#d4d7de]'} text-white font-semibold text-base font-['Pretendard'] leading-snug`}
        >
          다음
        </button>
      </div>
      {showExitModal && (
        <ExitConfirmationModal
          onConfirm={onBackClick} 
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
};

export default Step2BasicInfo;