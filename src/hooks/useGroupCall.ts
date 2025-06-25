import { useState, useEffect, useRef, useCallback } from 'react';
import { KurentoSignalingSocket } from '@/apis/groupcallsignal';
import { Participant } from '@/types/webCam';

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
  const participantsRef = useRef<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const peerConnections = useRef<{ [userId: number]: RTCPeerConnection }>({});
  const kurentoSignalingRef = useRef<KurentoSignalingSocket | null>(null);
  const hasJoinedRoom = useRef(false);

  // 최신 participants 유지
  useEffect(() => {
    participantsRef.current = participants;
  }, [participants]);

  const getLocalMediaStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(mediaStream);
      setParticipants((prev) => {
        const existing = prev.find((p) => p.userId === myUserId);
        if (existing) {
          return prev.map((p) =>
            p.userId === myUserId ? { ...p, stream: mediaStream, cameraOn: true, micOn: true } : p,
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
      throw err;
    }
  }, [myUserId, myUsername]);

  const createPeerConnection = useCallback(
    async (remoteUserId: number, remoteUsername: string, stream: MediaStream) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      peerConnections.current[remoteUserId] = pc;

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          kurentoSignalingRef.current?.send('onIceCandidate', {
            candidate: {
              candidate: e.candidate.candidate,
              sdpMid: e.candidate.sdpMid,
              sdpMLineIndex: e.candidate.sdpMLineIndex,
            },
            name: myUsername,
          });
        }
      };

      pc.ontrack = (e) => {
        if (e.streams && e.streams[0]) {
          setParticipants((prev) =>
            prev.map((p) => (p.userId === remoteUserId ? { ...p, stream: e.streams[0] } : p)),
          );
        }
      };

      pc.onnegotiationneeded = async () => {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
        } catch (e) {
          console.error(e);
        }
      };

      return pc;
    },
    [myUsername],
  );

  const receiveVideoFrom = useCallback(
    async (remoteUserId: number, remoteUsername: string, sdpOffer: string) => {
      let pc = peerConnections.current[remoteUserId];
      const stream = localStream || (await getLocalMediaStream());
      if (!pc && stream) {
        pc = await createPeerConnection(remoteUserId, remoteUsername, stream);
      }
      if (!pc) return;

      await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      kurentoSignalingRef.current?.send('answer', {
        name: myUsername,
        sdpAnswer: answer.sdp,
      });
    },
    [createPeerConnection, localStream, getLocalMediaStream, myUsername],
  );

  const addIceCandidate = useCallback((username: string, candidate: any) => {
    const p = participantsRef.current.find((p) => p.username === username);
    if (!p) return;
    const pc = peerConnections.current[p.userId];
    if (pc && candidate) {
      pc.addIceCandidate(
        new RTCIceCandidate({
          candidate: candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex,
        }),
      ).catch(console.error);
    }
  }, []);

  const removeParticipant = useCallback((userId: number) => {
    setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    const pc = peerConnections.current[userId];
    if (pc) {
      pc.close();
      delete peerConnections.current[userId];
    }
  }, []);

  const toggleMedia = useCallback(
    (type: 'video' | 'audio', status: boolean) => {
      if (!localStream) return;
      if (type === 'video') {
        localStream.getVideoTracks().forEach((track) => (track.enabled = status));
      } else {
        localStream.getAudioTracks().forEach((track) => (track.enabled = status));
      }
      setParticipants((prev) =>
        prev.map((p) =>
          p.userId === myUserId
            ? { ...p, ...(type === 'video' ? { cameraOn: status } : { micOn: status }) }
            : p,
        ),
      );
    },
    [myUserId, localStream],
  );

  useEffect(() => {
    const socket = new KurentoSignalingSocket();
    kurentoSignalingRef.current = socket;
    socket.connect();

    socket.setOnOpenCallback(async () => {
      console.log('[GroupCall] WebSocket opened');
      if (!hasJoinedRoom.current) {
        try {
          const stream = await getLocalMediaStream();
          socket.send('joinRoom', {
            room: `room${roomId}`,
            name: myUsername,
          });
          hasJoinedRoom.current = true;
        } catch (e) {
          console.error('stream error:', e);
          setError('장치 접근 실패 또는 joinRoom 실패');
        }
      }
    });

    socket.on('receiveVideoFrom', async (msg) => {
      const remoteUsername = msg.sender;
      const remoteUserId =
        participantsRef.current.find((p) => p.username === remoteUsername)?.userId ??
        Math.floor(Math.random() * 1000000);

      await receiveVideoFrom(remoteUserId, remoteUsername, msg.sdpOffer);
    });

    socket.on('iceCandidate', (msg) => {
      addIceCandidate(msg.name, msg.candidate);
    });

    socket.on('participantLeft', (msg) => {
      const user = participantsRef.current.find((p) => p.username === msg.name);
      if (user) removeParticipant(user.userId);
    });

    socket.on('error', (msg) => {
      setError(msg.message || 'Kurento 시그널링 에러');
    });

    return () => {
      console.log('[GroupCall] Cleaning up...');
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      peerConnections.current = {};
      localStream?.getTracks().forEach((t) => t.stop());
      setLocalStream(null);
      hasJoinedRoom.current = false;
      socket.close();
    };
  }, []);

  const addParticipant = (participant: Participant) => {
    setParticipants((prev) =>
      prev.some((p) => p.userId === participant.userId) ? prev : [...prev, participant],
    );
  };

  const leaveRoom = () => {
    kurentoSignalingRef.current?.send('leaveRoom');
    kurentoSignalingRef.current?.close();

    localStream?.getTracks().forEach((t) => t.stop());
    setLocalStream(null);

    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    setParticipants([]);
    hasJoinedRoom.current = false;
  };

  return {
    participants,
    localStream,
    error,
    addParticipant,
    removeParticipant,
    toggleMedia,
    leaveRoom,
  };
}
