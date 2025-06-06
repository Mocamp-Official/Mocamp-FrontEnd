import { apiWithToken } from '@/apis/axios';
import React from 'react';

const enterRoom = async (roomId: string) => {
  try {
    const res = await apiWithToken.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/enter/${roomId}`,
      {
        micTurnedOn: true,
        camTurnedOn: true,
      },
    );

    const data = res.data;
    console.log('입장 성공:', data);
  } catch (error) {
    console.error('입장 오류:', error);
  }
};

const MyHome = () => {
  const roomId = '10';

  const handleClick = () => {
    enterRoom(roomId);
  };

  return <div onClick={handleClick}>myhome</div>;
};

export default MyHome;
