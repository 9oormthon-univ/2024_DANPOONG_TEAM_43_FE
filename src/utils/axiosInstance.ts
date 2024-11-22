import axios from 'axios';
import Cookies from 'js-cookie';

let isRefreshing = false;
let failedQueue: any[] = []; 

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, 
  headers: {
    Accept: '*/*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 400 && error.response?.data?.code === 'TOKEN_EXPIRED') {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = Cookies.get('refreshToken');
          if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
          }

          const refreshResponse = await axios.post(
            'https://carely-backend.site/reissue',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`, 
              },
              withCredentials: true, 
            }
          );

          const newAccessToken = refreshResponse.data.accessToken;

          Cookies.set('accessToken', newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;