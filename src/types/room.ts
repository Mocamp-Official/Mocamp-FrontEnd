export interface Goal {
  goalId: number;
  content: string;
  isCompleted: boolean;
}

export interface Participant {
  userId: number;
  userSeq?: string;
  username: string;
  goals: Goal[];
  resolution: string;
  is_my_goal: boolean;
}

export interface RoomInfo {
  roomId: number;
  roomName: string;
  roomSeq: string;
  capacity: number;
  status: boolean;
  notice: string;
  startedAt: string;
  endedAt: string;
  duration: string;
  imagePath: string;
  micAvailability: boolean;
}
