import axios from 'axios';
import Cookies from 'js-cookie';
import { KakaoLoginResponse } from 'type/kakao';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/kakao-code?code=${code}`,
      {},
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const accessToken = response.headers['accesstoken']?.replace('Bearer ', '');
    const refreshToken = response.headers['refreshtoken']?.replace('Bearer ', '');

    if (accessToken && refreshToken) {
      Cookies.set('accessToken', accessToken, { secure: true });
      Cookies.set('refreshToken', refreshToken, { secure: true });
    }

    return response.data;
  } catch (error) {
    console.error('카카오 소셜 로그인 실패:', error);
    throw error;
  }
};