import { Agent, Delegation, Violation } from '../../../shared/types';
import { CapabilityChecker } from './capability-checker';
import { DelegationValidator } from './delegation-validator';
import { io } from '../server';

export class AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  private delegations: Map<string, Delegation> = new Map();
  private capabilityChecker: CapabilityChecker;
  private delegationValidator: DelegationValidator;

  constructor() {
    this.capabilityChecker = new CapabilityChecker();
    this.delegationValidator = new DelegationValidator();
    this.seedDemoAgents();
  }

  private seedDemoAgents() {
    const demoAgents: Agent[] = [
      {
        id: 'planner-1',
        name: 'Planner Agent',
        type: 'planner',
        capabilities: ['architecture', 'planning', 'delegation', 'requirements_analysis'],
        status: 'active',
        lastSeen: new Date(),
        metadata: { version: '2.1.0' },
      },
      {
        id: 'coder-1',
        name: 'Coder Agent',
        type: 'coder',
        capabilities: ['typescript', 'javascript', 'api_development', 'database', 'authentication'],
        status: 'active',
        lastSeen: new Date(),
        metadata: { version: '3.0.0', specialty: 'backend' },
      },
      {
        id: 'reviewer-1',
        name: 'Security Agent',
        type: 'reviewer',
        capabilities: ['security_audit', 'vulnerability_scan', 'compliance_check', 'code_review'],
        status: 'idle',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
        metadata: { version: '1.5.0', certifications: ['CISSP'] },
      },
      {
        id: 'tester-1',
        name: 'Test Agent',
        type: 'tester',
        capabilities: ['unit_testing', 'integration_testing', 'security_testing', 'load_testing'],
        status: 'active',
        lastSeen: new Date(),
        metadata: { version: '2.0.0' },
      },
      {
        id: 'deployer-1',
        name: 'Deploy Agent',
        type: 'deployer',
        capabilities: ['docker', 'kubernetes', 'ci_cd', 'infrastructure', 'monitoring'],
        status: 'active',
        lastSeen: new Date(),
        metadata: { version: '2.2.0' },
      },
    ];

    demoAgents.forEach(agent => this.agents.set(agent.id, agent));
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
    io.emit('agent_status', agent);
  }

  updateAgentStatus(id: string, status: Agent['status']): void {
    const agent = this.agents.get(id);
    if (agent) {
      agent.status = status;
      agent.lastSeen = new Date();
      this.agents.set(id, agent);
      io.emit('agent_status', agent);
    }
  }

  async validateDelegation(delegationData: Partial<Delegation>): Promise<DelegationValidationResult> {
    const fromAgent = this.agents.get(delegationData.fromAgentId || '');
    const toAgent = this.agents.get(delegationData.toAgentId || '');

    if (!fromAgent || !toAgent) {
      return {
        valid: false,
        violations: [{
          id: Date.now().toString(),
          type: 'capability_mismatch',
          severity: 'critical',
          description: 'Agent not found in registry',
          timestamp: new Date(),
          resolved: false,
        }],
      };
    }

    const violations: Violation[] = [];

    // Check capability match
    const capabilityCheck = this.capabilityChecker.check(
      toAgent.capabilities,
      delegationData.task || ''
    );

    if (!capabilityCheck.hasCapabilities) {
      violations.push({
        id: Date.now().toString(),
        type: 'capability_mismatch',
        severity: 'high',
        description: `Agent ${toAgent.name} lacks required capabilities: ${capabilityCheck.missing.join(', ')}`,
        agentId: toAgent.id,
        timestamp: new Date(),
        resolved: false,
      });
    }

    // Check security requirements
    const securityCheck = this.delegationValidator.validateSecurityRequirements(
      delegationData.originalIntent || '',
      delegationData.task || '',
      toAgent
    );

    if (!securityCheck.valid) {
      violations.push({
        id: (Date.now() + 1).toString(),
        type: 'security_gap',
        severity: 'critical',
        description: securityCheck.reason,
        agentId: toAgent.id,
        timestamp: new Date(),
        resolved: false,
      });
    }

    // Check for scope creep
    const scopeCheck = this.delegationValidator.checkScopeCreep(
      delegationData.originalIntent || '',
      delegationData.task || ''
    );

    if (scopeCheck.isScopeCreep) {
      violations.push({
        id: (Date.now() + 2).toString(),
        type: 'scope_creep',
        severity: 'medium',
        description: scopeCheck.reason,
        agentId: toAgent.id,
        timestamp: new Date(),
        resolved: false,
      });
    }

    const delegation: Delegation = {
      id: Date.now().toString(),
      fromAgentId: fromAgent.id,
      toAgentId: toAgent.id,
      task: delegationData.task || '',
      originalIntent: delegationData.originalIntent || '',
      timestamp: new Date(),
      status: violations.length === 0 ? 'verified' : 'blocked',
      violations,
    };

    this.delegations.set(delegation.id, delegation);

    // Emit real-time update
    io.emit('delegation', delegation);

    if (violations.length > 0) {
      violations.forEach(v => io.emit('violation', v));
    }

    return {
      valid: violations.length === 0,
      violations,
      delegation: violations.length === 0 ? delegation : undefined,
    };
  }

  getDelegations(sessionId?: string): Delegation[] {
    const all = Array.from(this.delegations.values());
    if (sessionId) {
      return all.filter(d => d.originalIntent.includes(sessionId));
    }
    return all;
  }
}

interface DelegationValidationResult {
  valid: boolean;
  violations: Violation[];
  delegation?: Delegation;
}
