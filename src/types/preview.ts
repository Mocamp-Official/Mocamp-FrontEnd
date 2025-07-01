export interface RoomInfo {
  roomId: number;
  imageUrl?: string;
  status: '진행 전' | '진행 중';
  name: string;
  date: string;
  duration: string;
}

export interface UserInfo {
  userId: number;
  nickname: string;
  isWorking: boolean;
  camStatus: boolean;
  micStatus: boolean;
  stream?: MediaStream | null;
  error?: string | null;
}
