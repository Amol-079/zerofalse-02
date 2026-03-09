import { Agent } from '../../../shared/types';

export class DelegationValidator {
  validateSecurityRequirements(
    originalIntent: string,
    task: string,
    toAgent: Agent
  ): SecurityValidationResult {
    const intentLower = originalIntent.toLowerCase();
    const taskLower = task.toLowerCase();

    // Check for security-related keywords in intent
    const securityKeywords = ['secure', 'security', 'encrypt', 'authentication', 'pci', 'compliance'];
    const hasSecurityRequirements = securityKeywords.some(kw => intentLower.includes(kw));

    if (hasSecurityRequirements) {
      // Check if agent has security capabilities
      const securityCapabilities = ['security_audit', 'compliance_check', 'encryption'];
      const hasSecurityCapabilities = toAgent.capabilities.some(cap => 
        securityCapabilities.includes(cap)
      );

      // If task involves security but agent doesn't have security capabilities
      const taskSecurityKeywords = ['auth', 'encrypt', 'secure', 'password', 'token', 'jwt'];
      const isSecurityTask = taskSecurityKeywords.some(kw => taskLower.includes(kw));

      if (isSecurityTask && !hasSecurityCapabilities && toAgent.type !== 'reviewer') {
        return {
          valid: false,
          reason: `Security-related task delegated to agent without security capabilities. Agent: ${toAgent.name}, Capabilities: ${toAgent.capabilities.join(', ')}`,
        };
      }

      // Check for PCI compliance specifically
      if (intentLower.includes('pci') && !toAgent.capabilities.includes('compliance_check')) {
        return {
          valid: false,
          reason: 'PCI compliance task requires agent with compliance_check capability',
        };
      }
    }

    return { valid: true, reason: 'Security requirements validated' };
  }

  checkScopeCreep(originalIntent: string, task: string): ScopeCheckResult {
    const intentLower = originalIntent.toLowerCase();
    const taskLower = task.toLowerCase();

    // Define scope mappings
    const scopeMappings: Record<string, string[]> = {
      'payment api': ['payment', 'transaction', 'billing', 'checkout'],
      'authentication': ['auth', 'login', 'logout', 'password', 'token', 'jwt', 'oauth'],
      'user profile': ['profile', 'avatar', 'preference', 'settings'],
    };

    // Check if task is outside original scope
    let isInScope = false;

    for (const [scope, keywords] of Object.entries(scopeMappings)) {
      if (intentLower.includes(scope)) {
        // Check if task relates to this scope
        if (keywords.some(kw => taskLower.includes(kw))) {
          isInScope = true;
          break;
        }
      }
    }

    // If we can't determine scope, allow it
    if (!isInScope && Object.keys(scopeMappings).some(scope => intentLower.includes(scope))) {
      // Check for obvious scope creep indicators
      const creepIndicators = [
        { pattern: 'image upload', scope: 'payment api', reason: 'Image upload not related to payment API' },
        { pattern: 'social media', scope: 'payment api', reason: 'Social media integration out of scope' },
        { pattern: 'chat feature', scope: 'payment api', reason: 'Chat feature not in payment API scope' },
      ];

      for (const indicator of creepIndicators) {
        if (taskLower.includes(indicator.pattern) && intentLower.includes(indicator.scope)) {
          return {
            isScopeCreep: true,
            reason: indicator.reason,
          };
        }
      }
    }

    return { isScopeCreep: false, reason: 'Task within scope' };
  }
}

interface SecurityValidationResult {
  valid: boolean;
  reason: string;
}

interface ScopeCheckResult {
  isScopeCreep: boolean;
  reason: string;
}
