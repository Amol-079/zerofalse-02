// Shared type definitions for Zerofalse platform

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  description?: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export interface Delegation {
  id: string;
  agentId: string;
  task: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  approvedBy?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Intent {
  id: string;
  userId: string;
  description: string;
  requirements: string[];
  status: 'draft' | 'analyzing' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Violation {
  id: string;
  agentId: string;
  type: 'security' | 'policy' | 'intent';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'resolved' | 'dismissed';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface MCPToolCall {
  id: string;
  agentId: string;
  tool: string;
  parameters: Record<string, any>;
  result?: any;
  status: 'pending' | 'success' | 'error';
  createdAt: Date;
  completedAt?: Date;
}

export interface Session {
  id: string;
  userId: string;
  agentId: string;
  status: 'active' | 'completed' | 'error';
  startedAt: Date;
  endedAt?: Date;
}

export interface DriftEvent {
  id: string;
  sessionId: string;
  type: 'intent_drift' | 'behavior_drift' | 'security_drift';
  description: string;
  severity: number; // 0-100
  detectedAt: Date;
  resolvedAt?: Date;
}

export interface MemoryContext {
  id: string;
  sessionId: string;
  agentId: string;
  context: Record<string, any>;
  timestamp: Date;
}

export interface MCPSecurityPolicy {
  id: string;
  name: string;
  rules: string[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebSocketEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}