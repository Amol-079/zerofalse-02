import { MemoryContext, MemoryPollution } from '../../../shared/types';
import { io } from '../server';

export class MemoryFirewall {
  private contexts: Map<string, MemoryContext> = new Map();
  private pollutionAttempts: Map<string, MemoryPollution[]> = new Map();
  private securityLevels = ['normal', 'high', 'critical'];

  createContext(context: Omit<MemoryContext, 'id'>): MemoryContext {
    const newContext: MemoryContext = {
      ...context,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };

    this.contexts.set(newContext.id, newContext);

    // Initialize pollution tracking for session
    if (!this.pollutionAttempts.has(context.sessionId)) {
      this.pollutionAttempts.set(context.sessionId, []);
    }

    return newContext;
  }

  getContext(id: string): MemoryContext | undefined {
    return this.contexts.get(id);
  }

  getContextsForSession(sessionId: string): MemoryContext[] {
    return Array.from(this.contexts.values()).filter(c => c.sessionId === sessionId);
  }

  getContextsForAgent(agentId: string): MemoryContext[] {
    return Array.from(this.contexts.values()).filter(c => c.agentId === agentId);
  }

  async attemptAccess(
    contextId: string,
    accessingAgentId: string,
    accessType: 'read' | 'write' | 'override'
  ): MemoryAccessResult {
    const context = this.contexts.get(contextId);
    
    if (!context) {
      return { allowed: false, reason: 'Context not found' };
    }

    // Critical contexts cannot be overridden by non-security agents
    if (context.securityLevel === 'critical' && accessType === 'override') {
      const pollution: MemoryPollution = {
        id: Date.now().toString(),
        sessionId: context.sessionId,
        pollutantAgentId: accessingAgentId,
        targetContextId: contextId,
        pollutionType: 'override',
        detected: true,
        blocked: true,
      };

      const attempts = this.pollutionAttempts.get(context.sessionId) || [];
      attempts.push(pollution);
      this.pollutionAttempts.set(context.sessionId, attempts);

      io.emit('memory_alert', pollution);

      return {
        allowed: false,
        reason: `CRITICAL: Agent ${accessingAgentId} attempted to override security context from ${context.agentId}. Blocked by Memory Firewall.`,
        blocked: true,
      };
    }

    // High security contexts require authorization
    if (context.securityLevel === 'high' && accessType === 'write') {
      // Check if accessing agent is authorized
      if (context.agentId !== accessingAgentId) {
        const pollution: MemoryPollution = {
          id: Date.now().toString(),
          sessionId: context.sessionId,
          pollutantAgentId: accessingAgentId,
          targetContextId: contextId,
          pollutionType: 'injection',
          detected: true,
          blocked: true,
        };

        const attempts = this.pollutionAttempts.get(context.sessionId) || [];
        attempts.push(pollution);
        this.pollutionAttempts.set(context.sessionId, attempts);

        io.emit('memory_alert', pollution);

        return {
          allowed: false,
          reason: `Agent ${accessingAgentId} not authorized to modify high-security context from ${context.agentId}`,
          blocked: true,
        };
      }
    }

    // Log access for audit
    console.log(`✅ Memory access allowed: ${accessingAgentId} -> ${contextId} (${accessType})`);

    return {
      allowed: true,
      reason: 'Access permitted',
      context,
    };
  }

  isolateContext(contextId: string): void {
    const context = this.contexts.get(contextId);
    if (context) {
      context.isolated = true;
      this.contexts.set(contextId, context);
      console.log(`🔒 Context ${contextId} isolated`);
    }
  }

  getPollutionAttempts(sessionId: string): MemoryPollution[] {
    return this.pollutionAttempts.get(sessionId) || [];
  }
}

interface MemoryAccessResult {
  allowed: boolean;
  reason: string;
  blocked?: boolean;
  context?: MemoryContext;
}
