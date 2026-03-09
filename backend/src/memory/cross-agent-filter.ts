import { MemoryContext } from '../../../shared/types';

export class CrossAgentFilter {
  private accessRules: Map<string, string[]> = new Map(); // agentId -> allowedAgentIds

  constructor() {
    this.setupDefaultRules();
  }

  private setupDefaultRules(): void {
    // Security agents can access all contexts
    this.accessRules.set('security-agent', ['*']);
    
    // Planner agents can access coder and tester contexts
    this.accessRules.set('planner-agent', ['coder-agent', 'tester-agent', 'reviewer-agent']);
    
    // Coder agents can access tester contexts
    this.accessRules.set('coder-agent', ['tester-agent', 'deployer-agent']);
    
    // Testers can read but not modify other contexts
    this.accessRules.set('tester-agent', ['planner-agent', 'coder-agent']);
  }

  canAccess(accessingAgentId: string, contextOwnerId: string): boolean {
    const allowedAgents = this.accessRules.get(accessingAgentId);
    
    if (!allowedAgents) {
      return false; // No rules = no access
    }

    // Wildcard allows all access
    if (allowedAgents.includes('*')) {
      return true;
    }

    return allowedAgents.includes(contextOwnerId);
  }

  addRule(agentId: string, allowedAgents: string[]): void {
    this.accessRules.set(agentId, allowedAgents);
  }

  removeRule(agentId: string): void {
    this.accessRules.delete(agentId);
  }

  getRules(): Record<string, string[]> {
    return Object.fromEntries(this.accessRules);
  }
}
