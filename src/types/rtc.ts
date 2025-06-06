// 기존 CameraSignal, MicSignal 제거하고 명세에 맞는 타입 사용
export interface StatusMessage {
  status: "ON" | "OFF";
}

export interface SdpOfferRequest {
  sdpOffer: string;
}

export interface SdpAnswerResponse {
  sdpAnswer: string;
  userId: number;
}

export interface IceCandidateDto {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
  userId: number;
}
