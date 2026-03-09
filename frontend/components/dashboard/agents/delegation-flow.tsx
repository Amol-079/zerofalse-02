'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const demoDelegations = [
  {
    id: 'del-1',
    from: 'Planner Agent',
    to: 'Coder Agent',
    task: 'Implement JWT authentication',
    status: 'verified',
    checks: ['Capability match ✓', 'Security requirements preserved ✓', 'Scope appropriate ✓'],
  },
  {
    id: 'del-2',
    from: 'Coder Agent',
    to: 'Bash Agent',
    task: 'Install dependencies via curl | sh',
    status: 'blocked',
    checks: ['Security violation: pipe to shell', 'Suggested: Verify checksum first'],
  },
  {
    id: 'del-3',
    from: 'Planner Agent',
    to: 'Deploy Agent',
    task: 'Deploy to production',
    status: 'pending',
    checks: ['Awaiting security review...'],
  },
];

export function DelegationFlow() {
  const [selectedDelegation, setSelectedDelegation] = useState(demoDelegations[0]);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          Delegation Validator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {demoDelegations.map((delegation) => (
            <motion.div
              key={delegation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedDelegation.id === delegation.id
                  ? 'border-blue-500/50 bg-blue-500/5'
                  : 'border-slate-800 bg-slate-950/30 hover:border-slate-700'
              }`}
              onClick={() => setSelectedDelegation(delegation)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-300">{delegation.from}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-300">{delegation.to}</span>
                </div>
                <div className="ml-auto">
                  {delegation.status === 'verified' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {delegation.status === 'blocked' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  {delegation.status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />}
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">{delegation.task}</p>
              <div className="space-y-1">
                {delegation.checks.map((check, i) => (
                  <div key={i} className={`text-xs ${
                    check.includes('✓') ? 'text-emerald-400' :
                    check.includes('violation') ? 'text-red-400' :
                    'text-slate-500'
                  }`}>
                    {check}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
