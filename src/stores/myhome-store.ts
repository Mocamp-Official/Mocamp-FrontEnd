/* 마이홈 상태 관리 */
import { create } from 'zustand';

export interface IMyhome {
  profileImage: string;
  username: string;
  roomList: Room[];
  setMyhome: (data: IMyhome) => void;
}

export interface Room {
  status: boolean; // isComplete : true or false
  room_name: string;
  started_at: string;
  duration: string;
}

export const useMyhomeStore = create<IMyhome>((set) => ({
  profileImage: '',
  username: '',
  roomList: [],
  setMyhome: (data) =>
    set(() => ({
      profileImage: data.profileImage,
      username: data.username,
      roomList: data.roomList,
    })),
}));
