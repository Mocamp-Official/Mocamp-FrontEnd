export interface Participant {
  userId: number;
  username: string;
  isWorking?: boolean;
  cameraOn: boolean;
  micOn: boolean;
  stream?: MediaStream | null;
  
}

export interface GroupCallState {
  participants: Participant[];
  streams: { [userId: number]: MediaStream | null };
  localStream: MediaStream | null;
  roomId: number;
  myUserId: number;
}

