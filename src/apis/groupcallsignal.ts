import { getAccessToken } from '@/utils/token';

const WS_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL &&
  process.env.NEXT_PUBLIC_BACKEND_URL.replace(/^http/, 'ws') + '/groupcall';

export class KurentoSignalingSocket {
  // 웹소켓 연결 인스턴스
  private ws: WebSocket | null = null;
  // 웹소켓 연결 상태를 나타내는 플래그
  private connected = false;
  // 전송을 시도한 메시지
  private sendQueue: Array<any> = [];
  // 쿠렌토 메시지 'id' 필드(메시지 타입)에 따라 실행될 핸들러 함수들을 저장하는 맵
  private messageHandlers: Map<string, Array<(data: any) => void>> = new Map();

  /**
   * KurentoSignalingSocket 클래스의 생성자
   * 웹소켓 인스턴스는 'connect()' 메서드가 호출될 때 동적으로 생성
   */
  constructor() {
  }

  private setupWebSocketHandlers() {
    if (!this.ws) return; // 웹소켓 인스턴스가 없으면 아무 일 X

    // 웹소켓 연결 성공
    this.ws.onopen = () => {
      console.log('[Kurento WebSocket] 연결 성공');
      this.connected = true; // 연결 상태를 true로 설정
      this.processQueue();
    };

    // 웹소켓으로부터 메시지를 수신
    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data); // 수신된 데이터 JSON 파싱
        console.log('[Kurento WebSocket] 메시지 수신:', message);
        this.handleIncomingMessage(message); // 수신된 메시지를 적절한 핸들러로 전달
      } catch (err) {
        console.error('[Kurento WebSocket] 메시지 파싱 오류:', err);
      }
    };

    // 웹소켓 연결이 끊김
    this.ws.onclose = () => {
      console.log('[Kurento WebSocket] 연결 끊김');
      this.connected = false;
      this.clearHandlers();
    };

    //웹소켓 연결 오류 발생
    this.ws.onerror = (event) => {
      console.error('[Kurento WebSocket] 오류 발생:', event);
      this.connected = false;
    };
  }

  /**
   * 연결이 설정되기 전에 대기 큐에 쌓인 메시지 처리
   * 연결 성공 후 자동으로 호출
   */
  private processQueue() {
    while (this.sendQueue.length > 0 && this.connected) {
      const message = this.sendQueue.shift();
      this.send(message.method, message.payload);
    }
  }

  on(type: string, handler: (data: any) => void) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type)?.push(handler);
  }

  off(type: string, handler: (data: any) => void) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      this.messageHandlers.set(
        type,
        handlers.filter((h) => h !== handler),
      );
    }
  }

  private handleIncomingMessage(message: any) {
    const messageId = message.id;
    const handlers = this.messageHandlers.get(messageId);
    if (handlers) {
      handlers.forEach((handler) => handler(message));
    } else {
      console.warn(`[Kurento WebSocket] 메시지 타입 '${messageId}'에 대한 핸들러가 없습니다.`, message);
    }
  }

  /**
   * Kurento Media Server와의 WebSocket 연결을 시도합니다.
   * 이 메서드는 클라이언트(브라우저) 환경에서만 호출되어야 한다.
   */
  connect() {
    console.log('[Kurento WebSocket] 연결 시도 중...');
    if (!WS_BASE_URL) {
      console.error('[Kurento WebSocket] WS_BASE_URL이 정의되지 않았습니다.');
      return;
    }
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)
    ) {
      console.log('[Kurento WebSocket] 이미 연결 완료 or 연결 중입니다.');
      return;
    }

    if (typeof window !== 'undefined') {
      const token = getAccessToken();
      let urlWithToken = WS_BASE_URL;
      if (token) {
        urlWithToken += `?token=${token}`;
        console.log('[Kurento WebSocket] 토큰을 QueryParam에 추가하여 연결:', urlWithToken);
      } else {
        console.warn('[Kurento WebSocket] 액세스 토큰 없이 연결을 시도합니다.');
      }

      this.ws = new WebSocket(urlWithToken);
      this.setupWebSocketHandlers();
    } else {
      console.warn(
        '[Kurento WebSocket] 브라우저 환경이 아닙니다. WebSocket 생성을 건너뜝니다.',
      );
    }
  }

  send(method: string, payload: any = {}) {
    if (!this.ws) {
      console.error('[Kurento WebSocket] WebSocket이 초기화되지 않았습니다. 먼저 connect()를 호출하세요.');
      this.sendQueue.push({ method, payload });
      return;
    }

    const message = {
      id: method,
      ...payload,
    };

    if (!this.connected || this.ws.readyState !== WebSocket.OPEN) {
      console.log('[Kurento WebSocket] 연결되지 않았습니다. 메시지를 큐에 추가합니다:', message);
      this.sendQueue.push({ method, payload });
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
      console.log(`[Kurento WebSocket] 메시지 전송됨: ${method}`, message);
    } catch (err) {
      console.error('[Kurento WebSocket] 메시지 전송 오류:', err);
    }
  }

  isConnected(): boolean {
    return this.connected && this.ws?.readyState === WebSocket.OPEN;
  }

  close() {
    console.log('[Kurento WebSocket] 연결 종료 중...');
    this.clearHandlers(); // 모든 메시지 핸들러를 지움
    this.sendQueue = []; // 대기 중인 메시지 큐를 비움
    this.ws?.close(); // WebSocket 연결을 닫습니다.
    this.ws = null; // WebSocket 인스턴스를 null로 설정
    this.connected = false; // 연결 상태를 false로 설정
  }

  private clearHandlers() {
    this.messageHandlers.clear();
  }
}

export const kurentoSignalingSocket = new KurentoSignalingSocket();