'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Agent, Delegation } from '@/types';

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const response = await api.agents.list();
      if (!response.success) throw new Error(response.error);
      return response.data as Agent[];
    },
    refetchInterval: 5000,
  });
}

export function useValidateDelegation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (delegation: Partial<Delegation>) => {
      const response = await api.agents.validate(delegation);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });
}
