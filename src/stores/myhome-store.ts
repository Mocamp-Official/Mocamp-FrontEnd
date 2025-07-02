/* 마이홈 상태 관리 */
import { ChartType } from '@/types/myhome';
import { create } from 'zustand';

export interface Myhome {
  profileImage: string;
  username: string;
  roomList: Room[];
  timeList: [];
  totalDurationMinute: number;
  totalNumberOfGoals: number;
  setMyhome: (data: any) => void;
}

export interface DropDown {
  selectedType: ChartType;
  setSelectedType: (selectedType: ChartType) => void;
}

export interface Room {
  isCompleted: boolean;
  roomName: string;
  createdAt: string;
  time: string;
}

export const useMyhomeStore = create<Myhome>((set) => ({
  profileImage: '',
  username: '',
  roomList: [],
  timeList: [],
  totalDurationMinute: 0,
  totalNumberOfGoals: 0,
  setMyhome: (data) =>
    set(() => ({
      profileImage: data.profileImage,
      username: data.username,
      roomList: data.roomList,
      timeList: data.timeList,
      totalDurationMinute: data.totalDurationMinute,
      totalNumberOfGoals: data.totalNumberOfGoals,
    })),
}));

export const useDropDown = create<DropDown>((set) => ({
  selectedType: '목표 달성 수',
  setSelectedType: (selectedType: ChartType) => set({ selectedType }),
}));
