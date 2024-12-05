import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import leftButtonIcon from "../../assets/img/sign/sign-left-btn.svg";
import progressBar from "../../assets/img/sign/progress-bar0.svg";

const TermsAndConditions = ({ onAccept }: { onAccept: () => void }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(scrollPercentage);

      setIsScrolledToEnd(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  const handleScrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  const handleAccept = () => {
    onAccept();
  };

  return (
    <div className="w-full flex flex-col items-center justify-between h-[calc(100dvh)]">
      <div className="relative w-full flex items-center justify-center my-6">
        <img
          src={leftButtonIcon}
          alt="Back"
          className="absolute left-0 w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-center text-[#2a2e36] text-base font-medium font-['Pretendard'] leading-snug">
          회원가입
        </div>
      </div>
      <img src={progressBar} alt="Progress Bar" className="w-full mb-8" />
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-grow overflow-y-scroll pb-6 w-full max-w-[440px] min-w-[320px]"
      >
        <h2 className="text-[#2a2e37] text-xl font-semibold mb-6">
          약관에 먼저 동의해 주세요
        </h2>
        <div className="text-[#4a4a4a] text-sm leading-relaxed space-y-4">
          <p>
            아래는 범죄경력 조회 동의서 약관의 예시입니다. 이 약관은 대상자의 동의를 받고 법적 요건을 충족하는 내용을 포함하고 있습니다. 
            실제 사용 시에는 법적 검토를 거치는 것이 중요합니다.
          </p>
          <h3 className="text-[#2a2e37] text-base font-semibold mt-4">
            범죄경력 조회 동의서
          </h3>
          <p>
            <strong>제1조 (목적)</strong><br />
            본 동의서는 Carely이 간병인 및 자원봉사자의 신원 확인 및 안전한 서비스 제공을 목적으로 범죄경력 조회를 실시함에 있어, 대상자의 사전 동의를 받기 위해 작성되었습니다.
          </p>
          <p>
            <strong>제2조 (조회 대상 및 범위)</strong><br/>조회 대상은 Carely의 회원으로 가입하고 간병 활동을 희망하는 요양보호사 및 자원봉사자에 한합니다. 
            조회 범위는 대한민국 법률에 따라 경찰청에서 제공하는 범죄경력 및 수사경력 자료입니다.
          </p>
          <p>조회된 정보는 다음의 목적 외에는 사용되지 않습니다.</p>
          <ul className="list-disc ml-6">
            <li>안전한 서비스 제공을 위한 신원 확인</li>
            <li>자격 적합성 검토</li>
          </ul>

          <p>
            <strong>제3조 (조회 절차)</strong><br/>대상자는 본 동의서에 서명함으로써 범죄경력 조회를 승인하며, 경찰청의 협조를 통해 조회가 이루어집니다. 
            조회 결과는 Carely의 담당자에게만 전달되며, 대상자의 사전 동의 없이 제3자에게 공개되지 않습니다.
          </p>

          <p>
            <strong>제4조 (정보 보호 및 관리)</strong><br/>조회된 정보는 개인정보 보호법 및 관련 법령에 따라 철저히 관리되며, 보관 기간은 조회일로부터 
            [보관 기간] 이내로 제한합니다. 조회된 정보는 목적 달성 후 즉시 폐기합니다.
          </p>

          <p>
            <strong>제5조 (동의 철회 및 거부권)</strong><br/>대상자는 범죄경력 조회 동의를 거부할 권리가 있습니다. 다만, 동의를 거부할 경우 회원가입 및 
            간병 활동이 제한될 수 있습니다. 대상자는 조회 신청 후에도 동의를 철회할 수 있으며, 철회 시 관련 절차를 중단합니다.
          </p>

          <p>
            <strong>제6조 (책임과 면책)</strong><br/>Carely은 대상자의 범죄경력을 조회하며, 조회 과정에서 발생하는 문제에 대해 관련 법률에 따른 
            책임을 부담합니다. 조회 결과에 따라 서비스 제공이 제한될 수 있음을 대상자에게 미리 안내합니다.
          </p>

          <p className="font-semibold text-[#2a2e37]">
            동의 내용 확인 및 서명: 본인은 상기 내용을 충분히 이해하였으며, Carely이 본인의 범죄경력을 조회하는 것에 동의합니다.
          </p>
        </div>
      </div>
      <div className="w-full mt-auto p-4 bg-white">
        <button
          onClick={!isScrolledToEnd ? handleScrollDown : handleAccept}
          className={`w-full h-[52px] rounded-lg ${
            !isScrolledToEnd ? "bg-[#ff6b6b]" : "bg-[#ff6b6b]"
          } text-white font-semibold text-base font-['Pretendard'] leading-snug`}
        >
          {!isScrolledToEnd ? "아래로 스크롤하기" : "약관 동의하기"}
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;