import { Intent, Delegation, Violation } from '../../../shared/types';

export class ChainAnalyzer {
  analyzeChain(intent: Intent, delegations: Delegation[]): ChainAnalysisResult {
    const issues: ChainIssue[] = [];
    let alignmentScore = 100;

    // Check each delegation in the chain
    for (let i = 0; i < delegations.length; i++) {
      const delegation = delegations[i];
      
      // Check if delegation preserves original intent
      const intentPreservation = this.checkIntentPreservation(intent, delegation);
      if (!intentPreservation.preserved) {
        issues.push({
          delegationIndex: i,
          type: 'intent_break',
          description: intentPreservation.reason,
          severity: 'high',
        });
        alignmentScore -= 10;
      }

      // Check for security requirement propagation
      const securityPropagation = this.checkSecurityPropagation(intent, delegation);
      if (!securityPropagation.propagated) {
        issues.push({
          delegationIndex: i,
          type: 'security_gap',
          description: securityPropagation.reason,
          severity: 'critical',
        });
        alignmentScore -= 20;
      }
    }

    // Check for missing critical delegations
    const missingDelegations = this.checkMissingDelegations(intent, delegations);
    if (missingDelegations.length > 0) {
      issues.push(...missingDelegations.map(m => ({
        delegationIndex: -1,
        type: 'missing_delegation',
        description: m.reason,
        severity: 'medium',
      })));
      alignmentScore -= 5 * missingDelegations.length;
    }

    return {
      alignmentScore: Math.max(0, alignmentScore),
      issues,
      chainValid: issues.filter(i => i.severity === 'critical').length === 0,
    };
  }

  private checkIntentPreservation(intent: Intent, delegation: Delegation): PreservationResult {
    const originalKeywords = this.extractKeywords(intent.originalGoal);
    const taskKeywords = this.extractKeywords(delegation.task);

    // Check if task keywords are subset of original keywords
    const overlap = taskKeywords.filter(kw => originalKeywords.includes(kw));
    const coverage = overlap.length / taskKeywords.length;

    if (coverage < 0.5) {
      return {
        preserved: false,
        reason: `Task "${delegation.task}" has low alignment with original intent "${intent.originalGoal}"`,
      };
    }

    return { preserved: true, reason: 'Intent preserved' };
  }

  private checkSecurityPropagation(intent: Intent, delegation: Delegation): PreservationResult {
    const hasSecurityConstraints = intent.securityConstraints.length > 0;
    
    if (!hasSecurityConstraints) {
      return { propagated: true, reason: 'No security constraints to propagate' };
    }

    // Check if agent is aware of security constraints
    // In real implementation, this would check agent's context
    const securityMentioned = delegation.task.toLowerCase().includes('secure') ||
                             delegation.task.toLowerCase().includes('encrypt');

    if (!securityMentioned && hasSecurityConstraints) {
      return {
        propagated: false,
        reason: `Security constraints from intent not referenced in delegation: ${intent.securityConstraints.map(c => c.rule).join(', ')}`,
      };
    }

    return { propagated: true, reason: 'Security constraints propagated' };
  }

  private checkMissingDelegations(intent: Intent, delegations: Delegation[]): MissingDelegation[] {
    const missing: MissingDelegation[] = [];
    const intentLower = intent.originalGoal.toLowerCase();

    // Check if security review is needed but not present
    if (intentLower.includes('secure') || intentLower.includes('pci')) {
      const hasSecurityReview = delegations.some(d => 
        d.toAgentId.includes('reviewer') || d.toAgentId.includes('security')
      );

      if (!hasSecurityReview) {
        missing.push({
          type: 'security_review',
          reason: 'Security review delegation missing for security-sensitive intent',
        });
      }
    }

    return missing;
  }

  private extractKeywords(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);
  }
}

interface ChainAnalysisResult {
  alignmentScore: number;
  issues: ChainIssue[];
  chainValid: boolean;
}

interface ChainIssue {
  delegationIndex: number;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PreservationResult {
  preserved: boolean;
  reason: string;
}

interface MissingDelegation {
  type: string;
  reason: string;
}
