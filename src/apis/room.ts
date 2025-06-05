import { apiWithToken } from './axios';
import { Participant } from '@/types/room';

export const fetchRoomParticipants = async (roomId: string): Promise<Participant[]> => {
  try {
    const res = await apiWithToken.get(`/api/room/participant/${roomId}`);
    return res.data.message;
  } catch (error: any) {
    console.error(`참가자 목록 조회 실패:`, error.response?.data || error.message);
    return [];
  }
};
