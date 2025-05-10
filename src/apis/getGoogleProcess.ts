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

export default getGoogleProcess;
