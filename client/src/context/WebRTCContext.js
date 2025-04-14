import { createContext, useContext, useState } from 'react';

export const WebRTCContext = createContext();

export function WebRTCProvider({ children, socket, role, userId }) {
  return (
    <WebRTCContext.Provider value={{ socket, role, userId }}>
      {children}
    </WebRTCContext.Provider>
  );
}

export function useWebRTC() {
  return useContext(WebRTCContext);
}
