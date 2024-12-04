import React, { useState } from 'react';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import progressBar from '../../assets/img/sign/progress-bar1.svg';
import ExitConfirmationModal from './ExitConfirmationModal';
import { connectAPI } from 'service/connect';
import kakaoLogo from '../../assets/img/sign/kakaoLogo.svg';

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  onBackClick: () => void;
  onNext: () => void;
}

const Step2BasicInfo: React.FC<Step2Props> = ({
  formData,
  setFormData,
  onNext,
  onBackClick,
}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
  formData.username &&
  formData.phoneNum &&
  formData.identityFront &&
  formData.identityBack &&
  formData.issueYear?.length === 4 &&
  formData.issueMonth?.length >= 1 &&
  formData.issueDay?.length >= 1;

  const handlePhoneDisplay = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  };


  const handleNext = () => {
    if (isFormValid) {
      onNext();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, phoneNum: value });
  };

  const handleIssueDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    setFormData((prevData: any) => {
      const updatedData = { ...prevData, [`issue${type.charAt(0).toUpperCase() + type.slice(1)}`]: value };
      const issueYear = updatedData.issueYear || '';
      const issueMonth = updatedData.issueMonth?.padStart(2, '0') || '';
      const issueDay = updatedData.issueDay?.padStart(2, '0') || '';
  
      updatedData.issueDate =
        issueYear.length === 4 && issueMonth.length === 2 && issueDay.length === 2
          ? `${issueYear}${issueMonth}${issueDay}`
          : '';
  
      return updatedData;
    });
  };

  const handleVerify = async () => {
    const { phoneNum, username, identityFront, identityBack, issueDate } = formData;
    if (!isFormValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await connectAPI({
        phoneNum: phoneNum.replace(/-/g, ''),
        username,
        identity: `${identityFront}${identityBack}`,
        issueDate,
      });

      if (response.status === 200) {
        alert('주민등록번호 인증에 성공했습니다.');
        setIsVerified(true);
      } else {
        alert(response.message || '인증에 실패했습니다.');
      }
    } catch (error) {
      alert('인증 요청 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">
          회원가입
        </div>
      </div>
      <img src={progressBar} alt="Progress Bar" className="w-full mb-8" />
      <h2 className="text-[#2a2e37] text-xl font-semibold mb-6 w-full text-left">
        내 정보를 적어주세요!
      </h2>
      <div className="flex flex-col gap-6 w-full">
        <div>
          <label className="block text-gray-700 mb-2">이름</label>
          <input
            type="text"
            placeholder="성함을 적어주세요"
            value={formData.username}
            readOnly 
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
          <label className="block text-gray-700 mb-2">핸드폰 번호</label>
          <input
            type="text"
            placeholder="전화번호를 입력해주세요"
            value={handlePhoneDisplay(formData.phoneNum)} 
            readOnly
            onChange={handlePhoneChange}
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
      <label className="block text-gray-700 mb-2">주민등록번호</label>
      <div className="flex items-center justify-between gap-2 w-full">
        <input
          type="text"
          placeholder="앞자리"
          maxLength={6}
          value={formData.identityFront || ''}
          onChange={(e) =>
            setFormData({ ...formData, identityFront: e.target.value.replace(/[^0-9]/g, '') })
          }
          className="w-full max-w-[45%] focus:outline-none placeholder-gray-400 text-center pb-2"
          style={{
            borderBottom: '1px solid #d1d5db',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
          onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
        />
        <span className="text-gray-400 text-center w-[10%]">-</span>
        <input
          type="password"
          placeholder="******"
          maxLength={7}
          value={formData.identityBack || ''}
          onChange={(e) =>
            setFormData({ ...formData, identityBack: e.target.value.replace(/[^0-9]/g, '') })
          }
          className="w-full max-w-[45%] focus:outline-none placeholder-gray-400 text-center pb-2"
          style={{
            borderBottom: '1px solid #d1d5db',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
          onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
        />
      </div>
    </div>
    <div>
          <label className="block text-gray-700 mb-2">주민등록증 발급 날짜</label>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="relative w-full max-w-[30%] text-center">
              <input
                type="text"
                maxLength={4}
                value={formData.issueYear}
                onChange={(e) => handleIssueDateChange('year', e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full text-center focus:outline-none pb-2"
                style={{
                  borderBottom: '1px solid #d1d5db',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
              />
                <span
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 text-sm ${
                  formData.issueYear ? 'text-black' : 'text-gray-400'
                }`}
              >
                년
              </span>
            </div>
            <div className="relative w-full max-w-[20%] text-center">
              <input
                type="text"
                maxLength={2}
                value={formData.issueMonth}
                onChange={(e) => handleIssueDateChange('month', e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full text-center focus:outline-none pb-2"
                style={{
                  borderBottom: '1px solid #d1d5db',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
              />
             <span
              className={`absolute top-1/2 transform -translate-y-1/2 right-0 text-sm ${
                formData.issueMonth ? 'text-black' : 'text-gray-400'
              }`}
            >
              월
            </span>
            </div>
            <div className="relative w-full max-w-[20%] text-center">
              <input
                type="text"
                maxLength={2}
                value={formData.issueDay}
                onChange={(e) => handleIssueDateChange('day', e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full text-center focus:outline-none pb-2"
                style={{
                  borderBottom: '1px solid #d1d5db',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#ff6b6b')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#d1d5db')}
              />
               <span
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 text-sm ${
                  formData.issueDay ? 'text-black' : 'text-gray-400'
                }`}
              >
                일
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-auto mb-6">
        {!isVerified ? (
          <button
            onClick={handleVerify}
            disabled={!isFormValid || isLoading}
            className={`w-full h-[52px] rounded-lg ${
              !isFormValid || isLoading ? 'bg-[#d4d7de]' : 'bg-[#ff6b6b]'
            } text-white font-semibold text-base font-['Pretendard'] leading-snug flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              '인증 중...'
            ) : (
              <>
                <img src={kakaoLogo} alt="카카오 로고" className="w-[16px] h-[16px]" />
                카카오 지갑으로 인증하기
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full h-[52px] rounded-lg bg-[#ff6b6b] text-white font-semibold text-base font-['Pretendard'] leading-snug"
          >
            다음
          </button>
        )}
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