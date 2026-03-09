'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { MCPToolCall, MCPSecurityPolicy } from '@/types';

export function useMCPPolicies() {
  return useQuery({
    queryKey: ['mcp-policies'],
    queryFn: async () => {
      const response = await api.mcp.policies();
      if (!response.success) throw new Error(response.error);
      return response.data as MCPSecurityPolicy[];
    },
  });
}

export function useInterceptToolCall() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (toolCall: Partial<MCPToolCall>) => {
      const response = await api.mcp.intercept(toolCall);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcp-policies'] });
    },
  });
}
