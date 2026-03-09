import { MemoryContext, MemoryPollution } from '../../../shared/types';

export class PollutionDetector {
  private baselineContexts: Map<string, string> = new Map(); // contextId -> hash

  setBaseline(context: MemoryContext): void {
    const hash = this.hashContent(context.content);
    this.baselineContexts.set(context.id, hash);
  }

  detectPollution(context: MemoryContext): PollutionDetectionResult {
    const baselineHash = this.baselineContexts.get(context.id);
    
    if (!baselineHash) {
      return { polluted: false, reason: 'No baseline set' };
    }

    const currentHash = this.hashContent(context.content);

    if (baselineHash !== currentHash) {
      // Check if change is authorized
      const changeType = this.classifyChange(baselineHash, currentHash);
      
      if (changeType === 'malicious') {
        return {
          polluted: true,
          reason: 'Unauthorized modification detected in security context',
          severity: 'critical',
        };
      }

      if (changeType === 'suspicious') {
        return {
          polluted: true,
          reason: 'Suspicious modification pattern detected',
          severity: 'medium',
        };
      }
    }

    return { polluted: false, reason: 'No pollution detected' };
  }

  private hashContent(content: string): string {
    // Simple hash for demo - use proper crypto in production
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  private classifyChange(oldHash: string, newHash: string): 'benign' | 'suspicious' | 'malicious' {
    // In production, use semantic analysis
    // For demo, random classification
    const rand = Math.random();
    if (rand > 0.8) return 'malicious';
    if (rand > 0.6) return 'suspicious';
    return 'benign';
  }
}

interface PollutionDetectionResult {
  polluted: boolean;
  reason: string;
  severity?: string;
}
