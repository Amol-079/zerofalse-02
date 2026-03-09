'use client';

import { useAgents } from '@/hooks/use-agents';
import { AgentCard } from './agent-card';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AgentList() {
  const { data: agents, isLoading, error } = useAgents();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400">
        Failed to load agents
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Active Agents</h2>
        <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents?.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
        
        {/* Demo agents if none returned */}
        {(!agents || agents.length === 0) && (
          <>
            <AgentCard agent={{
              id: '1',
              name: 'Planner Agent',
              type: 'planner',
              capabilities: ['architecture', 'planning', 'delegation'],
              status: 'active',
              lastSeen: new Date(),
              metadata: {},
            }} />
            <AgentCard agent={{
              id: '2',
              name: 'Coder Agent',
              type: 'coder',
              capabilities: ['typescript', 'api_development', 'database'],
              status: 'active',
              lastSeen: new Date(Date.now() - 5 * 60 * 1000),
              metadata: {},
            }} />
            <AgentCard agent={{
              id: '3',
              name: 'Security Agent',
              type: 'reviewer',
              capabilities: ['security_audit', 'vulnerability_scan', 'compliance'],
              status: 'idle',
              lastSeen: new Date(Date.now() - 15 * 60 * 1000),
              metadata: {},
            }} />
          </>
        )}
      </div>
    </div>
  );
}
