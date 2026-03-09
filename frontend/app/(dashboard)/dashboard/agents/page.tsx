import { AgentList } from '@/components/dashboard/agents/agent-list';
import { DelegationFlow } from '@/components/dashboard/agents/delegation-flow';

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Agent Management</h1>
        <p className="text-slate-400">Monitor and manage your AI agent fleet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AgentList />
        </div>
        <div>
          <DelegationFlow />
        </div>
      </div>
    </div>
  );
}
