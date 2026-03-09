export class CapabilityChecker {
  private taskCapabilityMap: Record<string, string[]> = {
    'implement authentication': ['authentication', 'security', 'typescript'],
    'database': ['database', 'sql', 'orm'],
    'api': ['api_development', 'rest', 'graphql', 'typescript'],
    'frontend': ['react', 'vue', 'angular', 'css', 'html'],
    'deploy': ['docker', 'kubernetes', 'ci_cd', 'infrastructure'],
    'test': ['unit_testing', 'integration_testing', 'security_testing'],
    'review': ['code_review', 'security_audit'],
    'architecture': ['architecture', 'system_design', 'planning'],
    'pci': ['compliance_check', 'security_audit', 'encryption'],
    'encrypt': ['encryption', 'security', 'cryptography'],
  };

  check(agentCapabilities: string[], task: string): CapabilityCheckResult {
    const taskLower = task.toLowerCase();
    const missing: string[] = [];

    // Find relevant capabilities for this task
    for (const [keyword, requiredCaps] of Object.entries(this.taskCapabilityMap)) {
      if (taskLower.includes(keyword)) {
        for (const cap of requiredCaps) {
          if (!agentCapabilities.includes(cap)) {
            missing.push(cap);
          }
        }
      }
    }

    // Special checks for security tasks
    if (taskLower.includes('secure') || taskLower.includes('encrypt') || taskLower.includes('auth')) {
      if (!agentCapabilities.includes('security') && !agentCapabilities.includes('security_audit')) {
        missing.push('security');
      }
    }

    return {
      hasCapabilities: missing.length === 0,
      missing: [...new Set(missing)], // Remove duplicates
      matched: agentCapabilities.filter(cap => 
        Object.values(this.taskCapabilityMap).flat().includes(cap)
      ),
    };
  }
}

interface CapabilityCheckResult {
  hasCapabilities: boolean;
  missing: string[];
  matched: string[];
}
