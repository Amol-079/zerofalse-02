import { Violation, Delegation } from '../../../shared/types';
import { io } from '../server';

export class ViolationHandler {
  private violations: Map<string, Violation> = new Map();
  private handlers: Map<string, ViolationHandlerFn> = new Map();

  constructor() {
    this.registerDefaultHandlers();
  }

  private registerDefaultHandlers(): void {
    this.handlers.set('capability_mismatch', async (violation, delegation) => {
      console.log(`🚫 Capability mismatch for delegation ${delegation.id}`);
      // Auto-reassign to capable agent if possible
      return { action: 'reassign', reason: 'Reassigning to agent with proper capabilities' };
    });

    this.handlers.set('security_gap', async (violation, delegation) => {
      console.log(`🚫 Security gap detected in delegation ${delegation.id}`);
      // Block and escalate
      return { action: 'block_and_escalate', reason: 'Security violation requires manual review' };
    });

    this.handlers.set('scope_creep', async (violation, delegation) => {
      console.log(`⚠️ Scope creep detected in delegation ${delegation.id}`);
      // Flag for review but allow
      return { action: 'flag', reason: 'Scope deviation flagged for review' };
    });

    this.handlers.set('intent_drift', async (violation, delegation) => {
      console.log(`⚠️ Intent drift detected in delegation ${delegation.id}`);
      // Alert but continue
      return { action: 'alert', reason: 'Intent drift detected, monitoring closely' };
    });
  }

  async handle(violation: Violation, delegation: Delegation): Promise<HandlerResult> {
    // Store violation
    this.violations.set(violation.id, violation);

    // Emit to clients
    io.emit('violation', violation);

    // Get handler
    const handler = this.handlers.get(violation.type);
    
    if (handler) {
      const result = await handler(violation, delegation);
      
      // Emit resolution action
      io.emit('violation_resolved', {
        violationId: violation.id,
        action: result.action,
        reason: result.reason,
      });

      return result;
    }

    // Default handler
    return { action: 'log', reason: 'No specific handler, logged for review' };
  }

  getViolations(sessionId?: string): Violation[] {
    const all = Array.from(this.violations.values());
    if (sessionId) {
      // Filter by session if needed
      return all;
    }
    return all;
  }

  resolveViolation(violationId: string, resolution: string): void {
    const violation = this.violations.get(violationId);
    if (violation) {
      violation.resolved = true;
      this.violations.set(violationId, violation);
      
      io.emit('violation_resolved', {
        violationId,
        resolution,
        timestamp: new Date(),
      });
    }
  }

  registerHandler(type: string, handler: ViolationHandlerFn): void {
    this.handlers.set(type, handler);
  }
}

type ViolationHandlerFn = (violation: Violation, delegation: Delegation) => Promise<HandlerResult>;

interface HandlerResult {
  action: 'block' | 'allow' | 'reassign' | 'escalate' | 'flag' | 'alert' | 'log' | 'block_and_escalate';
  reason: string;
}
