import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from 'stores/useUserStore';
import LoadingSpinner from 'components/signup/LoadingSpinner';
import { KakaoLoginResponseData } from 'type/kakao';
import { kakaoLogin } from 'service/kakaoLogin';

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

      kakaoLogin(code)
        .then((data) => {
          if (data.status === 200) {
            setUserInfo(data.data as KakaoLoginResponseData);

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
        .catch(() => {
          setLoading(false);
          navigate('/login');
        });
    }
  }, [location, navigate, setUserInfo]);

  return loading ? <LoadingSpinner /> : null;
};

export default KakaoLoginRedirect;