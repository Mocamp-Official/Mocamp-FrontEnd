import { useState, useEffect, useRef, useCallback } from 'react';
import { KurentoSignalingSocket } from '@/apis/groupcallsignal';
import { Participant } from '@/types/webCam';
import { apiWithToken } from '@/apis/axios';
import { DelegationUpdateResponse } from '@/types/delegation';

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
  const [adminUsername, setAdminUsername] = useState<string>(myUsername);
  const [isDelegationOpen, setIsDelegationOpen] = useState<boolean>(false);
  const [selectedDelegateId, setSelectedDelegateId] = useState<number | null>(null);

  const peerConnections = useRef<{ [userId: number]: RTCPeerConnection }>({});
  const kurentoSignalingRef = useRef<KurentoSignalingSocket | null>(null);
  const hasJoinedRoom = useRef(false);

  useEffect(() => {
    participantsRef.current = participants;
  }, [participants]);

  const getLocalMediaStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 270 },
        audio: true,
      });
      setLocalStream(mediaStream);

      setParticipants((prev) => {
        const existing = prev.find((p) => p.userId === myUserId);
        if (existing) {
          return prev.map((p) =>
            p.userId === myUserId
              ? { ...p, stream: mediaStream, camStatus: true, micStauts: true }
              : p,
          );
        } else {
          return [
            ...prev,
            {
              userId: myUserId,
              username: myUsername,
              isWorking: true,
              camStatus: true,
              micStatus: true,
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

  const updateParticipantStatus = useCallback(
    (payload: { workStatus?: boolean; camStatus?: boolean; micStatus?: boolean }) => {
      kurentoSignalingRef.current?.send(`/pub/data/work-status/${roomId}`, {
        userId: myUserId,
        ...payload,
      });
    },
    [myUserId, roomId],
  );

  const setParticipantWorkStatus = useCallback(
    (status: boolean) => {
      setParticipants((prev) =>
        prev.map((p) => (p.userId === myUserId ? { ...p, isWorking: status } : p)),
      );
      updateParticipantStatus({ workStatus: status });
    },
    [updateParticipantStatus, myUserId],
  );

  const toggleMedia = useCallback(
    (type: 'video' | 'audio', status: boolean) => {
      if (!localStream) return;

      if (type === 'video') {
        localStream.getVideoTracks().forEach((track) => (track.enabled = status));
        setParticipants((prev) =>
          prev.map((p) => (p.userId === myUserId ? { ...p, camStatus: status } : p)),
        );
        updateParticipantStatus({ camStatus: status });
      } else {
        localStream.getAudioTracks().forEach((track) => (track.enabled = status));
        setParticipants((prev) =>
          prev.map((p) => (p.userId === myUserId ? { ...p, micStatus: status } : p)),
        );
        updateParticipantStatus({ micStatus: status });
      }
    },
    [localStream, myUserId, updateParticipantStatus],
  );

  const delegateAdmin = useCallback(
    (newAdminId: number) => {
      kurentoSignalingRef.current?.send(`/pub/data/delegation/${roomId}`, {
        newAdminId,
      });
    },
    [roomId],
  );

  const openDelegationModal = useCallback(() => {
    if (adminUsername === myUsername) {
      setIsDelegationOpen(true);
    }
  }, [adminUsername, myUsername]);

  const handleSelectDelegate = useCallback((userId: number) => {
    setSelectedDelegateId(userId);
  }, []);

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
                  stream: e.streams[0],
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

  const receiveVideoFrom = useCallback(
    async (remoteUserId: number, remoteUsername: string, sdpOffer: string) => {
      let pc = peerConnections.current[remoteUserId];
      if (!pc) {
        const streamToUse = localStream || (await getLocalMediaStream());
        if (!streamToUse) return;
        pc = await createPeerConnection(remoteUserId, remoteUsername, streamToUse);
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdpOffer }));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        kurentoSignalingRef.current?.send('answer', {
          name: myUsername,
          sdpAnswer: answer.sdp,
        });
      } catch (e) {
        console.error('[Kurento] SDP 처리 실패:', e);
      }
    },
    [createPeerConnection, localStream, getLocalMediaStream, myUsername],
  );

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

  const removeParticipant = useCallback((userId: number) => {
    setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    const pc = peerConnections.current[userId];
    if (pc) {
      pc.close();
      delete peerConnections.current[userId];
    }
  }, []);

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
      if (!hasJoinedRoom.current) {
        try {
          const stream = await getLocalMediaStream();
          if (stream) {
            socket.send('joinRoom', { room: `room${roomId}`, name: myUsername });
            hasJoinedRoom.current = true;
          }
        } catch (e) {
          setError('장치 접근 실패');
        }
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
      const existing = participantsRef.current.find((p) => p.username === remoteUsername);
      let remoteUserId =
        existing?.userId ??
        remoteUsername.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0) %
          10000;

      if (!existing) {
        setParticipants((prev) => [
          ...prev,
          {
            userId: remoteUserId,
            username: remoteUsername,
            camStatus: true,
            micStatus: true,
            stream: null,
          },
        ]);
      }
      await receiveVideoFrom(remoteUserId, remoteUsername, msg.sdpOffer);
    });

    socket.on('iceCandidate', (msg) => addIceCandidate(msg.name, msg.candidate));

    socket.on('participantLeft', (msg) => {
      const user = participantsRef.current.find((p) => p.username === msg.name);
      if (user) removeParticipant(user.userId);
    });

    socket.on('newParticipantArrived', (msg) => {
      const { name } = msg;
      if (!name) return;

      setParticipants((prev) => {
        const exists = prev.find((p) => p.username === name);
        if (exists) return prev;

        const userId =
          name.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0) % 10000;

        return [
          ...prev,
          {
            userId,
            username: name,
            camStatus: true,
            micStatus: true,
            isWorking: true,
            stream: null,
          },
        ];
      });
    });

    socket.on('error', (msg) => {
      setError(msg.message || '시그널링 오류');
    });

    socket.on(
      'roomParticipants',
      (msg: { participants: Participant[]; adminUsername?: string }) => {
        setParticipants(
          msg.participants.map((p) => ({
            ...p,
            stream: null,
          })),
        );
        if (msg.adminUsername) {
          setAdminUsername(msg.adminUsername);
        } else if (
          msg.participants.length > 0 &&
          !msg.participants.some((p) => p.username === adminUsername)
        ) {
          setAdminUsername(msg.participants[0].username);
        }
      },
    );

    socket.on('STATUS_UPDATED', (msg) => {
      const { userId, workStatus, camStatus, micStatus } = msg;
      setParticipants((prev) =>
        prev.map((p) =>
          p.userId === userId ? { ...p, isWorking: workStatus, camStatus, micStatus } : p,
        ),
      );
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
  }, [roomId, myUsername, getLocalMediaStream]);

  const addParticipant = (participant: Participant) => {
    setParticipants((prev) =>
      prev.some((p) => p.userId === participant.userId) ? prev : [...prev, participant],
    );
  };

  return {
    participants,
    localStream,
    error,
    adminUsername,
    isDelegationOpen,
    setAdminUsername,
    setIsDelegationOpen,
    openDelegationModal,
    delegateAdmin,
    toggleMedia,
    leaveRoom,
    addParticipant,
    setParticipantWorkStatus,
  };
}
