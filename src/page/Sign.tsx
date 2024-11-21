import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Step1RoleSelection from '../components/signup/Step1RoleSelection';
import Step2BasicInfo from '../components/signup/Step2UserInfo';
import Step3ContactInfo from '../components/signup/Step3ContactInfo';
import Step4CareInfo from '../components/signup/Step4CareInfo';
import Step5Story from '../components/signup/Step5Story';
import Step6Certification from 'components/signup/Step6Certification';
import Step7LocationSharing from 'components/signup/Step7LocationSharing';
import CompletionScreen from '../components/signup/CompletionScreen';
import ExitConfirmationModal from 'components/signup/ExitConfirmationModal';

const Sign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showExitModal, setShowExitModal] = useState(false); 
  const [formData, setFormData] = useState({
    kakaoId: '',
    userType: '', 
    username: '', 
    age: '',
    phoneNum: '',
    address: '',
    detailAddress: '',
    talk: '',
    eat: '',
    toilet: '',
    bath: '',
    walk: '',
    story: '',
    shareLocation: false,
    certificationImage: null,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { kakaoId, nickname } = location.state;
      setFormData((prevData) => ({
        ...prevData,
        kakaoId: kakaoId || '',
        username: nickname || '',
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const handlePopState = () => {
      setShowExitModal(true);
    };
    
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSelectRole = (role: string) => {
    setFormData((prevData) => ({ ...prevData, userType: role }));
    handleNextStep();
  };

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("registerDTO", JSON.stringify({
      kakaoId: formData.kakaoId,
      userType: formData.userType,
      username: formData.username,
      age: formData.age,
      phoneNum: formData.phoneNum,
      address: formData.address,
      detailAddress: formData.detailAddress,
      talk: formData.talk,
      eat: formData.eat,
      toilet: formData.toilet,
      bath: formData.bath,
      walk: formData.walk,
      story: formData.story,
      shareLocation: formData.shareLocation,
    }));

    if (formData.userType === 'CARE_WORKER' && formData.certificationImage) {
      formDataToSubmit.append("image", formData.certificationImage);
    }

    try {
      const response = await fetch("http://54.180.171.247:8080/register", {
        method: "POST",
        body: formDataToSubmit,
      });
      const result = await response.json();

      if (result.status === 200 && result.code === "SUCCESS_REGISTER") {
        setIsComplete(true);
      } else {
        console.error("회원가입 실패:", result.message);
      }
    } catch (error) {
      console.error("폼 전송 오류:", error);
    }
  };

  const renderStepContent = () => {
    if (isComplete) {
      return (
        <div className="w-full mx-auto max-w-[440px] min-w-[320px]">
          <CompletionScreen />
        </div>
      );
    }
  
    switch (step) {
      case 1:
        return <Step1RoleSelection onSelectRole={handleSelectRole} onBackClick={() => setShowExitModal(true)} />;
      case 2:
        return <Step2BasicInfo formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />;
      case 3:
        return <Step3ContactInfo formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />;
      case 4:
        return <Step4CareInfo role={formData.userType} formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />;
      case 5:
        return <Step5Story formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />;
      case 6:
        return formData.userType === 'CARE_WORKER' ? (
          <Step6Certification formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />
        ) : (
          <Step7LocationSharing formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBackClick={() => setShowExitModal(true)} />
        );
      case 7:
        return <Step7LocationSharing formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBackClick={() => setShowExitModal(true)} />;
      default:
        return null;
    }
  };

  const containerClass = isComplete
    ? "w-full mx-auto max-w-[440px] min-w-[320px]" 
    : "mx-auto max-w-[440px] min-w-[320px] w-[90%]";
  
  return (
    <div className={containerClass}>
      {renderStepContent()}
      {showExitModal && (
        <ExitConfirmationModal
          onConfirm={() => navigate('/login')} 
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
};

export default Sign;