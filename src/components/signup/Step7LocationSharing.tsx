import React, { useState } from 'react';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar4.svg';
import mapImage from '../../assets/img/sign/sign-map.svg';
import ExitConfirmationModal from './ExitConfirmationModal';

interface Step7Props {
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onSubmit: () => void;
}

const Step7LocationSharing: React.FC<Step7Props> = ({ formData, setFormData, onBackClick, onSubmit }) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const isNextEnabled = formData.shareLocation !== null;

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
        <h2 className="text-xl font-semibold text-[#333] mb-2">내 정보를 이웃에게 공유할까요?</h2>
        <p className="text-sm text-gray-500 mb-6">다른 이웃에게 내 이름, 나이 정보가 지도에 공유되어요!</p>
        
        <div className="mb-6">
          <label className="flex items-center mb-4 cursor-pointer">
            <span
              className={`w-6 h-6 rounded-full border-2 ${
                formData.shareLocation === true ? 'border-[#ff6b6b]' : 'border-gray-400'
              } mr-2 flex items-center justify-center`}
            >
              {formData.shareLocation === true && <span className="w-3 h-3 bg-[#ff6b6b] rounded-full"></span>}
            </span>
            <input
              type="radio"
              name="shareLocation"
              value="true"
              checked={formData.shareLocation === true}
              onChange={() => setFormData({ ...formData, shareLocation: true })}
              className="hidden"
            />
            <span className="text-gray-800 font-medium">네 좋아요!</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <span
              className={`w-6 h-6 rounded-full border-2 ${
                formData.shareLocation === false ? 'border-[#ff6b6b]' : 'border-gray-400'
              } mr-2 flex items-center justify-center`}
            >
              {formData.shareLocation === false && <span className="w-3 h-3 bg-[#ff6b6b] rounded-full"></span>}
            </span>
            <input
              type="radio"
              name="shareLocation"
              value="false"
              checked={formData.shareLocation === false}
              onChange={() => setFormData({ ...formData, shareLocation: false })}
              className="hidden"
            />
            <span className="text-gray-800 font-medium">나중에 할게요</span>
          </label>
        </div>

        <div className="w-full mb-4">
          <p className="text-sm text-gray-500 mb-2">예시 화면</p>
          <img src={mapImage} alt="예시 지도 화면" className="w-full h-40 object-cover rounded-lg border border-gray-300" />
        </div>
        
        <p className="text-center text-sm text-gray-400 mb-6">나중에 바꿀 수 있어요!</p>
      </div>
      
      <div className="w-full mt-auto mb-6">
        <button
          onClick={onSubmit}
          disabled={!isNextEnabled}
          className={`w-full h-[52px] rounded-lg ${isNextEnabled ? 'bg-[#ff6b6b]' : 'bg-[#d4d7de]'} text-white font-semibold text-base font-['Pretendard'] leading-snug`}
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

export default Step7LocationSharing;