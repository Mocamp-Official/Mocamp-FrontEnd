import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/token';

const api = axios.create({
  baseURL: 'https://mocamp.shop',
  withCredentials: true,
});

// axios 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// axios 응답 인터셉터
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              resolve(api(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          'https://mocamp.shop/auth/refresh', // 아직 리프레시 API 미완성으로 토큰 재발급 기능은 작동하지 않습니다.
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);
        api.defaults.headers.common.Authorization = 'Bearer ' + newAccessToken;
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
