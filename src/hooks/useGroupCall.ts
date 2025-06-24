import { useState, useEffect, useRef, useCallback } from 'react';
import { KurentoSignalingSocket } from '@/apis/groupcallsignal';
import { Participant, GroupCallState } from '@/types/webCam';

interface UseGroupCallProps {
  roomId: number;
  myUserId: number;
  myUsername: string;
  initialParticipants?: Participant[];
}

export function useGroupCall({
  roomId,
  myUserId,
  myUsername,
  initialParticipants = [],
}: UseGroupCallProps) {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const peerConnections = useRef<{ [userId: number]: RTCPeerConnection }>({});
  const kurentoSignalingRef = useRef<KurentoSignalingSocket | null>(null);
  const hasJoinedRoom = useRef(false);

  const getLocalMediaStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(mediaStream);
      setParticipants((prev) => {
        const existingParticipant = prev.find((p) => p.userId === myUserId);
        if (existingParticipant) {
          return prev.map((p) =>
            p.userId === myUserId
              ? {
                  ...p,
                  stream: mediaStream,
                  cameraOn: true,
                  micOn: true,
                }
              : p,
          );
        } else {
          return [
            ...prev,
            {
              userId: myUserId,
              username: myUsername,
              isWorking: false,
              cameraOn: true,
              micOn: true,
              stream: mediaStream,
            },
          ];
        }
      });
      return mediaStream;
    } catch (err: any) {
      setError(err.message || '카메라/마이크 접근 실패');
      console.error('Error accessing media devices:', err);
      throw err;
    }
  }, [myUserId, myUsername]);

  const createPeerConnection = useCallback(
    async (remoteUserId: number, remoteUsername: string, streamToAttach: MediaStream) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      peerConnections.current[remoteUserId] = pc;

      streamToAttach.getTracks().forEach((track) => {
        pc.addTrack(track, streamToAttach);
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          kurentoSignalingRef.current?.send('onIceCandidate', {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            userId: myUserId,
            from: myUsername,
          });
        }
      };

      pc.ontrack = (event) => {
        console.log(`[GroupCall] ${remoteUsername} (${remoteUserId})로부터 스트림 수신`);
        if (event.streams && event.streams[0]) {
          setParticipants((prev) =>
            prev.map((p) => (p.userId === remoteUserId ? { ...p, stream: event.streams[0] } : p)),
          );
        } else {
          console.warn('[GroupCall] ontrack 이벤트에 스트림이 없습니다.');
        }
      };

      return pc;
    },
    [myUserId, myUsername],
  );

  const receiveVideoFrom = useCallback(
    async (remoteUserId: number, remoteUsername: string, sdpOffer: string) => {
      let pc = peerConnections.current[remoteUserId];
      if (!pc) {
        const currentLocalStream = localStream || (await getLocalMediaStream());
        if (!currentLocalStream) {
          setError('로컬 스트림을 가져올 수 없습니다.');
          return;
        }
        pc = await createPeerConnection(remoteUserId, remoteUsername, currentLocalStream);
      }

      await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      kurentoSignalingRef.current?.send('receiveVideoAnswer', {
        userId: myUserId,
        to: remoteUsername,
        sdpAnswer: answer.sdp,
      });
    },
    [createPeerConnection, localStream, myUserId, getLocalMediaStream],
  );

  const addIceCandidate = useCallback((remoteUserId: number, iceCandidate: any) => {
    const pc = peerConnections.current[remoteUserId];
    if (pc && iceCandidate) {
      pc.addIceCandidate(
        new RTCIceCandidate({
          candidate: iceCandidate.candidate,
          sdpMid: iceCandidate.sdpMid,
          sdpMLineIndex: iceCandidate.sdpMLineIndex,
        }),
      ).catch((e) => console.error('Error adding received ICE candidate:', e));
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (typeof window !== 'undefined' && !kurentoSignalingRef.current) {
      kurentoSignalingRef.current = new KurentoSignalingSocket();
      kurentoSignalingRef.current.connect();
    }

    const signalingSocket = kurentoSignalingRef.current;
    if (!signalingSocket) {
      console.warn('[GroupCall] Kurento Signaling Socket not initialized.');
      return;
    }

    const handleNewParticipantArrived = async (message: any) => {
      const newParticipantUserId = message.userId;
      const newParticipantUsername = message.userName;
      if (newParticipantUserId === myUserId) return;
      console.log(
        `[GroupCall] 새로운 참가자 도착: ${newParticipantUsername} (${newParticipantUserId})`,
      );
      setParticipants((prev) => {
        if (!prev.some((p) => p.userId === newParticipantUserId)) {
          return [
            ...prev,
            {
              userId: newParticipantUserId,
              username: newParticipantUsername,
              isWorking: false,
              cameraOn: true,
              micOn: true,
              stream: null,
            },
          ];
        }
        return prev;
      });
    };

    const handleReceiveVideoFrom = async (message: any) => {
      const remoteUserId = message.userId;
      const remoteUsername = message.sender;
      const sdpOffer = message.sdpOffer;
      console.log(`[GroupCall] ${remoteUsername} (${remoteUserId})로부터 SDP Offer 수신`);
      if (remoteUserId === myUserId) return;
      await receiveVideoFrom(remoteUserId, remoteUsername, sdpOffer);
    };

    const handleSdpAnswer = async (message: any) => {
      const remoteUserId = message.userId;
      const remoteUsername = message.sender;
      const sdpAnswer = message.sdpAnswer;
      const pc = peerConnections.current[remoteUserId];
      if (pc && sdpAnswer) {
        console.log(`[GroupCall] ${remoteUsername} (${remoteUserId})로부터 SDP Answer 수신`);
        await pc.setRemoteDescription(
          new RTCSessionDescription({ type: 'answer', sdp: sdpAnswer }),
        );
      }
    };

    const handleIceCandidate = (message: any) => {
      const remoteUserId = message.userId;
      const remoteUsername = message.sender;
      const iceCandidate = message.candidate;
      console.log(`[GroupCall] ${remoteUsername} (${remoteUserId})로부터 ICE Candidate 수신`);
      if (remoteUserId === myUserId) return;
      addIceCandidate(remoteUserId, iceCandidate);
    };

    const handleParticipantLeft = (message: any) => {
      const leftUserId = message.userId;
      const leftUsername = message.userName;
      console.log(`[GroupCall] 참가자 이탈: ${leftUsername} (${leftUserId})`);
      removeParticipant(leftUserId);
    };

    const handleError = (message: any) => {
      console.error('[GroupCall] Kurento signaling error:', message);
      setError(message.message || 'Kurento 시그널링 에러');
    };

    signalingSocket.on('newParticipantArrived', handleNewParticipantArrived);
    signalingSocket.on('receiveVideoFrom', handleReceiveVideoFrom);
    signalingSocket.on('sdpAnswer', handleSdpAnswer);
    signalingSocket.on('iceCandidate', handleIceCandidate);
    signalingSocket.on('participantLeft', handleParticipantLeft);
    signalingSocket.on('error', handleError);

    const joinRoomInternal = async () => {
      if (hasJoinedRoom.current || !signalingSocket.isConnected()) {
        return;
      }
      try {
        const stream = await getLocalMediaStream();
        if (stream) {
          signalingSocket.send('joinRoom', {
            roomName: String(roomId),
            userName: myUsername,
            userId: myUserId,
          });
          setParticipants((prev) => {
            const existing = prev.find((p) => p.userId === myUserId);
            if (!existing) {
              return [
                ...prev,
                {
                  userId: myUserId,
                  username: myUsername,
                  isWorking: false,
                  cameraOn: true,
                  micOn: true,
                  stream: stream,
                },
              ];
            }
            return prev.map((p) =>
              p.userId === myUserId ? { ...p, stream: stream, cameraOn: true, micOn: true } : p,
            ); 
          });
          hasJoinedRoom.current = true;
        }
      } catch (e) {
        console.error('Failed to get local stream or join room:', e);
        setError('Failed to access media devices or join room.');
      }
    };

    const interval = setInterval(() => {
      if (signalingSocket.isConnected() && !hasJoinedRoom.current) {
        joinRoomInternal();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      mounted = false;
      signalingSocket.send('leaveRoom', { userName: myUsername, userId: myUserId });
      Object.values(peerConnections.current).forEach((pc) => {
        pc.close();
      });
      localStream?.getTracks().forEach((track) => track.stop());
      setLocalStream(null);

      signalingSocket.close();

      signalingSocket.off('newParticipantArrived', handleNewParticipantArrived);
      signalingSocket.off('receiveVideoFrom', handleReceiveVideoFrom);
      signalingSocket.off('sdpAnswer', handleSdpAnswer);
      signalingSocket.off('iceCandidate', handleIceCandidate);
      signalingSocket.off('participantLeft', handleParticipantLeft);
      signalingSocket.off('error', handleError);
    };
  }, [
    roomId,
    myUserId,
    myUsername,
    getLocalMediaStream,
    createPeerConnection,
    receiveVideoFrom,
    addIceCandidate,
  ]);

  const addParticipant = (participant: Participant) => {
    setParticipants((prev) => {
      if (!prev.some((p) => p.userId === participant.userId)) {
        return [...prev, participant];
      }
      return prev;
    });
  };

  const removeParticipant = useCallback((userId: number) => {
    setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    const pc = peerConnections.current[userId];
    if (pc) {
      pc.close();
      delete peerConnections.current[userId];
    }
  }, []);

  const toggleMedia = useCallback(
    async (mediaType: 'video' | 'audio', status: boolean) => {
      setParticipants((prev) =>
        prev.map((p) =>
          p.userId === myUserId
            ? {
                ...p,
                ...(mediaType === 'video' && { cameraOn: status }),
                ...(mediaType === 'audio' && { micOn: status }),
              }
            : p,
        ),
      );

      // 미디어 트랙 제어 및 Kurento 메시지 전송 로직 제거 (연결만 목적)
      /*
      if (!localStream) {
        console.warn("[toggleMedia] localStream이 null입니다. 미디어를 토글할 수 없습니다.");
        return;
      }

      const track =
        mediaType === 'video'
          ? localStream.getVideoTracks()[0]
          : localStream.getAudioTracks()[0];

      if (track) {
        track.enabled = status; // 로컬 미디어 트랙 활성화/비활성화

        const signalingSocket = kurentoSignalingRef.current;
        if (signalingSocket && signalingSocket.isConnected()) {
          signalingSocket.send('toggleMediaState', {
            userId: myUserId,
            roomName: String(roomId),
            mediaType: mediaType === 'video' ? 'VIDEO' : 'AUDIO',
            status: status ? 'ON' : 'OFF',
          });
          console.log(`[GroupCall] Kurento WS: ${mediaType}에 대한 미디어 토글 전송`, {
            userId: myUserId,
            roomName: String(roomId),
            mediaType: mediaType === 'video' ? 'VIDEO' : 'AUDIO',
            status: status ? 'ON' : 'OFF',
          });
        } else {
            console.warn('[GroupCall] Kurento signaling socket is not connected, cannot send media state update.');
        }
      }
      */
    },
    [myUserId],
  );

  return {
    participants,
    localStream,
    error,
    addParticipant,
    removeParticipant,
    toggleMedia,
  };
}
