import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserStore } from 'stores/useUserStore';
import LoadingSpinner from 'components/signup/LoadingSpinner';

const KakaoLoginRedirect: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      setLoading(true);

      fetch(`http://54.180.171.247:8080/kakao-code?code=${code}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          const accessToken = response.headers.get('accesstoken')?.replace('Bearer ', '');
          const refreshToken = response.headers.get('refreshtoken')?.replace('Bearer ', '');

          if (accessToken && refreshToken) {
            Cookies.set('accessToken', accessToken, { secure: true });
            Cookies.set('refreshToken', refreshToken, { secure: true });
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 200) {
            setUserInfo(data.data);

            setTimeout(() => {
              setLoading(false);
              navigate('/');
            }, 1500);
          } else if (data.status === 404) {
            setLoading(false);
            navigate('/signup', {
              state: {
                kakaoId: data.data.kakaoId,
                nickname: data.data.nickname,
              },
            });
          }
        })
        .catch((error) => {
          console.error('로그인 처리 중 오류:', error);
          setLoading(false);
          navigate('/login');
        });
    }
  }, [location, navigate, setUserInfo]);

  return loading ? <LoadingSpinner /> : null;
};

export default KakaoLoginRedirect;