import { Intent, Requirement, SecurityConstraint, Violation, DriftEvent } from '../../../shared/types';

export class IntentEngine {
  private intents: Map<string, Intent> = new Map();
  private driftEvents: Map<string, DriftEvent[]> = new Map();

  async validate(intentData: Partial<Intent>): Promise<IntentValidationResult> {
    const requirements = this.parseRequirements(intentData.originalGoal || '');
    
    const intent: Intent = {
      id: Date.now().toString(),
      sessionId: intentData.sessionId || Date.now().toString(),
      originalGoal: intentData.originalGoal || '',
      parsedRequirements: requirements,
      securityConstraints: this.extractSecurityConstraints(intentData.originalGoal || ''),
      timestamp: new Date(),
      status: 'active',
    };

    this.intents.set(intent.id, intent);

    return {
      valid: true,
      intent,
      parsed: requirements,
    };
  }

  async analyze(sessionId: string): Promise<Intent | null> {
    // Find intent by session ID
    for (const intent of this.intents.values()) {
      if (intent.sessionId === sessionId) {
        return intent;
      }
    }
    return null;
  }

  async detectDrift(sessionId: string): Promise<DriftEvent[]> {
    const intent = await this.analyze(sessionId);
    if (!intent) {
      return [];
    }

    // Simulate drift detection logic
    const events: DriftEvent[] = this.driftEvents.get(sessionId) || [];
    
    // Check for feature creep
    const driftIndicators = this.checkForDrift(intent);
    
    if (driftIndicators.length > 0) {
      const newEvents = driftIndicators.map(indicator => ({
        id: Date.now().toString() + Math.random(),
        sessionId,
        type: indicator.type as DriftEvent['type'],
        description: indicator.description,
        severity: indicator.severity as DriftEvent['severity'],
        timestamp: new Date(),
      }));

      events.push(...newEvents);
      this.driftEvents.set(sessionId, events);
    }

    return events;
  }

  private parseRequirements(goal: string): Requirement[] {
    const requirements: Requirement[] = [];
    const goalLower = goal.toLowerCase();

    // Extract security requirements
    if (goalLower.includes('secure') || goalLower.includes('security')) {
      requirements.push({
        id: 'req-sec-1',
        type: 'security',
        description: 'Implement secure coding practices',
        priority: 'critical',
        verified: false,
      });
    }

    if (goalLower.includes('pci') || goalLower.includes('payment')) {
      requirements.push({
        id: 'req-pci-1',
        type: 'compliance',
        description: 'PCI DSS compliance required',
        priority: 'critical',
        verified: false,
      });
    }

    if (goalLower.includes('encrypt') || goalLower.includes('encryption')) {
      requirements.push({
        id: 'req-enc-1',
        type: 'security',
        description: 'Data encryption at rest and in transit',
        priority: 'critical',
        verified: false,
      });
    }

    if (goalLower.includes('auth') || goalLower.includes('authentication')) {
      requirements.push({
        id: 'req-auth-1',
        type: 'security',
        description: 'Secure authentication mechanism',
        priority: 'high',
        verified: false,
      });
    }

    // Extract functional requirements
    if (goalLower.includes('api')) {
      requirements.push({
        id: 'req-func-1',
        type: 'functional',
        description: 'RESTful API implementation',
        priority: 'high',
        verified: false,
      });
    }

    return requirements;
  }

  private extractSecurityConstraints(goal: string): SecurityConstraint[] {
    const constraints: SecurityConstraint[] = [];
    const goalLower = goal.toLowerCase();

    if (goalLower.includes('aes-256') || goalLower.includes('encryption')) {
      constraints.push({
        id: 'cons-enc-1',
        category: 'encryption',
        rule: 'Use AES-256 encryption for sensitive data',
        enforced: false,
      });
    }

    if (goalLower.includes('jwt') || goalLower.includes('auth')) {
      constraints.push({
        id: 'cons-auth-1',
        category: 'authentication',
        rule: 'Implement JWT with secure secret management',
        enforced: false,
      });
    }

    if (goalLower.includes('pci')) {
      constraints.push({
        id: 'cons-pci-1',
        category: 'data_handling',
        rule: 'No card data in logs or unencrypted storage',
        enforced: false,
      });
    }

    return constraints;
  }

  private checkForDrift(intent: Intent): DriftIndicator[] {
    const indicators: DriftIndicator[] = [];
    
    // Simulate drift detection based on time
    const hoursSinceStart = (Date.now() - intent.timestamp.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceStart > 2) {
      // Simulate feature creep detection
      if (Math.random() > 0.7) {
        indicators.push({
          type: 'feature_creep',
          description: 'Agent implementing features outside original scope',
          severity: 'warning',
        });
      }
    }

    if (hoursSinceStart > 3) {
      // Simulate security forgetting
      if (Math.random() > 0.6) {
        indicators.push({
          type: 'security_forgotten',
          description: 'Security requirements not being verified in recent actions',
          severity: 'critical',
        });
      }
    }

    return indicators;
  }
}

interface IntentValidationResult {
  valid: boolean;
  intent?: Intent;
  parsed?: Requirement[];
}

interface DriftIndicator {
  type: string;
  description: string;
  severity: string;
}
