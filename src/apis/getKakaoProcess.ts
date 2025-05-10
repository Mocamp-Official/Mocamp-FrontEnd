import axios from 'axios';

const getKakaoProcess = async (code: string | null): Promise<boolean | undefined> => {
  if (code === null) {
    return false;
  }
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/kakao/process`;
  if (!code) return; // code가 없으면 실행하지 않음
  try {
    const res = await axios.get(`${url}?code=${code}`);
    const data = await res.data;
    // console.log('데이터:', data);
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    return await true;
  } catch (err) {
    alert(`카카오 로그인 에러 발생 : ${err}`);
    throw Error('카카오 로그인 에러 발생');
  }
};

export default getKakaoProcess;
