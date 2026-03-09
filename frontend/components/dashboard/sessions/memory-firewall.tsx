'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lock, Unlock, AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const memoryContexts = [
  {
    id: 'ctx-1',
    agent: 'Security Agent',
    level: 'critical',
    content: 'PCI compliance: Must use AES-256 encryption for all card data',
    protected: true,
    accessCount: 12,
  },
  {
    id: 'ctx-2',
    agent: 'Planner Agent',
    level: 'high',
    content: 'Original intent: Build secure payment API only',
    protected: true,
    accessCount: 8,
  },
  {
    id: 'ctx-3',
    agent: 'Coder Agent',
    level: 'normal',
    content: 'Implementation details for user authentication',
    protected: false,
    accessCount: 25,
  },
];

const blockedAttempts = [
  {
    id: 'block-1',
    agent: 'Feature Agent',
    action: 'Attempted to override encryption requirement',
    blockedAt: new Date(Date.now() - 5 * 60 * 1000),
    reason: 'Insufficient security clearance',
  },
];

export function MemoryFirewall() {
  const [selectedContext, setSelectedContext] = useState<string | null>(null);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-pink-500" />
          Cross-Agent Memory Firewall
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Protected Contexts</h4>
            <div className="space-y-2">
              {memoryContexts.map((ctx) => (
                <motion.div
                  key={ctx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedContext(selectedContext === ctx.id ? null : ctx.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    ctx.level === 'critical' ? 'border-red-500/30 bg-red-500/5' :
                    ctx.level === 'high' ? 'border-amber-500/30 bg-amber-500/5' :
                    'border-slate-800 bg-slate-950/30'
                  } ${selectedContext === ctx.id ? 'ring-2 ring-pink-500/50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {ctx.protected ? (
                        <Lock className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Unlock className="w-4 h-4 text-slate-500" />
                      )}
                      <span className="text-sm font-medium text-white">{ctx.agent}</span>
                    </div>
                    <Badge className={
                      ctx.level === 'critical' ? 'bg-red-500/20 text-red-400' :
                      ctx.level === 'high' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }>
                      {ctx.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{ctx.content}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{ctx.accessCount} accesses</span>
                    {ctx.protected && <span className="text-emerald-400">Protected</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-sm font-medium text-slate-400 mb-3">Blocked Override Attempts</h4>
            {blockedAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-3 rounded-lg border border-red-500/30 bg-red-500/5"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-300">{attempt.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{attempt.reason}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {new Date(attempt.blockedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
