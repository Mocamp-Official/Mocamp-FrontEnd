// 사용자 ID와 이름을 생성하고 관리하는 유틸리티 함수입니다.
// 이 코드는 클라이언트 사이드에서만 작동하며, 서버 사이드 렌더링 환경에서는 기본값을 반환
import { v4 as uuidv4 } from 'uuid'; 

const USER_ID_KEY = 'mock_user_id';
const USER_NAME_KEY = 'mock_user_name';

export const getOrCreateUserId = (): number => {
  if (typeof window === 'undefined') {
    return 0; // 서버 사이드 렌더링 시에는 0 또는 적절한 기본값 반환
  }
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    // Math.random() 대신 UUID의 일부를 숫자로 변환하여 고유성 확보
    userId = String(Math.floor(Math.random() * 1000000) + 1); // 1부터 100만 사이의 랜덤 ID
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return parseInt(userId, 10);
};

export const getOrCreateUserName = (userId: number): string => {
  if (typeof window === 'undefined') {
    return 'ServerUser';
  }
  let userName = localStorage.getItem(USER_NAME_KEY);
  if (!userName) {
    userName = `MocampUser-${userId}`;
    localStorage.setItem(USER_NAME_KEY, userName);
  }
  return userName;
};

// 필요하다면 테스트를 위해 ID를 리셋하는 함수
export const resetUserIdentity = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    console.log('User identity reset in localStorage.');
  }
};