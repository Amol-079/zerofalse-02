'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const violations = [
  {
    id: 'v1',
    type: 'capability_mismatch',
    severity: 'critical',
    description: 'Agent B (Coder) delegated PCI compliance task without security clearance',
    fromAgent: 'Planner Agent',
    toAgent: 'Coder Agent',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: 'blocked',
    resolution: 'Re-delegated to Security Agent',
  },
  {
    id: 'v2',
    type: 'scope_creep',
    severity: 'high',
    description: 'Agent implementing user profiles when original intent was payment API only',
    fromAgent: 'Coder Agent',
    toAgent: 'Coder Agent',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    status: 'flagged',
    resolution: 'Pending review',
  },
  {
    id: 'v3',
    type: 'security_gap',
    severity: 'medium',
    description: 'JWT secret using environment variable instead of secrets manager',
    fromAgent: 'Coder Agent',
    toAgent: 'Coder Agent',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: 'resolved',
    resolution: 'Updated to use AWS Secrets Manager',
  },
];

export function ViolationCard() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Recent Violations
          </CardTitle>
          <Badge variant="outline" className="border-red-500/30 text-red-400">
            {violations.length} active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {violations.map((violation, i) => (
            <motion.div
              key={violation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-lg border ${
                violation.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' :
                violation.severity === 'high' ? 'border-amber-500/30 bg-amber-500/5' :
                'border-blue-500/30 bg-blue-500/5'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={
                    violation.severity === 'critical' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' :
                    violation.severity === 'high' ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' :
                    'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  }>
                    {violation.severity}
                  </Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(violation.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <Badge variant="outline" className={
                  violation.status === 'blocked' ? 'border-red-500/30 text-red-400' :
                  violation.status === 'resolved' ? 'border-emerald-500/30 text-emerald-400' :
                  'border-amber-500/30 text-amber-400'
                }>
                  {violation.status}
                </Badge>
              </div>
              
              <p className="text-sm text-slate-300 mb-3">{violation.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  {violation.fromAgent} → {violation.toAgent}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Resolution: {violation.resolution}
                </span>
                {violation.status !== 'resolved' && (
                  <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700">
                    Review
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
