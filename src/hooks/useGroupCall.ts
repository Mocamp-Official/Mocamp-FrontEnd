import { useState, useEffect, useRef, useCallback } from 'react';
import { KurentoSignalingSocket } from '@/apis/groupcallsignal';
import { Participant } from '@/types/webCam';
import { apiWithToken } from '@/apis/axios';

interface UseGroupCallProps {
  roomId: number;
  myUserId: number;
  myUsername: string;
  initialParticipants?: Participant[];
  onRoomLeft?: () => void;
}

export function useGroupCall({
  roomId,
  myUserId,
  myUsername,
  initialParticipants = [],
  onRoomLeft,
}: UseGroupCallProps) {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const participantsRef = useRef<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const peerConnections = useRef<{ [userId: number]: RTCPeerConnection }>({});
  const kurentoSignalingRef = useRef<KurentoSignalingSocket | null>(null);
  const hasJoinedRoom = useRef(false);

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
          setParticipants((prev) => {
            const existingParticipant = prev.find((p) => p.userId === remoteUserId);
            if (existingParticipant) {
              return prev.map((p) =>
                p.userId === remoteUserId ? { ...p, stream: e.streams[0] } : p,
              );
            } else {
              return [
                ...prev,
                {
                  userId: remoteUserId,
                  username: remoteUsername,
                  isWorking: false,
                  cameraOn: true,
                  micOn: true,
                  stream: e.streams[0],
                },
              ];
            }
          });
        }
      };

      pc.onnegotiationneeded = async () => {
        try {
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
      if (!pc) {
        const streamToUse = localStream || (await getLocalMediaStream());
        if (!streamToUse) {
          console.error('[Kurento] PeerConnection 생성을 위한 로컬 스트림을 사용할 수 없습니다.');
          return;
        }
        pc = await createPeerConnection(remoteUserId, remoteUsername, streamToUse);
      }
      if (!pc) {
        console.error('[Kurento] PeerConnection 생성 실패:', remoteUsername);
        return;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        kurentoSignalingRef.current?.send('answer', {
          name: myUsername,
          sdpAnswer: answer.sdp,
        });
        console.log(`[Kurento] ${remoteUsername}에게 응답 전송`);
      } catch (e) {
        console.error(`${remoteUsername}으로부터 오퍼 처리 중 오류 발생:`, e);
      }
    },
    [createPeerConnection, localStream, getLocalMediaStream, myUsername],
  );

  const addIceCandidate = useCallback((username: string, candidate: any) => {
    const p = participantsRef.current.find((p) => p.username === username);
    if (!p) {
      console.warn(`[Kurento] ICE 후보자를 위한 참가자 ${username}을(를) 찾을 수 없습니다.`);
      return;
    }
    const pc = peerConnections.current[p.userId];
    if (pc && candidate) {
      try {
        const iceCandidate = new RTCIceCandidate({
          candidate: candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex,
        });
        pc.addIceCandidate(iceCandidate).catch((e) =>
          console.error('[Kurento] ICE 후보자 추가 오류:', e),
        );
        console.log(`[Kurento] ${username}을(를) 위한 ICE 후보자 추가됨`);
      } catch (e) {
        console.error('[Kurento] 잘못된 ICE 후보자 형식 또는 오류:', e);
      }
    }
  }, []);

  const removeParticipant = useCallback((userId: number) => {
    console.log(`[GroupCall] 참가자 ${userId}이(가) 방을 나갔습니다.`);
    setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    const pc = peerConnections.current[userId];
    if (pc) {
      pc.close();
      delete peerConnections.current[userId];
      console.log(`[GroupCall] ${userId}에 대한 PeerConnection이(가) 닫혔습니다.`);
    }
  }, []);

  const toggleMedia = useCallback(
    (type: 'video' | 'audio', status: boolean) => {
      if (!localStream) {
        console.warn('[GroupCall] 미디어를 토글할 로컬 스트림을 사용할 수 없습니다.');
        return;
      }
      if (type === 'video') {
        localStream.getVideoTracks().forEach((track) => (track.enabled = status));
        console.log(`[GroupCall] 로컬 비디오 상태 변경: ${status}`);
      } else {
        localStream.getAudioTracks().forEach((track) => (track.enabled = status));
        console.log(`[GroupCall] 로컬 오디오 상태 변경: ${status}`);
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

  // 방을 나가는 함수
  const leaveRoom = useCallback(async () => {
    console.log('[GroupCall] 방을 나가려고 시도 중...');
    if (kurentoSignalingRef.current) {
      kurentoSignalingRef.current.send('leaveRoom');
      kurentoSignalingRef.current.close();
      kurentoSignalingRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      setLocalStream(null);
      console.log('[GroupCall] 로컬 스트림 중지됨.');
    }

    Object.values(peerConnections.current).forEach((pc) => {
      pc.close();
      console.log('[GroupCall] Peer Connection이 닫혔습니다.');
    });
    peerConnections.current = {};
    setParticipants([]);
    hasJoinedRoom.current = false;
    setError(null);


    // 방 나가기 API 호출 미치겠음 왜 안될까
    // try {
    //   await apiWithToken.post(`/api/room/exit/${roomId}`);
    //   console.log(`[GroupCall] 방 ${roomId}에 대한 HTTP 방 나가기 API 호출됨`);
    // } catch (apiError) {
    //   console.error(`[GroupCall] 방 ${roomId}에 대한 방 나가기 API 호출 실패:`, apiError);
    // }

    if (onRoomLeft) {
      onRoomLeft();
    }
  }, [localStream, roomId, onRoomLeft]);

  useEffect(() => {
    const socket = new KurentoSignalingSocket();
    kurentoSignalingRef.current = socket;
    socket.connect();

    socket.setOnOpenCallback(async () => {
      console.log('[GroupCall] WebSocket 연결됨');
      if (!hasJoinedRoom.current) {
        try {
          const stream = await getLocalMediaStream();
          if (stream) {
            socket.send('joinRoom', {
              room: `room${roomId}`,
              name: myUsername,
            });
            hasJoinedRoom.current = true;
            console.log(`[GroupCall] '${myUsername}'으로 방 'room${roomId}'에 참여했습니다.`);
          }
        } catch (e) {
          console.error('[GroupCall] 스트림 또는 joinRoom 오류:', e);
          setError('장치 접근 실패 또는 joinRoom 실패');
        }
      }
    });

    socket.on('receiveVideoFrom', async (msg) => {
      const remoteUsername = msg.sender;
      let remoteParticipant = participantsRef.current.find((p) => p.username === remoteUsername);
      let remoteUserId = remoteParticipant ? remoteParticipant.userId : 0;

      if (!remoteParticipant) {
        remoteUserId =
          remoteUsername
            .split('')
            .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % 10000;
        console.warn(`[GroupCall] ${remoteUsername}에 대한 임시 사용자 ID ${remoteUserId} 할당됨`);
        setParticipants((prev) => [
          ...prev,
          {
            userId: remoteUserId,
            username: remoteUsername,
            isWorking: false,
            cameraOn: true,
            micOn: true,
            stream: null,
          },
        ]);
      }
      await receiveVideoFrom(remoteUserId, remoteUsername, msg.sdpOffer);
    });

    socket.on('iceCandidate', (msg) => {
      addIceCandidate(msg.name, msg.candidate);
    });

    socket.on('participantLeft', (msg) => {
      const user = participantsRef.current.find((p) => p.username === msg.name);
      if (user) {
        removeParticipant(user.userId);
      } else {
        console.warn(`[GroupCall] 알 수 없는 사용자 ${msg.name}에 대한 participantLeft 수신됨`);
      }
    });

    socket.on('error', (msg) => {
      setError(msg.message || 'Kurento 시그널링 오류');
      console.error('[GroupCall] Kurento 시그널링 오류:', msg);
    });

    return () => {
      console.log('[GroupCall] 언마운트 시 정리 중...');
    };
  }, [
    roomId,
    myUsername,
    getLocalMediaStream,
    receiveVideoFrom,
    addIceCandidate,
    removeParticipant,
    onRoomLeft,
  ]);

  const addParticipant = (participant: Participant) => {
    setParticipants((prev) =>
      prev.some((p) => p.userId === participant.userId) ? prev : [...prev, participant],
    );
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
