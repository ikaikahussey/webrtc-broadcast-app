export class SignalingClient {
  constructor(roomId, onMessage, onOpen) {
    this.roomId = roomId;
    this.socket = null;
    this.onMessage = onMessage;
    this.onOpen = onOpen;
    this.connect();
  }

  connect() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    this.socket = new WebSocket(`${proto}://${location.host}/?room=${this.roomId}`);

    this.socket.onopen = () => {
      console.log('[Signaling] Connected');
      this.onOpen?.();
    };

    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.onMessage?.(data);
    };

    this.socket.onclose = () => {
      console.warn('[Signaling] Disconnected');
    };

    this.socket.onerror = (err) => {
      console.error('[Signaling] Error:', err);
    };
  }

  send(msg) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    }
  }

  close() {
    this.socket?.close();
  }
}
