import React, { useState } from 'react';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar3.svg';
import ExitConfirmationModal from './ExitConfirmationModal';
import NoStoryModal from './NoStoryModal';

interface Step5Props {
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onNext: () => void;
}

const Step5Story: React.FC<Step5Props> = ({ formData, setFormData, onNext, onBackClick }) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNoStoryModal, setShowNoStoryModal] = useState(false); 
  const isNextEnabled = formData.story.length > 0;

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
        <h2 className="text-xl font-semibold text-[#333] mb-2">나의 이야기를 들려주세요</h2>
        <p className="text-sm text-gray-500 mb-6">다른 이웃에게 이야기가 보여져요</p>
        <label className="text-gray-700 mb-2 block">나의 이야기</label>
        <textarea
          placeholder="편하게 나의 이야기를 들려주세요! (1,000자 이내)"
          value={formData.story}
          onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          className="w-full h-48 p-4 resize-none placeholder-gray-400"
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '10px',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#ff6b6b')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
          maxLength={1000}
        />
        <p className="text-right text-sm text-gray-400 mt-2">{formData.story.length}/1000</p>
      </div>
      <div className="w-full mt-auto mb-6">
        <button
          className="text-center w-full text-sm font-medium text-[#565e70] underline mb-4"
          onClick={() => setShowNoStoryModal(true)}
        >
          나중에 할래요
        </button>
        <button
          onClick={onNext}
          disabled={!isNextEnabled}
          className={`w-full h-14 rounded-lg ${isNextEnabled ? 'bg-[#ff6b6b]' : 'bg-gray-200'} text-white font-semibold text-lg`}
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
      {showNoStoryModal && (
        <NoStoryModal
          onConfirm={onNext}
          onCancel={() => setShowNoStoryModal(false)}
        />
      )}
    </div>
  );
};

export default Step5Story;