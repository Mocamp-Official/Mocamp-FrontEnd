/* 로그인 관련 API 요청 */

import axios from 'axios';

const getGoogleProcess = async (code: string | null): Promise<boolean | undefined> => {
  if (code === null || !code) {
    return false;
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/google/process`);
    const data = res.data;
    console.log('구글 로그인 데이터:', data);
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    return true;
  } catch (err) {
    alert(`구글 로그인 에러 발생 : ${err}`);
    return false;
  }
};

const getNaverProcess = async (code: string | null): Promise<boolean | undefined> => {
  if (code === null || !code) {
    return false;
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/naver/process?code=${code}`,
    );
    const data = await res.data;
    console.log('네이버 로그인 데이터:', data);
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    return true;
  } catch (err) {
    alert(`네이버 로그인 에러 발생 : ${err}`);
    return false;
  }
};

const getKakaoProcess = async (code: string | null, redirect_url: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/kakao/process?code=${code}&redirect_url=${redirect_url}`,
    );
    const data = await res.data;
    console.log(data);
    // localStorage.setItem('accessToken', data.accessToken);
    // localStorage.setItem('refreshToken', data.refreshToken);
  } catch (err) {
    console.error('카카오 로그인 실패:', err);
  }
};

export { getNaverProcess, getKakaoProcess, getGoogleProcess };
