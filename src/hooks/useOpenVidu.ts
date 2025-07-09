import { useEffect, useState, useRef } from 'react';
import { OpenVidu, Session, Publisher, StreamManager } from 'openvidu-browser';
import { initOpenVidu, getOVInstance } from '@/libs/openviduClient';
import { apiWithToken } from '@/apis/axios';

interface UseOpenViduParams {
  sessionId: string;
  userName: string;
}

export const useOpenVidu = ({ sessionId, userName }: UseOpenViduParams) => {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [micStatus, setMicStatus] = useState(true);
  const [camStatus, setCamStatus] = useState(true);

  const OVRef = useRef<OpenVidu | null>(null);

  useEffect(() => {
    if (!OVRef.current) {
      OVRef.current = initOpenVidu();
    }

    if (!sessionId || !userName) return;

    const ov = OVRef.current!;
    const newSession = ov.initSession();

    newSession.on('streamCreated', (event) => {
      const stream = event.stream;

      if (
        !stream ||
        !stream.connection ||
        !stream.connection.connectionId ||
        !stream.connection.data
      ) {
        console.warn('[OpenVidu] Skipping subscription: invalid stream or connection data');
        return;
      }

      const newConnectionId = stream.connection.connectionId;

      setSubscribers((prev) => {
        const exists = prev.some((sub) => sub.stream.connection.connectionId === newConnectionId);
        if (exists) return prev;

        try {
          const subscriber = newSession.subscribe(stream, undefined);
          return [...prev, subscriber];
        } catch (error) {
          console.error('[OpenVidu] subscribe() failed:', error);
          return prev;
        }
      });
    });

    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) =>
        prev.filter(
          (sub) => sub.stream.connection.connectionId !== event.stream.connection.connectionId,
        ),
      );
    });

    setSession(newSession);

    return () => {
      newSession.disconnect();
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [sessionId, userName]);

  const joinSession = async () => {
    if (!session || !userName) {
      console.warn('[OpenVidu] joinSession: Session or userName not ready.', session, userName);
      return;
    }

    try {
      const sessionRes = await apiWithToken.post('/api/sessions', {
        customSessionId: sessionId,
      });
      const sessionIdFromServer = sessionRes.data;

      const tokenRes = await apiWithToken.post(`/api/sessions/${sessionIdFromServer}/connections`);
      const token = tokenRes.data;

      await session.connect(token, { clientData: userName });

      const ovInstance = getOVInstance();
      if (!ovInstance) {
        console.error('[OpenVidu] OpenVidu instance not initialized');
        return;
      }

      const newPublisher = ovInstance.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: micStatus,
        publishVideo: camStatus,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
      });

      await session.publish(newPublisher);
      console.log('[OpenVidu] Publisher successfully published');
      setPublisher(newPublisher);
    } catch (error) {
      console.error('[OpenVidu] joinSession error:', error);
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  };

// 미디어 스트림 트랙 스탑

// 카메라
const toggleCamera = () => {
  if (!publisher) return;

  const isVideoOn = publisher.stream.videoActive;

  publisher.publishVideo(!isVideoOn); 
  setCamStatus(!isVideoOn);
};

// 마이크
const toggleMic = () => {
  if (!publisher) return;

  const isAudioOn = publisher.stream.audioActive;

  publisher.publishAudio(!isAudioOn); 
  setMicStatus(!isAudioOn);
};


  return {
    session,
    publisher,
    subscribers,
    joinSession,
    leaveSession,
    toggleCamera,
    toggleMic,
    micStatus,
    camStatus,
  };
};