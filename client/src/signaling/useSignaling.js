import { useEffect, useRef } from 'react';
import { SignalingClient } from './signaling';

export function useSignaling(roomId, onMessage) {
  const signalingRef = useRef(null);

  useEffect(() => {
    signalingRef.current = new SignalingClient(roomId, onMessage);
    return () => signalingRef.current?.close();
  }, [roomId]);

  const send = (msg) => signalingRef.current?.send(msg);

  return { send };
}
