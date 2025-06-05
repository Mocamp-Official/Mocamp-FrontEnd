/* 모캠프(방) 생성 API 요청 */
import { apiWithToken } from './axios';
import { CreateRoomFormData } from '@/types/create';

export const createRoom = async (payload: CreateRoomFormData, accessToken: string) => {
  try {
    const { image, ...roomPayload } = payload;
    const formData = new FormData();

    formData.append('room', new Blob([JSON.stringify(roomPayload)], { type: 'application/json' }));
    formData.append('image', payload.image);

    const response = await apiWithToken.post('/api/room/create', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('방 생성 실패:', error.response?.data || error.message);
    throw error;
  }
};
