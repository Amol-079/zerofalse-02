'use client';

import { motion } from 'framer-motion';
import { Bot, Activity, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types';
import { formatRelativeTime, getStatusColor } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all cursor-pointer overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                agent.status === 'active' ? 'bg-emerald-500/10' :
                agent.status === 'error' ? 'bg-red-500/10' :
                agent.status === 'idle' ? 'bg-blue-500/10' :
                'bg-slate-800'
              }`}>
                <Bot className={`w-5 h-5 ${
                  agent.status === 'active' ? 'text-emerald-500' :
                  agent.status === 'error' ? 'text-red-500' :
                  agent.status === 'idle' ? 'text-blue-500' :
                  'text-slate-500'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs text-slate-500 capitalize">{agent.type}</p>
              </div>
            </div>
            <Badge variant="outline" className={getStatusColor(agent.status)}>
              {agent.status}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-wrap gap-1">
              {agent.capabilities.slice(0, 3).map((cap: string) => (
                <span
                  key={cap}
                  className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs"
                >
                  {cap}
                </span>
              ))}
              {agent.capabilities.length > 3 && (
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs">
                  +{agent.capabilities.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Activity className="w-3 h-3" />
              <span>Active now</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(agent.lastSeen)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
