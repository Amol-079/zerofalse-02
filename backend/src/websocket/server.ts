import { Server } from 'socket.io';

export function initializeWebSocketServer(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Join rooms based on subscription
    socket.on('subscribe', (channels: string[]) => {
      channels.forEach(channel => {
        socket.join(channel);
        console.log(`📡 ${socket.id} subscribed to ${channel}`);
      });
    });

    socket.on('unsubscribe', (channels: string[]) => {
      channels.forEach(channel => {
        socket.leave(channel);
        console.log(`📡 ${socket.id} unsubscribed from ${channel}`);
      });
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
}
