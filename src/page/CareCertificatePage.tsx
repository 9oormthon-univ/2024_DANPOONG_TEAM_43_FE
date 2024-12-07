import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import back from '../assets/img/chat/chat-back.svg'
import Certificate from 'components/mypage/Certificate';
import { useUserDataQuery } from 'service/user';
import CareCertificate from 'components/mypage/CareCertificate';
import axiosInstance from 'utils/axiosInstance';


const CareCertificatePage = () => {
    const navigate = useNavigate();
    const certificateRef = useRef<HTMLDivElement>(null);
    const { data: userData, isLoading, error } = useUserDataQuery();
    const [certificateData, setCertificateData] = useState<any>(null);
    useEffect(() => {
        const fetchCertificateData = async () => {
          try {
            const response = await axiosInstance.get(`/api/certificates/certificate/userId`);
            setCertificateData(response.data.data);
          } catch (error) {
            console.error('Failed to fetch certificate data:', error);
          }
        };
    
        if (userId) {
          fetchCertificateData();
        }
      }, [userData?.userId]);

    if (error || !userData) {
        return null;
    }
    const { userType, userId } = userData;

    const handleBackClick = () => {
        navigate(-1);
    };
    const handleExportPdf = async () => {
        const element = certificateRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, { scale: 2 });
            const imageData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('certificate.pdf');
        } catch (error) {
            console.error('PDF 생성 중 오류:', error);
        }
    };
    return (
        <div className='container' id='certificate_page'>
            <div className="top">
                <img src={back} alt="" onClick={handleBackClick} />
                <p className='top_title'>요양 보호 자격증 발급</p>
            </div>
            {certificateData ? (
        <div className="certificate_div" ref={certificateRef}>
          <CareCertificate certificateData={certificateData} />
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
            <p className="certificate_info_text">
                본 증명서는 인터넷으로 발급되었으며, 자원봉사 포탈 시스템(www.1365.go.kr)의 확인서 조회 메뉴를 통해 문서발급 번호 입력으로 내용의 위변조를 확인해 주세요
            </p>
            <div className="bottom">
                <div className="button" onClick={handleExportPdf}>PDF 내보내기</div>
            </div>
        </div>
    )
}

export default CareCertificatePage