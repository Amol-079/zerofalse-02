import { MCPToolCall, MCPSecurityPolicy } from '../../../shared/types';

export class ToolValidator {
  validate(toolCall: MCPToolCall, policies: MCPSecurityPolicy[]): ValidationResult {
    const policy = policies.find(p => 
      new RegExp(p.toolPattern).test(toolCall.tool)
    );

    if (!policy) {
      return { allowed: true, reason: 'No policy found' };
    }

    // Check agent authorization
    const isAuthorized = policy.allowedAgents.includes('*') ||
      policy.allowedAgents.includes(toolCall.agentId);
    
    if (!isAuthorized) {
      return { 
        allowed: false, 
        reason: `Agent ${toolCall.agentId} not authorized for ${toolCall.tool}` 
      };
    }

    // Check blocked patterns
    const paramsStr = JSON.stringify(toolCall.params);
    for (const pattern of policy.blockedPatterns) {
      if (new RegExp(pattern, 'i').test(paramsStr)) {
        return { 
          allowed: false, 
          reason: `Blocked pattern detected: ${pattern}` 
        };
      }
    }

    return { allowed: true, reason: 'Validation passed' };
  }
}

interface ValidationResult {
  allowed: boolean;
  reason: string;
}
