/* 모캠프(방) 타입 정의 */

export interface CreateRoomFormData {
  roomName: string;
  capacity: number;
  description: string;
  duration: string;
  micAvailability: boolean;
  micTurnedOn: boolean;
  camTurnedOn: boolean;
  image: File;
}
