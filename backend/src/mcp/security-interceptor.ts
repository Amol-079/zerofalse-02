import { MCPToolCall, MCPSecurityPolicy } from '../../../shared/types';
import { ToolValidator } from './tool-validator';

export class SecurityInterceptor {
  private validator: ToolValidator;

  constructor() {
    this.validator = new ToolValidator();
  }

  async check(toolCall: MCPToolCall, policies: MCPSecurityPolicy[]): Promise<SecurityCheckResult> {
    // Run tool validation
    const validation = this.validator.validate(toolCall, policies);
    
    if (!validation.allowed) {
      return {
        allowed: false,
        reason: validation.reason,
        severity: 'high',
      };
    }

    // Additional security checks
   
    // Check for dangerous command combinations
    const paramsStr = JSON.stringify(toolCall.params).toLowerCase();
    
    const dangerousPatterns = [
      { pattern: 'curl.*\\|.*sh', reason: 'Pipe to shell detected - major security risk' },
      { pattern: 'wget.*\\|.*sh', reason: 'Pipe to shell detected - major security risk' },
      { pattern: 'eval\\s*\\(', reason: 'Eval usage detected - code injection risk' },
      { pattern: 'exec\\s*\\(', reason: 'Exec usage detected - code execution risk' },
      { pattern: 'rm\\s+-rf\\s+/', reason: 'Dangerous rm command detected' },
      { pattern: 'mkfs\\.', reason: 'Filesystem formatting detected' },
      { pattern: 'dd\\s+if=.*of=/dev', reason: 'Direct disk write detected' },
      { pattern: '>/dev/null.*2>&1', reason: 'Output suppression detected - potential obfuscation' },
    ];

    for (const { pattern, reason } of dangerousPatterns) {
      if (new RegExp(pattern, 'i').test(paramsStr)) {
        return {
          allowed: false,
          reason,
          severity: 'critical',
        };
      }
    }

    // Check for data exfiltration patterns
    const exfilPatterns = [
      { pattern: 'https?://[^\\s"]+\\.(com|net|org|io|xyz)', reason: 'External URL detected - potential data exfiltration' },
    ];

    for (const { pattern, reason } of exfilPatterns) {
      if (new RegExp(pattern, 'i').test(paramsStr)) {
        // Allow but flag for review
        console.log(`⚠️ Flagged: ${reason}`);
      }
    }

    return {
      allowed: true,
      reason: 'Security check passed',
      severity: 'none',
    };
  }
}

interface SecurityCheckResult {
  allowed: boolean;
  reason: string;
  severity: 'none' | 'low' | 'medium' | 'high' | 'critical';
}
