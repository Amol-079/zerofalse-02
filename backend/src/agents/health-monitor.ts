import { Agent } from '../../../shared/types';
import { AgentRegistry } from './agent-registry';

export class HealthMonitor {
  private registry: AgentRegistry;
  private checkInterval: NodeJS.Timeout | null = null;

  constructor(registry: AgentRegistry) {
    this.registry = registry;
  }

  startMonitoring(intervalMs: number = 30000): void {
    this.checkInterval = setInterval(() => {
      this.checkAgentHealth();
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private checkAgentHealth(): void {
    const agents = this.registry.getAllAgents();
    const now = new Date();

    for (const agent of agents) {
      const lastSeen = new Date(agent.lastSeen);
      const minutesSinceLastSeen = (now.getTime() - lastSeen.getTime()) / (1000 * 60);

      // Mark as offline if not seen for 5 minutes
      if (minutesSinceLastSeen > 5 && agent.status !== 'offline') {
        this.registry.updateAgentStatus(agent.id, 'offline');
        console.log(`⚠️ Agent ${agent.name} marked as offline`);
      }

      // Mark as error if not seen for 2 minutes but was active
      if (minutesSinceLastSeen > 2 && agent.status === 'active') {
        // Could indicate a problem, but don't mark as error yet
        console.log(`⚠️ Agent ${agent.name} hasn't reported in ${Math.floor(minutesSinceLastSeen)} minutes`);
      }
    }
  }

  getHealthReport(): HealthReport {
    const agents = this.registry.getAllAgents();
    
    return {
      total: agents.length,
      active: agents.filter(a => a.status === 'active').length,
      idle: agents.filter(a => a.status === 'idle').length,
      offline: agents.filter(a => a.status === 'offline').length,
      error: agents.filter(a => a.status === 'error').length,
      timestamp: new Date(),
    };
  }
}

interface HealthReport {
  total: number;
  active: number;
  idle: number;
  offline: number;
  error: number;
  timestamp: Date;
}
