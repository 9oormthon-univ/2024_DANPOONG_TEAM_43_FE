import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import initialLogo1 from '../assets/img/sign/initial-logo1.svg';
import initialLogo2 from '../assets/img/sign/initial-logo2.svg';
import initialLogo3 from '../assets/img/sign/initial-logo3.svg';
import initialLogo4 from '../assets/img/sign/initial-logo4.svg';
import textLogo from '../assets/img/sign/text-logo.svg';
import kakaoLoginBtn from '../assets/img/sign/kakao-login.svg';

const Login = () => {
  const navigate = useNavigate();
  const [showInitialLogos, setShowInitialLogos] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showFinalContent, setShowFinalContent] = useState(false);

  useEffect(() => {
    if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
      navigate('/');
    } else {
      setShowInitialLogos(true);
      setTimeout(() => setFadeOut(true), 1000); 
      setTimeout(() => setShowFinalContent(true), 2000);
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    const clientId = '45aa82bd53369b05e84cece7117f5c06';
    const redirectUri = 'http://localhost:3000/kakao-login';
    const scope = 'profile_nickname,name,birthyear,birthday,gender,phone_number';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        {showInitialLogos && (
          <>
            <img
              src={initialLogo1}
              alt="Initial Logo 1"
              className={`initial-logo initial-logo-1 ${fadeOut ? 'fade-out' : 'fade-in'}`}
            />
            <img
              src={initialLogo2}
              alt="Initial Logo 2"
              className={`initial-logo initial-logo-2 ${fadeOut ? 'fade-out' : 'fade-in'}`}
            />
            <img
              src={initialLogo3}
              alt="Initial Logo 3"
              className={`initial-logo initial-logo-3 ${fadeOut ? 'fade-out' : 'fade-in'}`}
            />
          </>
        )}
        {showFinalContent && (
          <>
            <img src={initialLogo4} alt="Final Logo" className="final-logo" />
            <img src={textLogo} alt="Text Logo" className="text-logo" />
          </>
        )}
      </div>
      {showFinalContent && (
        <div className="login-button" onClick={handleKakaoLogin}>
          <img src={kakaoLoginBtn} alt="Kakao Login" className="kakao-login-button cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default Login;