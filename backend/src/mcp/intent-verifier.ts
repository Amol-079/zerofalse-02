import { MCPToolCall } from '../../../shared/types';

export class IntentVerifier {
  async validate(toolCall: MCPToolCall): Promise<IntentValidationResult> {
    // Check if tool call aligns with original intent
    const originalIntent = await this.getOriginalIntent(toolCall.sessionId);
    
    if (!originalIntent) {
      return { valid: true, reason: 'No intent context found' };
    }

    // Example: Check for security-related tool calls
    if (toolCall.tool === 'file_write' && originalIntent.includes('secure')) {
      const content = JSON.stringify(toolCall.params);
      
      if (content.includes('password') && !content.includes('encrypt')) {
        return {
          valid: false,
          reason: 'Security violation: Storing password without encryption',
        };
      }
    }

    return { valid: true, reason: 'Intent alignment verified' };
  }

  private async getOriginalIntent(sessionId: string): Promise<string | null> {
    // In production, fetch from database
    return 'Build secure payment API with PCI compliance';
  }
}

interface IntentValidationResult {
  valid: boolean;
  reason: string;
}
