import React, { useState } from 'react';
import talkIcon from '../../assets/img/sign/sign-talk.svg';
import eatIcon from '../../assets/img/sign/sign-eat.svg';
import toiletIcon from '../../assets/img/sign/sign-toilet.svg';
import bathIcon from '../../assets/img/sign/sign-bath.svg';
import walkIcon from '../../assets/img/sign/sign-walk.svg';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar2.svg';
import bottomArrowIcon from '../../assets/img/sign/bottom-arrow.svg';
import checkIcon from '../../assets/img/sign/check.svg';
import nonCheckIcon from '../../assets/img/sign/non-check.svg';
import ExitConfirmationModal from './ExitConfirmationModal';

interface Step4Props {
  role: string | null;
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onNext: () => void;
}

const Step4CareInfo: React.FC<Step4Props> = ({ role, formData, setFormData, onNext, onBackClick}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const title = role === 'CAREGIVER' ? "모시는 분에 대해 알려주세요" : "내 간병 능력을 알려주세요";
  const [selectedField, setSelectedField] = useState<keyof typeof options | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState<string | null>(null);

  const options = role === 'CAREGIVER' ? {
    talk: ["수월", "보통", "서투름"],
    eat: ["수월", "보통", "서투름"],
    toilet: ["수월", "보통", "서투름"],
    bath: ["수월", "보통", "서투름"],
    walk: ["수월", "보통", "서투름"],
  } : {
    talk: ["상급", "중급", "하급"],
    eat: ["상급", "중급", "하급"],
    toilet: ["상급", "중급", "하급"],
    bath: ["상급", "중급", "하급"],
    walk: ["상급", "중급", "하급"],
  };

  const fieldLabels: Record<keyof typeof options, string> = {
    talk: "대화",
    eat: "식사",
    toilet: "화장실",
    bath: "목욕",
    walk: "걷기",
  };

  const handleOpenModal = (field: keyof typeof options) => {
    setSelectedField(field);
    setTempSelection(formData[field] || null);
    setIsModalOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setTempSelection(option);
  };

  const handleConfirm = () => {
    if (selectedField) {
      setFormData({ ...formData, [selectedField]: tempSelection }); 
      setIsModalOpen(false);
    }
  };

  const isNextEnabled = Object.keys(options).every((key) => !!formData[key as keyof typeof formData]);

  const renderSelectBox = (label: string, icon: string, valueKey: keyof typeof formData) => (
    <div className="flex items-center gap-4" onClick={() => handleOpenModal(valueKey as keyof typeof options)}>
      <img src={icon} alt={label} className="w-[60px] h-[60px]" />
      <div className="flex flex-col w-full relative">
        <label className="text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <div className="border-b border-gray-300 text-gray-500 w-full pb-1 flex items-center justify-between">
            <span>{formData[valueKey] || "선택해주세요"}</span>
            <img src={bottomArrowIcon} alt="arrow" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

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
      <h2 className="text-[#2a2e37] text-xl font-semibold mb-6 w-full text-left">{title}</h2>
      <div className="w-full flex flex-col gap-6">
        {renderSelectBox("대화", talkIcon, "talk")}
        {renderSelectBox("식사", eatIcon, "eat")}
        {renderSelectBox("화장실", toiletIcon, "toilet")}
        {renderSelectBox("목욕", bathIcon, "bath")}
        {renderSelectBox("걷기", walkIcon, "walk")}
      </div>
      <div className="w-full mt-auto mb-6">
        <button
          onClick={onNext}
          disabled={!isNextEnabled} 
          className={`w-full h-[52px] rounded-lg ${isNextEnabled ? 'bg-[#ff6b6b]' : 'bg-[#d4d7de]'} text-white font-semibold text-base font-['Pretendard'] leading-snug`}
        >
          다음
        </button>
      </div>

      {isModalOpen && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center pb-[20px]" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-[20px] p-6 w-[90%] max-w-[440px] mx-auto" onClick={(e) => e.stopPropagation()}>
          <div className="text-[#2b2b2b] text-xl font-bold font-['Pretendard'] leading-7 mb-[28px]">{selectedField ? fieldLabels[selectedField] : ''}</div>
            <div className="space-y-[24px]">
              {options[selectedField].map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className="flex items-center gap-[10px] cursor-pointer text-[#2a2e37] text-sm font-medium font-['Pretendard'] leading-snug"
                >
                  <img
                    src={tempSelection === option ? checkIcon : nonCheckIcon}
                    alt="check icon"
                    className="w-[18px] h-[18px]"
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleConfirm}
              className="w-full h-14 mt-[28px] bg-[#ff6b6b] text-white rounded-lg"
            >
              확인
            </button>
          </div>
        </div>
      )}
       {showExitModal && (
        <ExitConfirmationModal
          onConfirm={onBackClick} 
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
};

export default Step4CareInfo;