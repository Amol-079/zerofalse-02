'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const intentChain = {
  original: 'Build a secure payment processing API with PCI compliance',
  requirements: [
    { id: 'req-1', text: 'PCI DSS compliance required', type: 'compliance', critical: true },
    { id: 'req-2', text: 'AES-256 encryption for data at rest', type: 'security', critical: true },
    { id: 'req-3', text: 'JWT authentication with refresh tokens', type: 'security', critical: true },
    { id: 'req-4', text: 'Rate limiting: 100 req/min per user', type: 'functional', critical: false },
  ],
  chain: [
    { agent: 'Planner Agent', action: 'Parse intent and create architecture', status: 'completed', alignment: 100 },
    { agent: 'Coder Agent', action: 'Implement database layer', status: 'completed', alignment: 98 },
    { agent: 'Coder Agent', action: 'Implement authentication', status: 'in_progress', alignment: 95 },
    { agent: 'Reviewer Agent', action: 'Security audit', status: 'pending', alignment: null },
  ],
};

export function IntentChain() {
  const [selectedReq, setSelectedReq] = useState<string | null>(null);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          Intent Chain Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Original Intent */}
        <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Original Intent</span>
          </div>
          <p className="text-white font-medium">{intentChain.original}</p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-400 mb-3">Security Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {intentChain.requirements.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedReq(selectedReq === req.id ? null : req.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  req.critical
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                } ${selectedReq === req.id ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-500' : ''}`}
              >
                {req.text}
              </button>
            ))}
          </div>
        </div>

        {/* Chain Visualization */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-400 mb-3">Delegation Chain</h4>
          {intentChain.chain.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {i < intentChain.chain.length - 1 && (
                <div className="absolute left-4 top-10 w-0.5 h-6 bg-slate-800" />
              )}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-emerald-500/10' :
                  step.status === 'in_progress' ? 'bg-amber-500/10' :
                  'bg-slate-800'
                }`}>
                  {step.status === 'completed' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> :
                   step.status === 'in_progress' ? <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" /> :
                   <div className="w-4 h-4 rounded-full border-2 border-slate-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{step.agent}</span>
                    {step.alignment && (
                      <Badge variant="outline" className={
                        step.alignment >= 95 ? 'border-emerald-500/30 text-emerald-400' :
                        step.alignment >= 90 ? 'border-amber-500/30 text-amber-400' :
                        'border-red-500/30 text-red-400'
                      }>
                        {step.alignment}% aligned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{step.action}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
