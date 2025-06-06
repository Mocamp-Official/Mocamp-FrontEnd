import { useEffect } from 'react';
import { getStompClient } from '@/libs/socket';

export const useRoomSubscriber = (roomId: string, onMessage: (data: any) => void) => {
  useEffect(() => {
    const client = getStompClient();
    if (!client) return;

    client.onConnect = () => {
      console.log('✅ 구독 연결 성공');
      client.subscribe(`/sub/data/${roomId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessage(data);
      });
    };

    client.onStompError = (frame) => {
      console.error('❌ STOMP ERROR:', frame);
    };

    client.onWebSocketClose = () => {
      console.warn('🔌 WebSocket 연결 종료');
    };

    client.activate();

    return () => {
      client.deactivate();
      console.log('🔁 구독 해제');
    };
  }, [roomId, onMessage]);
};
