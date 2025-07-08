import { OpenVidu } from 'openvidu-browser';

let OV: OpenVidu | null = null;

export const initOpenVidu = () => { //새로운 인스턴스 생성 및 저장
  OV = new OpenVidu();
  return OV;
};

export const getOVInstance = () => OV; // 초기화된 인스턴스 꺼내오기
