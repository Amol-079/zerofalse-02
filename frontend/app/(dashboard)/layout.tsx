'use client';

import { useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { getSocket, disconnectSocket } from '@/lib/websocket';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = getSocket();
    
    socket.on('connect', () => {
      console.log('Connected to Zerofalse real-time monitoring');
    });

    socket.on('connect_error', () => {
      console.log('WebSocket connection failed, retrying...');
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
