/* 로그인 상태 관리 */
import { platformType } from '@/types/auth';
import { create } from 'zustand';

interface IAuth {
  platform: platformType;
  setPlatform: (platform: platformType) => void;
  resetPlatform: () => void;
}

export const useAuthStore = create<IAuth>((set) => ({
  platform: null,
  setPlatform: (platform) => set({ platform }),
  resetPlatform: () => set({ platform: null }),
}));
