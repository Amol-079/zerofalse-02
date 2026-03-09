import { io, Socket } from 'socket.io-client';
import { WebSocketEvent } from '../../shared/types';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true,
    });
  }
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function subscribeToEvents(
  callback: (event: WebSocketEvent) => void
): () => void {
  const s = getSocket();
  
  s.on('delegation', (data) => callback({ type: 'delegation', data }));
  s.on('violation', (data) => callback({ type: 'violation', data }));
  s.on('tool_call', (data) => callback({ type: 'tool_call', data }));
  s.on('drift', (data) => callback({ type: 'drift', data }));
  s.on('memory_alert', (data) => callback({ type: 'memory_alert', data }));
  s.on('agent_status', (data) => callback({ type: 'agent_status', data }));

  return () => {
    s.off('delegation');
    s.off('violation');
    s.off('tool_call');
    s.off('drift');
    s.off('memory_alert');
    s.off('agent_status');
  };
}
