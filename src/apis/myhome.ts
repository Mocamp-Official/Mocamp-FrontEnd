import { apiWithToken } from './axios';

// 유저 정보 & 참여한 모캠프 정보 & 모캠프 사용 추이 정보
export const fetchMyhome = async () => {
  try {
    const res = await apiWithToken.get('/api/user/profile');
    return res.data.message;
  } catch (err: any) {
    console.error('마이홈 데이터 조회 실패:', err);
  }
};
