import React from 'react'
import bgimg from '../../assets/img/mypage/certificate_background_img.svg'
import center_bg from '../../assets/img/mypage/certificate_center_bgimg.svg'

interface CertificateProps {
  type: string; // type prop 정의
}

const Certificate: React.FC<CertificateProps> = ({type}) => {
  return (
    <div className='certificate_components'>
      <img src={bgimg} alt="" className='bgimg' />
      <div className="contents_div">
        <p className="top_title">{type}활동 확인서</p>
        <div className="info_div">
          <div className="_div">
            <p className="info_title">성명</p>
            <p className="info_txt">송연우</p>
          </div>
          <hr />
          <div className="_div">
            <p className="info_title">주민등록번호</p>
            <p className="info_txt">990428-1******</p>
          </div>
          <hr />
          <div className="_div">
            <p className="info_title">주소</p>
            <p className="info_txt">서울특별시 강남구 도곡로 21길 15</p>
          </div>
        </div>
        <div className="info_div">
          <div className="_div">
            <p className="active_title">{type} 활동기간</p>
            <p className="active_txt">2024.11.11 ~ 2024.11.11</p>
          </div>
          <div className="_div">
            <p className="active_title">{type} 활동시간</p>
            <p className="active_txt">총 8시간 0분</p>
          </div>
          <div className="_div">
            <p className="active_title">{type} 활동횟수</p>
            <p className="active_txt">총 1회</p>
          </div>
          <div className="_div">
            <p className="active_title">{type} 내용</p>
            <p className="active_txt">간병인 봉사활동</p>
          </div>
        </div>
        <p className="info_sub">위와 같이 {type} 활동에 참여하였음을 확인함</p>
        <p className="info_sub">2024년 11월 7일</p>
        <div className="center_sign_div">
          <img src={center_bg} alt="" />
          <p className="center">한국중앙자원봉사센터장</p>
        </div>
      </div>
    </div>
  )
}

export default Certificate