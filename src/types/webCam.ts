export interface Participant {
  userId: number;
  username: string;
  isWorking?: boolean;
  camStatus: boolean;
  micStatus: boolean;
  stream?: MediaStream | null;
    isAdmin?: boolean;
}

export interface GroupCallState {
  participants: Participant[];
  streams: { [userId: number]: MediaStream | null };
  localStream: MediaStream | null;
  roomId: number;
  myUserId: number;
}

