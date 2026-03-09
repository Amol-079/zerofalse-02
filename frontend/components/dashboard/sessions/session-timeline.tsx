'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Bot, Target, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const sessions = [
  {
    id: 'sess-1',
    name: 'Payment API Development',
    status: 'active',
    startedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    duration: '3h 12m',
    agents: 4,
    intentAlignment: 98,
    events: 23,
    violations: 1,
  },
  {
    id: 'sess-2',
    name: 'User Authentication Refactor',
    status: 'active',
    startedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    duration: '1h 45m',
    agents: 3,
    intentAlignment: 95,
    events: 12,
    violations: 0,
  },
  {
    id: 'sess-3',
    name: 'Database Migration',
    status: 'completed',
    startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    duration: '45m',
    agents: 2,
    intentAlignment: 100,
    events: 8,
    violations: 0,
  },
];

export function SessionTimeline() {
  const [selectedSession, setSelectedSession] = useState(sessions[0]);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Active Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedSession(session)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedSession.id === session.id
                  ? 'border-blue-500/50 bg-blue-500/5'
                  : 'border-slate-800 bg-slate-950/30 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-white">{session.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      {session.agents} agents
                    </span>
                  </div>
                </div>
                <Badge className={
                  session.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-slate-500/20 text-slate-400'
                }>
                  {session.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span className={`text-sm font-medium ${
                      session.intentAlignment >= 95 ? 'text-emerald-400' :
                      session.intentAlignment >= 90 ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {session.intentAlignment}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-400">{session.events} events</span>
                  </div>
                </div>
                
                {session.violations > 0 ? (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{session.violations}</span>
                  </div>
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
