import { useEffect, useState, useRef } from 'react'; // useRef import 추가
import { OpenVidu, Session, Publisher, StreamManager } from 'openvidu-browser';
import { initOpenVidu, getOVInstance } from '@/libs/openviduClient';

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

    // 기존 세션이 있다면 먼저 정리합니다. (의존성 배열에 값이 바뀌어 이 useEffect가 재실행될 때)
    // 이 부분은 클린업 함수에서 더 잘 처리됩니다.
    // if (session) {
    //   session.disconnect();
    // }

    setSession(newSession);

    // 클린업 함수는 현재 유효한 세션을 정리해야 합니다.
    return () => {
      // 컴포넌트 언마운트 시 또는 의존성 배열 값이 변경되어 useEffect가 재실행될 때 실행됩니다.
      if (newSession) { // 이 클린업이 연결된 newSession을 참조합니다.
        newSession.disconnect();
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [sessionId, userName]); // 의존성 배열에 sessionId와 userName 유지

  // ✅ 세션 입장
  const joinSession = async () => {
    // 세션이 없거나 사용자 이름이 없다면 함수를 종료합니다.
    if (!session || !userName) {
      console.warn("[OpenVidu] joinSession: Session or userName not ready. Session:", session, "UserName:", userName);
      return;
    }

    try {
      // OpenVidu 토큰 요청
      const res = await fetch('/api/openvidu-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const { token } = await res.json();

      // 세션 연결
      await session.connect(token, { clientData: userName });

      // OpenVidu 인스턴스 가져오기 (이미 useEffect에서 초기화되었을 것임)
      const ovInstance = getOVInstance(); // getOVInstance는 initOpenVidu에서 설정된 OV를 반환합니다.
      if (!ovInstance) {
          console.error("[OpenVidu] joinSession: OpenVidu instance not initialized.");
          return;
      }

      // 퍼블리셔 초기화 및 게시
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
    } catch (err) {
      console.error('[OpenVidu] joinSession error:', err);
    }
  };

  // ✅ 세션 나가기
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