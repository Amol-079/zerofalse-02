import { Intent, DriftEvent } from '../../../shared/types';

export class DriftDetector {
  private baselineIntents: Map<string, Intent> = new Map();
  private driftHistory: Map<string, DriftEvent[]> = new Map();

  setBaseline(sessionId: string, intent: Intent): void {
    this.baselineIntents.set(sessionId, intent);
    this.driftHistory.set(sessionId, []);
  }

  detectDrift(sessionId: string, currentActions: string[]): DriftDetectionResult {
    const baseline = this.baselineIntents.get(sessionId);
    if (!baseline) {
      return { hasDrift: false, reason: 'No baseline set' };
    }

    const baselineKeywords = this.extractKeywords(baseline.originalGoal);
    const currentKeywords = currentActions.flatMap(a => this.extractKeywords(a));

    // Calculate semantic similarity
    const similarity = this.calculateSimilarity(baselineKeywords, currentKeywords);

    if (similarity < 0.7) {
      const driftEvent: DriftEvent = {
        id: Date.now().toString(),
        sessionId,
        type: 'scope_deviation',
        description: `Current actions deviate from original intent. Similarity: ${(similarity * 100).toFixed(1)}%`,
        severity: 'warning',
        timestamp: new Date(),
      };

      const history = this.driftHistory.get(sessionId) || [];
      history.push(driftEvent);
      this.driftHistory.set(sessionId, history);

      return {
        hasDrift: true,
        reason: driftEvent.description,
        severity: 'warning',
        event: driftEvent,
      };
    }

    return { hasDrift: false, reason: 'Within acceptable range', similarity };
  }

  getDriftHistory(sessionId: string): DriftEvent[] {
    return this.driftHistory.get(sessionId) || [];
  }

  private extractKeywords(text: string): string[] {
    const stopWords = new Set(['the', 'and', 'or', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with']);
    
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w));
  }

  private calculateSimilarity(baseline: string[], current: string[]): number {
    const baselineSet = new Set(baseline);
    const currentSet = new Set(current);
    
    const intersection = new Set([...baselineSet].filter(x => currentSet.has(x)));
    const union = new Set([...baselineSet, ...currentSet]);
    
    return intersection.size / union.size;
  }
}

interface DriftDetectionResult {
  hasDrift: boolean;
  reason: string;
  severity?: string;
  event?: DriftEvent;
  similarity?: number;
}
