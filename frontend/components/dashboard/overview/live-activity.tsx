'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Shield, AlertCircle, Activity, 
  GitBranch, Brain, Lock 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subscribeToEvents } from '@/lib/websocket';
import { formatRelativeTime } from '@/lib/utils';
import { ActivityLog } from '@/types';

const iconMap = {
  delegation: GitBranch,
  violation: AlertCircle,
  tool_call: Shield,
  drift: Activity,
  memory_alert: Brain,
  agent_status: Bot,
};

const severityColors = {
  info: 'text-blue-400 bg-blue-500/10',
  warning: 'text-amber-400 bg-amber-500/10',
  critical: 'text-red-400 bg-red-500/10',
};

export function LiveActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: '1',
      type: 'violation',
      description: 'Agent B attempted to override encryption requirement from Agent A',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      severity: 'critical',
    },
    {
      id: '2',
      type: 'tool_call',
      description: 'MCP tool call blocked: unauthorized file_write to /etc/passwd',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      severity: 'warning',
    },
    {
      id: '3',
      type: 'delegation',
      description: 'Planner Agent → Coder Agent: Implement authentication',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      severity: 'info',
    },
    {
      id: '4',
      type: 'drift',
      description: 'Session "Payment API" drifting from original intent',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: 'warning',
    },
    {
      id: '5',
      type: 'memory_alert',
      description: 'Cross-agent memory pollution detected in session ctx-784',
      timestamp: new Date(Date.now() - 23 * 60 * 1000),
      severity: 'critical',
    },
  ]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((event) => {
      const newActivity: ActivityLog = {
        id: Date.now().toString(),
        type: event.type,
        description: getEventDescription(event),
        timestamp: new Date(),
        severity: getEventSeverity(event),
      };
      
      setActivities((prev) => [newActivity, ...prev].slice(0, 50));
    });

    return () => unsubscribe();
  }, []);

  const getEventDescription = (event: any): string => {
    switch (event.type) {
      case 'violation':
        return `Intent violation: ${event.data.description}`;
      case 'tool_call':
        return `MCP ${event.data.status}: ${event.data.tool}`;
      case 'delegation':
        return `${event.data.fromAgentId} → ${event.data.toAgentId}: ${event.data.task}`;
      case 'drift':
        return `Drift detected: ${event.data.description}`;
      case 'memory_alert':
        return `Memory alert: ${event.data.pollutionType}`;
      default:
        return 'System event';
    }
  };

  const getEventSeverity = (event: any): 'info' | 'warning' | 'critical' => {
    if (event.type === 'violation' || event.type === 'memory_alert') return 'critical';
    if (event.type === 'drift' || event.data?.status === 'blocked') return 'warning';
    return 'info';
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live Activity
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">Real-time</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-auto">
          <AnimatePresence>
            {activities.map((activity) => {
              const Icon = iconMap[activity.type];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${severityColors[activity.severity]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
