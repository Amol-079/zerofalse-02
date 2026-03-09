import { 
  Agent, Delegation, Intent, Violation, MCPToolCall, 
  Session, DriftEvent, MemoryContext, User, MCPSecurityPolicy, ApiResponse 
} from '../../shared/types';

export type {
  Agent, Delegation, Intent, Violation, MCPToolCall,
  Session, DriftEvent, MemoryContext, User, MCPSecurityPolicy, ApiResponse
};

export interface DashboardStats {
  totalAgents: number;
  activeSessions: number;
  violationsBlocked: number;
  intentAlignment: number;
  mcpCallsIntercepted: number;
  driftEventsDetected: number;
}

export interface ActivityLog {
  id: string;
  type: 'delegation' | 'violation' | 'tool_call' | 'drift' | 'memory_alert' | 'agent_status';
  description: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
