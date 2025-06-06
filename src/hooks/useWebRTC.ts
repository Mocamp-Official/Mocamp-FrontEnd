import { useEffect, useRef, useState } from 'react';
import { signalingSocket } from '@/apis/signal';

interface UseWebRTCProps {
  roomId: number;
  userId: number;
}

export function useWebRTC({ roomId, userId }: UseWebRTCProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    let pc: RTCPeerConnection;

    async function start() {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(localStream);

        pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
        peerConnection.current = pc;

        // 1. SDP Answer 수신 구독
        signalingSocket.subscribe(`/sub/rtc/offer/${roomId}`, async (payload) => {
          if (payload.sdpAnswer && payload.userId !== userId) {
            // 자신의 메시지 제외
            await pc.setRemoteDescription(
              new RTCSessionDescription({ type: 'answer', sdp: payload.sdpAnswer }),
            );
          }
        });

        // 2. ICE 수신 구독
        signalingSocket.subscribe(`/sub/rtc/ice/${roomId}`, (payload) => {
          if (payload.candidate && payload.userId !== userId) {
            // 자신의 메시지 제외
            pc.addIceCandidate(
              new RTCIceCandidate({
                candidate: payload.candidate,
                sdpMid: payload.sdpMid,
                sdpMLineIndex: payload.sdpMLineIndex,
              }),
            );
          }
        });

        // 3. 연결 및 연결 완료 대기
        signalingSocket.connect();

        // 4. 연결 완료 후 offer 전송
        const waitForConnection = () => {
          if (signalingSocket.isConnected()) {
            pc.createOffer().then(async (offer) => {
              await pc.setLocalDescription(offer);
              signalingSocket.send(`/pub/rtc/offer/${roomId}`, { sdpOffer: offer.sdp });
            });
          } else {
            setTimeout(waitForConnection, 100);
          }
        };
        waitForConnection();

        // 5. ICE 후보 송신 (userId 포함)
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            signalingSocket.send(`/pub/rtc/ice/${roomId}`, {
              candidate: event.candidate.candidate,
              sdpMid: event.candidate.sdpMid,
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              userId: userId, 
            });
          }
        };
      } catch (err: any) {
        setError(err.message || 'WebRTC 연결 실패');
      }
    }

    start();

    return () => {
      pc?.close();
    };
  }, [roomId, userId]);

  return { stream, error };
}
