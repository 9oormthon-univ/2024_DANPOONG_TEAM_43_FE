import React, { useState } from 'react';
import defaultImage from '../../assets/img/sign/sign-default-img.svg';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar3.svg';
import progressBar2 from '../../assets/img/sign/progress-bar-certificate.svg';
import certificateLogo from '../../assets/img/sign/certificate-logo.svg';
import ExitConfirmationModal from './ExitConfirmationModal';
import NoCertificateModal from './NoCertificateModal';
import ProfileImage from '../../assets/img/sign/sign-certificate-profile.svg';
import certificatedIcon from '../../assets/img/home/certificated-caregiver.svg';
import certificatedBackImage from '../../assets/img/sign/certificate-back.svg';
import talkIcon3 from '../../assets/img/map/talk3.svg';
import eatIcon3 from '../../assets/img/map/eat3.svg';
import toiletIcon3 from '../../assets/img/map/toilet3.svg';
import bathIcon3 from '../../assets/img/map/bath3.svg';
import walkIcon3 from '../../assets/img/map/walk3.svg';
import { useUploadCertificate } from 'service/certificates';

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
  const [isCompleted, setIsCompleted] = useState(false);
  

  const { mutate: uploadCertificate, status } = useUploadCertificate(
    (data) => {
      console.log('인증 성공:', data);
      setIsCompleted(true); 
    },
    (error) => {
      console.error('인증 실패:', error);
      alert('인증에 실패했습니다. 다시 시도해주세요.');
    }
  );

  const [isTallImage, setIsTallImage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData: any) => ({ ...prevData, certificationImage: file })); 
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const img = new Image();
          img.src = result;
          img.onload = () => {
            if (img.height > img.width * 2) {
              setIsTallImage(true);
            } else {
              setIsTallImage(false);
            }
          };
  
          setPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpload = () => {
    if (formData.certificationImage && formData.username) {
      const uploadData = new FormData();
      uploadData.append('file', formData.certificationImage);
      uploadData.append(
        'ocrCreateDTO',
        JSON.stringify({ username: formData.username })
      );
  
      setIsCompleted(false);
  
      const startTime = Date.now(); 
  
      uploadCertificate(uploadData, {
        onSuccess: () => {
          const elapsed = Date.now() - startTime; 
          const remainingTime = Math.max(2000 - elapsed, 0); 
          setTimeout(() => {
            setIsCompleted(true); 
          }, remainingTime);
        },
        onError: () => {
          alert('인증에 실패했습니다. 다시 시도해주세요.');
          setIsCompleted(false);
        },
      });
    } else {
      alert('필수 정보를 입력해주세요.');
    }
  };
  
  const isNextEnabled =
    !!formData.certificationImage && status !== 'pending'; 

  if (isCompleted) {
    const iconMapping: { [key: string]: string } = {
      talk: talkIcon3,
      eat: eatIcon3,
      toilet: toiletIcon3,
      bath: bathIcon3,
      walk: walkIcon3,
    };

    return (
      <div className="w-full flex flex-col items-center h-[calc(100dvh)]">
        <div className="w-[90%] mx-auto relative flex items-center justify-center my-6">
          <img
            src={leftButtonIcon}
            alt="Back"
            className="absolute left-0 w-6 h-6 cursor-pointer"
            onClick={() => setShowExitModal(true)}
          />
          <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">
            회원가입
          </div>
        </div>
        <img src={progressBar2} alt="Progress Bar" className="w-[90%] mx-auto  mb-8" />
        <div className="w-[90%] mx-auto">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold text-[#333]">인증이 완료되었어요!</h2>
            <img
              src={certificatedIcon}
              alt="certificatedIcon"
              className="w-[16px] h-[16px] ml-2"
            />
          </div>
          <p className="text-sm text-gray-500 mb-6">이제 프로필 뒤에 인증 마크가 표시되어요</p>
          <p className="text-sm text-gray-500 mb-2">예시 화면</p>
          <div className="w-full p-4 bg-[#ebfef4] rounded-lg flex flex-col mb-8 relative">
            <img
              src={certificatedBackImage}
              alt="backImage"
              className="absolute bottom-0 right-0 h-auto z-[100]"
              style={{
                width: 'auto',
                objectFit: 'cover',
                objectPosition: 'right', 
              }}
            />
            <div className="flex items-center mb-2">
              <img
                src={ProfileImage}
                alt="profile"
                className="w-[56px] h-[56px] rounded-full object-cover mr-4"
              />
              <div>
                <div className="h-full flex flex-col space-y-2">
                  <div className="flex items-center mb-2">
                    <div className="text-[#2a2e37] text-base font-semibold font-['Pretendard'] leading-snug">
                      요양보호사 {formData.username || '이름 없음'}님
                    </div>
                    <img
                      src={certificatedIcon}
                      alt="certificatedIcon"
                      className="w-[12px] h-[12px] ml-2"
                    />
                  </div>
                  <div className="w-[114px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex mt-[6px] px-2 py-1">
                    <div className="justify-start items-center gap-1 inline-flex">
                      <img
                        src={certificatedIcon}
                        alt="certificatedIcon"
                        className="w-[16px] h-[16px]"
                      />
                      <div className="text-[#ff6b6b] text-xs font-semibold font-['Pretendard'] leading-[18px]">
                        인증 요양보호사
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-[20px] z-[9999]">
              {['talk', 'eat', 'toilet', 'bath', 'walk'].map((key) => (
                <div key={key} className="flex flex-col items-center">
                  <img
                    src={iconMapping[key]}
                    alt={`${key} icon`}
                    className="w-[52px] h-[52px] mb-1"
                  />
                  <div className="text-[#575f70] text-xs font-medium">
                    {formData[key] || '정보 없음'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto  mt-auto mb-6 space-y-2">
          <button
            onClick={onNext}
            className="w-full h-[52px] rounded-lg bg-[#ff6b6b] text-white font-semibold text-base font-['Pretendard'] leading-snug"
          >
            다음
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-between h-[calc(100dvh)] relative">
      {status === 'pending' && !isCompleted && (
        <div className="absolute h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-w-[440px] ">
          <img src={certificateLogo} alt="Loading Logo" className="w-[217.45px] h-[123.98px]" />
        </div>
      )}
      <div className="relative w-[90%] mx-auto  flex items-center justify-center my-6">
        <img
          src={leftButtonIcon}
          alt="Back"
          className="absolute left-0 w-6 h-6 cursor-pointer"
          onClick={() => setShowExitModal(true)}
        />
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">
          회원가입
        </div>
      </div>
      <img src={progressBar} alt="Progress Bar" className="w-[90%] mx-auto  mb-8" />
          <div className="w-[90%] mx-auto ">
      <h2 className="text-xl font-semibold text-[#333] mb-2">요양보호사 자격증 인증</h2>
      <p className="text-sm text-gray-500 mb-6">
        가지고 계신 요양보호사 자격증을 사진찍어 첨부해 주세요
      </p>
      <label
        className="block w-full rounded-lg flex items-center justify-center cursor-pointer overflow-hidden mb-auto"
        style={{
          height: 'auto',
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <img
            src={typeof preview === "string" ? preview : undefined} 
            alt="Preview"
            className="w-full"
            style={{
              height: 'auto', 
              objectFit: 'contain',
            }}
          />
        ) : (
          <img
            src={defaultImage}
            alt="userCertificateImage"
            className="w-full"
            style={{
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        )}
      </label>
      <p className="text-[#575f70] text-xs font-semibold font-['Pretendard'] leading-[18px] mt-4">
        *유의사항
      </p>
      <p className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-[18px] mt-1">
        서류 이외의 다른 것들이 나오지 않게 조심해 주세요.
      </p>
      <p className="text-[#575f70] text-xs font-normal font-['Pretendard'] leading-[18px] mt-1">
        글자가 희미하게 보일 경우, 사업자 등록이 어려울 수 있어요.
      </p>
    </div>
    <div className="w-[90%] mx-auto  mt-auto mb-6">
      <button
        className="text-center w-full text-sm font-medium text-[#565e70] underline my-4"
        onClick={() => setShowNoCertificateModal(true)}
      >
        아직 자격증이 없어요
      </button>
      <button
        onClick={handleUpload}
        disabled={!isNextEnabled}
        className={`w-full h-[52px] mb-[10px] rounded-lg ${
          isNextEnabled ? 'bg-[#ff6b6b]' : 'bg-[#d4d7de]'
        } text-white font-semibold text-base font-['Pretendard'] leading-snug`}
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