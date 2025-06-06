import { create } from 'zustand';
import { SignalingSocket } from '@/apis/signal';
import { SdpAnswerResponse, IceCandidateDto } from '@/types/rtc';
import { getAccessToken } from '@/utils/token';

interface WebRTCState {
  isConnected: boolean;
  stream: MediaStream | null;
  error: string | null;
  signaling: SignalingSocket | null;
  peerConnection: RTCPeerConnection | null;
  cameraStatus: 'ON' | 'OFF';
  connectWebRTC: (roomId: string | number) => Promise<void>;
  disconnectWebRTC: () => void;
  updateCameraStatus: (roomId: string | number, status: 'ON' | 'OFF') => void;
}

export const useWebRTCStore = create<WebRTCState>((set, get) => ({
  isConnected: false,
  stream: null,
  error: null,
  signaling: null,
  peerConnection: null,
  cameraStatus: 'ON',

  connectWebRTC: async (roomId) => {
    try {
      // 1. 미디어 스트림 획득
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      set({ stream });

      // 2. PeerConnection 생성
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      set({ peerConnection: pc });

      // 3. JWT 토큰 확인
      const token = getAccessToken();
      if (!token) {
        set({ error: '로그인이 필요합니다.' });
        return;
      }

      // 4. STOMP 시그널링 연결(환경변수로 넣을거임 난 지금 연결하는게 급해)
      const signalingUrl = 'wss://mocamp.shop/ws';
      const signaling = new SignalingSocket(signalingUrl, token);
      set({ signaling });

      // 5. 구독 설정
      signaling.subscribe(`/sub/rtc/offer/${roomId}`, (payload: SdpAnswerResponse) => {
        console.log('[RTC] Received SDP Answer:', payload);
        if (payload.sdpAnswer) {
          pc.setRemoteDescription(
            new RTCSessionDescription({ type: 'answer', sdp: payload.sdpAnswer }),
          );
        }
      });

      signaling.subscribe(`/sub/rtc/ice/${roomId}`, (payload: IceCandidateDto) => {
        console.log('[RTC] Received ICE candidate:', payload);
        if (payload.candidate) {
          pc.addIceCandidate(new RTCIceCandidate(payload));
        }
      });

      // 추가 구독 (비디오/오디오 스트림)
      signaling.subscribe(`/sub/video/${roomId}`, (payload) => {
        console.log('[RTC] Video stream update:', payload);
        // 비디오 스트림 처리
      });

      signaling.subscribe(`/sub/audio/${roomId}`, (payload) => {
        console.log('[RTC] Audio stream update:', payload);
        // 오디오 스트림 처리
      });

      // 6. WebSocket 연결 시작
      signaling.connect();

      // 7. 연결 성공 후 초기 카메라 상태 전송
      setTimeout(() => {
        signaling.send(`/pub/data/cam/${roomId}`, { status: get().cameraStatus });
      }, 500);

      // 8. SDP Offer 생성 및 전송
      setTimeout(async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log('[RTC] Sending SDP Offer:', offer.sdp);
        signaling.send(`/pub/rtc/offer/${roomId}`, { sdpOffer: offer.sdp });
      }, 1000);

      // 9. ICE 후보 송신
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('[RTC] Sending ICE candidate:', event.candidate);
          signaling.send(`/pub/rtc/ice/${roomId}`, {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          });
        }
      };

      // 10. 연결 상태 관리
      pc.onconnectionstatechange = () => {
        console.log('[RTC] Connection state:', pc.connectionState);
        if (pc.connectionState === 'connected') {
          set({ isConnected: true, error: null });
        }
        if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
          set({ error: '미디어 서버 연결 실패', isConnected: false });
        }
      };
    } catch (err: any) {
      console.error('[RTC] Connection error:', err);
      set({ error: err.message || 'WebRTC 연결 실패', isConnected: false });
    }
  },

  updateCameraStatus: (roomId, status) => {
    const { signaling } = get();
    set({ cameraStatus: status });

    if (signaling) {
      signaling.send(`/pub/data/cam/${roomId}`, { status });
      console.log(`[RTC] Camera status updated to: ${status}`);
    }
  },

  disconnectWebRTC: () => {
    const { peerConnection, signaling } = get();
    peerConnection?.close();
    signaling?.close();
    set({
      isConnected: false,
      peerConnection: null,
      signaling: null,
      stream: null,
      cameraStatus: 'ON',
    });
  },
}));

export default useWebRTCStore;
