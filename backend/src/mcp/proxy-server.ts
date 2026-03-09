import { MCPToolCall, MCPSecurityPolicy } from '../../../shared/types';
import { ToolValidator } from './tool-validator';
import { IntentVerifier } from './intent-verifier';
import { SecurityInterceptor } from './security-interceptor';
import { io } from '../server';

export class MCPProxyServer {
  private validator: ToolValidator;
  private intentVerifier: IntentVerifier;
  private interceptor: SecurityInterceptor;
  private policies: MCPSecurityPolicy[] = [];

  constructor() {
    this.validator = new ToolValidator();
    this.intentVerifier = new IntentVerifier();
    this.interceptor = new SecurityInterceptor();
    this.loadDefaultPolicies();
  }

  private loadDefaultPolicies() {
    this.policies = [
      {
        id: 'policy-1',
        toolPattern: 'bash_exec',
        allowedAgents: ['deploy-agent', 'admin-agent'],
        blockedPatterns: ['curl.*\\|.*sh', 'rm.*-rf', 'mkfs'],
        requireApproval: true,
      },
      {
        id: 'policy-2',
        toolPattern: 'file_write',
        allowedAgents: ['*'],
        blockedPatterns: ['/etc/passwd', '/etc/shadow', '/root/.*'],
        requireApproval: false,
      },
      {
        id: 'policy-3',
        toolPattern: 'database_query',
        allowedAgents: ['coder-agent', 'db-agent'],
        blockedPatterns: ['DROP.*TABLE', 'DELETE.*FROM.*WHERE.*1=1'],
        requireApproval: false,
      },
    ];
  }

  async intercept(toolCall: MCPToolCall): Promise<MCPToolCall> {
    console.log(`🔍 Intercepting MCP call: ${toolCall.tool} from ${toolCall.agentId}`);

    // Run security checks
    const securityCheck = await this.interceptor.check(toolCall, this.policies);
    
    if (!securityCheck.allowed) {
      console.log(`🚫 Blocked: ${securityCheck.reason}`);
      
      const blockedCall = {
        ...toolCall,
        status: 'blocked' as const,
        reason: securityCheck.reason,
      };

      // Emit to connected clients
      io.emit('tool_call', blockedCall);
      
      return blockedCall;
    }

    // Validate against intent
    const intentCheck = await this.intentVerifier.validate(toolCall);
    
    if (!intentCheck.valid) {
      console.log(`⚠️ Intent violation: ${intentCheck.reason}`);
      
      const modifiedCall = {
        ...toolCall,
        status: 'modified' as const,
        reason: intentCheck.reason,
      };

      io.emit('tool_call', modifiedCall);
      return modifiedCall;
    }

    // All checks passed
    const allowedCall = {
      ...toolCall,
      status: 'allowed' as const,
      reason: 'All checks passed',
    };

    io.emit('tool_call', allowedCall);
    return allowedCall;
  }

  getPolicies(): MCPSecurityPolicy[] {
    return this.policies;
  }

  addPolicy(policy: MCPSecurityPolicy): void {
    this.policies.push(policy);
  }
}
