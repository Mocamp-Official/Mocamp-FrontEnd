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

    const currentOV = OVRef.current;

    if (!currentOV || !sessionId || !userName) {
      if (session) {
        session.disconnect();
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
      return;
    }

    const newSession = currentOV.initSession();

    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });

    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) => prev.filter((sub) => sub !== event.stream.streamManager));
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
      // ✅ 세션 생성 + 토큰 발급 axios 요청
      const sessionRes = await apiWithToken.post('/api/sessions', {
        customSessionId: sessionId,
      });
      const sessionIdFromServer = sessionRes.data; // text/plain 이면 sessionId가 문자열로 반환됨

      const tokenRes = await apiWithToken.post(`/api/sessions/${sessionIdFromServer}/connections`);
      const token = tokenRes.data; // 역시 text/plain 토큰 문자열

      // ✅ 세션 연결
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
