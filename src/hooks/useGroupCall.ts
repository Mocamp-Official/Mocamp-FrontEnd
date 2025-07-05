import { useState, useEffect, useRef, useCallback } from 'react';
import { KurentoSignalingSocket } from '@/libs/groupcallsignal';
import { Participant } from '@/types/room';
import { apiWithToken } from '@/apis/axios';
import { DelegationUpdateResponse } from '@/types/delegation';


interface UseGroupCallProps {
  roomId: number;
  myUserId: number;
  myUsername: string;
  camStatus: boolean;
  micStatus: boolean;
  initialParticipants?: Participant[];
  onRoomLeft?: () => void;
}

export function useGroupCall({
  roomId,
  myUserId,
  myUsername,
  camStatus,
  micStatus,
  initialParticipants = [],
  onRoomLeft,
}: UseGroupCallProps) {
  // 참가자 목록 상태 및 참조
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const participantsRef = useRef<Participant[]>([]);

  // 로컬 스트림 (캠/마이크)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 방장 정보
  const [adminUsername, setAdminUsername] = useState<string>(myUsername);
  const [isDelegationOpen, setIsDelegationOpen] = useState<boolean>(false);
  const [selectedDelegateId, setSelectedDelegateId] = useState<number | null>(null);

  // 피어 연결 및 시그널링 소켓 참조
  const peerConnections = useRef<{ [userId: number]: RTCPeerConnection }>({});
  const kurentoSignalingRef = useRef<KurentoSignalingSocket | null>(null);
  const hasJoinedRoom = useRef(false);

  // 참가자 최신 상태 유지
  useEffect(() => {
    participantsRef.current = participants;
  }, [participants]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: roomData } = await apiWithToken.get(`/api/room/${roomId}`);
        const { data: participantsData } = await apiWithToken.get(
          `/api/room/participant/${roomId}`,
        );

        setParticipants(participantsData);
        setAdminUsername(roomData.adminUsername ?? myUsername);
      } catch (err: any) {
        setError(err.message || '데이터 불러오기 실패');
      }
    };

    fetchData();
  }, [roomId]);

  // 로컬 미디어(캠/마이크) 스트림 가져오기
  const getLocalMediaStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 270 },
        audio: micStatus,
      });

      if (!camStatus) {
        mediaStream.getVideoTracks().forEach((track) => (track.enabled = false));
      }

      return mediaStream;
    } catch (err: any) {
      setError(err.message || '카메라/마이크 접근 실패');
      throw err;
    }
  }, [camStatus, micStatus, myUserId, myUsername, adminUsername]);

  // 작업 상태 변경 &  서버 전송
  const setParticipantWorkStatus = useCallback(
    (status: boolean) => {
      setParticipants((prev) =>
        prev.map((p) => (p.userId === myUserId ? { ...p, isWorking: status } : p)),
      );
      kurentoSignalingRef.current?.send(`/pub/data/work-status/${roomId}`, {
        userId: myUserId,
        workStatus: status,
      });
    },
    [myUserId, roomId],
  );
  // 캠/마이크 토글 (켜기/끄기) 처리
  const toggleMedia = useCallback(
    (type: 'video' | 'audio', status: boolean) => {
      if (!localStream) return;

      if (type === 'video') {
        localStream.getVideoTracks().forEach((track) => (track.enabled = status));
        setParticipants((prev) =>
          prev.map((p) => (p.userId === myUserId ? { ...p, camStatus: status } : p)),
        );

        kurentoSignalingRef.current?.send(`/pub/data/cam-status/${roomId}`, {
          userId: myUserId,
          camStatus: status,
        });
      } else {
        localStream.getAudioTracks().forEach((track) => (track.enabled = status));
        setParticipants((prev) =>
          prev.map((p) => (p.userId === myUserId ? { ...p, micStatus: status } : p)),
        );

        kurentoSignalingRef.current?.send(`/pub/data/mic-status/${roomId}`, {
          userId: myUserId,
          micStatus: status,
        });
      }
    },
    [localStream, myUserId, roomId],
  );
  // 방장 위임 요청 전송
  const delegateAdmin = useCallback(
    (newAdminId: number) => {
      kurentoSignalingRef.current?.send(`/pub/data/delegation/${roomId}`, {
        newAdminId,
      });
    },
    [roomId],
  );

  // 방장 위임 모달 열기
  const openDelegationModal = useCallback(() => {
    setIsDelegationOpen(true);
  }, []);

  const handleSelectDelegate = useCallback((userId: number) => {
    setSelectedDelegateId(userId);
  }, []);

  // 유저와 P2P 연결 생성(피어 생성) + onicecandidate, ontrack 핸들링
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
        console.log(`[RTC] ontrack triggered for user: ${remoteUserId}`, e.streams[0]);
        if (e.streams && e.streams[0]) {
          setParticipants((prev) => {
            const existing = prev.find((p) => p.userId === remoteUserId);
            if (existing) {
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
                  camStatus: true,
                  micStatus: true,
                  isAdmin: false,
                  stream: e.streams[0],
                  goals: [],
                  resolution: '',
                  isMyGoal: false,
                  isSecret: false,
                },
              ];
            }
          });
        }
      };

      return pc;
    },
    [myUsername],
  );

  //원격 유저의 sdpOffer 수신 시 SDP & answer 전송
  const receiveVideoFrom = useCallback(
    async (remoteUserId: number, remoteUsername: string, sdpOffer: string) => {
      try {
        let pc = peerConnections.current[remoteUserId];

        // 피어가 없으면 새로 생성
        if (!pc) {
          const streamToUse = localStream || (await getLocalMediaStream());
          if (!streamToUse) {
            console.warn('[RTC] 로컬 스트림을 가져올 수 없어 피어 연결 중단');
            return;
          }

          pc = await createPeerConnection(remoteUserId, remoteUsername, streamToUse);
          peerConnections.current[remoteUserId] = pc;
        }

        console.log(`[RTC] [${remoteUsername}] setRemoteDescription 시작`);

        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        console.log(`[RTC] [${remoteUsername}] answer 생성 및 전송`);
        kurentoSignalingRef.current?.send('answer', {
          name: myUsername,
          sdpAnswer: answer.sdp,
        });
      } catch (e) {
        console.error(`[Kurento] receiveVideoFrom 처리 실패 (${remoteUsername})`, e);
      }
    },
    [createPeerConnection, localStream, getLocalMediaStream, myUsername],
  );

  //ICE Candidate 수신 시 피어 연결 추가
  const addIceCandidate = useCallback((username: string, candidate: any) => {
    const user = participantsRef.current.find((p) => p.username === username);
    if (!user) return;

    const pc = peerConnections.current[user.userId];
    if (pc && candidate) {
      try {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error('[Kurento] ICE 추가 실패:', e);
      }
    }
  }, []);

  // 참가자 상태 업데이트
  const addParticipant = (participant: Participant) => {
    setParticipants((prev) =>
      prev.some((p) => p.userId === participant.userId) ? prev : [...prev, participant],
    );
  };

  //유저 퇴장 처리 + 피어 연결 해제
  const removeParticipant = useCallback((userId: number) => {
    setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    const pc = peerConnections.current[userId];
    if (pc) {
      pc.close();
      delete peerConnections.current[userId];
    }
  }, []);

  // 방 퇴장 처리, 로컬 트랙 stop, 연결 해제, 상태 초기화
  const leaveRoom = useCallback(async () => {
    if (kurentoSignalingRef.current) {
      kurentoSignalingRef.current.send('leaveRoom');
      kurentoSignalingRef.current.close();
      kurentoSignalingRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      setLocalStream(null);
    }

    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    setParticipants([]);
    hasJoinedRoom.current = false;
    setError(null);

    if (onRoomLeft) onRoomLeft();
  }, [localStream, roomId, onRoomLeft]);

  // 소켓 연결 후 초기 참가 및 각 시그널링 메시지 처리
  useEffect(() => {
    if (!adminUsername && myUserId === 1) {
      setAdminUsername(myUsername);
    }
  }, [adminUsername, myUserId, myUsername]);

  useEffect(() => {
    const socket = new KurentoSignalingSocket();
    kurentoSignalingRef.current = socket;
    socket.connect();

    

    socket.setOnOpenCallback(async () => {
      if (hasJoinedRoom.current) return;

      try {
        // 1. 참가자 목록 먼저 불러오기
        if (!roomId || isNaN(Number(roomId))) {
  console.error('[RTC] 유효하지 않은 roomId:', roomId);
  return;
}

const res = await apiWithToken.get(`/api/room/participant/${roomId}`);
const participantsData = res.data?.message;

if (!Array.isArray(participantsData)) {
  console.error('[RTC] 참가자 목록이 배열이 아님:', participantsData);
  return;
}

        if (!Array.isArray(participantsData)) {
          console.error('[RTC] 참가자 목록이 배열이 아님:', participantsData);
          return;
        }
        // 2. 참가자 상태 업데이트
        setParticipants(participantsData);
        participantsRef.current = participantsData;

        // 3. 내 로컬 미디어 획득
        const stream = await getLocalMediaStream();
        setLocalStream(stream);

        // 4. 내 정보 생성 및 반영
        const myInfo: Participant = {
          userId: myUserId,
          username: myUsername,
          isWorking: true,
          camStatus,
          micStatus,
          isAdmin: true,
          stream,
          goals: [],
          resolution: '',
          isMyGoal: true,
          isSecret: false,
        };

        setParticipants((prev) => {
  const exists = prev.some((p) => p.userId === myUserId);
  if (exists) return prev;
  return [...prev, myInfo];
});
        participantsRef.current = [...participantsRef.current, myInfo];

        // 5. joinRoom 전송
        socket.send('joinRoom', { room: `room${roomId}`, name: myUsername });
        hasJoinedRoom.current = true;
      } catch (e) {
        console.error('[RTC] 초기 설정 실패:', e);
        setError('초기 설정 실패');
      }
    });

    socket.on(
      'ADMIN_UPDATED',
      (msg: DelegationUpdateResponse & { type: string; previousAdminUsername: string }) => {
        setAdminUsername(msg.newAdminUsername);
        setParticipants((prev) =>
          prev.map((p) => ({
            ...p,
            isAdmin: p.username === msg.newAdminUsername,
          })),
        );
      },
    );

    socket.on('receiveVideoFrom', async (msg) => {
      const remoteUsername = msg.sender;
      console.log('[RTC] receiveVideoFrom from:', remoteUsername);

      const existing = participantsRef.current.find((p) => p.username === remoteUsername);
      console.log('[RTC] matched participant for sender:', existing);

      if (!existing) {
        console.warn('[RTC] receiveVideoFrom: 참가자 정보 없음. WebRTC 연결 보류:', remoteUsername);
        return;
      }

      const remoteUserId = existing.userId;
      await receiveVideoFrom(remoteUserId, remoteUsername, msg.sdpOffer);
    });

    socket.on('iceCandidate', (msg) => {
      addIceCandidate(msg.name, msg.candidate);
    });

    socket.on('participantLeft', (msg) => {
      const user = participantsRef.current.find((p) => p.username === msg.name);
      if (user) {
        removeParticipant(user.userId);
      }
    });

    socket.on('newParticipantArrived', (msg) => {
        const { name } = msg;
        if (!name) return;

       const exists = participantsRef.current.find((p) => p.username === name);
  if (exists) return;

      const userId =
        name.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0) % 10000;

      const newParticipant = {
        userId,
        username: name,
        camStatus: true,
        micStatus: true,
        isWorking: true,
        isAdmin: name === adminUsername,
        stream: null,
        goals: [],
        resolution: '',
        isMyGoal: false,
        isSecret: false,
      };

       setParticipants((prev) => {
    const alreadyExists = prev.some((p) => p.username === name);
    if (alreadyExists) return prev;
    return [...prev, newParticipant];
  });

      participantsRef.current = [...participantsRef.current, newParticipant];
    });

    socket.on('error', (msg) => {
      setError(msg.message || '시그널링 오류');
    });

    socket.on('roomParticipants', (msg) => {
      const effectiveAdmin = msg.adminUsername || msg.participants[0]?.username || '';
      setAdminUsername(effectiveAdmin);

      const myInfo = participantsRef.current.find((p: Participant) => p.userId === myUserId);
      const others = msg.participants.filter((p: Participant) => p.userId !== myUserId);

      setParticipants([
        ...(myInfo ? [myInfo] : []),
        ...others.map((p: Participant) => ({
          ...p,
          stream: null,
          isAdmin: p.isAdmin ?? p.username === effectiveAdmin,
        })),
      ]);
    });

    socket.on(
      'WORK_STATUS_UPDATED',
      (msg: { type: string; userId: number; workStatus: boolean }) => {
        setParticipants((prev) =>
          prev.map((p) => (p.userId === msg.userId ? { ...p, isWorking: msg.workStatus } : p)),
        );
      },
    );

    socket.on('CAM_STATUS_UPDATED', (msg: { type: string; userId: number; camStatus: boolean }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.userId === msg.userId ? { ...p, camStatus: msg.camStatus } : p)),
      );
    });

    socket.on('MIC_STATUS_UPDATED', (msg: { type: string; userId: number; micStatus: boolean }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.userId === msg.userId ? { ...p, micStatus: msg.micStatus } : p)),
      );
    });

    return () => {
      socket.close();
    };
  }, [roomId, myUserId, myUsername, camStatus, micStatus, getLocalMediaStream]);

  return {
    participants,
    localStream,
    error,
    adminUsername,
    isDelegationOpen,
    setIsDelegationOpen,
    selectedDelegateId,
    setSelectedDelegateId,
    setAdminUsername,
    openDelegationModal,
    delegateAdmin,
    toggleMedia,
    leaveRoom,
    addParticipant,
    setParticipants,
    setParticipantWorkStatus,
  };
}
