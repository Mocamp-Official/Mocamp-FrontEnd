export interface RoomInfo {
  imageUrl?: string;
  status: '진행 전' | '진행 중';
  name: string;
  date: string;
  duration: string;
}

export interface UserInfo {
  nickname: string;
  isWorking: boolean;
  cameraOn: boolean;
  micOn: boolean;
}
