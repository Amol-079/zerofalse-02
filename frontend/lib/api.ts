import { ApiResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    return { success: false, error };
  }

  const data = await response.json();
  return { success: true, data };
}

export const api = {
  agents: {
    list: () => fetchApi('/api/agents'),
    get: (id: string) => fetchApi(`/api/agents/${id}`),
    validate: (delegation: unknown) => 
      fetchApi('/api/agents/validate', {
        method: 'POST',
        body: JSON.stringify(delegation),
      }),
  },
  intent: {
    validate: (intent: unknown) =>
      fetchApi('/api/intent/validate', {
        method: 'POST',
        body: JSON.stringify(intent),
      }),
    analyze: (sessionId: string) =>
      fetchApi(`/api/intent/analyze/${sessionId}`),
  },
  mcp: {
    intercept: (toolCall: unknown) =>
      fetchApi('/api/mcp/intercept', {
        method: 'POST',
        body: JSON.stringify(toolCall),
      }),
    policies: () => fetchApi('/api/mcp/policies'),
  },
  drift: {
    detect: (sessionId: string) =>
      fetchApi(`/api/drift/detect/${sessionId}`),
    events: (sessionId: string) =>
      fetchApi(`/api/drift/events/${sessionId}`),
  },
};
