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
    issueYear: '',
    issueMonth: '',
    issueDay: '',
    issueDate: '',
    identityFront: '',
    identityBack: ''
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    console.log('Location State:', location.state); 
    if (location.state) {
      const { kakaoId, nickname, phoneNum } = location.state;
      setFormData((prevData) => ({
        ...prevData,
        kakaoId: kakaoId || '',
        username: nickname || '',
        phoneNum: phoneNum?.replace(/-/g, '') || '', 
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
    const identity = `${formData.identityFront}${formData.identityBack}`;
  
    formDataToSubmit.append("registerDTO", JSON.stringify({
      kakaoId: formData.kakaoId,
      userType: formData.userType,
      username: formData.username,
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
      identity 
    }));
  
    if (formData.userType === 'CARE_WORKER' && formData.certificationImage) {
      formDataToSubmit.append("file", formData.certificationImage);
    }

    formDataToSubmit.forEach((value, key) => {
      console.log(`Key: ${key}, Value:`, value);
    });
  
    try {
      const response = await fetch("https://carely-backend.site/register", {
        method: "POST",
        body: formDataToSubmit,
      });
      const result = await response.json();

      console.log(result);
  
      if (result.status === 200) {
        setIsComplete(true);
      } else {
        console.error("회원가입 실패:", result);
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
        return (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step1RoleSelection onSelectRole={handleSelectRole} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      case 2:
        return (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step2BasicInfo formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      case 3:
        return (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step3ContactInfo formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      case 4:
        return (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step4CareInfo role={formData.userType} formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      case 5:
        return (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step5Story formData={formData} setFormData={setFormData} onNext={handleNextStep} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      case 6:
        return formData.userType === 'CARE_WORKER' ? (
          <div className="w-full mx-auto max-w-[440px] min-w-[320px]">
            <Step6Certification
              formData={formData}
              setFormData={setFormData}
              onNext={handleNextStep}
              onBackClick={() => setShowExitModal(true)}
            />
          </div>
        ) : (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step7LocationSharing formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      case 7:
        return (
          <div className="mx-auto max-w-[440px] min-w-[320px] w-[90%]">
            <Step7LocationSharing formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBackClick={() => setShowExitModal(true)} />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
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