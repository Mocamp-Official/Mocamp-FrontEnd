import { setAccessToken } from './../utils/token';
/* 로그인 관련 API 요청 */
import axios from 'axios';

interface ISocialLoginParams {
  code: string | null;
  redirect_url: string;
}

const getGoogleProcess = async ({ code, redirect_url }: ISocialLoginParams) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/google/process?code=${code}&redirect_url=${redirect_url}`,
    );
    const data = await res.data.message;
    setAccessToken(data.accessToken);
    return true;
  } catch (err) {
    alert(`구글 로그인 에러 발생 : ${err}`);
    return false;
  }
};

const getNaverProcess = async ({ code, redirect_url }: ISocialLoginParams) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/naver/process?code=${code}&redirect_url=${redirect_url}`,
    );
    const data = await res.data;
    setAccessToken(data.accessToken);
    return true;
  } catch (err) {
    alert(`네이버 로그인 에러 발생 : ${err}`);
    return false;
  }
};

const getKakaoProcess = async ({ code, redirect_url }: ISocialLoginParams) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/kakao/process?code=${code}&redirect_url=${redirect_url}`,
    );
    const data = await res.data;
    setAccessToken(data.accessToken);
    return true;
  } catch (err) {
    console.error('카카오 로그인 실패:', err);
    return false;
  }
};

export { getNaverProcess, getKakaoProcess, getGoogleProcess };
