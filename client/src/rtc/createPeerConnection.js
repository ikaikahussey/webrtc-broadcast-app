import { iceServers } from '../utils/iceServerConfig';

export function createPeerConnection() {
  const pc = new RTCPeerConnection(iceServers);
  return pc;
}
