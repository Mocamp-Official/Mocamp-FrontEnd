// libs/socket.ts
import { Client } from '@stomp/stompjs';

export const getStompClient = () => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('accessToken');

  const client = new Client({
    brokerURL: 'wss://mocamp.shop/ws',
    connectHeaders: {
      Authorization: `${token}`,
    },
    reconnectDelay: 5000,
    debug: (msg) => {
      console.log('[STOMP DEBUG]', msg);
    },
  });

  return client;
};
