'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Intent, Violation } from '@/types';

export function useIntent(sessionId: string) {
  return useQuery({
    queryKey: ['intent', sessionId],
    queryFn: async () => {
      const response = await api.intent.analyze(sessionId);
      if (!response.success) throw new Error(response.error);
      return response.data as Intent;
    },
    enabled: !!sessionId,
  });
}

export function useValidateIntent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (intent: Partial<Intent>) => {
      const response = await api.intent.validate(intent);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['intent', variables.id] });
    },
  });
}
