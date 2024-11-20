import React, { useState } from 'react';
import caregiverIcon from '../../assets/img/sign/sign-image1.svg';
import volunteerIcon from '../../assets/img/sign/sign-image2.svg';
import traineeIcon from '../../assets/img/sign/sign-image3.svg';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar1.svg';
import ExitConfirmationModal from './ExitConfirmationModal';

interface Step1Props {
  onSelectRole: (role: string) => void;
  onBackClick: () => void;
}

const Step1RoleSelection: React.FC<Step1Props> = ({ onSelectRole, onBackClick }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false); 

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
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
      <div className="text-[#2a2e37] text-xl font-semibold mb-6 w-full text-left">본인을 선택하세요</div>
      <div className="space-y-4 w-full">
        <div
          onClick={() => handleRoleClick('CAREGIVER')}
          className={`flex items-center p-4 rounded-lg border ${selectedRole === 'CAREGIVER' ? 'border-[#ff6b6b] bg-[#ffe5e5]' : 'border-gray-200 bg-white'} cursor-pointer`}
        >
          <img src={caregiverIcon} alt="Caregiver" className="w-12 h-12 mr-4" />
          <span className="text-base text-gray-800">간병인</span>
        </div>
        <div
          onClick={() => handleRoleClick('VOLUNTEER')}
          className={`flex items-center p-4 rounded-lg border ${selectedRole === 'VOLUNTEER' ? 'border-[#067dfd] bg-[#eef7ff]' : 'border-gray-200 bg-white'} cursor-pointer`}
        >
          <img src={volunteerIcon} alt="Volunteer" className="w-12 h-12 mr-4" />
          <span className="text-base text-gray-800">자원봉사자</span>
        </div>
        <div
          onClick={() => handleRoleClick('CARE_WORKER')}
          className={`flex items-center p-4 rounded-lg border ${selectedRole === 'CARE_WORKER' ? 'border-[#0cd380] bg-[#d8fbed]' : 'border-gray-200 bg-white'} cursor-pointer`}
        >
          <img src={traineeIcon} alt="CARE_WORKER" className="w-12 h-12 mr-4" />
          <span className="text-base text-gray-800">예비요양보호사</span>
        </div>
      </div>
      <div className="w-full mt-auto mb-6 space-y-2">
        <button
          onClick={() => selectedRole && onSelectRole(selectedRole)}
          disabled={!selectedRole}
          className={`w-full h-14 rounded-lg ${selectedRole ? 'bg-[#ff6b6b]' : 'bg-gray-200'} text-white font-semibold text-lg`}
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

export default Step1RoleSelection;