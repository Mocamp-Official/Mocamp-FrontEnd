import { OpenVidu } from 'openvidu-browser';

let ovInstance: OpenVidu | null = null;

export const initOpenVidu = () => {
  ovInstance = new OpenVidu();

  (OpenVidu as any).websocketUri = OPENVIDU_WSS;

  return ovInstance;
};

export const getOVInstance = () => ovInstance;
