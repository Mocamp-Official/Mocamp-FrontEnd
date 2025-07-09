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

  const OVRef = useRef<OpenVidu | null>(null);

  useEffect(() => {
    if (!OVRef.current) {
      OVRef.current = initOpenVidu();
    }

    if (!sessionId || !userName) return;

    const ov = OVRef.current!;
    const newSession = ov.initSession();

    newSession.on('streamCreated', (event) => {
      const newConnectionId = event.stream.connection.connectionId;
      setSubscribers((prev) => {
        const exists = prev.some((sub) => sub.stream.connection.connectionId === newConnectionId);
        if (exists) return prev;
        const subscriber = newSession.subscribe(event.stream, undefined);
        return [...prev, subscriber];
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
      if (newSession) {
        newSession.disconnect();
      }
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
      // 세션 생성 + 토큰 발급 axios 요청
      const sessionRes = await apiWithToken.post('/api/sessions', {
        customSessionId: sessionId,
      });
      const sessionIdFromServer = sessionRes.data;

      const tokenRes = await apiWithToken.post(`/api/sessions/${sessionIdFromServer}/connections`);
      const token = tokenRes.data;

      // 세션 연결 - 연결 확인하면 수정좀..(해상도)
      await session.connect(token, { clientData: userName });

      const ovInstance = getOVInstance();
      if (!ovInstance) {
        console.error('[OpenVidu] OpenVidu instance not initialized');
        return;
      }

      const newPublisher = ovInstance.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
      });

      session.publish(newPublisher);
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

  return {
    session,
    publisher,
    subscribers,
    joinSession,
    leaveSession,
  };
};
