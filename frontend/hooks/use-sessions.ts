'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Session, DriftEvent } from '@/types';

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await fetchApi('/api/sessions');
      if (!response.success) throw new Error(response.error);
      return response.data as Session[];
    },
    refetchInterval: 3000,
  });
}

export function useSession(sessionId: string) {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      const response = await fetchApi(`/api/sessions/${sessionId}`);
      if (!response.success) throw new Error(response.error);
      return response.data as Session;
    },
    enabled: !!sessionId,
  });
}

export function useDriftDetection(sessionId: string) {
  return useQuery({
    queryKey: ['drift', sessionId],
    queryFn: async () => {
      const response = await api.drift.detect(sessionId);
      if (!response.success) throw new Error(response.error);
      return response.data as DriftEvent[];
    },
    enabled: !!sessionId,
    refetchInterval: 5000,
  });
}

async function fetchApi(endpoint: string) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    const error = await response.text();
    return { success: false, error };
  }
  const data = await response.json();
  return { success: true, data };
}
