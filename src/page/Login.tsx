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
  const [showInitialLogos, setShowInitialLogos] = useState([false, false, false]);
  const [fadeOut, setFadeOut] = useState(false);
  const [showFinalLogos, setShowFinalLogos] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  useEffect(() => {
    if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
      navigate('/');
    } else {
      setTimeout(() => setShowInitialLogos([true, false, false]), 700); 
      setTimeout(() => setShowInitialLogos([true, true, false]), 1400); 
      setTimeout(() => setShowInitialLogos([true, true, true]), 2100); 
      setTimeout(() => setFadeOut(true), 3500);
      setTimeout(() => {
        setShowFinalLogos(true);
        setShowLoginButton(true);
      }, 4500); 
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    const clientId = '78256822bbbbbe614142bcad43930708';
    const redirectUri = 'https://carely-backend.site/test/';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname`;
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        {showInitialLogos[0] && (
          <img
            src={initialLogo1}
            alt="Initial Logo 1"
            className={`initial-logo initial-logo-1 ${fadeOut ? 'fade-out' : 'fade-in'}`}
          />
        )}
        {showInitialLogos[1] && (
          <img
            src={initialLogo2}
            alt="Initial Logo 2"
            className={`initial-logo initial-logo-2 ${fadeOut ? 'fade-out' : 'fade-in'}`}
          />
        )}
        {showInitialLogos[2] && (
          <img
            src={initialLogo3}
            alt="Initial Logo 3"
            className={`initial-logo initial-logo-3 ${fadeOut ? 'fade-out' : 'fade-in'}`}
          />
        )}
        {showFinalLogos && (
          <>
            <img src={initialLogo4} alt="Final Logo" className="final-logo" />
            <img src={textLogo} alt="Text Logo" className="text-logo" />
          </>
        )}
      </div>
      {showLoginButton && (
        <div className="login-button" onClick={handleKakaoLogin}>
          <img src={kakaoLoginBtn} alt="Kakao Login" className="kakao-login-button cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default Login;