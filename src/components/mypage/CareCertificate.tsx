import React from 'react'
import icon from '../../assets/img/mypage/certificate_icon.svg'
import sign from '../../assets/img/mypage/certificate_sign.svg'
import { useUserDataQuery } from 'service/user';
import { getBirthInfoAndAge, getUserImage } from 'utils/userUtils';
import { CareCertificateProps } from 'type/mypage';

const CareCertificate: React.FC<CareCertificateProps> = ({ certificateData }) => {
    const { data: userData, error } = useUserDataQuery();
    if (error || !userData) {
        return null;
    }
    const { userId, userType, age } = userData;
    const { year, month, day } = getBirthInfoAndAge(certificateData.identity,age);

    return (
        <div className='care_certificate_components'>
            <div className="icon_div">
                <img src={icon} alt="" className='icon'/>
            </div>
            <p className="top_title">요양보호 자격 취득 내역서</p>
            <div className="user_info_div">
                <img src={getUserImage(userId,userType)} alt="" className="profile" />
                <div className="text_info">
                    <div className="name_div">
                        <p className="info_title">성명</p>
                        <p className="info_txt">{certificateData.username}</p>
                    </div>
                    <div className="birth_div">
                        <p className="info_title">생년월일</p>
                        <p className="info_txt">{year}년 {month}년 {day}일</p>
                    </div>
                </div>
            </div>
            <div className="certificate_info_div">
                <div className="num_div">
                    <p className="info_title">등록번호</p>
                    <p className="info_txt">{certificateData.certificateId}</p>
                </div>
                <div className="type_div">
                    <p className="info_title">자격종목</p>
                    <p className="info_txt">요양보호자격</p>
                </div>
                <div className="when_div">
                    <p className="info_title">취득일자</p>
                    <p className="info_txt">{certificateData.issueDate}</p>
                </div>
                <div className="subject_div">
                    <p className="info_title">취득과목</p>
                    <p className="info_txt">CA캐어매니저자격 1급</p>
                </div>
            </div>
            <p className="info_text">위 사람은 [노인복지법] 제39조2 제2항 및 제3항에<br />
            따른 요양보호사 자격이 있음을 인정합니다.</p>
            <p className="info_text">{certificateData.issueDate}</p>
            <img src={sign} alt="" className='sign'/>
        </div>
    )
}

export default CareCertificate